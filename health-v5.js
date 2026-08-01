(function () {
  'use strict';

  const HEALTH_DEFAULT = {
    metrics: { waistCm: null, restingHr: null },
    tests: [],
    vitaminProfile: {
      diet: 'omnivore', sun: 'normal', menstruation: 'na', pregnancyPlan: false,
      medicationRisk: false, kidneyRisk: false
    },
    supplements: [],
    supplementTaken: {}
  };

  let activeTab = 'test';
  let originalRender = null;
  let originalShow = null;
  let runTimerRemaining = 12 * 60;
  let runTimerId = null;

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function ensureHealth() {
    if (!S.health || typeof S.health !== 'object') S.health = clone(HEALTH_DEFAULT);
    S.health.metrics = Object.assign({}, HEALTH_DEFAULT.metrics, S.health.metrics || {});
    S.health.vitaminProfile = Object.assign({}, HEALTH_DEFAULT.vitaminProfile, S.health.vitaminProfile || {});
    if (!Array.isArray(S.health.tests)) S.health.tests = [];
    if (!Array.isArray(S.health.supplements)) S.health.supplements = [];
    if (!S.health.supplementTaken || typeof S.health.supplementTaken !== 'object') S.health.supplementTaken = {};
    return S.health;
  }

  function val(id) {
    return document.getElementById(id)?.value ?? '';
  }

  function numberOrNull(id) {
    const raw = String(val(id)).trim();
    if (!raw) return null;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function checked(id) {
    return !!document.getElementById(id)?.checked;
  }

  function keyForDate(date) {
    const d = date || new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function shiftedKey(offset) {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() + offset);
    return keyForDate(d);
  }

  function prettyDate(key) {
    if (!key) return '—';
    const parts = key.split('-').map(Number);
    if (parts.length !== 3) return key;
    return `${parts[1]}.${parts[2]}`;
  }

  function buildPage() {
    const root = document.getElementById('v-health');
    if (!root || root.dataset.ready === '1') return;
    root.dataset.ready = '1';
    root.innerHTML = `
      <div class="health-hero">
        <div>
          <div class="card-kicker">BODY CHECK · PERSONAL BASELINE</div>
          <h2>지금 몸의 상태를<br>숫자로 남겨요.</h2>
          <p>근력·심폐·체성분을 같은 조건에서 반복해 내 변화로 판단합니다.</p>
        </div>
        <div class="health-ring" id="healthMeasureRing"><strong id="healthMeasureN">0</strong><span>/ 4영역</span></div>
      </div>

      <div class="health-tabs" role="tablist" aria-label="건강 메뉴">
        <button type="button" class="on" data-health-tab="test" onclick="FTHealth.setTab('test')">상태 테스트</button>
        <button type="button" data-health-tab="vitamin" onclick="FTHealth.setTab('vitamin')">비타민 · 복용</button>
      </div>

      <div id="healthTestPanel">
        <div class="health-summary-grid" id="healthSummaryGrid"></div>

        <div class="card">
          <div class="card-h"><div><div class="card-kicker">BODY COMPOSITION</div><h2>체성분 · 순환 기준선</h2></div><span class="health-chip soft">1분</span></div>
          <div class="health-readout" id="healthBodyReadout"></div>
          <div class="health-form-grid two">
            <div class="field"><label>허리둘레 (cm)</label><input id="healthWaist" type="number" min="30" max="250" step="0.1" inputmode="decimal" placeholder="배꼽 높이에서 측정"></div>
            <div class="field"><label>안정 시 심박수 (bpm)</label><input id="healthRestHr" type="number" min="30" max="220" inputmode="numeric" placeholder="아침에 60초 측정"></div>
          </div>
          <button type="button" class="btn btn-p" onclick="FTHealth.saveMetrics()">기준선 저장</button>
          <p class="health-footnote">체중·체지방·골격근량은 기존 체중 기록을 자동으로 가져옵니다. 허리/키 비율은 BMI와 함께 보는 보조 지표입니다.</p>
        </div>

        <div class="card">
          <div class="card-h"><div><div class="card-kicker">PERFORMANCE TEST</div><h2>근력 · 심폐 테스트</h2></div><span class="health-chip">월 1회 권장</span></div>
          <div class="field"><label>측정일</label><input id="healthTestDate" type="date"></div>
          <div class="health-test-block">
            <div class="health-test-head"><span>01</span><div><strong>상체·코어 근지구력</strong><small>정확한 자세가 무너지기 전까지만</small></div></div>
            <div class="health-form-grid two">
              <div class="field"><label>푸시업 최대 반복 (회)</label><input id="healthPushups" type="number" min="0" max="200" inputmode="numeric" placeholder="가슴·허리 자세 유지"></div>
              <div class="field"><label>60초 플랭크 (초)</label><input id="healthPlank" type="number" min="0" max="60" inputmode="numeric" placeholder="최대 60초에서 종료"></div>
            </div>
          </div>
          <div class="health-test-block cardio">
            <div class="health-test-head"><span>02</span><div><strong>12분 달리기 · Cooper test</strong><small>12분 동안 달린 총거리로 심폐지구력 추정</small></div></div>
            <div class="health-run-timer">
              <div><span>RUN TIMER</span><strong id="healthRunTimer">12:00</strong></div>
              <button type="button" id="healthRunTimerButton" onclick="FTHealth.toggleRunTimer()">시작</button>
              <button type="button" class="reset" onclick="FTHealth.resetRunTimer()">초기화</button>
            </div>
            <div class="health-form-grid">
              <div class="field"><label>12분 동안 달린 거리 (m)</label><input id="healthRunDistance" type="number" min="800" max="5000" step="10" inputmode="numeric" placeholder="예: 2400"></div>
            </div>
            <div class="health-preview" id="healthVo2Preview">총거리를 입력하면 추정 VO₂max를 계산합니다.</div>
            <div class="health-alert warn">가슴 통증·어지럼·비정상적인 숨참이 생기면 테스트를 즉시 중지하세요.</div>
          </div>
          <button type="button" class="btn btn-p" onclick="FTHealth.saveTest()">테스트 기록 저장</button>
          <details class="health-details">
            <summary>정확하게 재는 방법</summary>
            <ol>
              <li>같은 시간대·같은 장소에서 5–10분 가볍게 몸을 풉니다.</li>
              <li>푸시업은 몸을 일직선으로 유지하고 자세가 무너지면 종료합니다.</li>
              <li>플랭크는 최대 60초까지만 유지하고 허리 통증이 생기면 즉시 종료합니다.</li>
              <li>달리기는 평탄한 트랙에서 10분 워밍업 후 12분 동안 지속 가능한 가장 빠른 페이스로 달립니다.</li>
              <li>GPS 오차를 줄이려면 400m 트랙 또는 거리 측정이 정확한 코스를 권장합니다.</li>
            </ol>
          </details>
        </div>

        <div class="card">
          <div class="card-h"><div><div class="card-kicker">TREND, NOT JUDGMENT</div><h2>내 기준 변화</h2></div><span class="health-chip soft" id="healthHistoryCount">0회</span></div>
          <div id="healthHistory"></div>
        </div>
      </div>

      <div id="healthVitaminPanel" hidden>
        <div class="supplement-hero">
          <div><div class="card-kicker">TODAY'S STACK</div><h2>오늘 챙길 영양제</h2><p id="supplementTodayText">복용 목록을 먼저 만들어 주세요.</p></div>
          <div class="supplement-score"><strong id="supplementTodayScore">0%</strong><span>오늘</span></div>
        </div>
        <div class="supplement-stack" id="supplementTodayList"></div>

        <div class="card">
          <div class="card-h"><div><div class="card-kicker">PERSONAL FILTER</div><h2>내 조건 30초 설정</h2></div><span class="health-chip">식단 연동</span></div>
          <div class="health-form-grid two">
            <div class="field"><label>식사 유형</label><select id="vitDiet"><option value="omnivore">일반식</option><option value="vegetarian">채식(유제품·달걀 포함)</option><option value="vegan">비건</option></select></div>
            <div class="field"><label>햇빛 노출</label><select id="vitSun"><option value="normal">주 3회 이상 외출</option><option value="low">실내 생활이 대부분</option></select></div>
            <div class="field"><label>월경 여부 (철분 참고)</label><select id="vitMenstruation"><option value="na">해당 없음</option><option value="yes">현재 월경함</option><option value="no">현재 월경하지 않음</option></select></div>
            <div class="field health-check-field"><label><input id="vitPregnancy" type="checkbox"> 임신 가능·계획이 있음</label></div>
            <div class="field health-check-field"><label><input id="vitMedication" type="checkbox"> 복용약 또는 만성질환이 있음</label></div>
            <div class="field health-check-field"><label><input id="vitKidney" type="checkbox"> 신장질환·결석 병력이 있음</label></div>
          </div>
          <button type="button" class="btn btn-p" onclick="FTHealth.saveVitaminProfile()">조건 저장 · 다시 추천</button>
        </div>

        <div class="card">
          <div class="card-h"><div><div class="card-kicker">FOOD-FIRST REVIEW</div><h2>나에게 확인할 영양소</h2></div><span class="health-chip soft" id="vitaminLogDays">식단 0일</span></div>
          <div class="vitamin-averages" id="vitaminAverages"></div>
          <div class="vitamin-recs" id="vitaminRecommendations"></div>
          <p class="health-footnote">식단의 미량영양소 값은 식품명 기반 근사치입니다. 결핍 진단이나 혈액검사를 대신하지 않습니다.</p>
        </div>

        <div class="card">
          <div class="card-h"><div><div class="card-kicker">ADHERENCE</div><h2>복용 기록</h2></div><span class="health-chip" id="supplementStreak">0일 연속</span></div>
          <div class="adherence-grid" id="supplementAdherence"></div>
          <div class="card-divider"></div>
          <div class="health-form-grid supplement-add-grid">
            <div class="field"><label>영양제 이름</label><input id="supplementName" placeholder="예: 오메가3"></div>
            <div class="field"><label>1회 용량</label><input id="supplementDose" inputmode="decimal" placeholder="제품 라벨 그대로"></div>
            <div class="field"><label>단위</label><select id="supplementUnit"><option>mg</option><option>μg</option><option>IU</option><option>정</option><option>캡슐</option><option>포</option></select></div>
            <div class="field"><label>복용 시간</label><select id="supplementTime"><option value="morning">아침</option><option value="lunch">점심</option><option value="evening">저녁</option><option value="bed">취침 전</option><option value="any">아무 때나</option></select></div>
          </div>
          <button type="button" class="btn btn-g" onclick="FTHealth.addCustomSupplement()">내 복용 목록에 추가</button>
        </div>

        <details class="card health-source-card">
          <summary>추천 기준 · 꼭 알아둘 점</summary>
          <div class="health-source-body">
            <p>건강한 성인의 일반 참고량을 사용합니다. 제품의 총 함량과 다른 영양제의 중복 성분을 확인하세요.</p>
            <ul>
              <li>비타민 D: 성인 19–70세 15 μg(600 IU), 70세 초과 20 μg(800 IU). 성인 상한 100 μg(4,000 IU).</li>
              <li>비타민 B12: 성인 2.4 μg. 비건·채식과 50세 이상은 식품/보충원 확인이 중요합니다.</li>
              <li>철분: 성인 상한 45 mg. 빈혈 증상만으로 자가 복용하지 말고 혈액검사와 전문가 판단을 우선합니다.</li>
              <li>마그네슘: 보충제·의약품에서의 성인 상한은 350 mg이며 음식의 마그네슘에는 이 상한이 적용되지 않습니다.</li>
            </ul>
            <div class="health-links">
              <a href="https://pubmed.ncbi.nlm.nih.gov/8800845/" target="_blank" rel="noopener">Cooper 달리기 검증</a>
              <a href="https://www.nice.org.uk/news/articles/keep-the-size-of-your-waist-to-less-than-half-of-your-height-nice--recommends" target="_blank" rel="noopener">NICE 허리/키 기준</a>
              <a href="https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/" target="_blank" rel="noopener">NIH 비타민 D</a>
              <a href="https://ods.od.nih.gov/factsheets/VitaminB12-HealthProfessional/" target="_blank" rel="noopener">NIH 비타민 B12</a>
              <a href="https://ods.od.nih.gov/factsheets/Iron-HealthProfessional/" target="_blank" rel="noopener">NIH 철분</a>
              <a href="https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/" target="_blank" rel="noopener">NIH 마그네슘</a>
              <a href="https://www.cdc.gov/folic-acid/about/intake-and-sources.html" target="_blank" rel="noopener">CDC 폴릭애시드</a>
            </div>
          </div>
        </details>
      </div>
    `;

    document.getElementById('healthRunDistance')?.addEventListener('input', renderVo2Preview);
  }

  function setTab(tab) {
    activeTab = tab === 'vitamin' ? 'vitamin' : 'test';
    document.querySelectorAll('[data-health-tab]').forEach((button) => {
      const on = button.dataset.healthTab === activeTab;
      button.classList.toggle('on', on);
      button.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    const tests = document.getElementById('healthTestPanel');
    const vitamins = document.getElementById('healthVitaminPanel');
    if (tests) tests.hidden = activeTab !== 'test';
    if (vitamins) vitamins.hidden = activeTab !== 'vitamin';
    render();
  }

  function latestBody() {
    const days = Object.keys(S.days || {}).sort().reverse();
    const out = { weight: null, bodyFat: null, muscle: null, date: null };
    for (const key of days) {
      const record = S.days[key] || {};
      if (out.weight == null && record.weight != null) { out.weight = Number(record.weight); out.date = key; }
      if (out.bodyFat == null && record.bodyFat != null) out.bodyFat = Number(record.bodyFat);
      if (out.muscle == null && record.muscle != null) out.muscle = Number(record.muscle);
      if (out.weight != null && out.bodyFat != null && out.muscle != null) break;
    }
    if (out.weight == null && S.profile?.weight) out.weight = Number(S.profile.weight);
    if (out.bodyFat == null && S.profile?.fat) out.bodyFat = Number(S.profile.fat);
    return out;
  }

  function saveMetrics() {
    const health = ensureHealth();
    const waist = numberOrNull('healthWaist');
    const hr = numberOrNull('healthRestHr');
    if (waist == null && hr == null) return toast('허리둘레 또는 안정 시 심박수를 입력해 주세요');
    if (waist != null && (waist < 30 || waist > 250)) return toast('허리둘레 입력값을 확인해 주세요');
    if (hr != null && (hr < 30 || hr > 220)) return toast('심박수 입력값을 확인해 주세요');
    if (waist != null) health.metrics.waistCm = Math.round(waist * 10) / 10;
    if (hr != null) health.metrics.restingHr = Math.round(hr);
    health.metrics.updatedAt = new Date().toISOString();
    save();
    render();
    toast('체성분 기준선을 저장했어요');
  }

  function cooperEstimate(distanceMeters) {
    const result = (Number(distanceMeters) - 504.9) / 44.73;
    return Math.max(5, Math.min(90, Math.round(result * 10) / 10));
  }

  function renderVo2Preview() {
    const distance = numberOrNull('healthRunDistance');
    const box = document.getElementById('healthVo2Preview');
    if (!box) return;
    if (distance == null) {
      box.textContent = '총거리를 입력하면 추정 VO₂max를 계산합니다.';
      box.className = 'health-preview';
      return;
    }
    if (distance < 800 || distance > 5000) {
      box.textContent = '12분 달리기 거리는 800–5,000m 범위로 입력해 주세요.';
      box.className = 'health-preview warn';
      return;
    }
    const result = cooperEstimate(distance);
    box.innerHTML = `예상 심폐지구력 <strong>${result} ml/kg/min</strong> · ${Math.round(distance)}m Cooper 추정치`;
    box.className = 'health-preview good';
  }

  function renderRunTimer() {
    const display = document.getElementById('healthRunTimer');
    const button = document.getElementById('healthRunTimerButton');
    const minutes = Math.floor(runTimerRemaining / 60);
    const seconds = runTimerRemaining % 60;
    if (display) display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    if (button) button.textContent = runTimerId ? '일시정지' : (runTimerRemaining < 720 && runTimerRemaining > 0 ? '계속' : '시작');
  }

  function toggleRunTimer() {
    if (runTimerId) {
      clearInterval(runTimerId);
      runTimerId = null;
      renderRunTimer();
      return;
    }
    if (runTimerRemaining <= 0) runTimerRemaining = 12 * 60;
    runTimerId = setInterval(() => {
      runTimerRemaining--;
      renderRunTimer();
      if (runTimerRemaining <= 0) {
        clearInterval(runTimerId);
        runTimerId = null;
        renderRunTimer();
        toast('12분 완료! 달린 거리를 입력해 주세요');
      }
    }, 1000);
    renderRunTimer();
  }

  function resetRunTimer() {
    if (runTimerId) clearInterval(runTimerId);
    runTimerId = null;
    runTimerRemaining = 12 * 60;
    renderRunTimer();
  }

  function saveTest() {
    const health = ensureHealth();
    const pushups = numberOrNull('healthPushups');
    const plankSec = numberOrNull('healthPlank');
    const runMeters = numberOrNull('healthRunDistance');
    const hasPerformance = pushups != null || plankSec != null || runMeters != null;
    if (!hasPerformance) return toast('근력 또는 12분 달리기 값을 입력해 주세요');
    if (pushups != null && (pushups < 0 || pushups > 200)) return toast('푸시업 횟수를 확인해 주세요');
    if (plankSec != null && (plankSec < 0 || plankSec > 60)) return toast('플랭크는 최대 60초까지만 입력해 주세요');
    if (runMeters != null && (runMeters < 800 || runMeters > 5000)) return toast('12분 달리기 거리를 확인해 주세요');
    const date = val('healthTestDate') || keyForDate();
    const vo2 = runMeters != null ? cooperEstimate(runMeters) : null;
    health.tests.push({
      id: typeof uid === 'function' ? uid() : Date.now().toString(36), date,
      pushups, plankSec, runMeters, vo2,
      createdAt: new Date().toISOString()
    });
    health.tests = health.tests.slice(-120);
    save();
    ['healthPushups', 'healthPlank', 'healthRunDistance'].forEach((id) => {
      const input = document.getElementById(id);
      if (input) input.value = '';
    });
    render();
    toast('몸 상태 테스트를 기록했어요');
  }

  function deleteTest(id) {
    if (!confirm('이 테스트 기록을 삭제할까요?')) return;
    const health = ensureHealth();
    health.tests = health.tests.filter((test) => test.id !== id);
    save();
    render();
    toast('테스트 기록을 삭제했어요');
  }

  function strongestLift() {
    let best = null;
    Object.keys(S.days || {}).forEach((key) => {
      (S.days[key]?.workouts || []).forEach((workout) => {
        const load = Number(workout.load);
        const reps = Number(workout.reps);
        if (!load || !reps) return;
        const e1rm = typeof calcE1rm === 'function' ? calcE1rm(load, reps) : load * (1 + reps / 30);
        if (!best || e1rm > best.e1rm) best = { name: workout.name || workout.n || '근력 운동', e1rm, date: key };
      });
    });
    return best;
  }

  function lastTestWith(field) {
    const tests = ensureHealth().tests.slice().sort((a, b) => String(a.date).localeCompare(String(b.date)));
    for (let i = tests.length - 1; i >= 0; i--) if (tests[i][field] != null) return tests[i];
    return null;
  }

  function previousTestWith(field, current) {
    const tests = ensureHealth().tests.slice().sort((a, b) => String(a.date).localeCompare(String(b.date)));
    const eligible = tests.filter((test) => test[field] != null && test.id !== current?.id);
    return eligible.length ? eligible[eligible.length - 1] : null;
  }

  function trendText(field, suffix, lowerBetter) {
    const current = lastTestWith(field);
    if (!current) return '첫 측정이 필요해요';
    const previous = previousTestWith(field, current);
    if (!previous) return '첫 기준선 확보';
    const diff = Number(current[field]) - Number(previous[field]);
    if (Math.abs(diff) < 0.05) return '이전과 비슷';
    const improved = lowerBetter ? diff < 0 : diff > 0;
    return `${improved ? '개선' : '변화'} ${diff > 0 ? '+' : ''}${Math.round(diff * 10) / 10}${suffix}`;
  }

  function renderBody() {
    const box = document.getElementById('healthBodyReadout');
    if (!box) return;
    const health = ensureHealth();
    const body = latestBody();
    const height = Number(S.profile?.height);
    const bmi = body.weight && height ? body.weight / Math.pow(height / 100, 2) : null;
    const ratio = health.metrics.waistCm && height ? health.metrics.waistCm / height : null;
    box.innerHTML = [
      { label: '체중', value: body.weight ? `${body.weight.toFixed(1)} kg` : '미기록', sub: body.date ? prettyDate(body.date) + ' 기록' : '체중 탭에서 입력' },
      { label: '체지방', value: body.bodyFat != null ? `${body.bodyFat.toFixed(1)}%` : '미기록', sub: body.muscle != null ? `골격근 ${body.muscle.toFixed(1)} kg` : '같은 기기로 추적' },
      { label: 'BMI', value: bmi ? bmi.toFixed(1) : '—', sub: '체중/키 보조 지표' },
      { label: '허리/키', value: ratio ? ratio.toFixed(2) : '—', sub: ratio ? (ratio < 0.5 ? '키의 절반 미만' : '0.50 이상 · 관리 확인') : '허리둘레를 입력' },
      { label: '안정 심박', value: health.metrics.restingHr ? `${health.metrics.restingHr} bpm` : '—', sub: '아침 같은 조건 권장' }
    ].map((item) => `<div class="health-readout-item"><span>${item.label}</span><strong>${item.value}</strong><small>${item.sub}</small></div>`).join('');
    const waistInput = document.getElementById('healthWaist');
    const hrInput = document.getElementById('healthRestHr');
    if (waistInput && document.activeElement !== waistInput) waistInput.value = health.metrics.waistCm || '';
    if (hrInput && document.activeElement !== hrInput) hrInput.value = health.metrics.restingHr || '';
  }

  function renderSummary() {
    const health = ensureHealth();
    const body = latestBody();
    const lift = strongestLift();
    const push = lastTestWith('pushups');
    const plank = lastTestWith('plankSec');
    const cardio = lastTestWith('vo2');
    const hasStrength = !!(push || plank || lift);
    const hasCardio = !!cardio;
    const hasBody = !!(body.weight && (body.bodyFat != null || health.metrics.waistCm));
    const hasRecovery = !!health.metrics.restingHr;
    const measured = [hasStrength, hasCardio, hasBody, hasRecovery].filter(Boolean).length;
    const ring = document.getElementById('healthMeasureRing');
    const count = document.getElementById('healthMeasureN');
    if (count) count.textContent = measured;
    if (ring) ring.style.setProperty('--health-progress', `${measured * 25}%`);
    const grid = document.getElementById('healthSummaryGrid');
    if (!grid) return;
    const strengthValue = push ? `${push.pushups}회` : plank ? `${plank.plankSec}초` : lift ? `${Math.round(lift.e1rm)}kg` : '측정 전';
    const strengthSub = push ? `푸시업 · ${trendText('pushups', '회')}` : plank ? `플랭크 · ${trendText('plankSec', '초')}` : lift ? `${esc(lift.name)} 추정 1RM` : '푸시업·플랭크';
    const ratio = health.metrics.waistCm && S.profile?.height ? health.metrics.waistCm / Number(S.profile.height) : null;
    const cards = [
      { icon: '💪', label: '근력', value: strengthValue, sub: strengthSub, ready: hasStrength },
      { icon: '🫀', label: '심폐', value: cardio ? cardio.vo2.toFixed(1) : '측정 전', sub: cardio ? `VO₂ 추정 · ${trendText('vo2', '')}` : '12분 달리기', ready: hasCardio },
      { icon: '📏', label: '체성분', value: ratio ? ratio.toFixed(2) : body.bodyFat != null ? `${body.bodyFat.toFixed(1)}%` : '측정 전', sub: ratio ? '허리/키 비율' : '체지방·허리둘레', ready: hasBody },
      { icon: '💓', label: '회복', value: health.metrics.restingHr ? `${health.metrics.restingHr}` : '측정 전', sub: health.metrics.restingHr ? '안정 시 bpm' : '아침 안정 심박', ready: hasRecovery }
    ];
    grid.innerHTML = cards.map((card) => `<div class="health-summary-card ${card.ready ? 'ready' : ''}"><span class="health-summary-icon">${card.icon}</span><span>${card.label}</span><strong>${card.value}</strong><small>${card.sub}</small></div>`).join('');
  }

  function renderHistory() {
    const health = ensureHealth();
    const wrap = document.getElementById('healthHistory');
    const count = document.getElementById('healthHistoryCount');
    if (count) count.textContent = `${health.tests.length}회`;
    if (!wrap) return;
    const list = health.tests.slice().sort((a, b) => String(b.date).localeCompare(String(a.date))).slice(0, 10);
    if (!list.length) {
      wrap.innerHTML = '<div class="empty">첫 측정값이 내 기준선이 됩니다.<br>4주 뒤 같은 조건에서 다시 재보세요.</div>';
      return;
    }
    wrap.innerHTML = `<div class="health-history-list">${list.map((test) => {
      const metrics = [];
      if (test.pushups != null) metrics.push(`푸시업 <b>${test.pushups}회</b>`);
      if (test.plankSec != null) metrics.push(`플랭크 <b>${test.plankSec}초</b>`);
      if (test.runMeters != null) metrics.push(`12분 <b>${Math.round(test.runMeters)}m</b>`);
      if (test.vo2 != null) metrics.push(`VO₂ <b>${Number(test.vo2).toFixed(1)}</b>`);
      return `<div class="health-history-row"><div><strong>${prettyDate(test.date)}</strong><span>${metrics.join(' · ')}</span></div><button type="button" aria-label="기록 삭제" onclick="FTHealth.deleteTest('${test.id}')">×</button></div>`;
    }).join('')}</div>`;
  }

  function microAverage(daysCount) {
    const M = window.FT_MICRO;
    if (!M) return { days: 0, values: null };
    let total = M.empty();
    let logged = 0;
    for (let offset = -(daysCount - 1); offset <= 0; offset++) {
      const record = S.days?.[shiftedKey(offset)];
      const meals = record?.meals;
      if (!meals) continue;
      const items = Object.values(meals).flatMap((itemsForMeal) => itemsForMeal || []);
      if (!items.length) continue;
      let oneDay = M.empty();
      items.forEach((food) => {
        const piece = food.micro ? M.scale(food.micro, 1) : M.estimate({ name: food.name, cal: food.cal, cat: food.cat });
        oneDay = M.add(oneDay, piece);
      });
      total = M.add(total, oneDay);
      logged++;
    }
    return { days: logged, values: logged ? M.scale(total, 1 / logged) : M.empty() };
  }

  function nutrientTargets() {
    const age = Number(S.profile?.age) || 30;
    const male = S.profile?.sex === 'male';
    const vp = ensureHealth().vitaminProfile;
    return {
      vitD: age > 70 ? 20 : 15,
      b12: 2.4,
      fe: vp.menstruation === 'yes' ? 18 : 8,
      ca: (!male && age > 50) || age > 70 ? 1200 : 1000,
      mg: male ? (age >= 31 ? 420 : 400) : (age >= 31 ? 320 : 310),
      folate: 400
    };
  }

  function vitaminRecommendations() {
    const health = ensureHealth();
    const vp = health.vitaminProfile;
    const avg = microAverage(7);
    const v = avg.values || {};
    const target = nutrientTargets();
    const recs = [];
    const dLow = vp.sun === 'low' || (avg.days >= 3 && Number(v.vitD || 0) < target.vitD * 0.7);
    recs.push({
      id: 'vitamin-d', name: '비타민 D', tone: dLow ? 'focus' : 'steady', tag: dLow ? '우선 확인' : '유지 확인',
      summary: dLow ? '실내 생활 또는 식단 기록상 섭취가 낮습니다.' : '현재 조건상 무조건 추가하기보다 섭취원과 혈액검사를 확인하세요.',
      detail: `성인 참고량 ${target.vitD} μg (${target.vitD * 40} IU) · 성인 상한 100 μg(4,000 IU)`,
      track: dLow, dose: String(target.vitD), unit: 'μg', time: 'morning'
    });
    const b12Risk = vp.diet === 'vegan' || vp.diet === 'vegetarian' || (avg.days >= 3 && Number(v.b12 || 0) < target.b12 * 0.7);
    recs.push({
      id: 'vitamin-b12', name: '비타민 B12', tone: b12Risk ? 'focus' : 'steady', tag: b12Risk ? '보충원 확인' : '식품 우선',
      summary: vp.diet === 'vegan' ? '비건 식단은 자연 식품 B12 공급원이 거의 없어 강화식품 또는 보충원이 필요합니다.' : vp.diet === 'vegetarian' ? '채식 식단은 B12 공급원이 제한될 수 있습니다.' : '육류·생선·달걀·유제품 기록을 함께 확인하세요.',
      detail: '성인 참고량 2.4 μg · 결핍이 없다면 운동능력 향상제 역할을 하지는 않습니다.',
      track: b12Risk, dose: '2.4', unit: 'μg', time: 'morning'
    });
    const ironRisk = vp.menstruation === 'yes' || vp.diet !== 'omnivore' || (avg.days >= 3 && Number(v.fe || 0) < target.fe * 0.7);
    recs.push({
      id: 'iron', name: '철분', tone: ironRisk ? 'caution' : 'steady', tag: ironRisk ? '검사 먼저' : '자가 복용 주의',
      summary: ironRisk ? '월경·채식 또는 낮은 식단 추정치가 있어 저장철(페리틴)·혈색소 확인을 우선하세요.' : '피로감만으로 철분을 시작하지 마세요. 과다 섭취도 해로울 수 있습니다.',
      detail: `현재 조건 참고량 ${target.fe} mg · 성인 상한 45 mg · 혈액검사/전문가 판단 없이 추천 목록에는 추가하지 않습니다.`,
      track: false
    });
    const calciumLow = avg.days >= 3 && Number(v.ca || 0) < target.ca * 0.7;
    recs.push({
      id: 'calcium', name: '칼슘', tone: calciumLow ? 'food' : 'steady', tag: '음식 우선',
      summary: calciumLow ? '최근 식단 추정치가 낮습니다. 유제품·칼슘 강화 두유·두부·멸치부터 보강하세요.' : '보충제보다 음식에서 채우고 비타민 D와 함께 살펴보세요.',
      detail: `현재 조건 참고량 ${target.ca} mg · 보충제는 결석 병력과 총 섭취량을 확인한 뒤 결정`,
      track: false
    });
    const magnesiumLow = avg.days >= 3 && Number(v.mg || 0) < target.mg * 0.7;
    recs.push({
      id: 'magnesium', name: '마그네슘', tone: magnesiumLow ? 'food' : 'steady', tag: '음식 우선',
      summary: magnesiumLow ? '최근 식단 추정치가 낮습니다. 견과·콩·통곡물·잎채소를 먼저 늘려보세요.' : '식사로 충분하다면 일괄 보충할 이유는 적습니다.',
      detail: `현재 조건 참고량 ${target.mg} mg · 보충제/의약품에서의 성인 상한 350 mg`,
      track: false
    });
    if (vp.pregnancyPlan) {
      recs.unshift({
        id: 'folic-acid', name: '엽산(폴릭애시드)', tone: 'focus', tag: '임신 전 중요',
        summary: '임신 가능성이 있다면 임신 최소 1개월 전부터 매일 폴릭애시드 400 μg을 확보하는 기준이 사용됩니다.',
        detail: 'CDC 일반 권고 400 μg/일 · 이전 신경관 결손 임신 등 특수 상황은 반드시 의료진 용량',
        track: true, dose: '400', unit: 'μg', time: 'morning'
      });
    }
    return { recs, avg, target };
  }

  function saveVitaminProfile() {
    const health = ensureHealth();
    health.vitaminProfile = {
      diet: val('vitDiet') || 'omnivore',
      sun: val('vitSun') || 'normal',
      menstruation: val('vitMenstruation') || 'na',
      pregnancyPlan: checked('vitPregnancy'),
      medicationRisk: checked('vitMedication'),
      kidneyRisk: checked('vitKidney')
    };
    save();
    renderVitamins();
    toast('조건을 반영해 추천을 다시 계산했어요');
  }

  function addRecommended(id) {
    const health = ensureHealth();
    const rec = vitaminRecommendations().recs.find((item) => item.id === id && item.track);
    if (!rec) return toast('이 영양소는 음식 또는 검사 확인을 우선해 주세요');
    if (health.supplements.some((item) => item.sourceId === id || item.name === rec.name)) return toast('이미 복용 목록에 있어요');
    health.supplements.push({
      id: typeof uid === 'function' ? uid() : Date.now().toString(36), sourceId: id,
      name: rec.name, dose: rec.dose, unit: rec.unit, time: rec.time || 'any',
      createdDate: keyForDate(), createdAt: new Date().toISOString()
    });
    save();
    render();
    toast(`${rec.name}을 복용 체크 목록에 추가했어요`);
  }

  function addCustomSupplement() {
    const health = ensureHealth();
    const name = String(val('supplementName')).trim();
    const dose = String(val('supplementDose')).trim();
    const unit = String(val('supplementUnit')).trim();
    const time = String(val('supplementTime')).trim() || 'any';
    if (!name) return toast('영양제 이름을 입력해 주세요');
    if (!dose) return toast('제품 라벨의 1회 용량을 입력해 주세요');
    health.supplements.push({
      id: typeof uid === 'function' ? uid() : Date.now().toString(36), name: name.slice(0, 40),
      dose: dose.slice(0, 20), unit: unit.slice(0, 10), time,
      createdDate: keyForDate(), createdAt: new Date().toISOString()
    });
    save();
    document.getElementById('supplementName').value = '';
    document.getElementById('supplementDose').value = '';
    render();
    toast(`${name} 복용 체크를 시작했어요`);
  }

  function toggleSupplement(id) {
    const health = ensureHealth();
    const date = keyForDate();
    if (!health.supplementTaken[date]) health.supplementTaken[date] = {};
    health.supplementTaken[date][id] = !health.supplementTaken[date][id];
    save();
    renderSupplementTracker();
    const done = !!health.supplementTaken[date][id];
    toast(done ? '복용 완료로 체크했어요' : '복용 체크를 취소했어요');
  }

  function deleteSupplement(id) {
    if (!confirm('이 영양제를 복용 목록에서 삭제할까요? 과거 체크 기록도 목록에서 제외됩니다.')) return;
    const health = ensureHealth();
    health.supplements = health.supplements.filter((item) => item.id !== id);
    Object.keys(health.supplementTaken).forEach((date) => delete health.supplementTaken[date][id]);
    save();
    render();
    toast('복용 목록에서 삭제했어요');
  }

  function adherence(daysCount) {
    const health = ensureHealth();
    let expected = 0;
    let done = 0;
    for (let offset = -(daysCount - 1); offset <= 0; offset++) {
      const key = shiftedKey(offset);
      health.supplements.forEach((item) => {
        const created = String(item.createdDate || item.createdAt || '').slice(0, 10);
        if (created && created > key) return;
        expected++;
        if (health.supplementTaken[key]?.[item.id]) done++;
      });
    }
    return { done, expected, pct: expected ? Math.round(done / expected * 100) : 0 };
  }

  function supplementStreak() {
    const health = ensureHealth();
    if (!health.supplements.length) return 0;
    let streak = 0;
    for (let offset = 0; offset > -366; offset--) {
      const key = shiftedKey(offset);
      const active = health.supplements.filter((item) => {
        const created = String(item.createdDate || item.createdAt || '').slice(0, 10);
        return !created || created <= key;
      });
      if (!active.length) break;
      if (active.every((item) => health.supplementTaken[key]?.[item.id])) streak++;
      else break;
    }
    return streak;
  }

  function renderSupplementTracker() {
    const health = ensureHealth();
    const date = keyForDate();
    const list = document.getElementById('supplementTodayList');
    const text = document.getElementById('supplementTodayText');
    const score = document.getElementById('supplementTodayScore');
    const streak = document.getElementById('supplementStreak');
    const adherenceBox = document.getElementById('supplementAdherence');
    const order = { morning: 0, lunch: 1, evening: 2, bed: 3, any: 4 };
    const labels = { morning: '아침', lunch: '점심', evening: '저녁', bed: '취침 전', any: '아무 때나' };
    const supplements = health.supplements.slice().sort((a, b) => (order[a.time] ?? 9) - (order[b.time] ?? 9));
    const doneN = supplements.filter((item) => health.supplementTaken[date]?.[item.id]).length;
    const todayPct = supplements.length ? Math.round(doneN / supplements.length * 100) : 0;
    if (score) score.textContent = `${todayPct}%`;
    if (text) text.textContent = supplements.length ? `${doneN}/${supplements.length}개 완료 · 제품 라벨 용량 기준` : '복용 목록을 먼저 만들어 주세요.';
    if (streak) streak.textContent = `${supplementStreak()}일 연속`;
    if (list) {
      list.innerHTML = supplements.length ? supplements.map((item) => {
        const done = !!health.supplementTaken[date]?.[item.id];
        return `<div class="supplement-row ${done ? 'done' : ''}"><button type="button" class="supplement-check" onclick="FTHealth.toggleSupplement('${item.id}')" aria-label="${esc(item.name)} 복용 ${done ? '취소' : '완료'}">${done ? '✓' : ''}</button><button type="button" class="supplement-main" onclick="FTHealth.toggleSupplement('${item.id}')"><strong>${esc(item.name)}</strong><span>${esc(item.dose)} ${esc(item.unit)} · ${labels[item.time] || '아무 때나'}</span></button><button type="button" class="supplement-delete" onclick="FTHealth.deleteSupplement('${item.id}')" aria-label="${esc(item.name)} 삭제">×</button></div>`;
      }).join('') : '<div class="supplement-empty">아래 추천에서 필요한 항목을 추가하거나<br>현재 먹는 제품을 직접 등록하세요.</div>';
    }
    if (adherenceBox) {
      const week = adherence(7);
      const month = adherence(30);
      adherenceBox.innerHTML = `<div><span>최근 7일</span><strong>${week.pct}%</strong><small>${week.done}/${week.expected || 0}회</small></div><div><span>최근 30일</span><strong>${month.pct}%</strong><small>${month.done}/${month.expected || 0}회</small></div><div><span>연속 달성</span><strong>${supplementStreak()}일</strong><small>오늘 포함</small></div>`;
    }
  }

  function renderVitamins() {
    const health = ensureHealth();
    const vp = health.vitaminProfile;
    const ids = { vitDiet: vp.diet, vitSun: vp.sun, vitMenstruation: vp.menstruation };
    Object.keys(ids).forEach((id) => {
      const input = document.getElementById(id);
      if (input && document.activeElement !== input) input.value = ids[id];
    });
    const checks = { vitPregnancy: vp.pregnancyPlan, vitMedication: vp.medicationRisk, vitKidney: vp.kidneyRisk };
    Object.keys(checks).forEach((id) => {
      const input = document.getElementById(id);
      if (input && document.activeElement !== input) input.checked = !!checks[id];
    });
    const result = vitaminRecommendations();
    const logDays = document.getElementById('vitaminLogDays');
    if (logDays) logDays.textContent = `식단 ${result.avg.days}일`;
    const averages = document.getElementById('vitaminAverages');
    if (averages) {
      const data = result.avg.values || {};
      const items = [
        ['D', data.vitD, result.target.vitD, 'μg'], ['B12', data.b12, result.target.b12, 'μg'],
        ['철', data.fe, result.target.fe, 'mg'], ['칼슘', data.ca, result.target.ca, 'mg'], ['Mg', data.mg, result.target.mg, 'mg']
      ];
      averages.innerHTML = result.avg.days ? items.map(([name, value, target, unit]) => {
        const pct = Math.min(100, Math.round((Number(value || 0) / target) * 100));
        return `<div><span>${name}</span><strong>${Math.round(Number(value || 0) * 10) / 10}${unit}</strong><i><b style="width:${pct}%"></b></i></div>`;
      }).join('') : '<p>최근 7일 식단 기록이 없습니다. 조건 기반으로만 보여드리며, 3일 이상 기록하면 섭취 추정치가 반영됩니다.</p>';
    }
    const recs = document.getElementById('vitaminRecommendations');
    if (recs) {
      const warning = vp.medicationRisk || vp.kidneyRisk
        ? '<div class="vitamin-global-warning">복용약·만성질환 또는 신장 관련 항목이 체크되어 있습니다. 새 보충제를 시작하기 전 의사·약사에게 제품명과 총 함량을 보여 주세요.</div>' : '';
      recs.innerHTML = warning + result.recs.map((rec) => `
        <div class="vitamin-rec ${rec.tone}">
          <div class="vitamin-rec-top"><div><span>${rec.tag}</span><strong>${rec.name}</strong></div>${rec.track ? `<button type="button" onclick="FTHealth.addRecommended('${rec.id}')">복용 목록 +</button>` : ''}</div>
          <p>${rec.summary}</p><small>${rec.detail}</small>
        </div>`).join('');
    }
    renderSupplementTracker();
  }

  function render() {
    buildPage();
    ensureHealth();
    const date = document.getElementById('healthTestDate');
    if (date && !date.value) date.value = keyForDate();
    renderBody();
    renderSummary();
    renderHistory();
    renderVo2Preview();
    renderRunTimer();
    renderVitamins();
  }

  function patchApp() {
    if (!originalRender && typeof window.render === 'function') {
      originalRender = window.render;
      window.render = function () {
        const result = originalRender.apply(this, arguments);
        try { render(); } catch (error) { console.warn('health v5 render failed', error); }
        return result;
      };
    }
    if (!originalShow && typeof window.show === 'function') {
      originalShow = window.show;
      window.show = function (name) {
        const result = originalShow.apply(this, arguments);
        if (name === 'health') render();
        return result;
      };
    }
  }

  window.FTHealth = {
    setTab, saveMetrics, saveTest, deleteTest, toggleRunTimer, resetRunTimer, saveVitaminProfile,
    addRecommended, addCustomSupplement, toggleSupplement, deleteSupplement, render
  };

  buildPage();
  patchApp();
  render();
})();
