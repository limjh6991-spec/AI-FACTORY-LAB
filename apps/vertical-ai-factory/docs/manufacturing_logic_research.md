# 제조업 비즈니스 로직 리서치

> Knowledge Graph 확장을 위한 제조업 핵심 로직 정리
> 작성일: 2025-12-27

---

## 1. Knowledge Graph 확장 구조 제안

### 현재 구조 (Layer 1: 스키마 매핑)
```
bi_common_code: 표준 테이블/컬럼명 → 회사별 매핑
```

### 확장 구조 제안

```
┌────────────────────────────────────────────────────────────┐
│                  Knowledge Graph 3-Layer                   │
├────────────────────────────────────────────────────────────┤
│  Layer 1: 스키마 매핑 (bi_common_code) - 기존              │
│  ├─ 표준 테이블명 → 회사별 테이블명                         │
│  └─ 표준 컬럼명 → 회사별 컬럼명                             │
├────────────────────────────────────────────────────────────┤
│  Layer 2: 비즈니스 로직 (bi_logic_rules) - NEW             │
│  ├─ 원가계산 로직 (직접재료비, 직접노무비, 제조간접비)        │
│  ├─ 재고평가 로직 (FIFO, 이동평균, 표준원가)                 │
│  ├─ 생산수불 로직 (입출고, 재공품, 완제품)                   │
│  └─ KPI 계산 로직 (수율, 가동률, 불량률)                    │
├────────────────────────────────────────────────────────────┤
│  Layer 3: 시뮬레이션 규칙 (bi_simulation_rules) - NEW      │
│  ├─ 원가절감 시나리오                                       │
│  ├─ 생산계획 최적화 (OR-Tools 연동)                         │
│  └─ What-if 분석 파라미터                                   │
└────────────────────────────────────────────────────────────┘
```

---

## 2. 제조업 핵심 로직 카테고리

### 2.1 원가계산 (Cost Accounting)

| 로직명 | 수식 | 설명 |
|--------|------|------|
| **직접재료비** | `SUM(qty * unit_price)` | 제품에 직접 투입되는 원재료 비용 |
| **직접노무비** | `hours_worked * hourly_rate` | 생산에 직접 참여하는 인건비 |
| **제조간접비** | `총간접비 / 배부기준` | 공장 임대료, 감가상각, 동력비 등 |
| **제조원가** | `직접재료비 + 직접노무비 + 제조간접비` | 총 제조원가 |
| **단위당 원가** | `제조원가 / 생산수량` | 제품 1개당 원가 |

**회사별 차이 예시:**
| 회사 | 직접재료비 계산 방식 |
|------|---------------------|
| BINARY | `SUM(qty * last_purchase_price)` - 최근매입가 |
| DOU | `SUM(qty * weighted_avg_price)` - 가중평균 |
| DOU_MES | `SUM(qty * standard_cost)` - 표준원가 |

---

### 2.2 재고평가 (Inventory Valuation)

| 방법 | 원리 | 적용 시나리오 |
|------|------|--------------|
| **FIFO (선입선출)** | 먼저 들어온 재고가 먼저 출고 | 가격 상승기에 유리 |
| **이동평균** | 입고 시마다 평균단가 재계산 | 가격 변동 심한 품목 |
| **표준원가** | 미리 설정한 원가 사용 | 대량생산, 원가관리 용이 |
| **LIFO (후입선출)** | 나중 들어온 재고가 먼저 출고 | K-IFRS 불허 |

**수식:**
```python
# FIFO
cost = sum(layer.qty * layer.price for layer in fifo_layers[:qty_needed])

# 이동평균
avg_price = total_inventory_value / total_qty
cost = qty * avg_price

# 표준원가
cost = qty * standard_cost
```

---

### 2.3 생산수불 (Production Inventory Flow)

```
원재료 입고 → 생산투입 → 재공품(WIP) → 완제품 → 출하
     ↓            ↓           ↓          ↓
  자재창고      생산라인      반제품창고    제품창고
```

**핵심 트랜잭션:**
| 구분 | 트랜잭션 | 재고 영향 |
|------|----------|----------|
| 자재입고 | `MAT_RECEIPT` | 원재료 + |
| 생산출고 | `PROD_ISSUE` | 원재료 -, WIP + |
| 생산완료 | `PROD_COMPLETE` | WIP -, 완제품 + |
| 제품출하 | `SHIP_OUT` | 완제품 - |
| 불량처리 | `DEFECT_WRITE_OFF` | WIP or 완제품 - |

