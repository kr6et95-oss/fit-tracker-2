/**
 * FIT TRACKER 2 — Garmin Forerunner 265 가져오기
 * 지원: 러닝 TCX/GPX, 수면 CSV·텍스트 붙여넣기
 * (공식 Connect API 없이 파일/붙여넣기 기반 — GitHub Pages 호환)
 */
window.FT_GARMIN = (function () {
  const pad = (n) => String(n).padStart(2, "0");

  function localDateKey(d) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  function parseHM(str) {
    if (!str) return null;
    const s = String(str).trim();
    const m = s.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
    if (!m) return null;
    return `${pad(+m[1])}:${pad(+m[2])}`;
  }

  /** "7h 32m" | "7:32" | "7.5" | "452분" → hours float */
  function parseDurationToHours(raw) {
    if (raw == null || raw === "") return null;
    if (typeof raw === "number" && !isNaN(raw)) {
      // Garmin sometimes exports minutes as number
      if (raw > 24) return Math.round((raw / 60) * 10) / 10;
      return Math.round(raw * 10) / 10;
    }
    const s = String(raw).trim().toLowerCase().replace(/,/g, "");
    if (!s) return null;

    let h = 0,
      m = 0;
    const hm = s.match(/(\d+)\s*h(?:ours?)?\s*(\d+)?\s*m?/);
    if (hm) {
      h = +hm[1];
      m = hm[2] ? +hm[2] : 0;
      return Math.round((h + m / 60) * 10) / 10;
    }
    const onlyM = s.match(/^(\d+(?:\.\d+)?)\s*m(?:in(?:utes?)?)?$/);
    if (onlyM) return Math.round((+onlyM[1] / 60) * 10) / 10;
    const colon = s.match(/^(\d{1,2}):(\d{2})$/);
    if (colon) return Math.round((+colon[1] + +colon[2] / 60) * 10) / 10;
    const num = parseFloat(s);
    if (!isNaN(num)) {
      if (num > 24) return Math.round((num / 60) * 10) / 10; // minutes
      return Math.round(num * 10) / 10;
    }
    return null;
  }

  function haversineM(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const toR = (x) => (x * Math.PI) / 180;
    const dLat = toR(lat2 - lat1);
    const dLon = toR(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toR(lat1)) * Math.cos(toR(lat2)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  }

  function paceStr(min, km) {
    if (!km || km <= 0 || !min) return "";
    const secPerKm = (min * 60) / km;
    const mm = Math.floor(secPerKm / 60);
    const ss = Math.round(secPerKm % 60);
    return `${mm}:${pad(ss)}/km`;
  }

  function estimateRunKcal(min, km) {
    // rough: ~1 kcal/kg/km ≈ 60 kcal/km + time component for FR-class run
    if (km > 0) return Math.round(km * 65 + min * 2);
    return Math.round(min * 10);
  }

  function textFromXml(node, tag) {
    if (!node) return "";
    const el = node.getElementsByTagName(tag)[0];
    return el && el.textContent != null ? el.textContent.trim() : "";
  }

  /** TCX → activity list (runs preferred) */
  function parseTcx(text) {
    const doc = new DOMParser().parseFromString(text, "application/xml");
    if (doc.querySelector("parsererror")) throw new Error("TCX XML 파싱 실패");
    const acts = [...doc.getElementsByTagName("Activity")];
    const out = [];
    acts.forEach((act) => {
      const sport = (act.getAttribute("Sport") || "Running").toLowerCase();
      const idStr = textFromXml(act, "Id");
      let start = idStr ? new Date(idStr) : null;
      let totalSec = 0;
      let totalM = 0;
      let cal = 0;
      const laps = [...act.getElementsByTagName("Lap")];
      laps.forEach((lap) => {
        if (!start && lap.getAttribute("StartTime")) {
          start = new Date(lap.getAttribute("StartTime"));
        }
        totalSec += parseFloat(textFromXml(lap, "TotalTimeSeconds")) || 0;
        totalM += parseFloat(textFromXml(lap, "DistanceMeters")) || 0;
        cal += parseFloat(textFromXml(lap, "Calories")) || 0;
      });
      // trackpoints fallback for distance
      if (totalM <= 0) {
        const tps = [...act.getElementsByTagName("Trackpoint")];
        let prev = null;
        tps.forEach((tp) => {
          const lat = parseFloat(textFromXml(tp, "LatitudeDegrees"));
          const lon = parseFloat(textFromXml(tp, "LongitudeDegrees"));
          if (isNaN(lat) || isNaN(lon)) return;
          if (prev) totalM += haversineM(prev.lat, prev.lon, lat, lon);
          prev = { lat, lon };
          if (!start) {
            const t = textFromXml(tp, "Time");
            if (t) start = new Date(t);
          }
        });
      }
      if (!start || isNaN(start.getTime())) return;
      const min = Math.max(1, Math.round(totalSec / 60) || 1);
      const km = Math.round((totalM / 1000) * 100) / 100;
      const isRun = /run|running|trail|treadmill|jogging/i.test(sport) || sport === "other";
      out.push({
        kind: "activity",
        sport: sport || "running",
        isRun: isRun || true,
        date: localDateKey(start),
        startISO: start.toISOString(),
        min,
        dist: km || null,
        cal: cal > 0 ? Math.round(cal) : estimateRunKcal(min, km),
        pace: paceStr(min, km),
        name: isRun || /run/i.test(sport) ? "러닝 (Garmin)" : `운동 (Garmin · ${sport})`,
        source: "garmin-tcx",
      });
    });
    return out;
  }

  /** GPX → single/multi track as activities */
  function parseGpx(text) {
    const doc = new DOMParser().parseFromString(text, "application/xml");
    if (doc.querySelector("parsererror")) throw new Error("GPX XML 파싱 실패");
    const trks = [...doc.getElementsByTagName("trk")];
    const out = [];
    const parsePts = (pts) => {
      let dist = 0;
      let prev = null;
      let t0 = null;
      let t1 = null;
      pts.forEach((pt) => {
        const lat = parseFloat(pt.getAttribute("lat"));
        const lon = parseFloat(pt.getAttribute("lon"));
        const tEl = pt.getElementsByTagName("time")[0];
        const t = tEl ? new Date(tEl.textContent) : null;
        if (t && !isNaN(t.getTime())) {
          if (!t0) t0 = t;
          t1 = t;
        }
        if (isNaN(lat) || isNaN(lon)) return;
        if (prev) dist += haversineM(prev.lat, prev.lon, lat, lon);
        prev = { lat, lon };
      });
      if (!t0) return null;
      const min = Math.max(1, Math.round((t1 - t0) / 60000) || 1);
      const km = Math.round((dist / 1000) * 100) / 100;
      return {
        kind: "activity",
        sport: "running",
        isRun: true,
        date: localDateKey(t0),
        startISO: t0.toISOString(),
        min,
        dist: km || null,
        cal: estimateRunKcal(min, km),
        pace: paceStr(min, km),
        name: "러닝 (Garmin)",
        source: "garmin-gpx",
      };
    };

    if (trks.length) {
      trks.forEach((trk) => {
        const pts = [...trk.getElementsByTagName("trkpt")];
        const row = parsePts(pts);
        if (row) {
          const n = textFromXml(trk, "name");
          if (n) row.name = /run|런|jog|러닝/i.test(n) ? "러닝 (Garmin)" : `${n} (Garmin)`;
          out.push(row);
        }
      });
    } else {
      const pts = [...doc.getElementsByTagName("trkpt")];
      if (!pts.length) {
        // rtept fallback
        const rpts = [...doc.getElementsByTagName("rtept")];
        const row = parsePts(rpts);
        if (row) out.push(row);
      } else {
        const row = parsePts(pts);
        if (row) out.push(row);
      }
    }
    return out;
  }

  function splitCsvLine(line) {
    const res = [];
    let cur = "";
    let q = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        q = !q;
        continue;
      }
      if (c === "," && !q) {
        res.push(cur.trim());
        cur = "";
        continue;
      }
      cur += c;
    }
    res.push(cur.trim());
    return res;
  }

  function normalizeHeader(h) {
    return String(h || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  }

  /** Sleep CSV — flexible column names (Garmin / Connect IQ / third-party exports) */
  function parseSleepCsv(text) {
    const lines = text
      .replace(/^\uFEFF/, "")
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length < 2) throw new Error("CSV에 데이터가 없습니다");

    // detect delimiter
    const delim = lines[0].includes(";") && !lines[0].includes(",") ? ";" : ",";
    const headers = (delim === "," ? splitCsvLine(lines[0]) : lines[0].split(";")).map(normalizeHeader);

    const findCol = (...cands) => {
      for (const c of cands) {
        const i = headers.findIndex((h) => h === c || h.includes(c));
        if (i >= 0) return i;
      }
      return -1;
    };

    const iDate = findCol("calendar date", "date", "날짜", "sleep date", "day");
    const iDur = findCol(
      "total sleep duration",
      "sleep duration",
      "total sleep",
      "sleep time",
      "duration",
      "수면",
      "total sleep time"
    );
    const iStart = findCol("sleep start", "start time", "bed time", "취침", "start");
    const iEnd = findCol("sleep end", "end time", "wake time", "기상", "end", "wake");
    const iScore = findCol("sleep score", "overall score", "score", "수면 점수");

    if (iDate < 0 && iDur < 0) {
      // try freeform lines
      return parseSleepText(text);
    }

    const out = [];
    for (let r = 1; r < lines.length; r++) {
      const cols = delim === "," ? splitCsvLine(lines[r]) : lines[r].split(";").map((x) => x.trim());
      let dateRaw = iDate >= 0 ? cols[iDate] : "";
      let d = dateRaw ? new Date(dateRaw) : null;
      if (d && isNaN(d.getTime())) {
        // YYYY.MM.DD or YYYY/MM/DD
        const m = String(dateRaw).match(/(\d{4})[./-](\d{1,2})[./-](\d{1,2})/);
        if (m) d = new Date(+m[1], +m[2] - 1, +m[3]);
      }
      // duration
      let hrs = iDur >= 0 ? parseDurationToHours(cols[iDur]) : null;
      let bed = iStart >= 0 ? parseHM(cols[iStart].slice(0, 8)) : null;
      // ISO datetime start
      if (iStart >= 0 && cols[iStart] && cols[iStart].includes("T")) {
        const sd = new Date(cols[iStart]);
        if (!isNaN(sd.getTime())) {
          bed = `${pad(sd.getHours())}:${pad(sd.getMinutes())}`;
          if (!d || isNaN(d.getTime())) d = sd;
        }
      }
      if (iEnd >= 0 && cols[iEnd] && cols[iEnd].includes("T") && hrs == null) {
        const ed = new Date(cols[iEnd]);
        const sd = iStart >= 0 ? new Date(cols[iStart]) : null;
        if (sd && !isNaN(sd) && !isNaN(ed)) {
          hrs = Math.round(((ed - sd) / 3600000) * 10) / 10;
        }
      }
      // wake date: sleep that ends in morning belongs to wake date often
      let dateKey = d && !isNaN(d.getTime()) ? localDateKey(d) : null;
      if (!dateKey && bed && iEnd >= 0) {
        // skip
      }
      if (!dateKey || hrs == null || hrs <= 0) continue;

      let sleepQ = null;
      if (iScore >= 0 && cols[iScore]) {
        const sc = parseFloat(cols[iScore]);
        if (!isNaN(sc)) {
          // Garmin sleep score ~0-100 → 1-5
          if (sc > 10) sleepQ = Math.max(1, Math.min(5, Math.round(sc / 20)));
          else sleepQ = Math.max(1, Math.min(5, Math.round(sc)));
        }
      }

      out.push({
        kind: "sleep",
        date: dateKey,
        sleepHrs: hrs,
        bedTime: bed || "",
        sleepQ,
        name: `수면 ${hrs}h`,
        source: "garmin-csv",
      });
    }
    if (!out.length) throw new Error("수면 행을 읽지 못했습니다. 열 이름을 확인해 주세요.");
    return out;
  }

  /**
   * Free text sleep lines:
   * 2026-07-12 7.5 23:40
   * 2026-07-12, 7h32m, 23:30
   * 7.5  (→ today)
   */
  function parseSleepText(text) {
    const lines = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"));
    const out = [];
    const today = localDateKey(new Date());

    lines.forEach((line) => {
      // skip header-like
      if (/date|수면|sleep/i.test(line) && /duration|시간/i.test(line)) return;

      let date = today;
      let rest = line;
      const dm = line.match(/^(\d{4}[./-]\d{1,2}[./-]\d{1,2})[,\s]+(.+)$/);
      if (dm) {
        const p = dm[1].replace(/[./]/g, "-").split("-");
        date = `${p[0]}-${pad(+p[1])}-${pad(+p[2])}`;
        rest = dm[2];
      }

      // extract time HH:MM
      let bed = "";
      const tm = rest.match(/\b(\d{1,2}:\d{2})\b/);
      if (tm) {
        bed = parseHM(tm[1]) || "";
        rest = rest.replace(tm[1], " ").trim();
      }

      const hrs = parseDurationToHours(rest.replace(/,/g, " ").trim()) ?? parseDurationToHours(line);
      if (hrs == null || hrs <= 0 || hrs > 16) return;
      out.push({
        kind: "sleep",
        date,
        sleepHrs: hrs,
        bedTime: bed,
        sleepQ: null,
        name: `수면 ${hrs}h`,
        source: "garmin-text",
      });
    });
    if (!out.length) throw new Error("수면 텍스트를 해석하지 못했습니다. 예: 2026-07-12 7.5 23:30");
    return out;
  }

  async function parseActivityFile(file) {
    const name = (file.name || "").toLowerCase();
    const text = await file.text();
    if (name.endsWith(".tcx") || text.includes("<TrainingCenterDatabase")) {
      return parseTcx(text);
    }
    if (name.endsWith(".gpx") || text.includes("<gpx")) {
      return parseGpx(text);
    }
    if (name.endsWith(".csv")) {
      // activity csv? try sleep first if headers look like sleep
      const head = text.slice(0, 200).toLowerCase();
      if (head.includes("sleep") || head.includes("수면")) return parseSleepCsv(text);
      throw new Error("이 CSV는 수면 형식일 수 있습니다. 수면 가져오기를 이용해 주세요.");
    }
    if (name.endsWith(".fit")) {
      throw new Error(
        "FIT 원본은 브라우저에서 바로 읽기 어렵습니다. Garmin Connect → 활동 → 내보내기 → TCX 또는 GPX 로 받아 주세요."
      );
    }
    // sniff
    if (text.includes("<TrainingCenterDatabase")) return parseTcx(text);
    if (text.includes("<gpx")) return parseGpx(text);
    throw new Error("지원 형식: .tcx, .gpx (러닝) / 수면은 CSV·텍스트");
  }

  async function parseSleepFile(file) {
    const text = await file.text();
    const name = (file.name || "").toLowerCase();
    if (name.endsWith(".csv") || text.includes(",")) {
      try {
        return parseSleepCsv(text);
      } catch (e) {
        return parseSleepText(text);
      }
    }
    return parseSleepText(text);
  }

  function summarize(items) {
    const sleep = items.filter((x) => x.kind === "sleep");
    const acts = items.filter((x) => x.kind === "activity");
    const lines = [];
    if (sleep.length) {
      lines.push(`수면 ${sleep.length}건`);
      sleep.slice(0, 5).forEach((s) => {
        lines.push(`  · ${s.date}  ${s.sleepHrs}h` + (s.bedTime ? `  취침 ${s.bedTime}` : ""));
      });
      if (sleep.length > 5) lines.push(`  · … 외 ${sleep.length - 5}건`);
    }
    if (acts.length) {
      lines.push(`활동 ${acts.length}건`);
      acts.slice(0, 5).forEach((a) => {
        lines.push(
          `  · ${a.date}  ${a.name}  ${a.min}분` +
            (a.dist ? `  ${a.dist}km` : "") +
            (a.cal ? `  ${a.cal}kcal` : "")
        );
      });
      if (acts.length > 5) lines.push(`  · … 외 ${acts.length - 5}건`);
    }
    return lines.join("\n") || "미리보기 없음";
  }

  return {
    parseTcx,
    parseGpx,
    parseSleepCsv,
    parseSleepText,
    parseActivityFile,
    parseSleepFile,
    parseDurationToHours,
    summarize,
    localDateKey,
  };
})();
