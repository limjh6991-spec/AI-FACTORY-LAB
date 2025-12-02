# 🚀 즉시 작업 가능한 항목들 (Week 2 시작)

**생성일:** 2025년 12월 2일  
**상태:** ✅ Gemini API 연결 완료 (gemini-2.5-flash)

---

## ✅ Week 1 완료 확인

- [x] Next.js 15 프로젝트 초기화
- [x] Prisma + PostgreSQL 16 통합
- [x] `.env` 파일 생성 및 API 키 설정
- [x] **Gemini API 연결 테스트 성공**
- [x] PROJECT_ROADMAP.md 업데이트

**API 정보:**
- 프로젝트 ID: `gen-lang-client-0451030654`
- 프로젝트 이름: `dowCost`
- 모델: `gemini-2.5-flash` (최신 안정 버전)

---

## 🎯 즉시 시작 가능한 작업 (우선순위순)

### 1️⃣ **DB 메타데이터 수집 스크립트** (30분)
**목적:** Prisma 스키마에서 테이블/컬럼 정보를 추출하여 RAG에 사용

**작업 내용:**
```bash
# 파일: scripts/collect_db_metadata.ts
```

**구현 내용:**
- Prisma introspection으로 68개 테이블 스키마 읽기
- 테이블명, 컬럼명, 데이터 타입 추출
- 한글 주석/설명 매핑 (기존 DB에서 추출)
- JSON 파일로 저장: `data/db_metadata.json`

**기대 결과:**
```json
{
  "tables": [
    {
      "name": "new_doi_sys_menu",
      "korean_name": "시스템메뉴",
      "columns": [
        {
          "name": "menu_id",
          "korean_name": "메뉴ID",
          "type": "String"
        }
      ]
    }
  ]
}
```

---

### 2️⃣ **Gemini 기반 Excel 분석 프로토타입** (1시간)
**목적:** Excel 파일을 업로드하면 Gemini가 구조를 분석

**작업 내용:**
```typescript
// 파일: src/lib/excel-analyzer.ts
```

**기능:**
1. SheetJS로 Excel 파일 읽기
2. 헤더 행 자동 인식 (첫 5행 분석)
3. Gemini에게 구조 분석 요청:
   - "이 Excel의 헤더는 몇 번째 행인가?"
   - "컬럼명은 무엇인가?"
   - "데이터 타입은 무엇인가?"
4. 분석 결과 JSON으로 반환

**Gemini 프롬프트 예시:**
```
다음 Excel 시트의 구조를 분석해주세요:

[헤더 후보 행들]
Row 1: ["", "", "2024년 원가 현황", "", ""]
Row 2: ["부서", "월", "금액", "비율", "비고"]
Row 3: ["개발팀", "1월", "1000000", "15%", ""]

질문:
1. 실제 헤더는 몇 번째 행인가?
2. 각 컬럼의 의미는?
3. 데이터 타입은?

JSON 형식으로 답변:
{
  "headerRow": 2,
  "columns": [...]
}
```

---

### 3️⃣ **Excel 업로드 UI 구현** (45분)
**목적:** 사용자가 Excel을 업로드할 수 있는 화면

**작업 내용:**
```typescript
// 파일: src/app/admin/excel-upload/page.tsx
```

**기능:**
- Drag & Drop Excel 업로드
- 파일 검증 (.xlsx, .xls만 허용)
- 미리보기 (첫 10행 표시)
- 분석 버튼 → Gemini 분석 실행
- 결과 표시 (인식된 헤더, 컬럼 매핑)

**shadcn/ui 컴포넌트 사용:**
- `<Card>` - 업로드 영역
- `<Button>` - 분석 버튼
- `<Table>` - 미리보기 테이블
- `<Badge>` - 파일 상태 표시

---

### 4️⃣ **Gemini Helper 유틸리티** (20분)
**목적:** Gemini API 호출을 간편하게 하는 래퍼 함수

**작업 내용:**
```typescript
// 파일: src/lib/gemini.ts

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function analyzeExcel(prompt: string) {
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.5-flash' 
  });
  
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function mapColumnToDB(
  columnName: string, 
  dbMetadata: any
) {
  const prompt = `
  Excel 컬럼명: "${columnName}"
  
  다음 DB 테이블/컬럼 중 가장 적합한 것을 찾아주세요:
  ${JSON.stringify(dbMetadata, null, 2)}
  
  JSON 형식으로 답변:
  {
    "table": "테이블명",
    "column": "컬럼명",
    "confidence": 0.95
  }
  `;
  
  const result = await analyzeExcel(prompt);
  return JSON.parse(result);
}
```