---

### 2.4 생산관리 KPI

| KPI | 수식 | 목표 |
|-----|------|------|
| **수율 (Yield)** | `양품수량 / 투입수량 * 100` | ≥ 95% |
| **가동률** | `실제가동시간 / 계획가동시간 * 100` | ≥ 85% |
| **불량률** | `불량수량 / 생산수량 * 100` | ≤ 2% |
| **납기준수율** | `정시납품건수 / 총납품건수 * 100` | ≥ 98% |
| **재고회전율** | `매출원가 / 평균재고` | 높을수록 좋음 |

---

### 2.5 재공품 평가 (WIP Valuation)

재공품(Work-in-Progress)은 생산 공정 중에 있는 미완성품으로, 원재료와 완제품 사이의 재고입니다.

**환산량 (Equivalent Units of Production):**
```
환산량 = 물리적 수량 × 완성도(%)
```

| 평가 방법 | 설명 | 적용 |
|-----------|------|------|
| **평균법** | 기초 재공품 + 당기 투입 합산 평균 | 단순, 일반적 |
| **선입선출법 (FIFO)** | 기초 재공품과 당기 투입 분리 계산 | 정확, 비용 변동 큰 경우 |

**원가요소별 완성도 예시:**
| 원가 요소 | 투입 시점 | 완성도 |
|-----------|----------|--------|
| 직접재료비 | 공정 초기 전량 투입 | 100% |
| 가공비 (노무비+간접비) | 공정 전반에 균등 발생 | 50% (평균) |

**재공품 원가 계산:**
```python
# 재공품 원가 = 직접재료비 + 가공비
wip_material_cost = wip_qty * material_unit_cost * material_completion
wip_conversion_cost = wip_qty * conversion_unit_cost * conversion_completion
wip_total_cost = wip_material_cost + wip_conversion_cost
```

---

### 2.6 제조간접비 배부 (Overhead Allocation)

제조간접비는 제품에 직접 추적하기 어려운 비용으로, 합리적인 기준으로 배부해야 합니다.

**배부 방법:**

| 방법 | 배부 기준 | 특징 |
|------|----------|------|
| **직접노무시간법** | 직접노무시간 | 노동집약적 제조 |
| **기계시간법** | 기계가동시간 | 자동화 공정 |
| **직접재료비법** | 직접재료비 금액 | 재료 비중 높은 제품 |
| **ABC (활동기준원가)** | 활동별 원가동인 | 정밀, 복잡한 제품 믹스 |

**전통적 배부율 계산:**
```python
# 예정 배부율 = 예정 제조간접비 / 예정 배부기준
overhead_rate = estimated_overhead / estimated_machine_hours

# 배부액 = 배부율 × 실제 배부기준
allocated_overhead = overhead_rate * actual_machine_hours
```

**ABC (활동기준원가) 단계:**
1. 활동 식별 (셋업, 검사, 자재 이동 등)
2. 활동별 원가풀 집계
3. 원가동인 결정 (셋업 횟수, 검사 횟수 등)
4. 활동률 계산 = 활동원가 / 원가동인 수량
5. 제품별 원가 배부

**배부차이 처리:**
```
배부차이 = 실제 제조간접비 - 배부된 제조간접비
├─ 과대배부 (실제 < 배부): 매출원가 감소 조정
└─ 과소배부 (실제 > 배부): 매출원가 증가 조정
```

---

### 2.7 원가 회계 전표 (Journal Entries)

**제조원가 흐름에 따른 기표:**

```
원재료 → 재공품 → 제품 → 매출원가
```

| 거래 | 차변 | 대변 |
|------|------|------|
| **원재료 매입** | 원재료 (자산) | 현금/외상매입금 |
| **원재료 투입 (직접재료비)** | 재공품 (자산) | 원재료 (자산) |
| **직접노무비 발생** | 재공품 (자산) | 미지급임금 |
| **제조간접비 발생** | 제조간접비 | 현금/감가상각누계액 등 |
| **제조간접비 배부** | 재공품 (자산) | 제조간접비 |
| **제품 완성** | 제품 (자산) | 재공품 (자산) |
| **제품 판매** | 매출원가 (비용) | 제품 (자산) |

