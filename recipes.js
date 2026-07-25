/** FIT TRACKER 2 — 다이어트 레시피 · 영양 꿀팁 조합
 *  items: DB 참조(ref) 또는 인라인 영양. 합계는 앱에서 재계산.
 *  src: home | cvs | delivery
 *  tags: 꿀팁 고단백 저칼로리 아침 점심 저녁 간식 편의점 배달 집밥 …
 */
window.FT_RECIPES = [
  /* ========== 영양 꿀팁 조합 ========== */
  {
    id: 'tip-greek-olive-ciabatta',
    n: '그릭요거트 + 올리브유 + 치아바타',
    tip: '단백(그릭) + 건강한 지방(올리브유) + 탄수(치아바타). 지용성 비타민 흡수↑, 포만감 오래 감.',
    why: '다이어트 정석 꿀조합',
    tags: ['꿀팁', '고단백', '집밥', '아침', '간식'],
    src: 'home',
    meal: ['breakfast', 'snack'],
    items: [
      { name: '그릭요거트', cal: 145, pro: 15, carb: 5, fat: 8, g: 150, unit: '150g', ref: { n: '그릭요거트', unit: '150g' } },
      { name: '올리브유', cal: 40, pro: 0, carb: 0, fat: 4.5, g: 5, unit: '1작은술' },
      { name: '치아바타(1/2)', cal: 140, pro: 4, carb: 26, fat: 2, g: 40, unit: '1/2개', ref: { n: '치아바타', unit: '1개' }, p: 0.5 }
    ]
  },
  {
    id: 'tip-oats-berry-almond',
    n: '오트밀 + 베리 + 아몬드',
    tip: '베타글루칸(오트)으로 혈당 완만, 베리 항산화, 아몬드 지방·미네랄. 아침 폭식 브레이크.',
    why: '혈당 안정 아침',
    tags: ['꿀팁', '집밥', '아침', '저칼로리'],
    src: 'home',
    meal: ['breakfast'],
    items: [
      { name: '오트밀(물)', cal: 150, pro: 5, carb: 27, fat: 3, g: 40, unit: '1그릇', ref: { n: '오트밀(물)', unit: '1그릇' } },
      { name: '블루베리', cal: 40, pro: 0.5, carb: 10, fat: 0.2, g: 50, unit: '한줌', ref: { n: '블루베리', unit: '1컵' }, p: 0.5 },
      { name: '아몬드', cal: 70, pro: 2.5, carb: 2.5, fat: 6, g: 10, unit: '10알', ref: { n: '아몬드', unit: '10알' } }
    ]
  },
  {
    id: 'tip-egg-avo-toast',
    n: '계란 + 아보카도 + 토스트',
    tip: '완전단백 + 단일불포화지방. 토스트는 반~1장으로 탄수 조절. SNS 다이어트 메뉴 원조급.',
    why: '포만감 높은 아침',
    tags: ['꿀팁', '고단백', '집밥', '아침'],
    src: 'home',
    meal: ['breakfast', 'brunch'],
    items: [
      { name: '계란프라이', cal: 90, pro: 6.5, carb: 0.5, fat: 7, g: 50, unit: '1개', ref: { n: '계란프라이', unit: '1개' } },
      { name: '계란', cal: 75, pro: 6.5, carb: 0.5, fat: 5, g: 50, unit: '1개(추가)', ref: { n: '계란', unit: '1개' } },
      { name: '아보카도', cal: 120, pro: 1.5, carb: 6, fat: 11, g: 70, unit: '1/2개', ref: { n: '아보카도', unit: '1/2개' } },
      { name: '식빵 토스트', cal: 80, pro: 2.5, carb: 15, fat: 1, g: 30, unit: '1장', ref: { n: '식빵', unit: '2장' }, p: 0.5 }
    ]
  },
  {
    id: 'tip-chicken-sweetpotato-broccoli',
    n: '닭가슴살 + 고구마 + 브로콜리',
    tip: '바디빌더식 기본형. 단백·복합탄·섬유. 드레싱은 저지방 요거트나 레몬이 살빼기 유리.',
    why: '컷팅 한 끼 정석',
    tags: ['꿀팁', '고단백', '집밥', '점심', '저녁'],
    src: 'home',
    meal: ['lunch', 'dinner'],
    items: [
      { name: '닭가슴살(구이)', cal: 165, pro: 31, carb: 0, fat: 3.5, g: 150, unit: '150g', ref: { n: '닭가슴살(구이)', unit: '100g' }, p: 1.5 },
      { name: '고구마', cal: 130, pro: 2, carb: 30, fat: 0.2, g: 130, unit: '중간1개', ref: { n: '고구마', unit: '중간1개' } },
      { name: '브로콜리(데친)', cal: 35, pro: 3, carb: 6, fat: 0.3, g: 100, unit: '1컵', ref: { n: '브로콜리(데친)', unit: '1컵' } }
    ]
  },
  {
    id: 'tip-salmon-quinoa-veg',
    n: '연어 + 퀴노아 + 채소',
    tip: '오메가3 + 완전단백 곡물. 염증·회복에 유리한 트레이닝 데이 저녁 조합.',
    why: '회복 강화 저녁',
    tags: ['꿀팁', '고단백', '집밥', '저녁'],
    src: 'home',
    meal: ['dinner', 'lunch'],
    items: [
      { name: '연어(구이)', cal: 200, pro: 22, carb: 0, fat: 12, g: 100, unit: '100g', ref: { n: '연어(구이)', unit: '100g' } },
      { name: '퀴노아밥', cal: 180, pro: 6, carb: 32, fat: 3, g: 150, unit: '2/3공기', ref: { n: '퀴노아밥', unit: '1공기' }, p: 0.7 },
      { name: '방울토마토', cal: 20, pro: 1, carb: 4, fat: 0.2, g: 80, unit: '10개', ref: { n: '방울토마토', unit: '10개' } },
      { name: '시금치나물', cal: 45, pro: 3, carb: 4, fat: 2, g: 80, unit: '1인분', ref: { n: '시금치나물', unit: '1인분' } }
    ]
  },
  {
    id: 'tip-greek-chia-honey',
    n: '그릭요거트 + 치아씨드 + 꿀 조금',
    tip: '치아 식이섬유·오메가3, 그릭 단백. 꿀은 1작은술만 — 단맛 욕구 끊기용.',
    why: '디저트 대체 꿀팁',
    tags: ['꿀팁', '고단백', '간식', '집밥'],
    src: 'home',
    meal: ['snack', 'breakfast'],
    items: [
      { name: '그릭요거트(무가당)', cal: 120, pro: 20, carb: 6, fat: 0.5, g: 200, unit: '200g', ref: { n: '그릭요거트(무가당)', unit: '200g' } },
      { name: '치아씨드', cal: 50, pro: 2, carb: 4, fat: 3, g: 10, unit: '1큰술' },
      { name: '꿀', cal: 20, pro: 0, carb: 5, fat: 0, g: 7, unit: '1작은술' }
    ]
  },
  {
    id: 'tip-cottage-tomato-rice',
    n: '코티지치즈 + 방울토마토 + 현미 반공기',
    tip: '코티지는 저지방 고단백. 토마토 산미로 느끼함↓. 미국 다이어터가 간식으로 많이 씀.',
    why: '저지방 고단백 간식',
    tags: ['꿀팁', '고단백', '저칼로리', '간식', '집밥'],
    src: 'home',
    meal: ['snack', 'lunch'],
    items: [
      { name: '코티지치즈', cal: 90, pro: 12, carb: 4, fat: 2.5, g: 100, unit: '100g', ref: { n: '코티지치즈', unit: '100g' } },
      { name: '방울토마토', cal: 20, pro: 1, carb: 4, fat: 0.2, g: 80, unit: '10개', ref: { n: '방울토마토', unit: '10개' } },
      { name: '현미밥', cal: 155, pro: 3, carb: 33, fat: 0.9, g: 105, unit: '반공기', ref: { n: '현미밥', unit: '1공기' }, p: 0.5 }
    ]
  },
  {
    id: 'tip-tuna-egg-cucumber',
    n: '참치 + 계란 + 오이',
    tip: '캔참치는 물·기름 빼고. 마요 대신 그릭/레몬. 편의점 재료만으로도 가능.',
    why: '초간단 고단백',
    tags: ['꿀팁', '고단백', '집밥', '편의점', '점심', '간식'],
    src: 'home',
    meal: ['lunch', 'snack', 'dinner'],
    items: [
      { name: '동원 참치캔(살코기)', cal: 100, pro: 22, carb: 0, fat: 1, g: 90, unit: '1캔', ref: { n: '동원 참치캔(살코기)', unit: '1캔' } },
      { name: '계란 2구', cal: 150, pro: 13, carb: 1, fat: 10, g: 100, unit: '2개', ref: { n: '계란 2구', unit: '2개' } },
      { name: '오이', cal: 15, pro: 0.7, carb: 3.5, fat: 0.1, g: 100, unit: '1/2개', ref: { n: '오이', unit: '1개' }, p: 0.5 }
    ]
  },
  {
    id: 'tip-tofu-soy-veg',
    n: '연두부 + 김 + 나물',
    tip: '식물성 단백·저칼로리. 간 간장 조금만. 저녁 폭식 전에 먼저 먹기 좋은 볼륨 이팅.',
    why: '저녁 볼륨 이팅',
    tags: ['꿀팁', '저칼로리', '집밥', '저녁'],
    src: 'home',
    meal: ['dinner', 'snack'],
    items: [
      { name: '연두부', cal: 70, pro: 7, carb: 2, fat: 3, g: 150, unit: '1팩', ref: { n: '연두부', unit: '1팩' } },
      { name: '구운김', cal: 25, pro: 2, carb: 2, fat: 1.5, g: 3, unit: '1봉' },
      { name: '시금치나물', cal: 45, pro: 3, carb: 4, fat: 2, g: 80, unit: '1인분', ref: { n: '시금치나물', unit: '1인분' } },
      { name: '콩나물무침', cal: 50, pro: 4, carb: 5, fat: 2, g: 100, unit: '1인분', ref: { n: '콩나물무침', unit: '1인분' } }
    ]
  },
  {
    id: 'tip-banana-pb-shake',
    n: '바나나 + 아몬드버터 + 프로틴',
    tip: '운동 후 탄수+단백 윈도우. 아몬드버터 1큰술만 — 칼로리 밀도 높음.',
    why: '운동 후 회복',
    tags: ['꿀팁', '고단백', '집밥', '간식'],
    src: 'home',
    meal: ['snack', 'breakfast'],
    items: [
      { name: '바나나', cal: 90, pro: 1.1, carb: 23, fat: 0.3, g: 100, unit: '1개', ref: { n: '바나나', unit: '1개' } },
      { name: '아몬드버터', cal: 95, pro: 3.5, carb: 3, fat: 8, g: 16, unit: '1큰술', ref: { n: '아몬드버터', unit: '1큰술' } },
      { name: '프로틴쉐이크(물)', cal: 120, pro: 24, carb: 3, fat: 1.5, g: 30, unit: '1잔', ref: { n: '프로틴쉐이크(물)', unit: '1잔' } }
    ]
  },
  {
    id: 'tip-apple-almond-yogurt',
    n: '사과 + 아몬드 + 그릭요거트',
    tip: '식이섬유+지방+단백 삼각편대. 디저트·야식 대체 1순위.',
    why: '야식 대체',
    tags: ['꿀팁', '간식', '집밥', '저칼로리'],
    src: 'home',
    meal: ['snack'],
    items: [
      { name: '사과', cal: 80, pro: 0.3, carb: 21, fat: 0.2, g: 150, unit: '1개', ref: { n: '사과', unit: '1개' } },
      { name: '아몬드', cal: 70, pro: 2.5, carb: 2.5, fat: 6, g: 10, unit: '10알', ref: { n: '아몬드', unit: '10알' } },
      { name: '그릭요거트', cal: 100, pro: 10, carb: 4, fat: 5, g: 100, unit: '100g', ref: { n: '그릭요거트', unit: '100g' } }
    ]
  },
  {
    id: 'tip-ricotta-berry',
    n: '리코타 + 딸기 + 다크초코 조금',
    tip: '단맛 욕구를 ‘구조’로 끊기. 초코는 70% 이상 2~3조각.',
    why: '디저트 욕구 컨트롤',
    tags: ['꿀팁', '간식', '집밥'],
    src: 'home',
    meal: ['snack'],
    items: [
      { name: '리코타', cal: 80, pro: 6, carb: 2, fat: 5, g: 50, unit: '50g', ref: { n: '리코타', unit: '50g' } },
      { name: '딸기', cal: 30, pro: 0.6, carb: 7, fat: 0.3, g: 100, unit: '1줌', ref: { n: '딸기', unit: '1컵' }, p: 0.7 },
      { name: '다크초콜릿', cal: 50, pro: 0.6, carb: 5, fat: 3.5, g: 10, unit: '2조각' }
    ]
  },
  {
    id: 'tip-kimchi-egg-rice',
    n: '김치 + 계란 + 흰쌀밥 반공기',
    tip: '한식 최소 세트. 김치는 나트륨 주의·물은 충분히. 밥은 반공기로 시작.',
    why: '한식 미니멀',
    tags: ['꿀팁', '집밥', '점심', '저녁'],
    src: 'home',
    meal: ['lunch', 'dinner', 'breakfast'],
    items: [
      { name: '흰쌀밥', cal: 150, pro: 2.8, carb: 33.5, fat: 0.3, g: 105, unit: '반공기', ref: { n: '흰쌀밥', unit: '반공기' } },
      { name: '계란프라이', cal: 90, pro: 6.5, carb: 0.5, fat: 7, g: 50, unit: '1개', ref: { n: '계란프라이', unit: '1개' } },
      { name: '김치(배추)', cal: 25, pro: 2, carb: 4, fat: 0.3, g: 80, unit: '1접시', ref: { n: '김치(배추)', unit: '1접시' } }
    ]
  },
  {
    id: 'tip-miso-tofu-rice',
    n: '된장국 + 두부 + 현미밥',
    tip: '국물 요리로 포만↑. 나트륨은 국물 남기기. 발효식품+식물단백.',
    why: '집밥 밸런스',
    tags: ['꿀팁', '집밥', '점심', '저녁'],
    src: 'home',
    meal: ['lunch', 'dinner'],
    items: [
      { name: '두부된장국', cal: 80, pro: 7, carb: 6, fat: 3, g: 250, unit: '1그릇', ref: { n: '두부된장국', unit: '1그릇' } },
      { name: '두부(부침)', cal: 90, pro: 9, carb: 2, fat: 5, g: 80, unit: '1/4모', ref: { n: '두부(부침)', unit: '1/4모' } },
      { name: '현미밥', cal: 155, pro: 3, carb: 33, fat: 0.9, g: 105, unit: '반공기', ref: { n: '현미밥', unit: '1공기' }, p: 0.5 }
    ]
  },
  {
    id: 'tip-eggwhite-veg-omelette',
    n: '흰자 오믈렛 + 채소',
    tip: '노른자 1 + 흰자 2~3으로 콜레스테롤 걱정↓·단백↑. 오일 최소.',
    why: '초고단백 저지방',
    tags: ['꿀팁', '고단백', '저칼로리', '집밥', '아침'],
    src: 'home',
    meal: ['breakfast', 'dinner'],
    items: [
      { name: '계란', cal: 75, pro: 6.5, carb: 0.5, fat: 5, g: 50, unit: '1개', ref: { n: '계란', unit: '1개' } },
      { name: '계란 흰자', cal: 50, pro: 11, carb: 0.7, fat: 0.2, g: 100, unit: '3개분', ref: { n: '계란 흰자', unit: '3개분' } },
      { name: '방울토마토', cal: 15, pro: 0.7, carb: 3, fat: 0.2, g: 60, unit: '소량', ref: { n: '방울토마토', unit: '10개' }, p: 0.6 },
      { name: '시금치', cal: 10, pro: 1.2, carb: 1.5, fat: 0.1, g: 40, unit: '1줌', ref: { n: '시금치', unit: '1컵' }, p: 0.5 }
    ]
  },
  {
    id: 'tip-overnight-oats',
    n: '오버나이트 오트 + 그릭 + 과일',
    tip: '전날 준비=아침 실패 방지. 불린 오트는 소화·포만 좋음.',
    why: '밀프렙 아침',
    tags: ['꿀팁', '집밥', '아침', '고단백'],
    src: 'home',
    meal: ['breakfast'],
    items: [
      { name: '오버나이트 오트', cal: 220, pro: 8, carb: 35, fat: 5, g: 200, unit: '1인분', ref: { n: '오버나이트 오트', unit: '1인분' } },
      { name: '그릭요거트', cal: 100, pro: 10, carb: 4, fat: 5, g: 100, unit: '100g', ref: { n: '그릭요거트', unit: '100g' } },
      { name: '바나나', cal: 45, pro: 0.5, carb: 11.5, fat: 0.1, g: 50, unit: '1/2개', ref: { n: '바나나', unit: '1개' }, p: 0.5 }
    ]
  },

  /* ========== 집밥 한 끼 ========== */
  {
    id: 'home-chicken-rice-soup',
    n: '닭가슴 + 현미 + 미역국',
    tip: '국물로 포만, 밥은 현미로 GI 낮춤. 미역 요오드·식이섬유.',
    why: '기본 한식 세트',
    tags: ['집밥', '고단백', '점심', '저녁'],
    src: 'home',
    meal: ['lunch', 'dinner'],
    items: [
      { name: '닭가슴살(구이)', cal: 165, pro: 31, carb: 0, fat: 3.5, g: 150, unit: '150g', ref: { n: '닭가슴살(구이)', unit: '100g' }, p: 1.5 },
      { name: '현미밥', cal: 230, pro: 4.5, carb: 49, fat: 1.3, g: 160, unit: '3/4공기', ref: { n: '현미밥', unit: '1공기' }, p: 0.75 },
      { name: '미역국', cal: 50, pro: 3, carb: 4, fat: 2, g: 250, unit: '1그릇', ref: { n: '미역국', unit: '1그릇' } }
    ]
  },
  {
    id: 'home-sundubu-rice',
    n: '순두부찌개 + 흰쌀밥 반공기',
    tip: '맵고 뜨거우면 식사 속도↓. 밥 반공기부터. 해산물 토핑 시 단백↑.',
    why: '한식 찌개 데이',
    tags: ['집밥', '점심', '저녁'],
    src: 'home',
    meal: ['lunch', 'dinner'],
    items: [
      { name: '순두부찌개', cal: 220, pro: 16, carb: 12, fat: 12, g: 400, unit: '1인분', ref: { n: '순두부찌개', unit: '1인분' } },
      { name: '흰쌀밥', cal: 150, pro: 2.8, carb: 33.5, fat: 0.3, g: 105, unit: '반공기', ref: { n: '흰쌀밥', unit: '반공기' } }
    ]
  },
  {
    id: 'home-salad-chicken',
    n: '닭가슴살 샐러드 한 접시',
    tip: '드레싱은 따로·적게. 시판 샐러드도 소스 절반이 칼로리 핵심.',
    why: '라이트 점심',
    tags: ['집밥', '고단백', '저칼로리', '점심'],
    src: 'home',
    meal: ['lunch', 'dinner'],
    items: [
      { name: '닭가슴살 샐러드', cal: 280, pro: 32, carb: 18, fat: 8, g: 300, unit: '1인분', ref: { n: '닭가슴살 샐러드', unit: '1인분' } }
    ]
  },
  {
    id: 'home-grilled-fish-veg',
    n: '생선구이 + 나물 + 밥 반공기',
    tip: '흰살 생선은 저지방 고단백. 나물은 참기름 과다 주의.',
    why: '가벼운 저녁',
    tags: ['집밥', '고단백', '저녁', '저칼로리'],
    src: 'home',
    meal: ['dinner'],
    items: [
      { name: '고등어구이', cal: 280, pro: 22, carb: 0, fat: 20, g: 120, unit: '1토막', ref: { n: '고등어구이', unit: '1토막' } },
      { name: '시금치나물', cal: 45, pro: 3, carb: 4, fat: 2, g: 80, unit: '1인분', ref: { n: '시금치나물', unit: '1인분' } },
      { name: '흰쌀밥', cal: 150, pro: 2.8, carb: 33.5, fat: 0.3, g: 105, unit: '반공기', ref: { n: '흰쌀밥', unit: '반공기' } }
    ]
  },
  {
    id: 'home-soy-protein-plate',
    n: '두부스테이크 + 채소 + 퀴노아',
    tip: '비건/채식 데이용. 두부는 굽거나 에어프라이면 식감↑.',
    why: '식물성 한 끼',
    tags: ['집밥', '고단백', '점심', '저녁'],
    src: 'home',
    meal: ['lunch', 'dinner'],
    items: [
      { name: '두부스테이크', cal: 200, pro: 16, carb: 10, fat: 10, g: 150, unit: '1개', ref: { n: '두부스테이크', unit: '1개' } },
      { name: '브로콜리(데친)', cal: 35, pro: 3, carb: 6, fat: 0.3, g: 100, unit: '1컵', ref: { n: '브로콜리(데친)', unit: '1컵' } },
      { name: '퀴노아밥', cal: 150, pro: 5, carb: 27, fat: 2.5, g: 120, unit: '소량', ref: { n: '퀴노아밥', unit: '1공기' }, p: 0.55 }
    ]
  },
  {
    id: 'home-bibimbap-light',
    n: '비빔밥 라이트 (고추장 반)',
    tip: '고추장·참기름이 칼로리 폭탄. 반만 쓰고 식초·레몬으로 간.',
    why: '한식 비빔 조절',
    tags: ['집밥', '점심'],
    src: 'home',
    meal: ['lunch', 'dinner'],
    items: [
      { name: '비빔밥', cal: 450, pro: 15, carb: 70, fat: 12, g: 400, unit: '1인분(라이트)', ref: { n: '비빔밥', unit: '1인분' }, p: 0.78 }
    ]
  },

  /* ========== 편의점 ========== */
  {
    id: 'cvs-greek-protein-bar',
    n: '편의점 그릭 + 프로틴바',
    tip: '이동 중 최소 세트. 바는 당 함량 라벨 확인(10g 이하 선호).',
    why: '편의점 고단백 미니',
    tags: ['꿀팁', '편의점', '고단백', '간식', '아침'],
    src: 'cvs',
    meal: ['snack', 'breakfast'],
    items: [
      { name: '편의점 그릭요거트', cal: 130, pro: 12, carb: 8, fat: 5, g: 120, unit: '1개', ref: { n: '편의점 그릭요거트', unit: '1개' } },
      { name: '편의점 프로틴바', cal: 180, pro: 15, carb: 18, fat: 6, g: 50, unit: '1개', ref: { n: '편의점 프로틴바', unit: '1개' } }
    ]
  },
  {
    id: 'cvs-salad-smoked-egg',
    n: '샐러드팩 + 훈제란',
    tip: '샐러드 소스 반만. 훈제란으로 단백 보충 — 편의점 스테디셀러 조합.',
    why: '편의점 점심 꿀팁',
    tags: ['꿀팁', '편의점', '고단백', '점심'],
    src: 'cvs',
    meal: ['lunch', 'dinner'],
    items: [
      { name: '닭가슴살 샐러드팩', cal: 250, pro: 25, carb: 15, fat: 9, g: 250, unit: '1개', ref: { n: '닭가슴살 샐러드팩', unit: '1개' } },
      { name: '훈제란 1구', cal: 80, pro: 7, carb: 0.5, fat: 5.5, g: 50, unit: '1개', ref: { n: '훈제란 1구', unit: '1개' } }
    ]
  },
  {
    id: 'cvs-triangle-soymilk',
    n: '삼각김밥 + 고단백 두유',
    tip: '삼각만 먹으면 단백 부족. 두유·그릭으로 매크로 밸런스.',
    why: '편의점 밸런스',
    tags: ['꿀팁', '편의점', '점심', '간식'],
    src: 'cvs',
    meal: ['lunch', 'snack'],
    items: [
      { name: '삼각(참치마요)', cal: 200, pro: 6, carb: 32, fat: 6, g: 110, unit: '1개', ref: { n: '삼각(참치마요)', unit: '1개' } },
      { name: '두유(고단백)', cal: 120, pro: 10, carb: 8, fat: 5, g: 190, unit: '1팩', ref: { n: '두유(고단백)', unit: '1팩' } }
    ]
  },
  {
    id: 'cvs-chicken-breast-pack',
    n: '시판 닭가슴 + 방울토마토 + 주먹밥',
    tip: '소스 닭가슴은 당 체크. 담백한 훈제·스팀 추천.',
    why: '편의점 고단백 한 끼',
    tags: ['편의점', '고단백', '점심', '저녁'],
    src: 'cvs',
    meal: ['lunch', 'dinner'],
    items: [
      { name: '훈제 닭가슴', cal: 120, pro: 24, carb: 2, fat: 2, g: 100, unit: '1팩', ref: { n: '훈제 닭가슴', unit: '1팩' } },
      { name: '주먹밥(편의점)', cal: 180, pro: 4, carb: 35, fat: 3, g: 120, unit: '1개', ref: { n: '주먹밥(편의점)', unit: '1개' } },
      { name: '방울토마토', cal: 20, pro: 1, carb: 4, fat: 0.2, g: 80, unit: '팩', ref: { n: '방울토마토', unit: '10개' } }
    ]
  },
  {
    id: 'cvs-hyoja-half',
    n: '혜자 도시락 + 반만 밥 남기기',
    tip: '칼로리 함정은 밥·튀김. 밥 1/3~1/2 남기면 현실 컷에 가까움.',
    why: '편의점 도시락 조절',
    tags: ['편의점', '점심', '꿀팁'],
    src: 'cvs',
    meal: ['lunch', 'dinner'],
    items: [
      { name: 'GS25 혜자도시락', cal: 450, pro: 18, carb: 55, fat: 16, g: 400, unit: '1개(조절)', ref: { n: 'GS25 혜자도시락', unit: '1개' }, p: 0.7 }
    ]
  },
  {
    id: 'cvs-protein-rtd',
    n: '프로틴 RTD + 바나나',
    tip: '공복 운동 전후 초간단. 액상 프로틴은 흡수 빠름.',
    why: '운동 전후 편의점',
    tags: ['편의점', '고단백', '간식', '꿀팁'],
    src: 'cvs',
    meal: ['snack', 'breakfast'],
    items: [
      { name: '프로틴쉐이크(시판RTD)', cal: 150, pro: 25, carb: 6, fat: 2.5, g: 250, unit: '1병', ref: { n: '프로틴쉐이크(시판RTD)', unit: '1병' } },
      { name: '바나나', cal: 90, pro: 1.1, carb: 23, fat: 0.3, g: 100, unit: '1개', ref: { n: '바나나', unit: '1개' } }
    ]
  },
  {
    id: 'cvs-ricotta-salad',
    n: '리코타 샐러드 + 두유',
    tip: '편의점 리코타 샐러드는 치즈 양 적당. 두유로 포만 보강.',
    why: '가벼운 편의점 한 끼',
    tags: ['편의점', '저칼로리', '점심', '간식'],
    src: 'cvs',
    meal: ['lunch', 'snack'],
    items: [
      { name: '편의점 샐러드(리코타)', cal: 220, pro: 10, carb: 18, fat: 12, g: 200, unit: '1개', ref: { n: '편의점 샐러드(리코타)', unit: '1개' } },
      { name: '두유(무가당)', cal: 90, pro: 6, carb: 6, fat: 4, g: 190, unit: '1팩', ref: { n: '두유(무가당)', unit: '1팩' } }
    ]
  },
  {
    id: 'cvs-kimbap-egg',
    n: '편의점 김밥 + 훈제란 2개',
    tip: '김밥 단독은 탄수 편중. 계란으로 단백 비율 끌어올리기.',
    why: '김밥 업그레이드',
    tags: ['편의점', '꿀팁', '점심'],
    src: 'cvs',
    meal: ['lunch', 'snack'],
    items: [
      { name: '김밥(편의점)', cal: 320, pro: 8, carb: 50, fat: 9, g: 200, unit: '1줄', ref: { n: '김밥(편의점)', unit: '1줄' } },
      { name: '편의점 훈제란', cal: 160, pro: 14, carb: 1, fat: 11, g: 100, unit: '2개', ref: { n: '편의점 훈제란', unit: '2개' } }
    ]
  },

  /* ========== 배달 · 외식 스마트 ========== */
  {
    id: 'del-salad-salmon',
    n: '배달 연어 샐러드 (소스 별도)',
    tip: '주문 시 드레싱 적게/별도. 빵·크루통 빼기 옵션 활용.',
    why: '배달 샐러드 고르기',
    tags: ['배달', '고단백', '점심', '저녁', '꿀팁'],
    src: 'delivery',
    meal: ['lunch', 'dinner'],
    items: [
      { name: '배달 샐러드(연어)', cal: 420, pro: 28, carb: 25, fat: 22, g: 350, unit: '1인분', ref: { n: '배달 샐러드(연어)', unit: '1인분' } }
    ]
  },
  {
    id: 'del-salad-chicken',
    n: '배달 닭가슴 샐러드',
    tip: '치킨 토핑은 구이/그릴 선택. 튀김 치킨 샐러드는 칼로리 급증.',
    why: '배달 고단백',
    tags: ['배달', '고단백', '점심', '저녁'],
    src: 'delivery',
    meal: ['lunch', 'dinner'],
    items: [
      { name: '배달 샐러드(닭가슴)', cal: 380, pro: 35, carb: 22, fat: 14, g: 350, unit: '1인분', ref: { n: '배달 샐러드(닭가슴)', unit: '1인분' } }
    ]
  },
  {
    id: 'del-pokebowl-half-rice',
    n: '포케볼 (밥 반)',
    tip: '포케는 소스·마요·시즈닝이 함정. 밥 반·소스 라이트 요청.',
    why: '포케 다이어트 주문법',
    tags: ['배달', '꿀팁', '점심', '고단백'],
    src: 'delivery',
    meal: ['lunch', 'dinner'],
    items: [
      { name: '연어포케', cal: 400, pro: 28, carb: 42, fat: 12, g: 350, unit: '1인분(밥반)', ref: { n: '연어포케', unit: '1인분' }, p: 0.75 }
    ]
  },
  {
    id: 'del-shabu',
    n: '샤브샤브 (소스 적게)',
    tip: '국물·채소 먼저, 소스 찍지 말고 살짝. 후식 아이스크림은 패스.',
    why: '외식 볼륨 이팅',
    tags: ['배달', '저칼로리', '저녁', '꿀팁'],
    src: 'delivery',
    meal: ['dinner', 'lunch'],
    items: [
      { name: '샤브샤브 1인', cal: 450, pro: 35, carb: 25, fat: 18, g: 500, unit: '1인분', ref: { n: '샤브샤브 1인', unit: '1인분' } }
    ]
  },
  {
    id: 'del-sushi-set-light',
    n: '연어·흰살 초밥 위주 (8피스)',
    tip: '유부·마요·튀김 롤 피하기. 간장 적게, 와사비·생강 OK.',
    why: '초밥 스마트 픽',
    tags: ['배달', '점심', '저녁', '꿀팁'],
    src: 'delivery',
    meal: ['lunch', 'dinner'],
    items: [
      { name: '초밥(모둠)', cal: 340, pro: 16, carb: 55, fat: 5, g: 220, unit: '8피스', ref: { n: '초밥(모둠)', unit: '10피스' }, p: 0.8 }
    ]
  },
  {
    id: 'del-chicken-breast-dosirak',
    n: '닭가슴 도시락 배달',
    tip: '밀프렙 브랜드·헬스 도시락 검색. 일반 돈까스 도시락과 칼로리 2배 차이.',
    why: '배달 다이어트 도시락',
    tags: ['배달', '고단백', '점심', '저녁'],
    src: 'delivery',
    meal: ['lunch', 'dinner'],
    items: [
      { name: '현미 닭가슴살 도시락', cal: 480, pro: 40, carb: 48, fat: 10, g: 400, unit: '1인분', ref: { n: '현미 닭가슴살 도시락', unit: '1인분' } }
    ]
  },
  {
    id: 'del-subway-light',
    n: '서브웨이 치킨 (15cm·치즈 적게)',
    tip: '하티/화이트, 치즈 1장, 랜치 대신 머스타드·식초. 쿠키 세트 금지.',
    why: '패스트 스마트',
    tags: ['배달', '고단백', '점심', '꿀팁'],
    src: 'delivery',
    meal: ['lunch', 'dinner'],
    items: [
      { name: '서브웨이 치킨베이컨 15cm', cal: 420, pro: 28, carb: 42, fat: 14, g: 250, unit: '1개(라이트)', ref: { n: '서브웨이 치킨베이컨 15cm', unit: '1개' }, p: 0.9 }
    ]
  },
  {
    id: 'del-soup-meal',
    n: '국밥류 맑은 국물 + 밥 반',
    tip: '순대·선지보다 콩나물·북어 해장국이 가벼운 편. 밥 반공기 요청.',
    why: '국밥 다이어트 주문',
    tags: ['배달', '점심', '저녁', '꿀팁'],
    src: 'delivery',
    meal: ['lunch', 'dinner'],
    items: [
      { name: '콩나물국밥', cal: 350, pro: 14, carb: 55, fat: 6, g: 500, unit: '1인분(밥반)', ref: { n: '콩나물국밥', unit: '1인분' }, p: 0.85 }
    ]
  },

  /* ========== 저칼로리 · 야식 대체 ========== */
  {
    id: 'snack-protein-shake-only',
    n: '프로틴 쉐이크 한 잔',
    tip: '야식 욕구 올 때 먼저 쉐이크. 20분 후 진짜 배고픈지 판단.',
    why: '야식 차단 1단계',
    tags: ['꿀팁', '고단백', '저칼로리', '간식', '집밥'],
    src: 'home',
    meal: ['snack'],
    items: [
      { name: '프로틴쉐이크(물)', cal: 120, pro: 24, carb: 3, fat: 1.5, g: 30, unit: '1잔', ref: { n: '프로틴쉐이크(물)', unit: '1잔' } }
    ]
  },
  {
    id: 'snack-konjac-yogurt',
    n: '곤약젤리 + 그릭 반컵',
    tip: '단맛은 젤리로, 포만은 그릭으로. 젤리만 먹으면 곧 허기.',
    why: '단맛+단백 콤보',
    tags: ['꿀팁', '간식', '저칼로리', '집밥'],
    src: 'home',
    meal: ['snack'],
    items: [
      { name: '곤약젤리', cal: 15, pro: 0, carb: 4, fat: 0, g: 150, unit: '1개', ref: { n: '곤약젤리', unit: '1개' } },
      { name: '그릭요거트', cal: 75, pro: 7.5, carb: 2.5, fat: 4, g: 75, unit: '반분', ref: { n: '그릭요거트', unit: '150g' }, p: 0.5 }
    ]
  },
  {
    id: 'snack-edamame',
    n: '에다마메(풋콩) + 레몬',
    tip: '식이섬유+식물단백. 맥주 안주 대신 최고. 소금 과다 주의.',
    why: '안주 대체',
    tags: ['꿀팁', '간식', '고단백', '집밥'],
    src: 'home',
    meal: ['snack'],
    items: [
      { name: '에다마메', cal: 120, pro: 11, carb: 10, fat: 5, g: 100, unit: '1접시', ref: { n: '에다마메', unit: '1접시' } }
    ]
  },
  {
    id: 'snack-cucumber-hummus',
    n: '오이 + 휴머스',
    tip: '크래커 대신 오이 스틱. 휴머스는 2큰술 내로.',
    why: '바삭 욕구 대체',
    tags: ['꿀팁', '간식', '저칼로리', '집밥'],
    src: 'home',
    meal: ['snack'],
    items: [
      { name: '오이', cal: 30, pro: 1.4, carb: 7, fat: 0.2, g: 200, unit: '1개', ref: { n: '오이', unit: '1개' } },
      { name: '휴머스', cal: 70, pro: 2, carb: 6, fat: 4, g: 30, unit: '2큰술' }
    ]
  },
  {
    id: 'meal-high-pro-low-cal',
    n: '흰자 + 훈제닭 + 채소 볼',
    tip: '단백 밀도 극대화. 컷 후반·잔여 칼로리 적을 때.',
    why: '초고단백 저칼로리',
    tags: ['꿀팁', '고단백', '저칼로리', '집밥', '저녁'],
    src: 'home',
    meal: ['dinner', 'lunch', 'snack'],
    items: [
      { name: '계란 흰자', cal: 50, pro: 11, carb: 0.7, fat: 0.2, g: 100, unit: '3개분', ref: { n: '계란 흰자', unit: '3개분' } },
      { name: '훈제 닭가슴', cal: 120, pro: 24, carb: 2, fat: 2, g: 100, unit: '1팩', ref: { n: '훈제 닭가슴', unit: '1팩' } },
      { name: '오이', cal: 15, pro: 0.7, carb: 3.5, fat: 0.1, g: 100, unit: '1/2', ref: { n: '오이', unit: '1개' }, p: 0.5 },
      { name: '방울토마토', cal: 20, pro: 1, carb: 4, fat: 0.2, g: 80, unit: '10개', ref: { n: '방울토마토', unit: '10개' } }
    ]
  },
  {
    id: 'breakfast-light-soy',
    n: '두유 + 그래놀라 조금 + 사과',
    tip: '그래놀라는 1/4컵만. 시리얼 볼 가득은 다이어트 적.',
    why: '가벼운 아침',
    tags: ['집밥', '아침', '저칼로리', '꿀팁'],
    src: 'home',
    meal: ['breakfast'],
    items: [
      { name: '두유(무가당)', cal: 90, pro: 6, carb: 6, fat: 4, g: 190, unit: '1팩', ref: { n: '두유(무가당)', unit: '1팩' } },
      { name: '그래놀라', cal: 110, pro: 2.5, carb: 18, fat: 3.5, g: 30, unit: '1/4컵', ref: { n: '그래놀라', unit: '1/2컵' }, p: 0.5 },
      { name: '사과', cal: 80, pro: 0.3, carb: 21, fat: 0.2, g: 150, unit: '1개', ref: { n: '사과', unit: '1개' } }
    ]
  },
  {
    id: 'lunch-office-balance',
    n: '현미 도시락형: 닭 + 밥 + 나물',
    tip: '회사 루틴용. 소스 통 따로 챙기면 성공률↑.',
    why: '직장인 루틴',
    tags: ['집밥', '점심', '고단백'],
    src: 'home',
    meal: ['lunch'],
    items: [
      { name: '닭가슴살(구이)', cal: 165, pro: 31, carb: 0, fat: 3.5, g: 150, unit: '150g', ref: { n: '닭가슴살(구이)', unit: '100g' }, p: 1.5 },
      { name: '현미밥', cal: 200, pro: 4, carb: 42, fat: 1.2, g: 140, unit: '2/3', ref: { n: '현미밥', unit: '1공기' }, p: 0.65 },
      { name: '나물(시금치)', cal: 40, pro: 2.5, carb: 4, fat: 1.5, g: 70, unit: '1접시', ref: { n: '나물(시금치)', unit: '1접시' } },
      { name: '김치(배추)', cal: 20, pro: 1.5, carb: 3, fat: 0.2, g: 60, unit: '소량', ref: { n: '김치(배추)', unit: '1접시' }, p: 0.7 }
    ]
  }
];

window.FT_RECIPE_SRCS = [
  { id: 'all', label: '전체' },
  { id: 'home', label: '집밥' },
  { id: 'cvs', label: '편의점' },
  { id: 'delivery', label: '배달' }
];

window.FT_RECIPE_MODES = [
  { id: 'free', label: '자유롭게' },
  { id: 'remaining', label: '남은 칼로리·단백' }
];
