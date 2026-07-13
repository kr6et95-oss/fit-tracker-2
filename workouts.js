/**
 * FIT TRACKER 2 — 운동 라이브러리
 * min: 기본 시간(분), cal: 대략 소모, sets/reps/load: 근력 기본값
 * cat: cardio | strength | sports | mobility
 * muscle: 가슴/등/어깨/하체/팔/코어/전신 (strength)
 */
window.FT_WORKOUTS = {
  cardio: [
    { n: '걷기', min: 30, cal: 120, muscle: '전신', k: '워킹 산책' },
    { n: '빠른 걷기', min: 30, cal: 160, muscle: '전신', k: '속보' },
    { n: '가벼운 산책(회복)', min: 20, cal: 60, muscle: '전신', k: '회복 산책' },
    { n: '러닝', min: 30, cal: 280, muscle: '전신', k: '달리기 조깅' },
    { n: '인터벌 러닝', min: 25, cal: 320, muscle: '전신', k: '인터벌 HIIT 러닝' },
    { n: '조깅', min: 30, cal: 220, muscle: '전신', k: '조깅' },
    { n: '트레드밀', min: 30, cal: 250, muscle: '전신', k: '러닝머신' },
    { n: '자전거(실외)', min: 40, cal: 300, muscle: '하체', k: '사이클' },
    { n: '실내자전거', min: 30, cal: 220, muscle: '하체', k: '스핀바이크' },
    { n: '스피닝', min: 45, cal: 400, muscle: '하체', k: '스피닝' },
    { n: '줄넘기', min: 15, cal: 160, muscle: '전신', k: '줄넘기' },
    { n: '수영', min: 30, cal: 250, muscle: '전신', k: '수영' },
    { n: '수영(자유형)', min: 30, cal: 280, muscle: '전신', k: '자유형' },
    { n: '수영(평영)', min: 30, cal: 230, muscle: '전신', k: '평영' },
    { n: '일립티컬', min: 30, cal: 240, muscle: '전신', k: '일립티컬' },
    { n: '로잉머신', min: 20, cal: 200, muscle: '전신', k: '로잉 조정' },
    { n: '스텝퍼', min: 20, cal: 180, muscle: '하체', k: '스텝퍼' },
    { n: '등산', min: 60, cal: 450, muscle: '하체', k: '등산 하이킹' },
    { n: '계단 오르기', min: 15, cal: 150, muscle: '하체', k: '계단' },
    { n: '버피', min: 10, cal: 120, muscle: '전신', k: '버피' },
    { n: '점핑잭', min: 10, cal: 90, muscle: '전신', k: '점핑잭' },
    { n: '하이니', min: 10, cal: 100, muscle: '하체', k: '하이니' },
    { n: '마운틴클라이머', min: 10, cal: 110, muscle: '코어', k: '마운틴' },
    { n: '댄스 피트니스', min: 40, cal: 300, muscle: '전신', k: '줌바 댄스' },
    { n: '복싱 쉐도우', min: 20, cal: 180, muscle: '전신', k: '복싱' },
    { n: '케틀벨 스윙', min: 15, cal: 160, muscle: '전신', k: '케틀벨' },
    { n: '인라인/롤러', min: 40, cal: 280, muscle: '하체', k: '인라인' },
    { n: '스키/보드', min: 60, cal: 400, muscle: '하체', k: '스키' }
  ],
  strength: [
    // 하체
    { n: '백스쿼트', min: 15, cal: 100, sets: 4, reps: 8, load: 50, muscle: '하체', k: '스쿼트 바벨' },
    { n: '프론트스쿼트', min: 15, cal: 95, sets: 3, reps: 8, load: 40, muscle: '하체', k: '프론트' },
    { n: '고블릿스쿼트', min: 12, cal: 80, sets: 3, reps: 12, load: 16, muscle: '하체', k: '고블릿' },
    { n: '레그프레스', min: 12, cal: 90, sets: 4, reps: 12, load: 100, muscle: '하체', k: '레그프레스' },
    { n: '레그익스텐션', min: 10, cal: 60, sets: 3, reps: 12, load: 30, muscle: '하체', k: '하체 전면' },
    { n: '레그컬', min: 10, cal: 55, sets: 3, reps: 12, load: 25, muscle: '하체', k: '햄스트링' },
    { n: '루마니안 데드리프트', min: 12, cal: 90, sets: 3, reps: 8, load: 50, muscle: '하체', k: 'RDL' },
    { n: '컨벤셔널 데드리프트', min: 15, cal: 110, sets: 3, reps: 5, load: 70, muscle: '하체', k: '데드' },
    { n: '힙쓰러스트', min: 12, cal: 85, sets: 4, reps: 10, load: 60, muscle: '하체', k: '힙 둔근' },
    { n: '런지', min: 12, cal: 75, sets: 3, reps: 12, load: 12, muscle: '하체', k: '런지' },
    { n: '워킹런지', min: 12, cal: 80, sets: 3, reps: 16, load: 10, muscle: '하체', k: '워킹런지' },
    { n: '불가리안 스플릿스쿼트', min: 12, cal: 80, sets: 3, reps: 10, load: 12, muscle: '하체', k: '스플릿' },
    { n: '카프레이즈', min: 8, cal: 40, sets: 4, reps: 15, load: 20, muscle: '하체', k: '종아리' },
    { n: '핵스쿼트', min: 12, cal: 85, sets: 3, reps: 10, load: 40, muscle: '하체', k: '핵스쿼트' },
    { n: '스미스 스쿼트', min: 12, cal: 85, sets: 3, reps: 10, load: 40, muscle: '하체', k: '스미스' },
    // 가슴
    { n: '벤치프레스', min: 15, cal: 95, sets: 4, reps: 8, load: 40, muscle: '가슴', k: '벤치' },
    { n: '인클라인 벤치', min: 12, cal: 85, sets: 3, reps: 8, load: 35, muscle: '가슴', k: '인클라인' },
    { n: '딥스', min: 10, cal: 70, sets: 3, reps: 10, load: 0, muscle: '가슴', k: '딥스' },
    { n: '푸시업', min: 10, cal: 60, sets: 3, reps: 15, load: 0, muscle: '가슴', k: '팔굽혀' },
    { n: '덤벨 프레스', min: 12, cal: 80, sets: 3, reps: 10, load: 16, muscle: '가슴', k: '덤벨프레스' },
    { n: '덤벨 플라이', min: 10, cal: 55, sets: 3, reps: 12, load: 10, muscle: '가슴', k: '플라이' },
    { n: '케이블 크로스오버', min: 10, cal: 55, sets: 3, reps: 12, load: 12, muscle: '가슴', k: '크로스오버' },
    { n: '체스트 프레스 머신', min: 10, cal: 70, sets: 3, reps: 12, load: 30, muscle: '가슴', k: '머신프레스' },
    { n: '펙덱 플라이', min: 10, cal: 55, sets: 3, reps: 12, load: 25, muscle: '가슴', k: '펙덱' },
    // 등
    { n: '풀업', min: 12, cal: 80, sets: 3, reps: 6, load: 0, muscle: '등', k: '턱걸이' },
    { n: '친업', min: 12, cal: 80, sets: 3, reps: 6, load: 0, muscle: '등', k: '친업' },
    { n: '랫풀다운', min: 12, cal: 70, sets: 4, reps: 10, load: 35, muscle: '등', k: '랫풀' },
    { n: '바벨로우', min: 12, cal: 80, sets: 4, reps: 8, load: 40, muscle: '등', k: '바벨로우' },
    { n: '덤벨로우', min: 12, cal: 70, sets: 3, reps: 10, load: 16, muscle: '등', k: '덤벨로우' },
    { n: '시티드로우', min: 10, cal: 65, sets: 3, reps: 12, load: 30, muscle: '등', k: '시티드로우' },
    { n: '티바로우', min: 12, cal: 75, sets: 3, reps: 10, load: 30, muscle: '등', k: '티바' },
    { n: '페이스풀', min: 8, cal: 40, sets: 3, reps: 15, load: 12, muscle: '등', k: '페이스풀' },
    { n: '시티드 케이블로우', min: 10, cal: 65, sets: 3, reps: 12, load: 30, muscle: '등', k: '케이블로우' },
    { n: '하이풀', min: 10, cal: 60, sets: 3, reps: 12, load: 25, muscle: '등', k: '하이풀' },
    // 어깨
    { n: '오버헤드프레스', min: 12, cal: 75, sets: 4, reps: 8, load: 25, muscle: '어깨', k: 'OHP 밀리터리' },
    { n: '덤벨 숄더프레스', min: 12, cal: 70, sets: 3, reps: 10, load: 12, muscle: '어깨', k: '숄더프레스' },
    { n: '사이드 레터럴 레이즈', min: 8, cal: 40, sets: 3, reps: 15, load: 6, muscle: '어깨', k: '측델' },
    { n: '프론트 레이즈', min: 8, cal: 35, sets: 3, reps: 12, load: 6, muscle: '어깨', k: '전면삼각' },
    { n: '리어 델트 플라이', min: 8, cal: 40, sets: 3, reps: 15, load: 6, muscle: '어깨', k: '후델' },
    { n: '업라이트로우', min: 8, cal: 45, sets: 3, reps: 12, load: 20, muscle: '어깨', k: '업라이트' },
    { n: '슈러그', min: 8, cal: 40, sets: 3, reps: 12, load: 30, muscle: '어깨', k: '승모 슈러그' },
    // 팔
    { n: '바벨 컬', min: 8, cal: 40, sets: 3, reps: 12, load: 20, muscle: '팔', k: '이두 컬' },
    { n: '덤벨 컬', min: 8, cal: 40, sets: 3, reps: 12, load: 10, muscle: '팔', k: '덤벨컬' },
    { n: '해머컬', min: 8, cal: 40, sets: 3, reps: 12, load: 10, muscle: '팔', k: '해머' },
    { n: '프리처컬', min: 8, cal: 40, sets: 3, reps: 10, load: 20, muscle: '팔', k: '프리처' },
    { n: '케이블 푸시다운', min: 8, cal: 40, sets: 3, reps: 12, load: 20, muscle: '팔', k: '삼두 푸시다운' },
    { n: '오버헤드 익스텐션', min: 8, cal: 40, sets: 3, reps: 12, load: 12, muscle: '팔', k: '삼두' },
    { n: '스컬크러셔', min: 8, cal: 45, sets: 3, reps: 10, load: 20, muscle: '팔', k: '스컬크러셔' },
    { n: '벤치딥스', min: 8, cal: 45, sets: 3, reps: 12, load: 0, muscle: '팔', k: '벤치딥' },
    // 코어
    { n: '플랭크', min: 5, cal: 30, sets: 3, reps: 45, load: 0, muscle: '코어', k: '플랭크 초' },
    { n: '사이드 플랭크', min: 5, cal: 30, sets: 3, reps: 30, load: 0, muscle: '코어', k: '사이드플랭크' },
    { n: '크런치', min: 8, cal: 35, sets: 3, reps: 20, load: 0, muscle: '코어', k: '크런치' },
    { n: '레그레이즈', min: 8, cal: 40, sets: 3, reps: 15, load: 0, muscle: '코어', k: '레그레이즈' },
    { n: '행잉 레그레이즈', min: 8, cal: 45, sets: 3, reps: 12, load: 0, muscle: '코어', k: '행잉' },
    { n: '러시안 트위스트', min: 8, cal: 40, sets: 3, reps: 20, load: 5, muscle: '코어', k: '트위스트' },
    { n: '케이블 우드촙', min: 8, cal: 45, sets: 3, reps: 12, load: 12, muscle: '코어', k: '우드촙' },
    { n: '데드버그', min: 8, cal: 30, sets: 3, reps: 12, load: 0, muscle: '코어', k: '데드버그' },
    { n: '버드독', min: 8, cal: 30, sets: 3, reps: 12, load: 0, muscle: '코어', k: '버드독' },
    { n: 'AB 휠', min: 8, cal: 45, sets: 3, reps: 10, load: 0, muscle: '코어', k: '앱휠' },
    // 전신
    { n: '클린', min: 12, cal: 100, sets: 4, reps: 5, load: 40, muscle: '전신', k: '클린' },
    { n: '스내치', min: 12, cal: 100, sets: 4, reps: 4, load: 30, muscle: '전신', k: '스내치' },
    { n: '케틀벨 콤보', min: 15, cal: 140, sets: 4, reps: 12, load: 16, muscle: '전신', k: '케틀벨' },
    { n: '헬스(전신)', min: 45, cal: 200, sets: 0, reps: 0, load: 0, muscle: '전신', k: '전신 헬스' },
    { n: '홈트 전신', min: 25, cal: 160, sets: 3, reps: 15, load: 0, muscle: '전신', k: '홈트' }
  ],
  sports: [
    { n: '축구', min: 60, cal: 450, muscle: '전신', k: '축구 풋살' },
    { n: '풋살', min: 50, cal: 400, muscle: '전신', k: '풋살' },
    { n: '농구', min: 60, cal: 420, muscle: '전신', k: '농구' },
    { n: '배구', min: 60, cal: 320, muscle: '전신', k: '배구' },
    { n: '배드민턴', min: 45, cal: 300, muscle: '전신', k: '배드민턴' },
    { n: '테니스', min: 60, cal: 380, muscle: '전신', k: '테니스' },
    { n: '탁구', min: 40, cal: 200, muscle: '전신', k: '탁구' },
    { n: '골프', min: 90, cal: 350, muscle: '전신', k: '골프' },
    { n: '야구/캐치볼', min: 60, cal: 250, muscle: '전신', k: '야구' },
    { n: '클라이밍', min: 60, cal: 400, muscle: '전신', k: '클라이밍 볼더' },
    { n: '볼더링', min: 60, cal: 380, muscle: '전신', k: '볼더링' },
    { n: '복싱 스파링', min: 40, cal: 350, muscle: '전신', k: '스파링' },
    { n: '주짓수/격투기', min: 60, cal: 450, muscle: '전신', k: '주짓수 격투' },
    { n: '태권도', min: 50, cal: 350, muscle: '전신', k: '태권도' },
    { n: '요가 수업', min: 50, cal: 150, muscle: '전신', k: '요가클래스' },
    { n: '필라테스', min: 50, cal: 180, muscle: '코어', k: '필라테스' },
    { n: '크로스핏 WOD', min: 40, cal: 380, muscle: '전신', k: '크로스핏' },
    { n: '서핑', min: 60, cal: 350, muscle: '전신', k: '서핑' },
    { n: '스케이트보드', min: 45, cal: 250, muscle: '하체', k: '보드' }
  ],
  mobility: [
    { n: '스트레칭 전신', min: 15, cal: 40, muscle: '전신', k: '스트레칭' },
    { n: '하체 스트레칭', min: 10, cal: 30, muscle: '하체', k: '하체 스트레칭' },
    { n: '상체 스트레칭', min: 10, cal: 30, muscle: '전신', k: '상체 스트레칭' },
    { n: '요가(하타)', min: 30, cal: 100, muscle: '전신', k: '하타요가' },
    { n: '요가(빈야사)', min: 40, cal: 160, muscle: '전신', k: '빈야사' },
    { n: '폼롤러', min: 15, cal: 40, muscle: '전신', k: '폼롤러 SMR' },
    { n: '마사지건 케어', min: 10, cal: 20, muscle: '전신', k: '마사지' },
    { n: '고관절 모빌리티', min: 12, cal: 35, muscle: '하체', k: '고관절' },
    { n: '어깨 모빌리티', min: 12, cal: 35, muscle: '어깨', k: '어깨가동' },
    { n: '척추 모빌리티', min: 12, cal: 35, muscle: '코어', k: '척추' },
    { n: '호흡/명상', min: 10, cal: 15, muscle: '전신', k: '명상 호흡' },
    { n: '워밍업', min: 10, cal: 40, muscle: '전신', k: '워밍업 준비운동' },
    { n: '쿨다운', min: 10, cal: 30, muscle: '전신', k: '쿨다운 정리' },
    { n: '거품 마사지볼', min: 10, cal: 25, muscle: '전신', k: '마사지볼' }
  ]
};

