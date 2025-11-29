# Phase 4 SDD v2.0 업그레이드 - 개발자 관점 비판적 검토

**작성일:** 2025년 11월 29일  
**작성자:** 개발팀 (자비스)  
**대상:** 설계팀 (프로젝트 매니저)  
**주제:** SDD v2.0 업그레이드 전략에 대한 기술적 검토 및 우려사항

---

## 📋 요약 (Executive Summary)

설계팀에서 제안한 **SDD v2.0 업그레이드 전략**은 방향성은 올바르나, **현재 시점에서 구현하기에는 리스크가 크다**고 판단됩니다. Phase 3에서 겨우 기본 CRUD를 안정화시킨 상황에서, 복잡한 그리드 레이아웃과 엑셀 업로드를 동시에 구현하는 것은 **기술 부채(Technical Debt)를 급격히 증가**시킬 가능성이 높습니다.

**권장 사항:** 단계적 접근 (Incremental Approach)을 제안합니다.

---

## ✅ 동의하는 부분 (Agreement)

### 1. 문제 인식의 정확성
- ✅ **복잡한 그리드 구조**가 필요하다는 진단은 정확합니다
- ✅ **엑셀 업로드** 기능은 실무에서 필수적입니다
- ✅ **SDD 확장의 필요성**은 충분히 공감합니다

### 2. 기술 선택의 적절성
- ✅ RealGrid의 `Column Layout` 기능 활용은 적절합니다
- ✅ JSON 스키마에 `features` 플래그 추가는 확장성 있는 접근입니다
- ✅ AI Generator 프롬프트 개선 방향성은 올바릅니다

---

## ⚠️ 우려사항 (Critical Concerns)

### 1. **타이밍 문제: 너무 이른 고도화**

**현재 상황:**
```
Phase 3 완료 (2025.11.29 18:45)
├─ StandardPage.vue: 단순 1차원 그리드만 검증 완료
├─ RealGrid 통합: 기본 기능만 작동 확인
├─ 데이터 변환: snakeToCamel() 겨우 안정화
└─ 실제 화면: COST001 단 1개만 구현
```

**제안된 작업:**
```
Phase 4 (제안)
├─ Multi-row Header 구현 (미검증 영역)
├─ Excel Upload 기능 (백엔드 API 전무)
├─ Schema v2.0 전환 (기존 코드 전면 수정)
└─ AI Generator 프롬프트 재설계
```

**문제점:**
- 🔴 **검증되지 않은 기술 스택**: RealGrid Column Layout을 StandardPage에서 한 번도 구현해본 적 없음
- 🔴 **백엔드 미준비**: 엑셀 파싱, 대용량 업로드, 트랜잭션 처리 로직 전무
- 🔴 **테스트 커버리지 부족**: Phase 3 기능조차 충분히 테스트되지 않은 상태

---

### 2. **복잡도 증가에 따른 유지보수 리스크**

#### 2.1 JSON 스키마 복잡도 폭증

**현재 (v1.0):**
```json
{
  "gridColumns": [
    { "field": "deptCode", "header": "부서코드", "width": 120 }
  ]
}
```
- 📊 **복잡도**: 낮음
- 🛠️ **유지보수**: 쉬움
- 🤖 **AI 생성 정확도**: 높음 (90%+)

**제안 (v2.0):**
```json
{
  "gridColumns": [ ... ],
  "gridLayout": [
    "deptName",
    {
      "name": "salesGroup",
      "header": "판매 실적",
      "direction": "horizontal",  // 새로운 속성
      "items": [
        { "name": "qty", "header": "수량" },
        { "name": "price", "header": "단가" },
        { "name": "amount", "header": "금액" }
      ]
    }
  ],
  "features": {
    "excelUpload": {
      "enabled": true,
      "maxSize": "10MB",
      "allowedFormats": ["xlsx", "xls"],
      "validation": {
        "requiredColumns": ["deptCode", "qty"],
        "dataTypes": { "qty": "number" }
      }
    }
  }
}
```
- 📊 **복잡도**: 매우 높음
- 🛠️ **유지보수**: 어려움 (중첩 구조, 다양한 옵션)
- 🤖 **AI 생성 정확도**: 예측 불가 (50%?)

