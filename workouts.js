/**
 * FIT TRACKER 2 — 운동 라이브러리
 * min: 기본 시간(분), cal: 대략 소모, sets/reps/load: 근력 기본값
 * cat: cardio | strength | sports | mobility
 * muscle: 가슴/등/어깨/하체/팔/코어/전신 (strength)
 * 특수 기구: 케틀벨·클럽벨·불가리안백·샌드백·배틀로프 등 (k 검색 키워드 포함)
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
    { n: '케틀벨 스윙(지속)', min: 15, cal: 160, muscle: '전신', k: '케틀벨 스윙 EMOM' },
    { n: '케틀벨 스내치 지속', min: 12, cal: 170, muscle: '전신', k: '케틀벨 스내치 컨디션' },
    { n: '배틀로프 웨이브', min: 12, cal: 150, muscle: '전신', k: '배틀로프 로프' },
    { n: '배틀로프 슬램', min: 10, cal: 140, muscle: '전신', k: '배틀로프 슬램' },
    { n: '슬램볼 연속', min: 10, cal: 130, muscle: '전신', k: '슬램볼 메디신볼' },
    { n: '샌드백 컨디셔닝', min: 15, cal: 160, muscle: '전신', k: '샌드백 컨디션' },
    { n: '불가리안백 컨디셔닝', min: 15, cal: 165, muscle: '전신', k: '불가리안백 백' },
    { n: '클럽벨 플로우(지속)', min: 12, cal: 120, muscle: '전신', k: '클럽벨 플로우' },
    { n: '타이어 플립', min: 15, cal: 200, muscle: '전신', k: '타이어 플립 strongman' },
    { n: '파머스 워크(컨디션)', min: 12, cal: 140, muscle: '전신', k: '파머스워크 캐리' },
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

    // ===== 케틀벨 (Kettlebell) =====
    { n: 'KB 투핸드 스윙', min: 12, cal: 120, sets: 5, reps: 15, load: 16, muscle: '전신', k: '케틀벨 스윙 two hand' },
    { n: 'KB 원핸드 스윙', min: 12, cal: 115, sets: 4, reps: 12, load: 16, muscle: '전신', k: '케틀벨 원핸드 스윙' },
    { n: 'KB 알터네이팅 스윙', min: 12, cal: 120, sets: 4, reps: 16, load: 16, muscle: '전신', k: '케틀벨 교대 스윙' },
    { n: 'KB 아메리칸 스윙', min: 12, cal: 125, sets: 4, reps: 12, load: 16, muscle: '전신', k: '케틀벨 오버헤드 스윙' },
    { n: 'KB 고블릿 스쿼트', min: 12, cal: 85, sets: 4, reps: 12, load: 16, muscle: '하체', k: '케틀벨 고블릿' },
    { n: 'KB 프론트 스쿼트', min: 12, cal: 90, sets: 4, reps: 8, load: 16, muscle: '하체', k: '케틀벨 프론트스쿼트 더블' },
    { n: 'KB 스모 스쿼트', min: 10, cal: 80, sets: 3, reps: 12, load: 16, muscle: '하체', k: '케틀벨 스모' },
    { n: 'KB 런지', min: 12, cal: 80, sets: 3, reps: 12, load: 12, muscle: '하체', k: '케틀벨 런지' },
    { n: 'KB 리버스 런지', min: 12, cal: 80, sets: 3, reps: 12, load: 12, muscle: '하체', k: '케틀벨 리버스런지' },
    { n: 'KB 사이드 런지', min: 10, cal: 75, sets: 3, reps: 10, load: 12, muscle: '하체', k: '케틀벨 사이드런지' },
    { n: 'KB 스텝업', min: 10, cal: 70, sets: 3, reps: 10, load: 12, muscle: '하체', k: '케틀벨 스텝업' },
    { n: 'KB 루마니안 데드', min: 12, cal: 90, sets: 3, reps: 10, load: 20, muscle: '하체', k: '케틀벨 RDL 데드' },
    { n: 'KB 싱글레그 RDL', min: 12, cal: 85, sets: 3, reps: 8, load: 12, muscle: '하체', k: '케틀벨 싱글레그 데드' },
    { n: 'KB 데드리프트', min: 12, cal: 95, sets: 4, reps: 8, load: 24, muscle: '하체', k: '케틀벨 데드리프트' },
    { n: 'KB 수모 데드', min: 12, cal: 95, sets: 4, reps: 8, load: 24, muscle: '하체', k: '케틀벨 수모 데드' },
    { n: 'KB 클린', min: 12, cal: 100, sets: 4, reps: 8, load: 16, muscle: '전신', k: '케틀벨 클린' },
    { n: 'KB 클린 앤 프레스', min: 12, cal: 110, sets: 4, reps: 6, load: 16, muscle: '전신', k: '케틀벨 클린프레스' },
    { n: 'KB 클린 앤 저크', min: 12, cal: 115, sets: 4, reps: 6, load: 16, muscle: '전신', k: '케틀벨 클린저크' },
    { n: 'KB 스내치', min: 12, cal: 120, sets: 5, reps: 8, load: 16, muscle: '전신', k: '케틀벨 스내치' },
    { n: 'KB 하프 스내치', min: 10, cal: 100, sets: 4, reps: 8, load: 16, muscle: '전신', k: '케틀벨 하프스내치' },
    { n: 'KB 밀리터리 프레스', min: 10, cal: 70, sets: 4, reps: 8, load: 16, muscle: '어깨', k: '케틀벨 프레스 OHP' },
    { n: 'KB 푸시 프레스', min: 10, cal: 80, sets: 4, reps: 8, load: 20, muscle: '어깨', k: '케틀벨 푸시프레스' },
    { n: 'KB 저크', min: 10, cal: 85, sets: 4, reps: 6, load: 20, muscle: '어깨', k: '케틀벨 저크' },
    { n: 'KB 바텀업 프레스', min: 10, cal: 65, sets: 3, reps: 6, load: 12, muscle: '어깨', k: '케틀벨 바텀업' },
    { n: 'KB 더블 프레스', min: 12, cal: 90, sets: 4, reps: 6, load: 16, muscle: '어깨', k: '케틀벨 더블프레스' },
    { n: 'KB 터키스 겟업', min: 15, cal: 100, sets: 3, reps: 3, load: 12, muscle: '전신', k: '케틀벨 TGU 터키시' },
    { n: 'KB 하프 겟업', min: 10, cal: 70, sets: 3, reps: 5, load: 12, muscle: '코어', k: '케틀벨 하프겟업' },
    { n: 'KB 윈드밀', min: 10, cal: 70, sets: 3, reps: 6, load: 12, muscle: '코어', k: '케틀벨 윈드밀' },
    { n: 'KB 어라운드 더 월드', min: 8, cal: 50, sets: 3, reps: 10, load: 12, muscle: '코어', k: '케틀벨 어라운드' },
    { n: 'KB 헤일로', min: 8, cal: 45, sets: 3, reps: 10, load: 12, muscle: '어깨', k: '케틀벨 헤일로' },
    { n: 'KB 러시안 트위스트', min: 8, cal: 50, sets: 3, reps: 20, load: 12, muscle: '코어', k: '케틀벨 트위스트' },
    { n: 'KB 피겨8', min: 8, cal: 55, sets: 3, reps: 12, load: 12, muscle: '코어', k: '케틀벨 피겨에잇' },
    { n: 'KB 로테이션 스윙', min: 10, cal: 90, sets: 3, reps: 12, load: 12, muscle: '코어', k: '케틀벨 로테이션' },
    { n: 'KB 하이풀', min: 10, cal: 75, sets: 3, reps: 10, load: 16, muscle: '등', k: '케틀벨 하이풀' },
    { n: 'KB 로우(벤트오버)', min: 10, cal: 70, sets: 3, reps: 10, load: 16, muscle: '등', k: '케틀벨 로우' },
    { n: 'KB 싱글암 로우', min: 10, cal: 65, sets: 3, reps: 10, load: 16, muscle: '등', k: '케틀벨 원암로우' },
    { n: 'KB 레니게이드 로우', min: 10, cal: 75, sets: 3, reps: 10, load: 16, muscle: '등', k: '케틀벨 레니게이드 renegade' },
    { n: 'KB 플로어 프레스', min: 10, cal: 70, sets: 3, reps: 10, load: 16, muscle: '가슴', k: '케틀벨 플로어프레스' },
    { n: 'KB 푸시업(핸즈온)', min: 10, cal: 60, sets: 3, reps: 12, load: 0, muscle: '가슴', k: '케틀벨 푸시업' },
    { n: 'KB 풀오버', min: 8, cal: 50, sets: 3, reps: 12, load: 12, muscle: '가슴', k: '케틀벨 풀오버' },
    { n: 'KB 컬', min: 8, cal: 40, sets: 3, reps: 12, load: 12, muscle: '팔', k: '케틀벨 컬 이두' },
    { n: 'KB 트라이셉스 익스텐션', min: 8, cal: 40, sets: 3, reps: 12, load: 12, muscle: '팔', k: '케틀벨 삼두' },
    { n: 'KB 파머스 캐리', min: 10, cal: 80, sets: 4, reps: 40, load: 20, muscle: '전신', k: '케틀벨 파머스 캐리' },
    { n: 'KB 랙 캐리', min: 10, cal: 85, sets: 4, reps: 40, load: 16, muscle: '전신', k: '케틀벨 랙캐리' },
    { n: 'KB 오버헤드 캐리', min: 10, cal: 90, sets: 3, reps: 30, load: 12, muscle: '어깨', k: '케틀벨 오버헤드캐리' },
    { n: 'KB 수트케이스 캐리', min: 10, cal: 75, sets: 3, reps: 40, load: 20, muscle: '코어', k: '케틀벨 수트케이스' },
    { n: 'KB 맨메이커', min: 12, cal: 120, sets: 3, reps: 6, load: 12, muscle: '전신', k: '케틀벨 맨메이커' },
    { n: 'KB 쓰러스터', min: 12, cal: 110, sets: 4, reps: 8, load: 16, muscle: '전신', k: '케틀벨 쓰러스터' },
    { n: 'KB 스윙+스쿼트 콤보', min: 12, cal: 120, sets: 4, reps: 10, load: 16, muscle: '전신', k: '케틀벨 콤보 스쿼트' },
    { n: 'KB 더블 스윙', min: 12, cal: 130, sets: 4, reps: 10, load: 16, muscle: '전신', k: '케틀벨 더블스윙' },
    { n: 'KB 더블 클린', min: 12, cal: 120, sets: 4, reps: 6, load: 16, muscle: '전신', k: '케틀벨 더블클린' },
    { n: 'KB 더블 프론트스쿼트', min: 12, cal: 100, sets: 4, reps: 8, load: 16, muscle: '하체', k: '케틀벨 더블스쿼트' },
    { n: 'KB 플로어 겟업 싯업', min: 8, cal: 50, sets: 3, reps: 8, load: 12, muscle: '코어', k: '케틀벨 싯업' },

    // ===== 클럽벨 (Clubbell) =====
    { n: '클럽벨 밀', min: 12, cal: 90, sets: 4, reps: 8, load: 10, muscle: '어깨', k: '클럽벨 mill 밀' },
    { n: '클럽벨 캐슬 밀', min: 12, cal: 95, sets: 4, reps: 6, load: 10, muscle: '어깨', k: '클럽벨 castle mill' },
    { n: '클럽벨 인사이드 밀', min: 10, cal: 85, sets: 3, reps: 8, load: 10, muscle: '어깨', k: '클럽벨 인사이드밀' },
    { n: '클럽벨 아웃사이드 밀', min: 10, cal: 85, sets: 3, reps: 8, load: 10, muscle: '어깨', k: '클럽벨 아웃사이드밀' },
    { n: '클럽벨 스와이프', min: 10, cal: 90, sets: 4, reps: 10, load: 10, muscle: '전신', k: '클럽벨 swipe 스와이프' },
    { n: '클럽벨 펄오버', min: 10, cal: 75, sets: 3, reps: 10, load: 10, muscle: '등', k: '클럽벨 pullover 펄오버' },
    { n: '클럽벨 오더', min: 8, cal: 50, sets: 3, reps: 12, load: 10, muscle: '어깨', k: '클럽벨 order 오더' },
    { n: '클럽벨 쉴드 캐스트', min: 10, cal: 80, sets: 3, reps: 8, load: 10, muscle: '어깨', k: '클럽벨 shield cast' },
    { n: '클럽벨 감마 캐스트', min: 10, cal: 85, sets: 3, reps: 8, load: 10, muscle: '전신', k: '클럽벨 gamma cast' },
    { n: '클럽벨 아이언 크로스', min: 10, cal: 80, sets: 3, reps: 8, load: 8, muscle: '어깨', k: '클럽벨 iron cross' },
    { n: '클럽벨 프론트 스윙', min: 10, cal: 85, sets: 3, reps: 12, load: 10, muscle: '전신', k: '클럽벨 스윙' },
    { n: '클럽벨 사이드 스윙', min: 10, cal: 85, sets: 3, reps: 10, load: 10, muscle: '코어', k: '클럽벨 사이드스윙' },
    { n: '클럽벨 클린', min: 10, cal: 80, sets: 3, reps: 8, load: 10, muscle: '전신', k: '클럽벨 클린' },
    { n: '클럽벨 스쿼트', min: 10, cal: 80, sets: 3, reps: 10, load: 10, muscle: '하체', k: '클럽벨 스쿼트' },
    { n: '클럽벨 런지', min: 10, cal: 75, sets: 3, reps: 10, load: 8, muscle: '하체', k: '클럽벨 런지' },
    { n: '클럽벨 헤일로', min: 8, cal: 50, sets: 3, reps: 10, load: 8, muscle: '어깨', k: '클럽벨 헤일로' },
    { n: '클럽벨 토크', min: 8, cal: 55, sets: 3, reps: 10, load: 8, muscle: '코어', k: '클럽벨 torque 토크' },
    { n: '클럽벨 로테이션', min: 10, cal: 70, sets: 3, reps: 10, load: 10, muscle: '코어', k: '클럽벨 로테이션' },
    { n: '클럽벨 플래그 프레스', min: 10, cal: 70, sets: 3, reps: 8, load: 8, muscle: '어깨', k: '클럽벨 flag press' },
    { n: '클럽벨 더블 밀', min: 12, cal: 100, sets: 3, reps: 6, load: 8, muscle: '어깨', k: '클럽벨 더블밀' },
    { n: '클럽벨 더블 스와이프', min: 12, cal: 105, sets: 3, reps: 8, load: 8, muscle: '전신', k: '클럽벨 더블스와이프' },
    { n: '클럽벨 플로우 콤보', min: 15, cal: 120, sets: 4, reps: 6, load: 10, muscle: '전신', k: '클럽벨 플로우 콤보' },
    { n: '인디언 클럽 스윙', min: 12, cal: 80, sets: 3, reps: 15, load: 2, muscle: '어깨', k: '인디언클럽 indian club' },
    { n: '인디언 클럽 밀', min: 12, cal: 85, sets: 3, reps: 12, load: 2, muscle: '어깨', k: '인디언클럽 밀' },
    { n: '인디언 클럽 하트 셰이프', min: 10, cal: 70, sets: 3, reps: 12, load: 2, muscle: '어깨', k: '인디언클럽 heart' },

    // ===== 불가리안백 (Bulgarian Bag) =====
    { n: '불가리안백 스윙', min: 12, cal: 110, sets: 4, reps: 12, load: 12, muscle: '전신', k: '불가리안백 백 스윙' },
    { n: '불가리안백 스내치', min: 12, cal: 120, sets: 4, reps: 8, load: 12, muscle: '전신', k: '불가리안백 스내치' },
    { n: '불가리안백 클린', min: 12, cal: 110, sets: 4, reps: 8, load: 12, muscle: '전신', k: '불가리안백 클린' },
    { n: '불가리안백 스쿼트', min: 12, cal: 95, sets: 4, reps: 10, load: 12, muscle: '하체', k: '불가리안백 스쿼트' },
    { n: '불가리안백 런지', min: 12, cal: 90, sets: 3, reps: 12, load: 10, muscle: '하체', k: '불가리안백 런지' },
    { n: '불가리안백 스핀(로테이션)', min: 10, cal: 100, sets: 4, reps: 10, load: 12, muscle: '코어', k: '불가리안백 스핀 로테이션' },
    { n: '불가리안백 암 스루', min: 10, cal: 90, sets: 3, reps: 10, load: 12, muscle: '코어', k: '불가리안백 arm throw 암스루' },
    { n: '불가리안백 푸시 프레스', min: 10, cal: 90, sets: 4, reps: 8, load: 12, muscle: '어깨', k: '불가리안백 프레스' },
    { n: '불가리안백 저크', min: 10, cal: 95, sets: 4, reps: 6, load: 12, muscle: '전신', k: '불가리안백 저크' },
    { n: '불가리안백 굿모닝', min: 10, cal: 75, sets: 3, reps: 10, load: 12, muscle: '하체', k: '불가리안백 굿모닝' },
    { n: '불가리안백 로우', min: 10, cal: 70, sets: 3, reps: 10, load: 12, muscle: '등', k: '불가리안백 로우' },
    { n: '불가리안백 하이풀', min: 10, cal: 80, sets: 3, reps: 10, load: 12, muscle: '등', k: '불가리안백 하이풀' },
    { n: '불가리안백 캐리', min: 10, cal: 85, sets: 4, reps: 40, load: 12, muscle: '전신', k: '불가리안백 캐리' },
    { n: '불가리안백 슬램', min: 10, cal: 100, sets: 4, reps: 10, load: 12, muscle: '전신', k: '불가리안백 슬램' },
    { n: '불가리안백 트위스트 런지', min: 12, cal: 95, sets: 3, reps: 10, load: 10, muscle: '전신', k: '불가리안백 트위스트' },
    { n: '불가리안백 보디 토스', min: 10, cal: 100, sets: 3, reps: 10, load: 12, muscle: '코어', k: '불가리안백 body toss' },
    { n: '불가리안백 플로우', min: 15, cal: 130, sets: 4, reps: 6, load: 12, muscle: '전신', k: '불가리안백 플로우 콤보' },

    // ===== 샌드백 (Sandbag) =====
    { n: '샌드백 클린', min: 12, cal: 110, sets: 4, reps: 6, load: 30, muscle: '전신', k: '샌드백 clean' },
    { n: '샌드백 클린 앤 프레스', min: 12, cal: 120, sets: 4, reps: 5, load: 25, muscle: '전신', k: '샌드백 클린프레스' },
    { n: '샌드백 스쿼트', min: 12, cal: 100, sets: 4, reps: 8, load: 30, muscle: '하체', k: '샌드백 스쿼트' },
    { n: '샌드백 프론트 스쿼트', min: 12, cal: 105, sets: 4, reps: 8, load: 30, muscle: '하체', k: '샌드백 프론트' },
    { n: '샌드백 숄더 스쿼트', min: 12, cal: 100, sets: 3, reps: 8, load: 30, muscle: '하체', k: '샌드백 숄더스쿼트' },
    { n: '샌드백 런지', min: 12, cal: 90, sets: 3, reps: 12, load: 25, muscle: '하체', k: '샌드백 런지' },
    { n: '샌드백 굿모닝', min: 10, cal: 80, sets: 3, reps: 10, load: 25, muscle: '하체', k: '샌드백 굿모닝' },
    { n: '샌드백 데드리프트', min: 12, cal: 100, sets: 4, reps: 6, load: 40, muscle: '하체', k: '샌드백 데드' },
    { n: '샌드백 로우', min: 10, cal: 75, sets: 3, reps: 10, load: 30, muscle: '등', k: '샌드백 로우' },
    { n: '샌드백 숄더링', min: 12, cal: 110, sets: 4, reps: 6, load: 30, muscle: '전신', k: '샌드백 shouldering' },
    { n: '샌드백 오버헤드 프레스', min: 10, cal: 85, sets: 4, reps: 6, load: 25, muscle: '어깨', k: '샌드백 프레스' },
    { n: '샌드백 푸시 프레스', min: 10, cal: 90, sets: 4, reps: 6, load: 30, muscle: '어깨', k: '샌드백 푸시프레스' },
    { n: '샌드백 베어허그 캐리', min: 10, cal: 95, sets: 4, reps: 40, load: 40, muscle: '전신', k: '샌드백 베어허그 캐리' },
    { n: '샌드백 숄더 캐리', min: 10, cal: 90, sets: 3, reps: 40, load: 30, muscle: '전신', k: '샌드백 숄더캐리' },
    { n: '샌드백 드래그', min: 10, cal: 100, sets: 3, reps: 30, load: 40, muscle: '전신', k: '샌드백 드래그' },
    { n: '샌드백 슬램', min: 10, cal: 100, sets: 4, reps: 10, load: 20, muscle: '전신', k: '샌드백 슬램' },
    { n: '샌드백 로테이션', min: 10, cal: 85, sets: 3, reps: 12, load: 20, muscle: '코어', k: '샌드백 로테이션' },
    { n: '샌드백 겟업', min: 12, cal: 90, sets: 3, reps: 4, load: 20, muscle: '전신', k: '샌드백 겟업' },
    { n: '샌드백 버피 클린', min: 12, cal: 130, sets: 4, reps: 6, load: 20, muscle: '전신', k: '샌드백 버피' },

    // ===== 배틀로프 · 슬램볼 · 기타 기능성 =====
    { n: '배틀로프 얼터네이팅 웨이브', min: 10, cal: 120, sets: 5, reps: 30, load: 0, muscle: '전신', k: '배틀로프 웨이브 로프' },
    { n: '배틀로프 더블 웨이브', min: 10, cal: 130, sets: 5, reps: 25, load: 0, muscle: '전신', k: '배틀로프 더블' },
    { n: '배틀로프 인앤아웃', min: 8, cal: 110, sets: 4, reps: 20, load: 0, muscle: '어깨', k: '배틀로프 in out' },
    { n: '배틀로프 서클', min: 8, cal: 110, sets: 4, reps: 20, load: 0, muscle: '어깨', k: '배틀로프 서클' },
    { n: '배틀로프 슬램', min: 10, cal: 130, sets: 5, reps: 15, load: 0, muscle: '전신', k: '배틀로프 슬램' },
    { n: '배틀로프 점프 슬램', min: 10, cal: 140, sets: 4, reps: 12, load: 0, muscle: '전신', k: '배틀로프 점프' },
    { n: '배틀로프 사이드 웨이브', min: 8, cal: 100, sets: 4, reps: 20, load: 0, muscle: '코어', k: '배틀로프 사이드' },
    { n: '배틀로프 스쿼트 웨이브', min: 10, cal: 130, sets: 4, reps: 20, load: 0, muscle: '하체', k: '배틀로프 스쿼트' },
    { n: '배틀로프 런지 웨이브', min: 10, cal: 125, sets: 3, reps: 16, load: 0, muscle: '하체', k: '배틀로프 런지' },
    { n: '슬램볼 슬램', min: 10, cal: 110, sets: 4, reps: 12, load: 10, muscle: '전신', k: '슬램볼 슬램' },
    { n: '슬램볼 오버헤드 슬램', min: 10, cal: 115, sets: 4, reps: 10, load: 10, muscle: '전신', k: '슬램볼 오버헤드' },
    { n: '슬램볼 로테이션 슬램', min: 10, cal: 105, sets: 3, reps: 12, load: 10, muscle: '코어', k: '슬램볼 로테이션' },
    { n: '슬램볼 스쿼트 토스', min: 10, cal: 100, sets: 3, reps: 12, load: 10, muscle: '하체', k: '슬램볼 스쿼트' },
    { n: '메디신볼 체스트 패스', min: 8, cal: 70, sets: 3, reps: 12, load: 6, muscle: '가슴', k: '메디신볼 패스' },
    { n: '메디신볼 로테이션 패스', min: 8, cal: 70, sets: 3, reps: 12, load: 6, muscle: '코어', k: '메디신볼 로테이션' },
    { n: '메디신볼 싯업 토스', min: 8, cal: 65, sets: 3, reps: 12, load: 6, muscle: '코어', k: '메디신볼 싯업' },
    { n: '메디신볼 우드촙', min: 8, cal: 70, sets: 3, reps: 12, load: 6, muscle: '코어', k: '메디신볼 우드촙' },
    { n: '월볼 샷', min: 12, cal: 120, sets: 4, reps: 15, load: 9, muscle: '전신', k: '월볼 wall ball' },
    { n: '월볼 투 타깃', min: 12, cal: 125, sets: 4, reps: 12, load: 9, muscle: '전신', k: '월볼 타깃' },
    { n: '파머스 워크(덤벨/핸들)', min: 10, cal: 90, sets: 4, reps: 40, load: 24, muscle: '전신', k: '파머스워크 캐리' },
    { n: '요크 캐리', min: 10, cal: 120, sets: 4, reps: 30, load: 60, muscle: '전신', k: '요크 캐리 strongman' },
    { n: '프레임 캐리', min: 10, cal: 110, sets: 3, reps: 30, load: 50, muscle: '전신', k: '프레임 캐리' },
    { n: '로그 클린 앤 프레스', min: 12, cal: 130, sets: 4, reps: 5, load: 40, muscle: '전신', k: '로그 press strongman' },
    { n: '타이어 플립(근력)', min: 12, cal: 140, sets: 5, reps: 6, load: 0, muscle: '전신', k: '타이어 플립' },
    { n: '슬레드 푸시', min: 10, cal: 120, sets: 5, reps: 30, load: 50, muscle: '하체', k: '슬레드 푸시 prowler' },
    { n: '슬레드 풀', min: 10, cal: 115, sets: 5, reps: 30, load: 50, muscle: '등', k: '슬레드 풀' },
    { n: '프로울러 푸시', min: 10, cal: 125, sets: 5, reps: 30, load: 40, muscle: '하체', k: '프로울러' },
    { n: '랜드마인 프레스', min: 10, cal: 75, sets: 3, reps: 10, load: 20, muscle: '어깨', k: '랜드마인 프레스' },
    { n: '랜드마인 스쿼트', min: 10, cal: 85, sets: 3, reps: 10, load: 30, muscle: '하체', k: '랜드마인 스쿼트' },
    { n: '랜드마인 로테이션', min: 10, cal: 70, sets: 3, reps: 12, load: 15, muscle: '코어', k: '랜드마인 로테이션' },
    { n: '랜드마인 로우', min: 10, cal: 70, sets: 3, reps: 10, load: 25, muscle: '등', k: '랜드마인 로우' },
    { n: '몬스터 워크(밴드)', min: 8, cal: 50, sets: 3, reps: 12, load: 0, muscle: '하체', k: '몬스터워크 밴드' },
    { n: '밴드 풀어파트', min: 8, cal: 35, sets: 3, reps: 15, load: 0, muscle: '등', k: '밴드 풀어파트' },
    { n: '밴드 페이스풀', min: 8, cal: 35, sets: 3, reps: 15, load: 0, muscle: '등', k: '밴드 페이스풀' },
    { n: 'TRX 로우', min: 10, cal: 60, sets: 3, reps: 12, load: 0, muscle: '등', k: 'TRX 서스펜션 로우' },
    { n: 'TRX 푸시업', min: 10, cal: 60, sets: 3, reps: 12, load: 0, muscle: '가슴', k: 'TRX 푸시업' },
    { n: 'TRX 런지', min: 10, cal: 65, sets: 3, reps: 10, load: 0, muscle: '하체', k: 'TRX 런지' },
    { n: 'TRX 파이크', min: 8, cal: 50, sets: 3, reps: 10, load: 0, muscle: '코어', k: 'TRX 파이크' },
    { n: '케틀벨 콤보(자유)', min: 15, cal: 140, sets: 4, reps: 12, load: 16, muscle: '전신', k: '케틀벨 콤보 혼합' },

    // 전신(일반)
    { n: '클린', min: 12, cal: 100, sets: 4, reps: 5, load: 40, muscle: '전신', k: '클린 바벨' },
    { n: '스내치', min: 12, cal: 100, sets: 4, reps: 4, load: 30, muscle: '전신', k: '스내치 바벨' },
    { n: '파워클린', min: 12, cal: 105, sets: 4, reps: 5, load: 40, muscle: '전신', k: '파워클린' },
    { n: '행클린', min: 12, cal: 100, sets: 4, reps: 5, load: 40, muscle: '전신', k: '행클린' },
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
  },
  {
    id: 'kb-classic',
    name: '케틀벨 클래식',
    items: [
      { n: 'KB 투핸드 스윙', min: 12, cal: 120, sets: 5, reps: 15, load: 16, type: 'strength', muscle: '전신' },
      { n: 'KB 고블릿 스쿼트', min: 12, cal: 85, sets: 4, reps: 12, load: 16, type: 'strength', muscle: '하체' },
      { n: 'KB 클린 앤 프레스', min: 12, cal: 110, sets: 4, reps: 6, load: 16, type: 'strength', muscle: '전신' },
      { n: 'KB 터키스 겟업', min: 12, cal: 90, sets: 3, reps: 3, load: 12, type: 'strength', muscle: '전신' },
      { n: 'KB 파머스 캐리', min: 8, cal: 70, sets: 3, reps: 40, load: 20, type: 'strength', muscle: '전신' }
    ]
  },
  {
    id: 'kb-snatch',
    name: '케틀벨 스내치 데이',
    items: [
      { n: 'KB 원핸드 스윙', min: 10, cal: 100, sets: 4, reps: 12, load: 16, type: 'strength', muscle: '전신' },
      { n: 'KB 클린', min: 10, cal: 90, sets: 3, reps: 8, load: 16, type: 'strength', muscle: '전신' },
      { n: 'KB 스내치', min: 15, cal: 130, sets: 5, reps: 8, load: 16, type: 'strength', muscle: '전신' },
      { n: 'KB 윈드밀', min: 8, cal: 60, sets: 3, reps: 6, load: 12, type: 'strength', muscle: '코어' }
    ]
  },
  {
    id: 'clubbell-flow',
    name: '클럽벨 플로우',
    items: [
      { n: '클럽벨 오더', min: 6, cal: 40, sets: 2, reps: 12, load: 10, type: 'strength', muscle: '어깨' },
      { n: '클럽벨 밀', min: 12, cal: 90, sets: 4, reps: 8, load: 10, type: 'strength', muscle: '어깨' },
      { n: '클럽벨 스와이프', min: 10, cal: 90, sets: 4, reps: 10, load: 10, type: 'strength', muscle: '전신' },
      { n: '클럽벨 펄오버', min: 8, cal: 70, sets: 3, reps: 10, load: 10, type: 'strength', muscle: '등' },
      { n: '클럽벨 플로우 콤보', min: 12, cal: 110, sets: 3, reps: 6, load: 10, type: 'strength', muscle: '전신' }
    ]
  },
  {
    id: 'bbag-power',
    name: '불가리안백 파워',
    items: [
      { n: '불가리안백 스윙', min: 10, cal: 100, sets: 4, reps: 12, load: 12, type: 'strength', muscle: '전신' },
      { n: '불가리안백 클린', min: 10, cal: 100, sets: 4, reps: 8, load: 12, type: 'strength', muscle: '전신' },
      { n: '불가리안백 스쿼트', min: 10, cal: 90, sets: 4, reps: 10, load: 12, type: 'strength', muscle: '하체' },
      { n: '불가리안백 스핀(로테이션)', min: 10, cal: 100, sets: 4, reps: 10, load: 12, type: 'strength', muscle: '코어' },
      { n: '불가리안백 슬램', min: 8, cal: 90, sets: 3, reps: 10, load: 12, type: 'strength', muscle: '전신' }
    ]
  },
  {
    id: 'sandbag-strong',
    name: '샌드백 스트롱',
    items: [
      { n: '샌드백 클린', min: 12, cal: 110, sets: 4, reps: 6, load: 30, type: 'strength', muscle: '전신' },
      { n: '샌드백 프론트 스쿼트', min: 12, cal: 105, sets: 4, reps: 8, load: 30, type: 'strength', muscle: '하체' },
      { n: '샌드백 숄더링', min: 10, cal: 100, sets: 4, reps: 6, load: 30, type: 'strength', muscle: '전신' },
      { n: '샌드백 베어허그 캐리', min: 8, cal: 90, sets: 4, reps: 40, load: 40, type: 'strength', muscle: '전신' }
    ]
  },
  {
    id: 'battle-hiit',
    name: '배틀로프 HIIT',
    items: [
      { n: '배틀로프 얼터네이팅 웨이브', min: 8, cal: 100, sets: 5, reps: 30, load: 0, type: 'strength', muscle: '전신' },
      { n: '배틀로프 슬램', min: 8, cal: 110, sets: 4, reps: 15, load: 0, type: 'strength', muscle: '전신' },
      { n: '슬램볼 슬램', min: 8, cal: 100, sets: 4, reps: 12, load: 10, type: 'strength', muscle: '전신' },
      { n: '배틀로프 스쿼트 웨이브', min: 8, cal: 110, sets: 3, reps: 20, load: 0, type: 'strength', muscle: '하체' }
    ]
  },
  {
    id: 'implement-mix',
    name: '특수기구 믹스',
    items: [
      { n: 'KB 투핸드 스윙', min: 10, cal: 100, sets: 4, reps: 15, load: 16, type: 'strength', muscle: '전신' },
      { n: '클럽벨 밀', min: 10, cal: 85, sets: 3, reps: 8, load: 10, type: 'strength', muscle: '어깨' },
      { n: '불가리안백 스핀(로테이션)', min: 8, cal: 90, sets: 3, reps: 10, load: 12, type: 'strength', muscle: '코어' },
      { n: '샌드백 클린', min: 10, cal: 100, sets: 3, reps: 6, load: 25, type: 'strength', muscle: '전신' },
      { n: '배틀로프 슬램', min: 8, cal: 100, sets: 3, reps: 12, load: 0, type: 'strength', muscle: '전신' }
    ]
  },
  {
    id: 'core-daily',
    name: '코어 데일리 (필수)',
    items: [
      { n: '데드버그', min: 5, cal: 30, sets: 3, reps: 10, load: 0, type: 'strength', muscle: '코어' },
      { n: '플랭크', min: 5, cal: 30, sets: 3, reps: 40, load: 0, type: 'strength', muscle: '코어' },
      { n: '사이드 플랭크', min: 5, cal: 30, sets: 3, reps: 30, load: 0, type: 'strength', muscle: '코어' },
      { n: '버드독', min: 5, cal: 30, sets: 3, reps: 8, load: 0, type: 'strength', muscle: '코어' }
    ]
  },
  {
    id: 'core-power',
    name: '코어 파워',
    items: [
      { n: 'AB 휠', min: 6, cal: 45, sets: 3, reps: 10, load: 0, type: 'strength', muscle: '코어' },
      { n: '행잉 레그레이즈', min: 8, cal: 45, sets: 3, reps: 10, load: 0, type: 'strength', muscle: '코어' },
      { n: '케이블 우드촙', min: 8, cal: 45, sets: 3, reps: 12, load: 12, type: 'strength', muscle: '코어' },
      { n: '러시안 트위스트', min: 6, cal: 40, sets: 3, reps: 20, load: 5, type: 'strength', muscle: '코어' },
      { n: '플랭크', min: 4, cal: 30, sets: 3, reps: 45, load: 0, type: 'strength', muscle: '코어' }
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
