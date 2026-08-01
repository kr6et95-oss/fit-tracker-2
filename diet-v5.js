(function () {
  'use strict';

  const MEAL_LABELS = { breakfast: '아침', lunch: '점심', dinner: '저녁', snack: '간식' };
  const PLAN_DEFS = [
    {
      id: 'lean-home', title: '집밥 고단백 플레이트', tag: '균형',
      items: [
        { n: '흰쌀밥', unit: '반공기' },
        { n: '닭가슴살(구이)', unit: '100g' },
        { n: '샐러드(드레싱 적게)', unit: '1그릇' },
        { n: '계란', unit: '1개' }
      ]
    },
    {
      id: 'cvs-fast', title: '편의점 3분 조합', tag: '빠른 끼니',
      items: [
        { n: '삼각김밥', unit: '1개' },
        { n: '편의점 닭가슴살 샐러드', unit: '1개' },
        { n: '프로틴 음료', unit: '1병' }
      ]
    },
    {
      id: 'morning-steady', title: '오전 포만감 세트', tag: '아침',
      items: [
        { n: '그릭요거트(무가당)', unit: '200g' },
        { n: '바나나', unit: '1개' },
        { n: '계란', unit: '1개' }
      ]
    },
    {
      id: 'light-night', title: '늦은 저녁 가볍게', tag: '저지방',
      items: [
        { n: '순두부', unit: '1팩' },
        { n: '샐러드(드레싱 적게)', unit: '1그릇' },
        { n: '프로틴쉐이크(물)', unit: '1잔' }
      ]
    },
    {
      id: 'training-fuel', title: '운동 전후 연료', tag: '운동일',
      items: [
        { n: '고구마', unit: '중간1개' },
        { n: '프로틴쉐이크', unit: '1스쿱' },
        { n: '바나나', unit: '1개' }
      ]
    },
    {
      id: 'protein-rescue', title: '단백질 긴급 보충', tag: '단백질',
      items: [
        { n: '프로틴쉐이크(물)', unit: '1잔' },
        { n: '그릭요거트 무지방', unit: '1컵' }
      ]
    }
  ];

  let resolvedPlans = [];
  let recentById = {};
  let originalRenderLog = null;

  function findFood(spec) {
    const exact = FOODS.find((f) => f.n === spec.n && (!spec.unit || f.unit === spec.unit));
    if (exact) return exact;
    return FOODS.find((f) => f.n === spec.n) || null;
  }

  function resolvePlans() {
    resolvedPlans = PLAN_DEFS.map((plan) => {
      const items = plan.items.map(findFood).filter(Boolean);
      const totals = items.reduce((acc, item) => {
        acc.cal += Number(item.cal) || 0;
        acc.pro += Number(item.pro) || 0;
        acc.carb += Number(item.carb) || 0;
        acc.fat += Number(item.fat) || 0;
        return acc;
      }, { cal: 0, pro: 0, carb: 0, fat: 0 });
      return Object.assign({}, plan, { items, totals });
    }).filter((plan) => plan.items.length >= 2);
  }

  function selectedMeal() {
    return document.getElementById('dietTargetMeal')?.value || mealForNow();
  }

  function mealForNow() {
    const hour = new Date().getHours();
    if (hour < 10) return 'breakfast';
    if (hour < 15) return 'lunch';
    if (hour < 21) return 'dinner';
    return 'snack';
  }

  function safePct(value, goal) {
    if (!goal) return 0;
    return Math.max(0, Math.min(100, Math.round((value / goal) * 100)));
  }

  function dietScore(totals, goals) {
    if (!goals || !goals.cal || !goals.pro) return 0;
    const calRatio = totals.cal / goals.cal;
    const proRatio = totals.pro / goals.pro;
    const calorie = Math.max(0, 35 - Math.abs(1 - calRatio) * 42);
    const protein = Math.max(0, Math.min(35, proRatio * 35));
    const meals = day().meals || {};
    const spread = ['breakfast', 'lunch', 'dinner'].reduce((score, key) => {
      const p = (meals[key] || []).reduce((sum, f) => sum + (+f.pro || 0), 0);
      return score + Math.min(1, p / 25) * (20 / 3);
    }, 0);
    const cats = new Set(Object.values(meals).flat().map((f) => f.cat).filter(Boolean));
    const variety = Math.min(10, cats.size * 2);
    return Math.max(0, Math.min(100, Math.round(calorie + protein + spread + variety)));
  }

  function targetForMeal(meal, goals, remaining) {
    const shares = { breakfast: .25, lunch: .34, dinner: .32, snack: .14 };
    const share = shares[meal] || .3;
    return {
      cal: Math.max(220, Math.min(remaining.cal || goals.cal * share, goals.cal * share)),
      pro: Math.max(20, Math.min(remaining.pro || goals.pro * share, goals.pro * Math.max(.24, share)))
    };
  }

  function rankedPlans(meal, totals, goals) {
    const remaining = {
      cal: Math.max(0, goals.cal - totals.cal),
      pro: Math.max(0, goals.pro - totals.pro)
    };
    const target = targetForMeal(meal, goals, remaining);
    return resolvedPlans.map((plan) => {
      const score = Math.abs(plan.totals.cal - target.cal) / Math.max(300, target.cal)
        + Math.abs(plan.totals.pro - target.pro) / Math.max(25, target.pro) * 1.35
        + (remaining.cal > 0 && plan.totals.cal > remaining.cal * 1.2 ? .8 : 0);
      return Object.assign({}, plan, { fitScore: score });
    }).sort((a, b) => a.fitScore - b.fitScore).slice(0, 3);
  }

  function recentFoods() {
    const counts = new Map();
    const keys = Object.keys(S.days || {}).filter((key) => key !== today()).sort().reverse().slice(0, 30);
    keys.forEach((key) => {
      const meals = S.days[key]?.meals || {};
      Object.values(meals).flat().forEach((food) => {
        if (!food || !food.name) return;
        const token = String(food.name).trim().toLowerCase();
        const entry = counts.get(token) || { count: 0, food };
        entry.count += 1;
        if (!entry.food) entry.food = food;
        counts.set(token, entry);
      });
    });
    recentById = {};
    return Array.from(counts.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)
      .map((entry, index) => {
        const id = 'recent-' + index;
        recentById[id] = entry.food;
        return { id, count: entry.count, food: entry.food };
      });
  }

  function buildCard() {
    if (document.getElementById('dietCommandCard')) return;
    const section = document.querySelector('#v-log .ui-section');
    const label = section && section.querySelector('.ui-section-label');
    if (!section || !label) return;

    const card = document.createElement('div');
    card.className = 'card diet-command-card';
    card.id = 'dietCommandCard';
    card.innerHTML = `
      <div class="card-h">
        <div><div class="card-kicker">MEAL COMMAND</div><h2>오늘 식단 코파일럿</h2></div>
        <div class="diet-score"><strong id="dietScoreN">0</strong><span>균형 점수</span></div>
      </div>
      <p class="muted" id="dietCommandHint">남은 목표를 계산하고 지금 먹기 좋은 조합을 고릅니다.</p>
      <div class="diet-macro-grid">
        <div class="diet-macro"><div class="dm-label">남은 칼로리</div><div class="dm-value" id="dietRemainCal">—</div><div class="dm-track"><i id="dietCalBar"></i></div></div>
        <div class="diet-macro"><div class="dm-label">남은 단백질</div><div class="dm-value" id="dietRemainPro">—</div><div class="dm-track"><i id="dietProBar"></i></div></div>
        <div class="diet-macro"><div class="dm-label">끼니 분산</div><div class="dm-value" id="dietSpread">—</div><div class="dm-track"><i id="dietSpreadBar"></i></div></div>
      </div>
      <div class="diet-control">
        <select id="dietTargetMeal" aria-label="추천을 넣을 끼니" onchange="FTDiet.render()">
          <option value="breakfast">아침에 넣기</option>
          <option value="lunch">점심에 넣기</option>
          <option value="dinner">저녁에 넣기</option>
          <option value="snack">간식에 넣기</option>
        </select>
        <button type="button" class="btn btn-g" onclick="FTDiet.render()">다시 계산</button>
      </div>
      <div class="diet-recs" id="dietSmartRecs"></div>
      <div class="diet-helper">자주 먹은 메뉴</div>
      <div class="diet-recent" id="dietRecentFoods"></div>
    `;
    label.insertAdjacentElement('afterend', card);
    document.getElementById('dietTargetMeal').value = mealForNow();
  }

  function render() {
    buildCard();
    const card = document.getElementById('dietCommandCard');
    if (!card || typeof mealTotals !== 'function') return;
    const totals = mealTotals();
    const goals = S.goals || { cal: 0, pro: 0, carb: 0, fat: 0 };
    const score = dietScore(totals, goals);
    const remainCal = Math.max(0, Math.round((goals.cal || 0) - totals.cal));
    const remainPro = Math.max(0, Math.round((goals.pro || 0) - totals.pro));
    const meal = selectedMeal();
    const spreadN = ['breakfast', 'lunch', 'dinner'].filter((key) =>
      (day().meals[key] || []).reduce((sum, f) => sum + (+f.pro || 0), 0) >= 25
    ).length;

    document.getElementById('dietScoreN').textContent = goals.cal ? score : '—';
    document.getElementById('dietRemainCal').textContent = goals.cal ? remainCal + ' kcal' : '목표 필요';
    document.getElementById('dietRemainPro').textContent = goals.pro ? remainPro + ' g' : '목표 필요';
    document.getElementById('dietSpread').textContent = spreadN + ' / 3끼';
    document.getElementById('dietCalBar').style.width = safePct(totals.cal, goals.cal) + '%';
    document.getElementById('dietProBar').style.width = safePct(totals.pro, goals.pro) + '%';
    document.getElementById('dietSpreadBar').style.width = Math.round((spreadN / 3) * 100) + '%';

    const hint = document.getElementById('dietCommandHint');
    if (!goals.cal) hint.textContent = '프로필 목표를 저장하면 맞춤 조합을 계산합니다.';
    else if (remainCal === 0 && remainPro > 15) hint.textContent = '칼로리는 찼지만 단백질이 부족합니다. 저지방 단백질 위주로 마무리하세요.';
    else if (remainCal === 0) hint.textContent = '오늘 목표를 채웠습니다. 배고프면 채소·무가당 음료부터 확인하세요.';
    else hint.textContent = `${MEAL_LABELS[meal]} 기준 · 남은 목표에 가까운 조합부터 보여드립니다.`;

    const plans = goals.cal ? rankedPlans(meal, totals, goals) : resolvedPlans.slice(0, 3);
    document.getElementById('dietSmartRecs').innerHTML = plans.map((plan) => `
      <button type="button" class="diet-rec" onclick="FTDiet.addPlan('${plan.id}')">
        <span><span class="dr-title">${esc(plan.title)}</span><span class="dr-desc">${esc(plan.tag)} · ${esc(plan.items.map((f) => f.n).join(' + '))}</span></span>
        <span class="dr-stat">${Math.round(plan.totals.cal)} kcal<br>P ${Math.round(plan.totals.pro)}g</span>
      </button>
    `).join('');

    const recent = recentFoods();
    document.getElementById('dietRecentFoods').innerHTML = recent.length
      ? recent.map((entry) => `<button type="button" onclick="FTDiet.addRecent('${entry.id}')">${esc(entry.food.name)}${entry.count > 1 ? ' · ' + entry.count + '회' : ''}</button>`).join('')
      : '<span class="muted">기록이 쌓이면 원탭 메뉴가 자동으로 생깁니다.</span>';
  }

  function toMealItem(food) {
    const item = {
      id: uid(), name: foodLabel(food, 1),
      cal: +food.cal || 0, pro: +food.pro || 0, carb: +food.carb || 0, fat: +food.fat || 0,
      g: food.g != null ? +food.g : undefined,
      unit: food.unit || '', cat: food.cat || ''
    };
    if (food.micro) item.micro = food.micro;
    else if (typeof attachMicro === 'function') item.micro = attachMicro({ name: food.n, n: food.n, cat: food.cat, cal: food.cal });
    return item;
  }

  function addPlan(id) {
    const plan = resolvedPlans.find((candidate) => candidate.id === id);
    const meal = selectedMeal();
    if (!plan || !meal) return;
    const existing = day().meals[meal] || [];
    if (existing.length && !confirm(`${MEAL_LABELS[meal]}에 이미 ${existing.length}개가 있습니다. 추천 조합을 이어서 추가할까요?`)) return;
    day().meals[meal].push(...plan.items.map(toMealItem));
    save();
    render();
    if (typeof window.render === 'function') window.render();
    toast(`${plan.title} → ${MEAL_LABELS[meal]} 기록 완료`);
  }

  function addRecent(id) {
    const source = recentById[id];
    const meal = selectedMeal();
    if (!source || !meal) return;
    const item = Object.assign({}, source, { id: uid() });
    day().meals[meal].push(item);
    save();
    render();
    if (typeof window.render === 'function') window.render();
    toast(`${source.name} → ${MEAL_LABELS[meal]} 추가`);
  }

  function patchRender() {
    if (originalRenderLog || typeof window.renderLog !== 'function') return;
    originalRenderLog = window.renderLog;
    window.renderLog = function () {
      const result = originalRenderLog.apply(this, arguments);
      try { render(); } catch (e) { console.warn('diet v5 render failed', e); }
      return result;
    };
  }

  function bootstrap() {
    resolvePlans();
    buildCard();
    patchRender();
    render();
  }

  window.FTDiet = { render, addPlan, addRecent };
  bootstrap();
})();