**리스크:**
1. AI가 이런 복잡한 JSON을 정확히 생성할 수 있을까?
2. 생성된 JSON에 오류가 있으면 디버깅이 매우 어려움
3. 스키마 문서화 및 검증 도구 필요

#### 2.2 StandardPage.vue 복잡도 증가

**현재 코드:**
```javascript
// 단순한 컬럼 매핑
this.mainGridConfig.columns = columns.map(col => ({
  name: col.field,
  header: { text: col.header },
  width: col.width
}))
```

**필요한 코드 (예상):**
```javascript
// gridLayout 파싱 로직
if (schemaData.gridLayout) {
  const layoutColumns = this.parseGridLayout(schemaData.gridLayout)
  this.mainGridConfig.columns = layoutColumns
} else {
  // 기존 방식...
}

parseGridLayout(layout) {
  // 재귀적 파싱 필요
  // 그룹 헤더 생성
  // 중첩 레벨 계산
  // 컬럼 순서 보장
  // ... 100+ 줄의 추가 코드
}
```

**문제점:**
- 🔴 코드 복잡도 2~3배 증가
- 🔴 테스트 케이스 10배 증가 필요
- 🔴 버그 발생 확률 급증

---

### 3. **엑셀 업로드의 기술적 함정**

#### 3.1 백엔드 미구현 영역

**필요한 기능:**
```
1. 파일 업로드 처리 (MultipartFile)
2. 엑셀 파싱 (Apache POI / ExcelJS)
3. 데이터 검증 (필수값, 타입, 범위)
4. 에러 처리 (라인별 에러 메시지)
5. 대용량 처리 (Batch Insert, 트랜잭션)
6. 진행률 표시 (WebSocket / SSE)
7. 롤백 전략 (실패 시 전체 롤백 vs 부분 커밋)
```

**현재 상태:**
- ❌ 모두 미구현
- ❌ 관련 라이브러리 미추가
- ❌ 에러 처리 전략 미수립

**예상 개발 기간:**
- 백엔드 구현: **2주**
- 프론트엔드 UI: **1주**
- 통합 테스트: **1주**
- **총 4주** (현실적으로 6주)

#### 3.2 프론트엔드 고려사항

**필요한 UI 컴포넌트:**
```vue
<template>
  <!-- 파일 선택 -->
  <input type="file" accept=".xlsx,.xls" />
  
  <!-- 진행률 표시 -->
  <progress-bar :value="uploadProgress" />
  
  <!-- 에러 목록 -->
  <error-list :errors="validationErrors" />
  
  <!-- 미리보기 그리드 -->
  <preview-grid :data="previewData" />
  
  <!-- 매핑 설정 (컬럼 매칭) -->
  <column-mapper :excelColumns="..." :dbColumns="..." />
</template>
```

**문제점:**
- 🔴 5개 이상의 새로운 컴포넌트 필요
- 🔴 복잡한 상태 관리 (파일 → 파싱 → 검증 → 업로드 → 결과)
- 🔴 UX 설계 미완료 (에러 발생 시 사용자 가이드는?)

---

### 4. **AI Generator 프롬프트의 현실성 문제**

**제안된 프롬프트:**
```python
# Rules
1. If the user implies grouping (e.g., "Sales Data includes Qty, Price, Amount"), 
   create a `gridLayout`.
```

**문제점:**

#### 4.1 자연어 이해의 한계
```
사용자 입력: "판매 실적에 수량, 단가, 금액이 포함됩니다"

AI 해석 가능성:
1. ✅ 정답: gridLayout으로 그룹핑
2. ❌ 오답 1: 3개의 독립 컬럼으로 생성
3. ❌ 오답 2: "판매실적"이라는 1개 컬럼으로 생성
4. ❌ 오답 3: description 필드에만 기록
```

