# FIT TRACKER 2 — A 로드맵 · PR · 회복 게이트 스펙

버전 타깃: **4.9**  
철학: **회복 > 영양 > 훈련**  
저장: `localStorage` 키 `fit-tracker-2-v1` (서버 없음)

---

## 1. A 로드맵 — 식단 입력 마찰 제거

### 1.1 목표

- 매일 검색 없이 **자주 먹는 끼니**를 원탭으로 넣는다.
- **어제와 동일** 복제로 반복 루틴을 즉시 기록한다.
- 기존 `myFoods`(단일 메뉴)를 보완하는 **끼니 단위 템플릿**을 둔다.

### 1.2 localStorage 스키마 (루트 `S`)

```ts
// 기존
S.myFoods: Array<{
  id: string;
  name: string;
  cal: number;
  pro: number;
  carb: number;
  fat: number;
  g?: number;
  unit?: string;
  micro?: object;
}>

// 신규
S.mealTemplates: Array<{
  id: string;
  name: string;                 // 예: "회사 점심 세트"
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'any';
  items: Array<{
    name: string;
    cal: number;
    pro: number;
    carb: number;
    fat: number;
    g?: number;
    unit?: string;
    micro?: object;
  }>;
  createdAt: number;            // Date.now()
}>
```

`days[YYYY-MM-DD].meals` 구조는 변경 없음:

```ts
meals: {
  breakfast: FoodItem[];
  lunch: FoodItem[];
  dinner: FoodItem[];
  snack: FoodItem[];
}
// FoodItem: { id, name, cal, pro, carb, fat, g?, unit?, micro? }
```

### 1.3 화면 (기록 탭)

| UI | 동작 |
|---|---|
| **어제와 동일 (전체)** | 어제 네 끼니 항목을 오늘에 복사 (새 `id` 부여). 오늘에 이미 음식이 있으면 confirm |
| **끼니별 어제 복제** | 아침/점심/저녁/간식 각각 어제 동일 끼니만 복사 |
| **이 끼를 템플릿으로** | 모달의 현재 끼니(`curMeal`) 목록 → 템플릿 저장 |
| **템플릿 적용** | 선택 템플릿 items를 대상 끼니에 unshift |
| **템플릿 삭제** | `mealTemplates`에서 제거 |

### 1.4 함수 계약

| 함수 | 설명 |
|---|---|
| `ensureMealTemplates()` | 배열 보장 |
| `copyYesterdayMeal(mealType)` | 어제 → 오늘 단일 끼니 |
| `copyYesterdayAllMeals()` | 어제 → 오늘 전체 |
| `saveCurrentMealAsTemplate(name?)` | 오늘 `curMeal` 또는 지정 끼니 → 템플릿 |
| `applyMealTemplate(id, mealType?)` | 템플릿 적용 (`mealType` 없으면 템플릿.meal, any면 현재 끼니) |
| `removeMealTemplate(id)` | 삭제 |
| `renderMealTemplates()` | 기록 탭 + 모달 칩 갱신 |

### 1.5 백업

- `buildBackupPayload()` / `applyBackup()`에 `mealTemplates` 포함·병합.
- 병합 시 이름 기준 중복 스킵 (myFoods와 동일 패턴).

---

## 2. PR · e1RM · 주간 볼륨

### 2.1 목표

- 근력 기록(`sets`·`reps`·`load`)으로 **종목별 PR**과 **추정 1RM**을 보여 준다.
- 오늘/7일 **볼륨(kg)** 추이로 과부하를 감지한다.

### 2.2 계산

```text
volume(w) = sets × reps × load          (기존 woVolume)

e1RM (Epley, reps 1–15):
  reps === 1 → load
  else       → load × (1 + reps/30)
  reps > 15  → null (신뢰 낮음, UI에 "참고" 또는 숨김)

PR 기준 (종목 정규화 이름 단위):
  - maxLoad:  최대 load (kg)
  - maxE1rm:  최대 e1RM
  - maxVol:   한 기록(entry) 최대 볼륨
  - lastAt:   최근 수행일
```

종목 키: `normalizeLiftName(name)` — trim + lower + 공백 축약.

### 2.3 저장

- **파생 데이터**로 계산 (별도 store 불필요). 모든 `S.days[*].workouts` 스캔.
- 기록 추가 시 이전 PR과 비교해 toast: `🎉 벤치프레스 PR! 40 → 42.5kg`

### 2.4 화면

| 위치 | 내용 |
|---|---|
| 운동 탭 | PR 보드 (상위 종목, e1RM·max kg·최근일) |
| 운동 탭 | 7일 볼륨 막대 차트 (`woVolChart`) |
| 오늘 목록 | e1RM 힌트 (근력 entry meta) |
| 리포트 | 기간 총 근력 볼륨 KPI (선택) |

