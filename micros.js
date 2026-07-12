/**
 * FIT TRACKER 2 — 미량영양소 대략 추정
 * 값은 한국인 상용 식품·공용 성분표 수준의 근사치 (mg/mcg/g).
 * 의료·처방 용도 아님. UI에 "대략" 표기 권장.
 */
window.FT_MICRO = (function () {
  // 성인 하루 참고량 (대략, 성별 평균)
  const RDA = {
    fiber: { v: 25, u: 'g', label: '식이섬유' },
    na: { v: 2000, u: 'mg', label: '나트륨', cap: true }, // 목표 상한에 가깝게
    k: { v: 3500, u: 'mg', label: '칼륨' },
    ca: { v: 800, u: 'mg', label: '칼슘' },
    fe: { v: 12, u: 'mg', label: '철' },
    mg: { v: 320, u: 'mg', label: '마그네슘' },
    zn: { v: 10, u: 'mg', label: '아연' },
    vitC: { v: 100, u: 'mg', label: '비타민 C' },
    vitD: { v: 10, u: 'μg', label: '비타민 D' },
    vitA: { v: 800, u: 'μg', label: '비타민 A' },
    folate: { v: 400, u: 'μg', label: '엽산' },
    b12: { v: 2.4, u: 'μg', label: '비타민 B12' }
  };

  const KEYS = Object.keys(RDA);

  const empty = () =>
    KEYS.reduce((o, k) => {
      o[k] = 0;
      return o;
    }, {});

  const scale = (m, p) => {
    const out = empty();
    if (!m) return out;
    KEYS.forEach((k) => {
      out[k] = Math.round(((+m[k] || 0) * p) * 100) / 100;
    });
    return out;
  };

  const add = (a, b) => {
    const out = empty();
    KEYS.forEach((k) => {
      out[k] = Math.round(((a[k] || 0) + (b[k] || 0)) * 100) / 100;
    });
    return out;
  };

  // 카테고리 기본 1인분 근사
  const CAT = {
    주식: { fiber: 2, na: 5, k: 80, ca: 10, fe: 0.6, mg: 25, zn: 0.8, vitC: 0, vitD: 0, vitA: 0, folate: 20, b12: 0 },
    단백질: { fiber: 0, na: 120, k: 250, ca: 25, fe: 1.5, mg: 25, zn: 2, vitC: 0, vitD: 0.5, vitA: 15, folate: 15, b12: 0.8 },
    국찌개: { fiber: 1.5, na: 800, k: 200, ca: 40, fe: 1, mg: 20, zn: 0.8, vitC: 8, vitD: 0.2, vitA: 40, folate: 25, b12: 0.3 },
    채소: { fiber: 2.5, na: 200, k: 200, ca: 40, fe: 0.8, mg: 20, zn: 0.3, vitC: 25, vitD: 0, vitA: 120, folate: 40, b12: 0 },
    과일: { fiber: 2.5, na: 2, k: 250, ca: 15, fe: 0.3, mg: 15, zn: 0.2, vitC: 40, vitD: 0, vitA: 30, folate: 20, b12: 0 },
    간식: { fiber: 1, na: 80, k: 80, ca: 30, fe: 0.4, mg: 20, zn: 0.4, vitC: 2, vitD: 0.1, vitA: 10, folate: 10, b12: 0.1 },
    음료: { fiber: 0, na: 10, k: 40, ca: 20, fe: 0, mg: 5, zn: 0, vitC: 5, vitD: 0, vitA: 0, folate: 5, b12: 0.1 },
    편의점: { fiber: 2, na: 600, k: 150, ca: 40, fe: 1, mg: 25, zn: 1, vitC: 5, vitD: 0.2, vitA: 30, folate: 30, b12: 0.4 },
    배달: { fiber: 3, na: 1200, k: 300, ca: 60, fe: 2, mg: 40, zn: 2, vitC: 10, vitD: 0.3, vitA: 50, folate: 40, b12: 0.8 }
  };

  // 이름 키워드 오버라이드 (1인분 기준 대략)
  const RULES = [
    { k: /닭가슴|훈제닭/, m: { fiber: 0, na: 70, k: 300, ca: 10, fe: 0.7, mg: 28, zn: 0.8, vitC: 0, vitD: 0.1, vitA: 5, folate: 5, b12: 0.3 } },
    { k: /계란|달걀/, m: { fiber: 0, na: 70, k: 70, ca: 28, fe: 0.9, mg: 6, zn: 0.6, vitC: 0, vitD: 1.1, vitA: 80, folate: 25, b12: 0.5 } },
    { k: /연어|고등어|삼치|회 |사시미/, m: { fiber: 0, na: 80, k: 350, ca: 15, fe: 0.5, mg: 30, zn: 0.6, vitC: 0, vitD: 8, vitA: 40, folate: 10, b12: 3 } },
    { k: /두부|순두부|연두부/, m: { fiber: 1.5, na: 10, k: 150, ca: 130, fe: 1.5, mg: 40, zn: 0.8, vitC: 0, vitD: 0, vitA: 0, folate: 25, b12: 0 } },
    { k: /그릭|요거트|우유|두유/, m: { fiber: 0, na: 50, k: 180, ca: 150, fe: 0.1, mg: 15, zn: 0.6, vitC: 1, vitD: 1, vitA: 40, folate: 15, b12: 0.6 } },
    { k: /현미|잡곡/, m: { fiber: 3.5, na: 5, k: 120, ca: 15, fe: 1, mg: 50, zn: 1.2, vitC: 0, vitD: 0, vitA: 0, folate: 15, b12: 0 } },
    { k: /흰쌀|쌀밥|즉석밥/, m: { fiber: 0.6, na: 2, k: 40, ca: 5, fe: 0.3, mg: 12, zn: 0.6, vitC: 0, vitD: 0, vitA: 0, folate: 8, b12: 0 } },
    { k: /브로콜리|시금치|나물|샐러드|양배추|상추/, m: { fiber: 3, na: 40, k: 280, ca: 50, fe: 1, mg: 25, zn: 0.4, vitC: 50, vitD: 0, vitA: 200, folate: 60, b12: 0 } },
    { k: /김치/, m: { fiber: 1.5, na: 400, k: 150, ca: 30, fe: 0.5, mg: 15, zn: 0.2, vitC: 12, vitD: 0, vitA: 40, folate: 30, b12: 0 } },
    { k: /바나나/, m: { fiber: 2.6, na: 1, k: 360, ca: 5, fe: 0.3, mg: 27, zn: 0.2, vitC: 9, vitD: 0, vitA: 3, folate: 20, b12: 0 } },
    { k: /사과|배 |귤|오렌지|딸기|키위|수박|포도|블루베리|망고/, m: { fiber: 2.5, na: 2, k: 180, ca: 12, fe: 0.2, mg: 12, zn: 0.1, vitC: 35, vitD: 0, vitA: 20, folate: 15, b12: 0 } },
    { k: /아보카도/, m: { fiber: 5, na: 7, k: 450, ca: 12, fe: 0.5, mg: 25, zn: 0.5, vitC: 8, vitD: 0, vitA: 7, folate: 60, b12: 0 } },
    { k: /아몬드|호두|견과/, m: { fiber: 2, na: 1, k: 120, ca: 40, fe: 0.6, mg: 40, zn: 0.6, vitC: 0, vitD: 0, vitA: 0, folate: 10, b12: 0 } },
    { k: /프로틴|쉐이크/, m: { fiber: 1, na: 120, k: 150, ca: 150, fe: 1, mg: 40, zn: 2, vitC: 20, vitD: 2, vitA: 100, folate: 80, b12: 1 } },
    { k: /라면|짜장|짬뽕|컵라면/, m: { fiber: 2, na: 1500, k: 150, ca: 30, fe: 1.5, mg: 30, zn: 1, vitC: 2, vitD: 0, vitA: 20, folate: 40, b12: 0.2 } },
    { k: /김치찌개|된장찌개|부대|육개장|설렁|곰탕|갈비탕|해장/, m: { fiber: 2, na: 1100, k: 280, ca: 50, fe: 1.5, mg: 30, zn: 1.5, vitC: 10, vitD: 0.3, vitA: 50, folate: 30, b12: 0.8 } },
    { k: /미역국/, m: { fiber: 1, na: 500, k: 200, ca: 80, fe: 1.2, mg: 40, zn: 0.4, vitC: 5, vitD: 0, vitA: 30, folate: 40, b12: 0.2 } },
    { k: /치킨|후라이드|돈까스|삼겹|족발|보쌈/, m: { fiber: 1, na: 700, k: 250, ca: 30, fe: 1.5, mg: 25, zn: 2, vitC: 2, vitD: 0.3, vitA: 30, folate: 20, b12: 0.8 } },
    { k: /피자|햄버거|파스타|크림/, m: { fiber: 2, na: 900, k: 200, ca: 150, fe: 2, mg: 30, zn: 1.5, vitC: 5, vitD: 0.4, vitA: 80, folate: 40, b12: 0.6 } },
    { k: /아메리카노|커피|녹차|보리|제로|물 /, m: { fiber: 0, na: 5, k: 50, ca: 5, fe: 0, mg: 5, zn: 0, vitC: 0, vitD: 0, vitA: 0, folate: 0, b12: 0 } },
    { k: /주스|스무디|콜라|사이다|맥주|소주|와인/, m: { fiber: 0.2, na: 10, k: 40, ca: 10, fe: 0.1, mg: 8, zn: 0.1, vitC: 15, vitD: 0, vitA: 5, folate: 10, b12: 0 } },
    { k: /고구마|감자/, m: { fiber: 3, na: 10, k: 400, ca: 20, fe: 0.5, mg: 25, zn: 0.3, vitC: 15, vitD: 0, vitA: 400, folate: 15, b12: 0 } },
    { k: /시금치/, m: { fiber: 2, na: 50, k: 400, ca: 80, fe: 2, mg: 50, zn: 0.4, vitC: 20, vitD: 0, vitA: 400, folate: 100, b12: 0 } }
  ];

  function fromCategory(cat) {
    const base = CAT[cat] || CAT['간식'];
    return { ...empty(), ...base };
  }

  function estimateFromName(name, cat) {
    const n = String(name || '');
    for (let i = 0; i < RULES.length; i++) {
      if (RULES[i].k.test(n)) return { ...empty(), ...RULES[i].m };
    }
    return fromCategory(cat || '간식');
  }

  /** food: { name|n, cat, micro?, cal } */
  function estimate(food) {
    if (!food) return empty();
    if (food.micro && typeof food.micro === 'object') {
      const out = empty();
      KEYS.forEach((k) => {
        out[k] = +food.micro[k] || 0;
      });
      return out;
    }
    const name = food.name || food.n || '';
    const cat = food.cat || '';
    let m = estimateFromName(name, cat);
    // scale soft by calories vs typical 300kcal serving
    const cal = +food.cal || +food.kcal || 0;
    if (cal > 0) {
      const f = Math.min(2.5, Math.max(0.35, cal / 300));
      m = scale(m, f);
    }
    return m;
  }

  function sumList(items) {
    return (items || []).reduce((acc, it) => {
      const m = it.micro ? scale(it.micro, 1) : estimate(it);
      // if item has portion already baked in cal/name, micro on item is absolute
      return add(acc, m);
    }, empty());
  }

  function pct(val, key) {
    const r = RDA[key];
    if (!r || !r.v) return 0;
    return Math.min(999, Math.round((val / r.v) * 100));
  }

  function formatVal(key, val) {
    const r = RDA[key];
    if (!r) return String(val);
    if (key === 'b12' || key === 'vitD') return (Math.round(val * 10) / 10) + r.u;
    if (val >= 10) return Math.round(val) + r.u;
    return (Math.round(val * 10) / 10) + r.u;
  }

  /** 상위 부족한 영양소 / 과다 나트륨 힌트 */
  function tips(totals) {
    const list = [];
    if ((totals.na || 0) > RDA.na.v * 1.1) list.push({ t: 'bad', m: `나트륨 대략 ${formatVal('na', totals.na)} — 국·찌개·배달 염분을 줄이면 부종·컨디션에 도움.` });
    if ((totals.fiber || 0) < RDA.fiber.v * 0.5) list.push({ t: 'warn', m: `식이섬유 부족 가능 (≈${formatVal('fiber', totals.fiber)}). 채소·과일·현미를 한 끼 더.` });
    if ((totals.vitD || 0) < RDA.vitD.v * 0.4) list.push({ t: 'warn', m: `비타민 D 식품 유입이 적어요 (≈${formatVal('vitD', totals.vitD)}). 생선·계란·햇빛을 의식해 보세요.` });
    if ((totals.fe || 0) < RDA.fe.v * 0.4) list.push({ t: 'warn', m: `철분 대략 ${formatVal('fe', totals.fe)}. 붉은 살코기·달걀·두부 + 비타민C 조합이 흡수에 유리.` });
    if ((totals.ca || 0) < RDA.ca.v * 0.4) list.push({ t: 'warn', m: `칼슘 대략 ${formatVal('ca', totals.ca)}. 유제품·두부·뼈째 생선을 활용.` });
    if ((totals.vitC || 0) < RDA.vitC.v * 0.4) list.push({ t: 'warn', m: `비타민 C 여유를 두면 좋아요 (≈${formatVal('vitC', totals.vitC)}). 과일·채소 한 줌.` });
    if ((totals.k || 0) < RDA.k.v * 0.35) list.push({ t: 'warn', m: `칼륨이 적을 수 있어요. 바나나·감자·시금치·아보카도.` });
    if (!list.length) list.push({ t: 'good', m: '주요 미량영양소 페이스가 무난해 보여요. (식품 추정 기반 대략치)' });
    return list.slice(0, 4);
  }

  return { RDA, KEYS, empty, scale, add, estimate, sumList, pct, formatVal, tips };
})();
