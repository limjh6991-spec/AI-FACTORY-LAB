# Knowledge Graph 확장 프로젝트 - 화면 설계 기능 구현 완료

> 작성일: 2025-12-29
> 주요 업데이트: KG 기반 화면 설계 + DOU dw 스키마 통합

---

## 1. 최신 세션 완료 작업 (2025-12-29)

### 1.1 KG 기반 화면 설계 기능 구현 ✅

**목표:** 자연어 요청 → Knowledge Graph 분석 → RealGrid 화면 구조 JSON 생성

```
"도우회사의 생산실적 표현 화면 설계"
        ↓ parse_screen_request()
{ company: DOU, domain: production }
        ↓ find_screen_related_nodes()
{ tables: 38, columns: 24, processes: 1 }
        ↓ build_screen_context()
{ selected_tables, join_keys, template }
        ↓ generate_realgrid_screen()
{ screenId, grid: { columns, dataSource } }
```

**신규 API:** `POST /api/screen/design`

**시각화 탭:** 🎨 화면 설계 (http://localhost:8100/visualization/)

### 1.2 DOU dw 스키마 통합 ✅

**bi_common_code에 54개 레코드 추가**

| 카테고리 | 테이블 수 | 컬럼 수 | 대표 테이블 |
|----------|----------|---------|------------|
| PRODUCTION | 4 | 7 | dw_일별_공정별_생산집계_base, dw_생산일보집계 |
| PROCESS | 4 | 8 | dw_process_mast, dw_step_mast, dw_line_mast |
| EQUIPMENT | 3 | 6 | dw_equipment_mast, dw_설비현황 |
| INVENTORY | 6 | 12 | dw_raw_mat_proc_stock, dw_재공재고집계 |
| QUALITY | 3 | 5 | dw_품질검사, dw_품질검사내역 |
| MATERIAL | 2 | 4 | dw_material_mast, dw_mat_category |
| PRODUCT | 4 | 8 | dw_product_process, dw_model_mast_input |

**Knowledge Graph 확장:**

| 항목 | 이전 | 이후 | 증가 |
|------|------|------|------|
| 노드 | 201 | **237** | +36 |
| DOU 테이블 | 6 | **28** | +22 |
| DOU 컬럼 | 4 | **30** | +26 |

### 1.3 코드 수정

- `knowledge_graph.py`: COMPANY_TABLE/COLUMN 노드에 category 속성 추가
- `knowledge_graph_extended.py`: 화면 설계 메서드 5개 (+480 lines)
- `api_server.py`: POST /api/screen/design 엔드포인트 추가
- `visualization/index.html`: 🎨 화면 설계 탭 추가

---

## 2. 이전 세션 작업 (2025-12-28)

**목표:** 사용자 자연어 → 리포트 화면 자동 생성

| 항목 | 이전 | 이후 |
|------|------|------|
| 총 노드 | 170개 | **201개** (+31) |
| 총 엣지 | 164개 | **196개** (+32) |
| Node Types | 10개 | **15개** |
| 로직 레이어 | 2개 | **3개** (Semantic Layer 추가) |

**신규 Semantic Layer 노드:**

| 노드 타입 | 개수 | 용도 |
|----------|------|------|
| BUSINESS_CONCEPT | 3개 | 비즈니스 개념 (원가분석, 매출현황, 생산수불) |
| UI_TEMPLATE | 3개 | 화면 템플릿 (피벗, 기본, 마스터-디테일) |
| AGGREGATION_RULE | 4개 | 집계 규칙 (SUM, AVG, COUNT) |
| INTENT_PATTERN | 3개 | 자연어 의도 패턴 |
| REPORT_COLUMN | 18개 | 리포트 컬럼 정의 |

**신규 Edge Types:**
- `matches_intent`: INTENT → BUSINESS_CONCEPT
- `requires_column`: CONCEPT → COLUMN
- `renders_as`: CONCEPT → UI_TEMPLATE
- `groups_by`, `pivots_by`, `values_from`: 컬럼 역할 정의
- `has_aggregation`: 집계 규칙 연결

### 1.2 핵심 메서드 구현

```python
# Text-to-Report 핵심 API
ekg.generate_report_from_text("원가분석 리포트 만들어줘")
# → 의도 매칭 → 리포트 정의 추론 → AG Grid columnDefs 생성
```

**테스트 결과:**
```
💬 "원가분석 리포트 만들어줘"
   ✅ 의도 매칭: 원가분석 리포트 (COST)
   📊 컬럼: GROUP=1, PIVOT=1, VALUE=2
   🖥️ 템플릿: 피벗 그리드 (PIVOT)

💬 "매출현황 보여줘"
   ✅ 의도 매칭: 매출현황 리포트 (SALES)

💬 "생산수불 조회해줘"
   ✅ 의도 매칭: 생산수불 리포트 (PRODUCTION)
```

### 1.3 시각화 수정

- Knowledge Graph API: `node_type` 속성 매핑 수정
- D3.js colorScale: 대문자 타입명 (TABLE, COLUMN 등) 지원
- 노드 크기/라벨 스타일 업데이트

### 1.4 PPT 자동 생성

- `generate_ppt_styled.py`: 2024 트렌드 스타일 적용
- `generate_ppt_final.py`: 도형/다이어그램 추가
- 출력 파일: `생산계획시스템_최종본.pptx`

---

## 2. Knowledge Graph 4-Layer 아키텍처

```
┌─────────────────────────────────────────────────────┐
│  Layer 4: INTENT (NEW)                              │
│  - 자연어 패턴 → 비즈니스 개념 매핑                 │
├─────────────────────────────────────────────────────┤
│  Layer 3: SEMANTIC (NEW)                            │
│  - BUSINESS_CONCEPT, UI_TEMPLATE, AGGREGATION_RULE  │
├─────────────────────────────────────────────────────┤
│  Layer 2: LOGIC                                     │
│  - JOIN_KEY, UI_COMPONENT, PROCESS                  │
├─────────────────────────────────────────────────────┤
│  Layer 1: SCHEMA                                    │
│  - TABLE, COLUMN, COMPANY_TABLE, COMPANY_COLUMN     │
└─────────────────────────────────────────────────────┘
```

---

## 3. 파일 변경 내역

### 신규/수정 파일
```
apps/vertical-ai-factory/src/infrastructure/
├── knowledge_graph_extended.py  # +460 lines (Semantic Layer)

apps/vertical-ai-factory/src/
├── api_server.py                # node_type 매핑 수정
└── visualization/
    └── index.html               # colorScale, 노드 크기 수정

apps/vertical-ai-factory/docs/
├── generate_ppt_styled.py       # 스타일 PPT 스크립트 - NEW
├── generate_ppt_final.py        # 다이어그램 PPT 스크립트 - NEW
└── 생산계획시스템_최종본.pptx   # 생성된 PPT - NEW
```

---

## 4. API 엔드포인트

| 엔드포인트 | 용도 |
|-----------|------|
| `GET /api/graph/knowledge` | Knowledge Graph 전체 (201 노드) |
| `GET /api/graph/extended` | 확장 그래프 (UI, JOIN, Process) |
| `GET /api/graph/ui-component?column_name=` | UI 컴포넌트 추천 |
| `GET /api/graph/join-sql?tables=` | JOIN SQL 자동 생성 |

---

## 5. 다음 단계 (Phase 2-4)

### 5.1 우선순위 높음
- [ ] Text-to-Report API 엔드포인트 추가 (`POST /api/report/generate`)
- [ ] 시각화 페이지에 "AI 리포트 생성" 데모 UI 추가

### 5.2 통합 작업
- [ ] SpacePro AI Demo 페이지에 리포트 생성 기능 연동
- [ ] Writer Agent에서 generate_report_from_text() 활용

### 5.3 확장 작업
- [ ] 추가 비즈니스 개념 정의 (재고현황, 구매현황)
- [ ] 실제 DB 테이블과 리포트 컬럼 매핑

---

## 6. 시각화 접속

```bash
# 서버 실행
cd apps/vertical-ai-factory/src && ../venv/bin/python api_server.py

# 접속
http://localhost:8100/visualization/
```

| 탭 | 내용 |
|---|------|
| 🔄 LangGraph | Multi-Agent 워크플로우 |
| 🕸️ Knowledge Graph | 201 노드, 196 엣지 그래프 |
| 🧠 확장 그래프 | UI/JOIN/Process 정보 |
| 🏭 생산수불 흐름 | Sankey 다이어그램 |

---

## 7. 예시 프롬프트

### Text-to-Report 테스트
```python
from infrastructure.knowledge_graph_extended import get_extended_knowledge_graph

ekg = get_extended_knowledge_graph()
result = ekg.generate_report_from_text("원가분석 리포트 보여줘")
print(result)
# → status: success, intent, report, column_defs, sql
```

### UI 컴포넌트 추천
```python
component = ekg.get_ui_component("order_date")
# → {"component": "DatePicker", "props": {"format": "YYYY-MM-DD"}}
```
