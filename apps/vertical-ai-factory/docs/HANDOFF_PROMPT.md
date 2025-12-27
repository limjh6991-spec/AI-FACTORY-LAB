# 생산수불 표준화 프로젝트 - 후속 작업 프롬프트

> 작성일: 2025-12-27
> 이전 채팅 요약 및 후속 작업 안내

---

## 1. 완료된 작업

### 1.1 문서화
- **manufacturing_logic_research.md** - 제조업 비즈니스 로직 리서치
  - 원가계산, 재고평가, 생산수불, KPI
  - WIP 평가, 제조간접비 배부 (ABC costing)
  - 회계 전표 (Journal Entries)
  - 설비 가동시간 (OEE, MTBF, MTTR)
  
- **production_inventory_standard.md** - 생산수불 표준 정의서
  - 공정간 흐름 (Rework 포함)
  - 트랜잭션 코드 표준 (IN/OUT/LOSS/BONUS)
  - BOH/EOH 개념
  - DEFECT/HOLD 처리 흐름
  - 조정(Adjustment) 처리 프로세스

- **production_table_schema.md** - 테이블 설계 문서

### 1.2 PostgreSQL 테이블 생성 (ai_factory_db)
```
bi_src_mes_production  - MES 원천 데이터
bi_mst_product         - 제품 마스터 (3 rows)
bi_mst_process         - 공정 마스터 (7 rows, area_ord 포함)
bi_mst_scenario        - 시나리오 마스터 (ACTUAL/FORECAST/PLAN)
bi_trx_prod_inventory  - 생산수불 (월별 집계, 3 rows)
bi_hst_process_movement - 공정간 이력
bi_err_inventory_check  - 에러 체크
```

### 1.3 시각화 페이지 추가
- **새 탭**: 🏭 생산수불 흐름
- **API**: `/api/graph/production-flow?yyyymm=202410&scenario=ACTUAL-2024`
- **D3.js 공정 흐름도**: 공정간 수량 이동 시각화
- **필터**: 년월, 시나리오 선택

---

## 2. 현재 파일 위치

```
apps/vertical-ai-factory/
├── docs/
│   ├── manufacturing_logic_research.md  # 제조 로직 리서치
│   ├── production_inventory_standard.md  # 생산수불 표준
│   └── production_table_schema.md        # 테이블 설계
├── sql/
│   ├── create_production_tables.sql      # DDL 스크립트
│   └── run_create_tables.py              # 테이블 생성 Python
├── src/
│   ├── api_server.py                     # API 서버 (production-flow 추가됨)
│   └── visualization/
│       └── index.html                    # 시각화 (897줄, 32KB - 분리 필요)
```

---

## 3. 후속 작업 목록

### 3.1 우선순위 높음
- [ ] **index.html 파일 분리** (897줄 → 모듈화)
  - styles.css (CSS 분리)
  - langgraph.js
  - knowledge-graph.js
  - production-flow.js

- [ ] **재고수불 표준 문서 작성**
  - 창고별 재고 관리
  - 입출고 트랜잭션
  - 생산수불 ↔ 재고수불 연계

### 3.2 중간 우선순위
- [ ] **ETL 프로세스 정의**
  - MES → bi_src_mes_production
  - bi_src_mes_production → bi_trx_prod_inventory
  
- [ ] **Knowledge Graph 확장**
  - bi_common_code (현재: 131노드)에 생산 테이블 추가
  - 또는 별도 Production Graph 구성

### 3.3 추후 작업
- [ ] 보고서 생성 기능
- [ ] 에러 체크 자동화 배치
- [ ] 시뮬레이션 연동 (OR-Tools)

---

## 4. Knowledge Graph 현재 상태

| 항목 | 값 |
|------|-----|
| 총 노드 | 131개 |
| 총 엣지 | 111개 |
| COLUMN | 39 |
| TABLE | 20 |
| COMPANY_COLUMN | 45 |
| COMPANY_TABLE | 27 |

**데이터 출처**: `bi_common_code` 테이블 (BINARY, DOU, DOU_MES 회사 매핑)

---

## 5. 시각화 페이지 접속

```bash
# API 서버 시작
cd apps/vertical-ai-factory/src
../venv/bin/python api_server.py

# 접속 URL
http://localhost:8100/visualization/
```

---

## 6. 다음 채팅에서 사용할 프롬프트 예시

### 파일 분리 요청
```
visualization/index.html 파일이 897줄로 커졌어. 
CSS와 JavaScript를 별도 파일로 분리해줘:
- styles.css
- langgraph.js  
- knowledge-graph.js
- production-flow.js
```

### 재고수불 표준 요청
```
생산수불 표준은 완료됐어.
이제 재고수불 표준을 작성해줘.
production_inventory_standard.md 참고해서 
창고 재고 관리, 입출고 트랜잭션 정의해줘.
```

### 전체 현황 확인
```
apps/vertical-ai-factory/docs 폴더의 문서들을 확인하고
현재 진행 상황을 요약해줘.
```

---

## 7. 참고 파일

- [manufacturing_logic_research.md](file:///home/roarm_m3/ai-factory-lab/apps/vertical-ai-factory/docs/manufacturing_logic_research.md)
- [production_inventory_standard.md](file:///home/roarm_m3/ai-factory-lab/apps/vertical-ai-factory/docs/production_inventory_standard.md)
- [production_table_schema.md](file:///home/roarm_m3/ai-factory-lab/apps/vertical-ai-factory/docs/production_table_schema.md)
- [visualization/index.html](file:///home/roarm_m3/ai-factory-lab/apps/vertical-ai-factory/src/visualization/index.html)