---

### 5️⃣ **간단한 테스트 Excel 파일 준비** (10분)
**목적:** 테스트용 샘플 Excel 파일

**작업 내용:**
```
파일: data/sample_excel/부서별원가.xlsx
```

**내용:**
| 부서명 | 월 | 금액 | 비율 | 비고 |
|--------|-----|--------|------|------|
| 개발팀 | 1월 | 1000000 | 15% | |
| 영업팀 | 1월 | 800000 | 12% | |
| 관리팀 | 1월 | 500000 | 8% | |

**추가 테스트 케이스:**
- `병합셀_테스트.xlsx` - 병합된 셀이 있는 경우
- `다단헤더_테스트.xlsx` - 2단 헤더 구조
- `차트포함_테스트.xlsx` - Excel 차트가 있는 경우

---

### 6️⃣ **환경 변수 보안 강화** (15분)
**목적:** API 키 노출 방지

**작업 내용:**
```bash
# 파일: .env.local (추가)
GEMINI_API_KEY=[REDACTED_FOR_SECURITY]
NEXT_PUBLIC_APP_NAME=dowCost
```

**보안 체크리스트:**
- [ ] `.gitignore`에 `.env*` 포함 확인
- [ ] GitHub에 API 키 커밋 안 됐는지 확인
- [ ] 프로덕션용 별도 API 키 발급 계획
- [ ] API 키 로테이션 절차 문서화

---

## 📋 오늘 할 수 있는 완전한 워크플로우

### 시나리오: "부서별 원가 Excel → 자동 화면 생성"

```mermaid
graph LR
    A[Excel 업로드] --> B[Gemini 구조 분석]
    B --> C[DB 컬럼 매핑]
    C --> D[화면 스키마 생성]
    D --> E[Next.js 페이지 생성]
    E --> F[미리보기]
```

**Step 1: Excel 업로드** (작업 3️⃣)
- UI에서 `부서별원가.xlsx` 업로드

**Step 2: Gemini 분석** (작업 2️⃣ + 4️⃣)
- 헤더 행 인식
- 컬럼명 추출: "부서명", "월", "금액", "비율", "비고"

**Step 3: DB 매핑** (작업 1️⃣ + 4️⃣)
- "부서명" → `new_doi_cost_material.dept_nm`
- "금액" → `new_doi_cost_material.cost_amt`

**Step 4: 화면 생성**
- TanStack Table 그리드 코드 생성
- tRPC API 엔드포인트 생성
- Next.js 페이지 생성

**Step 5: 결과 확인**
- `http://localhost:3000/cost/dept-monthly` 접속
- 자동 생성된 화면 확인

---

## ⚡ 빠른 시작 (30분 버전)

**최소한으로 바로 작업할 수 있는 항목:**

```bash
# 1. Gemini Helper 유틸리티 생성 (5분)
mkdir -p src/lib
touch src/lib/gemini.ts

# 2. 간단한 테스트 스크립트 (10분)
touch scripts/test_gemini_excel.ts

# 3. 샘플 Excel 준비 (5분)
mkdir -p data/sample_excel

# 4. 테스트 실행 (10분)
npm run test:gemini
```

---

## 📊 작업별 예상 시간 및 우선순위

| 작업 | 시간 | 우선순위 | 즉시 가능 | 의존성 |
|------|------|----------|-----------|--------|
| 4️⃣ Gemini Helper | 20분 | ⭐⭐⭐⭐⭐ | ✅ | 없음 |
| 5️⃣ 샘플 Excel | 10분 | ⭐⭐⭐⭐⭐ | ✅ | 없음 |
| 1️⃣ DB 메타데이터 | 30분 | ⭐⭐⭐⭐ | ✅ | Prisma |
| 2️⃣ Excel 분석 | 1시간 | ⭐⭐⭐⭐ | ✅ | 4️⃣ |
| 3️⃣ 업로드 UI | 45분 | ⭐⭐⭐ | ✅ | 2️⃣, 4️⃣ |
| 6️⃣ 보안 강화 | 15분 | ⭐⭐⭐ | ✅ | 없음 |