**현실:**
- Gemini 2.5는 여전히 **컨텍스트 이해 오류** 발생 (20~30%)
- 복잡한 중첩 구조는 **JSON 문법 오류** 발생 가능성 높음
- 프롬프트가 복잡해질수록 **재현성(Reproducibility) 감소**

#### 4.2 검증 및 디버깅 어려움
```
현재: JSON 생성 → 바로 사용
제안: JSON 생성 → gridLayout 검증 → features 검증 → API 매핑 검증 → 사용
```

**추가 필요 도구:**
- JSON Schema Validator
- Layout 구조 시각화 도구
- AI 생성 결과 Diff 도구
- 에러 수정 가이드

---

## 💡 대안 제안 (Alternative Approach)

### Phase 4-A: 점진적 확장 (권장)

#### Step 1: 단순 화면 추가 (2주)
```
목표: StandardPage v1.0 안정화
- COST002, COST003 등 3~5개 화면 추가
- 다양한 검색 조건 타입 검증 (날짜 범위, 복수 선택 등)
- 그리드 기능 확장 (정렬, 필터, 페이징)
- 에러 처리 개선
```

**효과:**
- ✅ StandardPage 안정성 검증
- ✅ AI Generator 정확도 향상
- ✅ 팀 학습 곡선 완만화

#### Step 2: 엑셀 다운로드 구현 (1주)
```
목표: 단방향 Excel 기능 먼저 완성
- 현재 그리드 데이터를 Excel로 내보내기
- 템플릿 다운로드 기능
- 서버사이드 Export (대용량 대응)
```

**효과:**
- ✅ Excel 라이브러리 학습
- ✅ 파일 처리 인프라 구축
- ✅ 사용자 피드백 수집

#### Step 3: 엑셀 업로드 구현 (3주)
```
목표: 양방향 Excel 기능 완성
Week 1: 백엔드 파싱 + 검증 로직
Week 2: 프론트엔드 UI + 진행률
Week 3: 통합 테스트 + 에러 처리
```

**효과:**
- ✅ 충분한 개발 시간 확보
- ✅ 단계별 테스트 가능
- ✅ 리스크 분산

#### Step 4: Multi-row Header 구현 (2주)
```
목표: 복잡한 그리드 레이아웃 지원
Week 1: gridLayout 파싱 로직
Week 2: RealGrid Column Layout 적용
```

**효과:**
- ✅ 기본 기능이 안정화된 상태에서 진행
- ✅ 독립적 기능으로 실패해도 전체 영향 적음

---

### Phase 4-B: 공격적 확장 (비권장, 설계팀 제안)

**설계팀 제안을 그대로 진행할 경우:**

#### 예상 일정
```
Week 1-2: Schema v2.0 설계 + AI 프롬프트 수정
Week 3-4: StandardPage gridLayout 구현
Week 5-6: 엑셀 업로드 백엔드
Week 7-8: 엑셀 업로드 프론트엔드
Week 9-10: 통합 테스트 + 버그 수정
```
**총 10주 (2.5개월)**

#### 예상 리스크
```
1. 중간에 막히면 전체 일정 지연 (의존성 높음)
2. 복잡도로 인한 버그 폭증
3. 기존 COST001 화면도 영향받을 가능성
4. AI Generator 품질 저하 가능성
5. 팀 번아웃 (학습량 과다)
```

#### 성공 확률
```
낙관적: 60%
현실적: 40%
비관적: 20%
```

---

## 📊 비교표: Phase 4-A vs 4-B

| 항목 | Phase 4-A (점진적) | Phase 4-B (공격적) |
|------|--------------------|--------------------|
| **개발 기간** | 8주 | 10주 |
| **리스크** | 낮음 | 높음 |
| **성공 확률** | 80% | 40% |
| **학습 곡선** | 완만 | 가파름 |
| **테스트 용이성** | 쉬움 | 어려움 |
| **롤백 가능성** | 높음 | 낮음 |
| **팀 스트레스** | 낮음 | 높음 |
| **최종 품질** | 높음 (검증됨) | 불확실 |