**전표 예시 (Python dict):**
```python
journal_entries = [
    # 원재료 매입
    {"date": "2024-10-01", "dr": "원재료", "cr": "현금", "amount": 1000000},
    
    # 생산 투입
    {"date": "2024-10-05", "dr": "재공품", "cr": "원재료", "amount": 800000},
    
    # 제조간접비 배부
    {"date": "2024-10-31", "dr": "재공품", "cr": "제조간접비", "amount": 200000},
    
    # 제품 완성
    {"date": "2024-10-31", "dr": "제품", "cr": "재공품", "amount": 1000000},
    
    # 판매
    {"date": "2024-10-31", "dr": "매출원가", "cr": "제품", "amount": 900000},
]
```

**매출원가 계산:**
```
매출원가 = 기초제품재고 + 당기제품제조원가 - 기말제품재고
```

---

### 2.8 설비 가동시간 (Equipment Working Time)

**시간 구분:**

```
┌─────────────────────────────────────────────────────────────┐
│  카렌다 시간 (Calendar Time) - 24h × 365d                   │
├─────────────────────────────────────────────────────────────┤
│  부하 시간 (Load Time)                                       │
│  = 카렌다 시간 - 휴지 로스 (정기보수, 수주부족)               │
├─────────────────────────────────────────────────────────────┤
│  가동 시간 (Operating Time)                                  │
│  = 부하 시간 - 정지 로스 (고장, 준비교체, 조정)               │
├─────────────────────────────────────────────────────────────┤
│  실질 가동시간 (Net Operating Time)                          │
│  = 가동 시간 - 성능 로스 (잠깐정지, 속도저하)                 │
├─────────────────────────────────────────────────────────────┤
│  가치 가동시간 (Value-Added Time)                            │
│  = 실질 가동시간 - 불량 로스 (불량품, 재가공)                 │
└─────────────────────────────────────────────────────────────┘
```

**핵심 지표:**

| 지표 | 수식 | 설명 |
|------|------|------|
| **OEE (설비종합효율)** | `가용성 × 성능 × 품질` | 설비 효율성 종합 지표 |
| **가용성 (Availability)** | `가동시간 / 부하시간` | 정지 손실 반영 |
| **성능 (Performance)** | `실질가동시간 / 가동시간` | 속도 손실 반영 |
| **품질 (Quality)** | `양품수량 / 총생산수량` | 불량 손실 반영 |
| **MTBF (평균무고장시간)** | `총가동시간 / 고장횟수` | 신뢰성 지표 |
| **MTTR (평균수리시간)** | `총수리시간 / 수리횟수` | 유지보수 효율 |

**OEE 계산 예시:**
```python
# OEE 계산
availability = operating_time / load_time  # 예: 0.90
performance = (ideal_cycle_time * total_pieces) / operating_time  # 예: 0.95  
quality = good_pieces / total_pieces  # 예: 0.99

oee = availability * performance * quality  # 예: 0.847 (84.7%)

# MTBF / MTTR
mtbf = total_operating_time / number_of_failures  # 예: 200시간
mttr = total_repair_time / number_of_repairs  # 예: 2시간

# 가용성 (MTBF 기반)
availability_mtbf = mtbf / (mtbf + mttr)  # 예: 200/(200+2) = 99%
```

**OEE 벤치마크:**
| 수준 | OEE | 설명 |
|------|-----|------|
| World Class | ≥ 85% | 세계 최고 수준 |
| Good | 60-85% | 개선 여지 있음 |
| Low | < 60% | 즉각 개선 필요 |

---

## 3. bi_logic_rules 테이블 설계

```sql
CREATE TABLE bi_logic_rules (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL,      -- COST, INVENTORY, PRODUCTION, KPI
    logic_name VARCHAR(100) NOT NULL,   -- material_cost, fifo_valuation
    logic_type VARCHAR(30) NOT NULL,    -- FORMULA, METHOD, CONDITION
    company_code VARCHAR(20),            -- NULL = 기본값, BINARY, DOU, DOU_MES
    formula TEXT,                         -- SQL 또는 Python 수식
    parameters JSONB,                     -- 추가 파라미터
    description TEXT,
    priority INT DEFAULT 0,              -- 우선순위 (높을수록 우선)
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(category, logic_name, company_code)
);

-- 인덱스
CREATE INDEX idx_logic_category ON bi_logic_rules(category);
CREATE INDEX idx_logic_company ON bi_logic_rules(company_code);
```