window.FT_WO_ROUTINES = [
  {
    id: 'push',
    name: '푸시 데이',
    items: [
      { n: '벤치프레스', min: 15, cal: 95, sets: 4, reps: 8, load: 40, type: 'strength', muscle: '가슴' },
      { n: '인클라인 벤치', min: 12, cal: 85, sets: 3, reps: 8, load: 35, type: 'strength', muscle: '가슴' },
      { n: '오버헤드프레스', min: 12, cal: 75, sets: 3, reps: 8, load: 25, type: 'strength', muscle: '어깨' },
      { n: '사이드 레터럴 레이즈', min: 8, cal: 40, sets: 3, reps: 15, load: 6, type: 'strength', muscle: '어깨' },
      { n: '케이블 푸시다운', min: 8, cal: 40, sets: 3, reps: 12, load: 20, type: 'strength', muscle: '팔' }
    ]
  },
  {
    id: 'pull',
    name: '풀 데이',
    items: [
      { n: '풀업', min: 12, cal: 80, sets: 3, reps: 6, load: 0, type: 'strength', muscle: '등' },
      { n: '바벨로우', min: 12, cal: 80, sets: 4, reps: 8, load: 40, type: 'strength', muscle: '등' },
      { n: '랫풀다운', min: 12, cal: 70, sets: 3, reps: 10, load: 35, type: 'strength', muscle: '등' },
      { n: '페이스풀', min: 8, cal: 40, sets: 3, reps: 15, load: 12, type: 'strength', muscle: '등' },
      { n: '덤벨 컬', min: 8, cal: 40, sets: 3, reps: 12, load: 10, type: 'strength', muscle: '팔' }
    ]
  },
  {
    id: 'legs',
    name: '하체 데이',
    items: [
      { n: '백스쿼트', min: 15, cal: 100, sets: 4, reps: 8, load: 50, type: 'strength', muscle: '하체' },
      { n: '루마니안 데드리프트', min: 12, cal: 90, sets: 3, reps: 8, load: 50, type: 'strength', muscle: '하체' },
      { n: '레그프레스', min: 12, cal: 90, sets: 3, reps: 12, load: 100, type: 'strength', muscle: '하체' },
      { n: '런지', min: 12, cal: 75, sets: 3, reps: 12, load: 12, type: 'strength', muscle: '하체' },
      { n: '카프레이즈', min: 8, cal: 40, sets: 4, reps: 15, load: 20, type: 'strength', muscle: '하체' }
    ]
  },
  {
    id: 'full',
    name: '전신 초보',
    items: [
      { n: '고블릿스쿼트', min: 12, cal: 80, sets: 3, reps: 12, load: 16, type: 'strength', muscle: '하체' },
      { n: '푸시업', min: 10, cal: 60, sets: 3, reps: 12, load: 0, type: 'strength', muscle: '가슴' },
      { n: '덤벨로우', min: 12, cal: 70, sets: 3, reps: 10, load: 12, type: 'strength', muscle: '등' },
      { n: '플랭크', min: 5, cal: 30, sets: 3, reps: 30, load: 0, type: 'strength', muscle: '코어' },
      { n: '걷기', min: 20, cal: 80, type: 'cardio', muscle: '전신' }
    ]
  },
  {
    id: 'hiit',
    name: 'HIIT 20분',
    items: [
      { n: '버피', min: 8, cal: 100, type: 'cardio', muscle: '전신' },
      { n: '마운틴클라이머', min: 6, cal: 70, type: 'cardio', muscle: '코어' },
      { n: '점핑잭', min: 6, cal: 55, type: 'cardio', muscle: '전신' }
    ]
  },
  {
    id: 'recover',
    name: '회복 루틴',
    items: [
      { n: '가벼운 산책(회복)', min: 25, cal: 70, type: 'cardio', muscle: '전신' },
      { n: '스트레칭 전신', min: 15, cal: 40, type: 'mobility', muscle: '전신' },
      { n: '폼롤러', min: 10, cal: 30, type: 'mobility', muscle: '전신' }
    ]
  }
];

window.FT_WO_MUSCLES = ['전체', '가슴', '등', '어깨', '하체', '팔', '코어', '전신'];
window.FT_WO_MODES = [
  { id: 'cardio', label: '🏃 유산소' },
  { id: 'strength', label: '🏋️ 근력' },
  { id: 'sports', label: '⚡ 스포츠' },
  { id: 'mobility', label: '🧘 회복' }
];
