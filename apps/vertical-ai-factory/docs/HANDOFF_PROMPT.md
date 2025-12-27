# Knowledge Graph 확장 프로젝트 - 후속 작업 프롬프트

> 작성일: 2025-12-27
> 이전 채팅 요약 및 후속 작업 안내

---

## 1. 이번 세션 완료 작업 (2025-12-27)

### 1.1 Knowledge Graph 확장 스키마 구현 ✅

**목표:** 단순 데이터 사전 → 논리적 추론 가능한 KG 확장

| 항목 | 이전 | 이후 |
|------|------|------|
| 총 노드 | 131개 | **170개** (+39) |
| 총 엣지 | 111개 | **164개** (+53) |
| Node Types | 4개 | **10개** |
| 로직 레이어 | 1개 | **4개** |

**구현된 3가지 로직 레이어:**

| 레이어 | 용도 | 신규 노드 |
|--------|------|----------|
| **Relational Logic** | SQL JOIN 자동 생성 | JOIN_KEY (4개) |
| **UI Logic** | 화면 컴포넌트 추천 | UI_COMPONENT (7), UI_PATTERN (11) |
| **Process Logic** | 업무 흐름 정의 | PROCESS (3), ACTIVITY (12) |

### 1.2 신규 파일 생성

```
apps/vertical-ai-factory/src/infrastructure/
├── knowledge_graph_extended.py       # 확장 KG 클래스 (500+ lines) - NEW
├── test_knowledge_graph_extended.py  # 테스트 스크립트 - NEW
└── database/
    └── init_knowledge_graph.py       # 확장 초기화 함수 추가

apps/vertical-ai-factory/src/
├── api_server.py                     # 3개 API 엔드포인트 추가
└── visualization/
    └── index.html                    # 확장 그래프 탭 추가 (+205 lines)
```

### 1.3 신규 API 엔드포인트

| 엔드포인트 | 용도 |
|-----------|------|
| `GET /api/graph/extended` | 확장 그래프 전체 (UI, JOIN, Process) |
| `GET /api/graph/ui-component?column_name=order_date` | UI 컴포넌트 추천 |
| `GET /api/graph/join-sql?tables=product_master,bom_master` | JOIN SQL 자동 생성 |

### 1.4 시각화 페이지 업데이트

- **🧠 확장 그래프** 탭 추가 (4번째 탭)
- Stats Bar: 노드/UI/JOIN/프로세스/활동 통계
- UI 컴포넌트 매핑 테이블
- JOIN 관계 테이블
- 프로세스 흐름도 (수주-출하, 구매-지급, 생산수불)

---

## 2. 이전 세션 완료 작업

### 2.1 문서화
- **manufacturing_logic_research.md** - 제조업 비즈니스 로직 리서치
- **production_inventory_standard.md** - 생산수불 표준 정의서
- **production_table_schema.md** - 테이블 설계 문서

### 2.2 PostgreSQL 테이블 생성 (ai_factory_db)
```
bi_src_mes_production  - MES 원천 데이터
bi_mst_product         - 제품 마스터
bi_mst_process         - 공정 마스터
bi_mst_scenario        - 시나리오 마스터
bi_trx_prod_inventory  - 생산수불
bi_hst_process_movement - 공정간 이력
bi_err_inventory_check  - 에러 체크
```

### 2.3 생산수불 시각화
- **🏭 생산수불 흐름** 탭
- `/api/graph/production-flow` API
- D3.js Sankey 다이어그램

---

## 3. 후속 작업 목록

### 3.1 우선순위 높음 ✅ (완료)
- [x] Knowledge Graph 확장 스키마 구현
- [x] 시각화 페이지 통합

### 3.2 남은 작업
- [ ] **Writer Agent에서 JOIN SQL 생성 활용**
  - `generate_join_sql()` 함수를 Writer Agent에서 호출
  - 다중 테이블 질문 시 자동 JOIN SQL 생성

- [ ] **화면 생성기에서 UI 컴포넌트 추천 활용**
  - `get_ui_component()` 함수로 컬럼별 적합 UI 추천
  - Screen Generator 템플릿에 반영

- [ ] **index.html 파일 분리** (1100줄+ → 모듈화)

- [ ] **재고수불 표준 문서 작성**

---

## 4. Knowledge Graph 현재 상태

| 항목 | 값 |
|------|-----|
| 총 노드 | **170개** |
| 총 엣지 | **164개** |
| COLUMN | 39 |
| TABLE | 20 |
| COMPANY_COLUMN | 45 |
| COMPANY_TABLE | 27 |
| **UI_COMPONENT** | 7 |
| **UI_PATTERN** | 11 |
| **JOIN_KEY** | 4 |
| **PROCESS** | 3 |
| **ACTIVITY** | 12 |

---

## 5. 시각화 페이지 접속

```bash
cd apps/vertical-ai-factory/src
../venv/bin/python api_server.py

# 접속 URL
http://localhost:8100/visualization/
```

**탭 구성:**
1. ⚡ LangGraph 워크플로우
2. 🕸️ Knowledge Graph
3. 🧠 확장 그래프 (NEW)
4. 🏭 생산수불 흐름

---

## 6. 테스트 방법

```bash
# 확장 KG 테스트
cd apps/vertical-ai-factory/src
../venv/bin/python -m infrastructure.test_knowledge_graph_extended

# API 테스트
curl "http://localhost:8100/api/graph/ui-component?column_name=order_date"
curl "http://localhost:8100/api/graph/join-sql?tables=product_master,bom_master"
```

---

## 7. 참고 파일

- [knowledge_graph_extended.py](file:///home/roarm_m3/ai-factory-lab/apps/vertical-ai-factory/src/infrastructure/knowledge_graph_extended.py)
- [api_server.py](file:///home/roarm_m3/ai-factory-lab/apps/vertical-ai-factory/src/api_server.py)
- [index.html](file:///home/roarm_m3/ai-factory-lab/apps/vertical-ai-factory/src/visualization/index.html)
- [manufacturing_logic_research.md](file:///home/roarm_m3/ai-factory-lab/apps/vertical-ai-factory/docs/manufacturing_logic_research.md)