---

## 4. 예시 데이터

```sql
-- 원가계산 로직
INSERT INTO bi_logic_rules (category, logic_name, logic_type, company_code, formula, description) VALUES
('COST', 'material_cost', 'FORMULA', NULL, 'SUM(qty * unit_price)', '직접재료비 기본'),
('COST', 'material_cost', 'FORMULA', 'BINARY', 'SUM(qty * last_purchase_price)', 'BINARY: 최근매입가 사용'),
('COST', 'material_cost', 'FORMULA', 'DOU', 'SUM(qty * weighted_avg_price)', 'DOU: 가중평균 사용'),
('COST', 'labor_cost', 'FORMULA', NULL, 'hours * hourly_rate', '직접노무비'),
('COST', 'overhead_rate', 'FORMULA', NULL, 'total_overhead / total_labor_hours', '제조간접비 배부율');

-- 재고평가 로직
INSERT INTO bi_logic_rules (category, logic_name, logic_type, company_code, formula, description) VALUES
('INVENTORY', 'valuation_method', 'METHOD', 'BINARY', 'FIFO', '선입선출법'),
('INVENTORY', 'valuation_method', 'METHOD', 'DOU', 'MOVING_AVG', '이동평균법'),
('INVENTORY', 'valuation_method', 'METHOD', 'DOU_MES', 'STANDARD', '표준원가법');

-- 재공품 평가 로직
INSERT INTO bi_logic_rules (category, logic_name, logic_type, company_code, formula, description) VALUES
('WIP', 'wip_valuation', 'METHOD', NULL, 'WEIGHTED_AVG', '재공품 평균법'),
('WIP', 'wip_valuation', 'METHOD', 'BINARY', 'FIFO', '재공품 선입선출법'),
('WIP', 'equivalent_units', 'FORMULA', NULL, 'physical_qty * completion_rate', '환산량 계산'),
('WIP', 'wip_material_cost', 'FORMULA', NULL, 'wip_qty * material_unit_cost * material_completion', '재공품 재료비'),
('WIP', 'wip_conversion_cost', 'FORMULA', NULL, 'wip_qty * conversion_unit_cost * conversion_completion', '재공품 가공비');

-- 제조간접비 배부 로직
INSERT INTO bi_logic_rules (category, logic_name, logic_type, company_code, formula, description) VALUES
('OVERHEAD', 'allocation_base', 'METHOD', NULL, 'MACHINE_HOURS', '기계시간 기준 배부'),
('OVERHEAD', 'allocation_base', 'METHOD', 'BINARY', 'LABOR_HOURS', '노무시간 기준 배부'),
('OVERHEAD', 'allocation_base', 'METHOD', 'DOU', 'DIRECT_MATERIAL', '직접재료비 기준 배부'),
('OVERHEAD', 'predetermined_rate', 'FORMULA', NULL, 'estimated_overhead / estimated_base', '예정배부율'),
('OVERHEAD', 'variance', 'FORMULA', NULL, 'actual_overhead - applied_overhead', '배부차이'),
('OVERHEAD', 'abc_setup_rate', 'FORMULA', NULL, 'setup_cost_pool / number_of_setups', 'ABC: 셋업 활동률'),
('OVERHEAD', 'abc_inspection_rate', 'FORMULA', NULL, 'inspection_cost_pool / number_of_inspections', 'ABC: 검사 활동률');

-- 회계 전표 로직
INSERT INTO bi_logic_rules (category, logic_name, logic_type, company_code, formula, description) VALUES
('JOURNAL', 'mat_receipt', 'ENTRY', NULL, 'DR:원재료 / CR:현금', '원재료 매입'),
('JOURNAL', 'mat_issue', 'ENTRY', NULL, 'DR:재공품 / CR:원재료', '원재료 투입'),
('JOURNAL', 'labor_accrual', 'ENTRY', NULL, 'DR:재공품 / CR:미지급임금', '노무비 발생'),
('JOURNAL', 'overhead_apply', 'ENTRY', NULL, 'DR:재공품 / CR:제조간접비', '제조간접비 배부'),
('JOURNAL', 'prod_complete', 'ENTRY', NULL, 'DR:제품 / CR:재공품', '제품 완성'),
('JOURNAL', 'cogs_recognize', 'ENTRY', NULL, 'DR:매출원가 / CR:제품', '매출원가 인식');

-- 설비 가동시간 로직
INSERT INTO bi_logic_rules (category, logic_name, logic_type, company_code, formula, description) VALUES
('EQUIPMENT', 'oee', 'FORMULA', NULL, 'availability * performance * quality', '설비종합효율'),
('EQUIPMENT', 'availability', 'FORMULA', NULL, 'operating_time / load_time', '가용성'),
('EQUIPMENT', 'performance', 'FORMULA', NULL, '(ideal_cycle_time * total_pieces) / operating_time', '성능'),
('EQUIPMENT', 'quality', 'FORMULA', NULL, 'good_pieces / total_pieces', '품질'),
('EQUIPMENT', 'mtbf', 'FORMULA', NULL, 'total_operating_time / number_of_failures', '평균무고장시간'),
('EQUIPMENT', 'mttr', 'FORMULA', NULL, 'total_repair_time / number_of_repairs', '평균수리시간'),
('EQUIPMENT', 'availability_mtbf', 'FORMULA', NULL, 'mtbf / (mtbf + mttr)', '가용성(MTBF기반)');

-- KPI 로직
INSERT INTO bi_logic_rules (category, logic_name, logic_type, company_code, formula, description) VALUES
('KPI', 'yield_rate', 'FORMULA', NULL, 'good_qty / input_qty * 100', '수율'),
('KPI', 'utilization', 'FORMULA', NULL, 'actual_hours / planned_hours * 100', '가동률'),
('KPI', 'defect_rate', 'FORMULA', NULL, 'defect_qty / total_qty * 100', '불량률'),
('KPI', 'inventory_turnover', 'FORMULA', NULL, 'cogs / avg_inventory', '재고회전율'),
('KPI', 'on_time_delivery', 'FORMULA', NULL, 'on_time_deliveries / total_deliveries * 100', '납기준수율');
```