### 2.5 함수

| 함수 | 설명 |
|---|---|
| `calcE1rm(load, reps)` | Epley |
| `normalizeLiftName(n)` | 키 |
| `scanStrengthHistory(daysBack?)` | 전체/기간 스캔 |
| `buildPrBoard(limit?)` | 종목별 PR 배열 |
| `detectPrOnEntry(entry)` | 추가 직전 비교 → `{ isPr, field, prev, next }` |
| `renderPrBoard()` | UI |
| `renderVolumeChart()` | Chart.js |

---

## 3. 회복 게이트 + Rest day credit 스트릭

### 3.1 회복 게이트 규칙표

입력: 오늘 회복 점수 `score` (null 가능), 연속 고부하 `hard`, 근육 피로 `soreness`.

| 구간 | 레벨 | 허용 최대 강도 | UI 메시지 | 권장 활동 |
|---|---|---|---|---|
| score null | `unknown` | mid (경고) | 휴식 미기록 | 수면만이라도 기록 |
| score ≤ 40 | `red` | **low** | 회복 우선 · 고강도 금지 | 완전휴식 / 모빌리티 / 산책 |
| 41–64 | `amber` | **mid** | 볼륨 조절 | 기술·중강도, 상 강도 자제 |
| 65–79 | `green` | **high** | 양호 · 계획 진행 | 표준~하드 가능 |
| ≥ 80 | `gold` | **high** | 고강도 창 | 하드 데이 가능 (워밍업 필수) |

**오버라이드**

- `hard ≥ 3` → 최대 강도를 한 단계 하향 (high→mid, mid→low).
- `soreness ≥ 4` → maxIv 최소 mid 이하, 메시지로 근력 고중량 자제.
- 핵심 3종 emergency + score≥70 → 제안은 mid/high 가능하나 **게이트가 red면 여전히 low**.

### 3.2 훈련 UI 연동

- `getRecoveryGate()` → `maxIv`, `level`, `label`, `detail`.
- `suggestedTrainIntensity()`가 게이트 `maxIv`를 상한으로 clamp.
- `setTrainIntensity('high')` 시 `maxIv === 'low'`이면 toast + low로 고정 (강제).
- `requestTrainingPlan()` 시작 시 intensity를 게이트로 clamp 후 진행.
- 홈·운동 탭에 게이트 카드 표시.

### 3.3 Rest day credit 스트릭

**운동 스트릭** (`workoutStreak`)

- 오늘부터 과거로 연속 일수.
- 해당 일에 다음 중 하나면 **유지**:
  1. 운동 기록 `woTot(k).min ≥ 10` 또는 strength entry 존재
  2. **Rest credit**: `rest.restDay === true` 또는 계획 `weekPlan[k]==='rest'` 또는 그날 게이트가 red이면서 운동 &lt; 20분
- 완전 미기록(운동 없고 credit 없음)이면 끊김.
- 오늘이 아직 미활동이어도 **어제까지** 스트릭은 표시 (오늘 open day).

**물 스트릭** (`waterStreak`)

- `water ≥ waterGoal` 인 날만 카운트 (credit 없음 — 물은 매일).

**수면 스트릭** (`sleepStreak`)

- `sleepHrs ≥ targetSleep - 0.5` (기본 목표 7.5 → 7.0h 이상)이면 유지.
- rest credit 없음.

### 3.4 화면

| 위치 | 내용 |
|---|---|
| 홈 | 게이트 배지 + 스트릭 3종 (운동🔥 / 물💧 / 수면😴) |
| 습관 탭 | 동일 스트릭 요약 |
| 운동 탭 | 게이트 한 줄 + 추천 강도와 연동 |

### 3.5 함수

| 함수 | 설명 |
|---|---|
| `getRecoveryGate(k?)` | 규칙표 결과 |
| `clampIntensity(iv, maxIv)` | 상한 적용 |
| `isRestCreditDay(k)` | credit 여부 |
| `isWorkoutDay(k)` | 운동 인정 |
| `calcStreak(predicate, opts)` | 일반 스트릭 |
| `getStreaks()` | `{ workout, water, sleep }` |
| `renderRecoveryGateUI()` | 홈/운동 |
| `renderStreakUI()` | 홈/습관 |

---

## 4. 구현 체크리스트

- [x] 스키마 · 스펙 문서 (본 파일)
- [x] 끼니 템플릿 + 어제 복제 UI/로직
- [x] PR / e1RM / 볼륨 차트
- [x] 회복 게이트 + 스트릭
- [x] 백업 병합 · README 갱신 · 버전 4.9

---

## 5. 비목표 (이번 범위 밖)

- 서버 동기화
- 의료 진단 문구
- 소셜 랭킹
- 가민 공식 API
