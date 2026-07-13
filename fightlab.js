/**
 * FIGHT//LAB — 6주 솔로 MMA/복싱 프로그램
 * Source: icarusicanfly12-cmyk/Fight-lab
 * 한국어 UI용 이식 데이터
 */
window.FT_FIGHTLAB = {
  schedule: [
    {
      day: "월요일", short: "월", type: "STRIKING", color: "#ef4444",
      exercises: [
        { id: "mon1", name: "풋워크 드릴", time: "10분", detail: "인-아웃, 래터럴 스텝, 피벗, 콤비 후 각도 만들기" },
        { id: "mon2", name: "기술 스터디", time: "15분", detail: "스트라이크 하나 골라 느리게·정확하게. 서두르지 말 것" },
        { id: "mon3", name: "셰도우복싱", time: "3 × 3분", detail: "이동·호흡·콤비 변화. 라운드 사이 1분 휴식" }
      ]
    },
    {
      day: "화요일", short: "화", type: "GRAPPLING", color: "#f97316",
      exercises: [
        { id: "tue1", name: "솔로 그라운드 드릴", time: "15분", detail: "슈림프, 힙 이스케이프, 그랜비 롤, 가드 리텐션" },
        { id: "tue2", name: "테이크다운 엔트리", time: "10분", detail: "레벨 체인지, 페네트레이션 스텝, 싱글레그 엔트리" },
        { id: "tue3", name: "근력 서킷", time: "15분", detail: "푸시업, 스쿼트, 런지, 코어 플랭크. 휴식 최소화" }
      ]
    },
    {
      day: "수요일", short: "수", type: "CONDITIONING", color: "#eab308",
      exercises: [
        { id: "wed1", name: "카디오", time: "20분", detail: "러닝 또는 제자리 인터벌. 스테디 + 스프린트 믹스" },
        { id: "wed2", name: "파워 서킷", time: "15분", detail: "스프롤, 점프스쿼트, 폭발 푸시업, 빠른 셰도우 버스트" },
        { id: "wed3", name: "머슬 엔듀런스", time: "20분", detail: "하이렙 번아웃 서킷. 편안함을 넘기기. 3세트" }
      ]
    },
    {
      day: "목요일", short: "목", type: "STRIKING", color: "#ef4444",
      exercises: [
        { id: "thu1", name: "풋워크 드릴", time: "10분", detail: "각도 집중. 사우스포/오소독스 피벗, 후퇴 각도" },
        { id: "thu2", name: "셰도우복싱", time: "3 × 3분", detail: "앞서 연습한 풋워크 적용. 목적 있는 이동" },
        { id: "thu3", name: "콤비 드릴링", time: "10분", detail: "2–3 콤비 속도. 잽-크로스-레그킥, 더블 엔트리" }
      ]
    },
    {
      day: "금요일", short: "금", type: "FULL MMA", color: "#22c55e",
      exercises: [
        { id: "fri1", name: "기술 플로우", time: "15분", detail: "타격 + 그라운드 요소를 하나의 플로우로" },
        { id: "fri2", name: "셰도우복싱", time: "3 × 3분", detail: "풀 인텐시티. 이번 주 전부 투입" },
        { id: "fri3", name: "그라운드 드릴", time: "10분", detail: "솔로 그라운드 시퀀스 논스톱" },
        { id: "fri4", name: "어질리티/스피드", time: "15분", detail: "반응, 래터럴 퀵니스, 폭발 스타트" }
      ]
    },
    { day: "토요일", short: "토", type: "REST", color: "#374151", exercises: [] },
    { day: "일요일", short: "일", type: "REST", color: "#374151", exercises: [] }
  ],

  meals: [
    {
      name: "아침", time: "07:00", cal: 600, p: 30, c: 70, f: 20,
      foods: ["계란 4개", "식빵 2장 또는 밥 1공기", "바나나 1개", "우유 200ml"]
    },
    {
      name: "오전 간식", time: "10:30", cal: 300, p: 12, c: 35, f: 15,
      foods: ["견과 30g", "제철 과일 1개", "요거트 또는 두유 1잔"]
    },
    {
      name: "점심", time: "13:00", cal: 700, p: 30, c: 110, f: 12,
      foods: ["밥 2공기 또는 면 1인분", "단백질 반찬 (닭/두부/생선)", "채소 반찬", "국 1그릇"]
    },
    {
      name: "훈련 전", time: "16:30", cal: 350, p: 10, c: 65, f: 10,
      foods: ["바나나 2개", "빵+땅콩버터 또는 떡", "물 250ml"]
    },
    {
      name: "훈련 후", time: "18:30", cal: 400, p: 40, c: 50, f: 10,
      foods: ["계란 흰자 4 + 전란 2 또는 프로틴", "밥 1공기", "우유/두유"]
    },
    {
      name: "저녁", time: "20:30", cal: 350, p: 18, c: 35, f: 8,
      foods: ["닭가슴/두부 150g", "밥 또는 고구마", "샐러드·나물"]
    }
  ],

  phases: [
    { num: "1–2", label: "FOUNDATION", desc: "폼이 전부. 3분 라운드. 모든 동작을 익힌다.", color: "#3b82f6", weeks: [1, 2], workMin: 3 },
    { num: "3–4", label: "BUILD", desc: "강도 상승. 4분 라운드. 더 빠르게 드릴.", color: "#f97316", weeks: [3, 4], workMin: 4 },
    { num: "5–6", label: "PEAK", desc: "Full gas. 5분 라운드. 개선을 측정한다.", color: "#ef4444", weeks: [5, 6], workMin: 5 }
  ],

  measures: [
    "가스탱크 — 지치기 전 몇 라운드?",
    "기술 — 콤비가 더 부드러워졌나?",
    "컨디셔닝 — 1주차보다 더 밀어붙이나?",
    "체중 — 린 벌크/컷 트랙 위인가?",
    "구조 — 이 플랜이 도움이 되나, 뻔한가?"
  ],

  dailyTargets: { cal: 2700, pro: 140, carb: 365, fat: 75, waterL: 3.5 },

  /** 월요일=0 … 일요일=6 (Fight Lab 방식) */
  todayIndex: function () {
    return (new Date().getDay() + 6) % 7;
  },

  phaseForWeek: function (w) {
    w = +w || 1;
    if (w <= 2) return this.phases[0];
    if (w <= 4) return this.phases[1];
    return this.phases[2];
  },

  totalExercises: function () {
    return this.schedule.reduce((a, d) => a + d.exercises.length, 0) * 6;
  }
};