---

## 5. 시뮬레이션 & 최적화 연동 (OR-Tools)

### 5.1 원가절감 시뮬레이션

```python
# What-if 시나리오 예시
scenarios = [
    {"name": "자재비 10% 절감", "param": "material_cost", "delta": -0.10},
    {"name": "수율 5% 개선", "param": "yield_rate", "delta": +0.05},
    {"name": "가동률 10% 향상", "param": "utilization", "delta": +0.10},
]

def simulate_cost_reduction(base_cost, scenario):
    if scenario['param'] == 'material_cost':
        return base_cost['material'] * (1 + scenario['delta'])
    # ... 기타 시나리오
```

### 5.2 생산계획 최적화 (OR-Tools)

```python
from ortools.sat.python import cp_model

# Job Shop Scheduling 최적화
# 목표: makespan 최소화, 납기 준수, 자원 활용 극대화
model = cp_model.CpModel()
# ... (기존 production-plan 워크플로우 참조)
```

---

## 6. Knowledge Graph 통합 방안

```
┌──────────────────────────────────────────────────────┐
│              AI Agent 질문 처리 흐름                  │
├──────────────────────────────────────────────────────┤
│  "BINARY 회사의 10월 제조원가 분석해줘"               │
│                     │                                 │
│                     ▼                                 │
│  1. graph_context: bi_common_code에서                 │
│     - BINARY의 원가 테이블 매핑 조회                  │
│     - bi_cost_mst → 표준명: cost_master               │
│                     │                                 │
│                     ▼                                 │
│  2. logic_context: bi_logic_rules에서                 │
│     - BINARY의 원가계산 로직 조회                     │
│     - material_cost = SUM(qty * last_purchase_price)  │
│                     │                                 │
│                     ▼                                 │
│  3. SQL 생성 (Writer Agent)                           │
│     - 테이블 매핑 + 로직 적용                         │
└──────────────────────────────────────────────────────┘
```

---

## 7. 다음 단계

1. **bi_logic_rules 테이블 생성** (ai_factory_db)
2. **Knowledge Graph 모듈 확장** (logic_context 추가)
3. **Analyst/Writer Agent 업데이트** (로직 컨텍스트 활용)
4. **시각화 페이지 업데이트** (로직 노드 추가)

---

**참고 자료:**
- SAP 원가관리 로직
- MES 생산관리 표준
- OR-Tools 생산계획 최적화
- K-IFRS 재고자산 평가기준