**권장 순서:**
1. 4️⃣ Gemini Helper (기반 유틸리티)
2. 5️⃣ 샘플 Excel (테스트 데이터)
3. 2️⃣ Excel 분석 (핵심 기능)
4. 1️⃣ DB 메타데이터 (매핑 준비)
5. 3️⃣ 업로드 UI (사용자 인터페이스)
6. 6️⃣ 보안 강화 (마무리)

---

## 🎯 오늘의 목표 (완료 가능)

**달성 목표:**
- [x] Gemini API 연결 ✅ (완료!)
- [ ] Gemini Helper 유틸리티 구현
- [ ] Excel 구조 분석 프로토타입 완성
- [ ] 샘플 Excel 업로드 → Gemini 분석 → 결과 출력

**성공 조건:**
```bash
# 이 명령어가 성공하면 오늘의 목표 달성!
npm run test:excel-analysis
# 예상 출력:
# ✅ Excel 파일 읽기 성공
# ✅ Gemini 구조 분석 완료
# ✅ 헤더 행 인식: 2번째 행
# ✅ 컬럼 5개 인식 완료
```

---

## 💡 추가 아이디어

### A. Gemini 프롬프트 템플릿 라이브러리
```typescript
// src/lib/prompts/excel-analysis.ts
export const PROMPTS = {
  analyzeStructure: (rows: string[][]) => `...`,
  mapToDB: (column: string, dbMeta: any) => `...`,
  generateChart: (data: any) => `...`,
};
```

### B. 로깅 시스템
```typescript
// src/lib/logger.ts
export function logGeminiCall(
  operation: string,
  input: any,
  output: any,
  duration: number
) {
  console.log({
    timestamp: new Date(),
    operation,
    inputLength: JSON.stringify(input).length,
    outputLength: output.length,
    duration,
    cost: calculateCost(input, output), // Token 기반 비용 계산
  });
}
```

### C. 캐싱 전략 (Redis 준비)
```typescript
// Week 3부터 사용
import { Redis } from 'ioredis';

export async function getCachedAnalysis(
  excelHash: string
) {
  const cached = await redis.get(`excel:${excelHash}`);
  if (cached) return JSON.parse(cached);
  
  // Gemini 호출
  const result = await analyzeExcel(...);
  
  // 캐시 저장 (24시간)
  await redis.set(`excel:${excelHash}`, JSON.stringify(result), 'EX', 86400);
  
  return result;
}
```

---

## 🚀 시작 명령어

```bash
# 1. 작업 디렉토리로 이동
cd /home/roarm_m3/ai-factory-lab

# 2. 필요한 패키지 설치
npm install @google/generative-ai xlsx

# 3. Gemini Helper 생성
mkdir -p src/lib
cat > src/lib/gemini.ts << 'EOF'
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function analyzeExcel(prompt: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const result = await model.generateContent(prompt);
  return result.response.text();
}
EOF

# 4. 테스트 스크립트 생성
mkdir -p scripts
cat > scripts/test_excel_analysis.ts << 'EOF'
import * as XLSX from 'xlsx';
import { analyzeExcel } from '../src/lib/gemini';

async function main() {
  console.log('🚀 Excel 분석 테스트 시작...\n');
  
  // 간단한 테스트 데이터
  const testData = [
    ['부서명', '월', '금액', '비율'],
    ['개발팀', '1월', '1000000', '15%'],
    ['영업팀', '1월', '800000', '12%']
  ];
  
  const prompt = `
  다음 Excel 데이터를 분석해주세요:
  ${JSON.stringify(testData, null, 2)}
  
  1. 헤더는 몇 번째 행인가?
  2. 각 컬럼의 데이터 타입은?
  
  JSON으로 답변해주세요.
  `;
  
  const result = await analyzeExcel(prompt);
  console.log('✅ Gemini 분석 결과:');
  console.log(result);
}

main();
EOF

# 5. 실행!
npx tsx scripts/test_excel_analysis.ts
```

---

**다음 단계:** 위 명령어 실행 후 결과를 확인하고, 필요한 작업을 선택하여 진행하세요! 🎯
