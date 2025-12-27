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

-- KPI 로직
INSERT INTO bi_logic_rules (category, logic_name, logic_type, company_code, formula, description) VALUES
('KPI', 'yield_rate', 'FORMULA', NULL, 'good_qty / input_qty * 100', '수율'),
('KPI', 'utilization', 'FORMULA', NULL, 'actual_hours / planned_hours * 100', '가동률'),
('KPI', 'defect_rate', 'FORMULA', NULL, 'defect_qty / total_qty * 100', '불량률');
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