---

## 🎯 최종 권장사항

### 1. **단계적 접근 채택** (Phase 4-A)
- 이유: 현재 시스템이 충분히 성숙하지 않음
- 효과: 안정성 확보 후 고도화

### 2. **엑셀 업로드 우선순위 조정**
- 제안: Phase 5로 미루기
- 이유: 복잡한 그리드보다 더 큰 작업
- 대안: 우선 엑셀 다운로드만 구현

### 3. **Schema v2.0 점진적 확장**
```
v1.0: gridColumns (현재)
v1.1: gridOptions (정렬, 필터) ← 다음 단계
v1.2: gridLayout (그룹핑) ← 그 다음
v2.0: features (업로드) ← 마지막
```

### 4. **AI Generator 개선 우선**
- 현재 프롬프트로 10개 화면 생성 후 정확도 측정
- 오류 패턴 분석 → 프롬프트 개선
- 그 다음에 복잡한 기능 추가

---

## ❓ 질문사항 (설계팀 응답 요청)

### Q1. 비즈니스 우선순위
```
Q: 엑셀 업로드가 정말 "지금 당장" 필요한가요?
   아니면 3개월 후에 구현해도 되나요?

이유: 개발 일정과 품질에 큰 영향을 미칩니다.
```

### Q2. 복잡한 그리드의 실제 사용 빈도
```
Q: Multi-row Header를 필요로 하는 화면이 몇 개나 되나요?
   전체 화면 중 몇 %인가요?

이유: 10% 미만이면 별도 컴포넌트로 분리하는 게 나을 수 있습니다.
```

### Q3. 허용 가능한 수동 작업 범위
```
Q: 복잡한 화면은 AI가 80% 생성하고, 나머지 20%는 
   개발자가 수동으로 조정하는 방식도 괜찮으신가요?

이유: 100% 자동화는 현실적으로 매우 어렵습니다.
```

### Q4. 예산 및 일정
```
Q: Phase 4에 할당 가능한 기간은 얼마인가요?
   추가 개발 인력 투입 가능한가요?

이유: 리소스에 따라 전략을 조정해야 합니다.
```

---

## 🤝 제안: 협의 필요 사항

### 1주차 목표 재조정
```
설계팀 제안:
- Schema v2.0 설계 완료
- AI Generator 프롬프트 수정

개발팀 제안:
- COST002, COST003 화면 생성 (기존 방식)
- StandardPage 안정성 테스트
- 엑셀 다운로드 POC (Proof of Concept)
```

### 의사결정 회의 제안
```
참석자: 설계팀 PM, 개발팀 리드, 아키텍트
안건:
  1. Phase 4 범위 조정
  2. 엑셀 업로드 우선순위
  3. Multi-row Header 필요성 검증
  4. 일정 및 리소스 협의

목표: 현실적이고 달성 가능한 목표 설정
```

---

## 📝 결론

**설계팀의 비전과 방향성에는 전적으로 동의합니다.** 

하지만 **"When"과 "How"**에 대해서는 신중한 접근이 필요합니다.

> "Move fast and break things"보다  
> "Move steady and build things right"가  
> 현 시점에 더 적합합니다.

**Phase 3에서 우리가 배운 교훈:**
- Vue 2 → Vue 3 전환으로 RealGrid 통합 2주 소요
- 스네이크↔카멜 케이스 문제로 1일 소요
- CSS 로딩 문제로 반나절 소요

**결론:**
- ✅ Phase 4-A (점진적 확장) 권장
- ⚠️ Phase 4-B (공격적 확장) 비권장
- 🤝 협의를 통한 최종 결정 요청

---

**작성:** 개발팀 자비스  
**검토 요청:** 설계팀 PM  
**회신 기한:** 2025년 12월 2일까지
