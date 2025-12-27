# 생산수불 테이블 정의서 (Table Schema)

> Vertical AI Factory 생산수불 데이터베이스 스키마
> 작성일: 2025-12-27
> 버전: v1.0

---

## 1. 테이블 구조 개요

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              테이블 계층 구조                                    │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  [Layer 1: Source]       MES 원천 데이터                                         │
│       │                  └─ src_mes_production                                   │
│       │                                                                          │
│       ▼                                                                          │
│  [Layer 2: Master]       마스터 테이블                                           │
│       │                  ├─ mst_product (제품)                                   │
│       │                  ├─ mst_process (공정)                                   │
│       │                  └─ mst_scenario (시나리오)                              │
│       │                                                                          │
│       ▼                                                                          │
│  [Layer 3: Transaction]  가공/집계 테이블                                        │
│       │                  └─ trx_prod_inventory (생산수불)                        │
│       │                                                                          │
│       ▼                                                                          │
│  [Layer 4: History]      이력 테이블                                             │
│       │                  └─ hst_process_movement (공정간 수불 이력)              │
│       │                                                                          │
│       ▼                                                                          │
│  [Layer 5: Validation]   검증 테이블 (선택)                                      │
│                          └─ err_inventory_check (에러 체크)                      │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Source 테이블: MES 원천 데이터

### 2.1 src_mes_production

MES에서 넘어오는 생산 실적 원천 데이터

```sql
CREATE TABLE src_mes_production (
    -- PK
    src_id BIGSERIAL PRIMARY KEY,
    
    -- MES 원천 정보
    mes_trans_id VARCHAR(50) NOT NULL,       -- MES 트랜잭션 ID
    mes_trans_date TIMESTAMP NOT NULL,       -- MES 발생 시각
    mes_plant_code VARCHAR(20) NOT NULL,     -- 공장 코드
    
    -- 공정/제품 정보
    process_code VARCHAR(20) NOT NULL,       -- 공정 코드
    product_code VARCHAR(50) NOT NULL,       -- 제품 코드
    lot_no VARCHAR(50),                       -- Lot 번호 (선택)
    
    -- 수량 정보
    trans_type VARCHAR(20) NOT NULL,         -- 트랜잭션 유형 (IN/OUT/LOSS/BONUS)
    qty DECIMAL(15,4) NOT NULL,              -- 수량
    uom VARCHAR(10) DEFAULT 'EA',            -- 단위
    
    -- 품질 정보
    quality_status VARCHAR(10),              -- GOOD, DEFECT, HOLD
    defect_code VARCHAR(20),                 -- 불량 코드 (선택)
    
    -- 설비 정보
    equipment_code VARCHAR(20),              -- 설비 코드
    worker_id VARCHAR(20),                   -- 작업자 ID
    
    -- 메타 정보
    raw_data JSONB,                          -- MES 원본 데이터 (전체)
    etl_date TIMESTAMP DEFAULT NOW(),        -- ETL 적재 시각
    is_processed BOOLEAN DEFAULT FALSE,      -- 가공 여부
    company_code VARCHAR(20) NOT NULL        -- 회사 코드
);

-- 인덱스
CREATE INDEX idx_src_mes_date ON src_mes_production(mes_trans_date);
CREATE INDEX idx_src_mes_process ON src_mes_production(process_code);
CREATE INDEX idx_src_mes_product ON src_mes_production(product_code);
CREATE INDEX idx_src_mes_processed ON src_mes_production(is_processed);
```

---

## 3. Master 테이블

### 3.1 mst_product (제품 마스터)

```sql
CREATE TABLE mst_product (
    -- PK
    product_code VARCHAR(50) PRIMARY KEY,
    
    -- 기본 정보
    product_name VARCHAR(200) NOT NULL,
    product_type VARCHAR(20),                -- RAW(원재료), WIP(재공품), FG(완제품)
    product_group VARCHAR(50),               -- 제품군
    
    -- 규격 정보
    spec VARCHAR(200),                       -- 규격
    uom VARCHAR(10) DEFAULT 'EA',            -- 기본 단위
    
    -- 원가 정보
    standard_cost DECIMAL(15,4),             -- 표준원가
    
    -- 상태
    is_active BOOLEAN DEFAULT TRUE,
    company_code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### 3.2 mst_process (공정 마스터)

```sql
CREATE TABLE mst_process (
    -- PK
    process_code VARCHAR(20) PRIMARY KEY,
    
    -- 기본 정보
    process_name VARCHAR(100) NOT NULL,
    process_type VARCHAR(20),                -- MAIN(메인), REWORK(재작업), INSP(검사)
    
    -- 공정 순서 (핵심)
    area_code VARCHAR(20),                   -- 영역 코드 (예: FAB, ASSY, TEST)
    area_ord INT NOT NULL,                   -- 영역 내 순서 (1, 2, 3...)
    
    -- 공정간 연결
    prev_process_code VARCHAR(20),           -- 이전 공정
    next_process_code VARCHAR(20),           -- 다음 공정
    rework_process_code VARCHAR(20),         -- Rework 시 이동할 공정
    
    -- 논리적 창고 (Rework용)
    virtual_wh_code VARCHAR(20),             -- 가상 창고 코드
    
    -- 설정
    loss_tolerance DECIMAL(5,4) DEFAULT 0,   -- 손실 허용률 (예: 0.02 = 2%)
    sample_rate DECIMAL(5,4) DEFAULT 0,      -- 샘플 비율
    
    -- 상태
    is_active BOOLEAN DEFAULT TRUE,
    company_code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 공정 순서 조회용 인덱스
CREATE INDEX idx_mst_process_order ON mst_process(area_code, area_ord);
```

### 3.3 mst_scenario (시나리오 마스터)

```sql
CREATE TABLE mst_scenario (
    -- PK
    scenario_code VARCHAR(20) PRIMARY KEY,
    
    -- 기본 정보
    scenario_name VARCHAR(100) NOT NULL,
    scenario_type VARCHAR(20) NOT NULL,      -- ACTUAL(실적), FORECAST(속보), PLAN(계획)
    
    -- 기간 정보
    period_type VARCHAR(10) NOT NULL,        -- DAILY, WEEKLY, MONTHLY, YEARLY
    start_date DATE NOT NULL,                -- 시작일
    end_date DATE NOT NULL,                  -- 종료일
    
    -- 버전 관리
    version INT DEFAULT 1,                   -- 버전
    is_current BOOLEAN DEFAULT FALSE,        -- 현재 사용 버전 여부
    
    -- 설명
    description TEXT,
    
    -- 상태
    is_active BOOLEAN DEFAULT TRUE,
    company_code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    created_by VARCHAR(50)
);

-- 시나리오 유형 설명
COMMENT ON TABLE mst_scenario IS '
시나리오 유형:
- ACTUAL: 생산 실적 (과거 데이터)
- FORECAST: 속보 (향후 3개월 예측)
- PLAN: 계획 (내년 계획)
';
```

---

## 4. Transaction 테이블: 생산수불

### 4.1 trx_prod_inventory (생산수불)

Source 테이블을 기초로 생성한 일별 공정별 생산수불

```sql
CREATE TABLE trx_prod_inventory (
    -- PK
    inv_id BIGSERIAL PRIMARY KEY,
    
    -- 기준 정보
    inv_date DATE NOT NULL,                  -- 기준일
    scenario_code VARCHAR(20) NOT NULL,      -- 시나리오
    process_code VARCHAR(20) NOT NULL,       -- 공정
    product_code VARCHAR(50) NOT NULL,       -- 제품
    
    -- 기초/기말 (BOH/EOH)
    boh_qty DECIMAL(15,4) DEFAULT 0,         -- 기초 재고 (Beginning On Hand)
    eoh_qty DECIMAL(15,4) DEFAULT 0,         -- 기말 재고 (Ending On Hand)
    
    -- Input 수량
    new_input_qty DECIMAL(15,4) DEFAULT 0,   -- 신규 투입
    process_in_qty DECIMAL(15,4) DEFAULT 0,  -- 전공정 수령
    rework_in_qty DECIMAL(15,4) DEFAULT 0,   -- Rework 재투입
    return_in_qty DECIMAL(15,4) DEFAULT 0,   -- 반품 재투입
    bonus_qty DECIMAL(15,4) DEFAULT 0,       -- 보너스
    
    -- Output 수량
    process_out_qty DECIMAL(15,4) DEFAULT 0, -- 다음공정 출고
    goods_out_qty DECIMAL(15,4) DEFAULT 0,   -- 완제품 출고
    defect_out_qty DECIMAL(15,4) DEFAULT 0,  -- 불량 출고
    scrap_out_qty DECIMAL(15,4) DEFAULT 0,   -- 스크랩 출고
    sample_out_qty DECIMAL(15,4) DEFAULT 0,  -- 샘플 출고
    
    -- Loss/Adjust
    loss_qty DECIMAL(15,4) DEFAULT 0,        -- 손실
    adjust_qty DECIMAL(15,4) DEFAULT 0,      -- 조정 (±)
    
    -- 집계
    total_in_qty DECIMAL(15,4) GENERATED ALWAYS AS (
        new_input_qty + process_in_qty + rework_in_qty + return_in_qty + bonus_qty
    ) STORED,
    total_out_qty DECIMAL(15,4) GENERATED ALWAYS AS (
        process_out_qty + goods_out_qty + defect_out_qty + scrap_out_qty + sample_out_qty + loss_qty
    ) STORED,
    
    -- 검증
    balance_check BOOLEAN GENERATED ALWAYS AS (
        eoh_qty = boh_qty + (new_input_qty + process_in_qty + rework_in_qty + return_in_qty + bonus_qty)
                        - (process_out_qty + goods_out_qty + defect_out_qty + scrap_out_qty + sample_out_qty + loss_qty)
                        + adjust_qty
    ) STORED,
    
    -- 메타
    company_code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- UK
    UNIQUE(inv_date, scenario_code, process_code, product_code, company_code)
);

-- 인덱스
CREATE INDEX idx_trx_inv_date ON trx_prod_inventory(inv_date);
CREATE INDEX idx_trx_inv_process ON trx_prod_inventory(process_code);
CREATE INDEX idx_trx_inv_product ON trx_prod_inventory(product_code);
CREATE INDEX idx_trx_inv_scenario ON trx_prod_inventory(scenario_code);
```

---

## 5. History 테이블: 공정간 수불 이력

### 5.1 hst_process_movement (공정간 이동 이력)

생산수불의 공정간 In/Out을 상세 기록

```sql
CREATE TABLE hst_process_movement (
    -- PK
    movement_id BIGSERIAL PRIMARY KEY,
    
    -- 이동 기본 정보
    movement_date DATE NOT NULL,             -- 이동일
    movement_time TIMESTAMP NOT NULL,        -- 이동 시각
    scenario_code VARCHAR(20) NOT NULL,
    
    -- 출발지
    from_process_code VARCHAR(20),           -- 출발 공정 (NULL = 외부 투입)
    from_location_type VARCHAR(20),          -- PROCESS, REWORK_WH, EXTERNAL
    
    -- 도착지
    to_process_code VARCHAR(20),             -- 도착 공정 (NULL = 외부 출고)
    to_location_type VARCHAR(20),            -- PROCESS, REWORK_WH, FG_WH, SCRAP
    
    -- 제품/수량
    product_code VARCHAR(50) NOT NULL,
    lot_no VARCHAR(50),
    qty DECIMAL(15,4) NOT NULL,
    uom VARCHAR(10) DEFAULT 'EA',
    
    -- 품질
    quality_status VARCHAR(10),              -- GOOD, DEFECT, HOLD
    
    -- 트랜잭션 유형
    trans_type VARCHAR(30) NOT NULL,         -- NEW_INPUT, PROCESS_OUT, DEFECT_OUT, etc.
    
    -- 참조
    src_mes_id BIGINT,                       -- src_mes_production 참조
    inv_id BIGINT,                           -- trx_prod_inventory 참조
    
    -- 메타
    remark TEXT,
    company_code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    
    -- FK
    FOREIGN KEY (src_mes_id) REFERENCES src_mes_production(src_id),
    FOREIGN KEY (inv_id) REFERENCES trx_prod_inventory(inv_id)
);

-- 인덱스
CREATE INDEX idx_hst_movement_date ON hst_process_movement(movement_date);
CREATE INDEX idx_hst_movement_from ON hst_process_movement(from_process_code);
CREATE INDEX idx_hst_movement_to ON hst_process_movement(to_process_code);
CREATE INDEX idx_hst_movement_product ON hst_process_movement(product_code);
```

---

## 6. Validation 테이블: 에러 체크 (선택)

> ⚠️ **적용 여부 고민 필요**
> - 장점: 데이터 품질 관리, 문제 추적 용이
> - 단점: 추가 저장 공간, ETL 복잡도 증가

### 6.1 err_inventory_check (에러 체크)

```sql
CREATE TABLE err_inventory_check (
    -- PK
    error_id BIGSERIAL PRIMARY KEY,
    
    -- 에러 발생 위치
    error_date DATE NOT NULL,
    check_type VARCHAR(30) NOT NULL,         -- BALANCE, SEQUENCE, DUPLICATE, etc.
    table_name VARCHAR(50) NOT NULL,         -- 에러 발생 테이블
    record_id BIGINT,                         -- 문제 레코드 ID
    
    -- 에러 상세
    error_code VARCHAR(20) NOT NULL,
    error_message TEXT NOT NULL,
    error_detail JSONB,                      -- 상세 정보 (수량 차이 등)
    
    -- 대상 정보
    process_code VARCHAR(20),
    product_code VARCHAR(50),
    scenario_code VARCHAR(20),
    
    -- 처리 상태
    status VARCHAR(20) DEFAULT 'OPEN',       -- OPEN, RESOLVED, IGNORED
    resolved_at TIMESTAMP,
    resolved_by VARCHAR(50),
    resolution_note TEXT,
    
    -- 메타
    company_code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 에러 유형 정의
COMMENT ON TABLE err_inventory_check IS '
에러 유형 (check_type):
- BALANCE: 수량 밸런스 오류 (EOH ≠ BOH + IN - OUT)
- SEQUENCE: 공정 순서 오류 (area_ord 불일치)
- DUPLICATE: 중복 데이터
- MISSING: 누락 데이터 (공정 스킵)
- NEGATIVE: 음수 재고
- TOLERANCE: 허용 범위 초과 (LOSS > tolerance)
';

-- 인덱스
CREATE INDEX idx_err_check_date ON err_inventory_check(error_date);
CREATE INDEX idx_err_check_status ON err_inventory_check(status);
CREATE INDEX idx_err_check_type ON err_inventory_check(check_type);
```

### 6.2 에러 체크 예시 쿼리

```sql
-- 밸런스 오류 체크
INSERT INTO err_inventory_check (error_date, check_type, table_name, record_id, 
                                  error_code, error_message, error_detail,
                                  process_code, product_code, company_code)
SELECT 
    inv_date,
    'BALANCE',
    'trx_prod_inventory',
    inv_id,
    'ERR_BALANCE_MISMATCH',
    'EOH와 계산값 불일치',
    jsonb_build_object(
        'eoh_qty', eoh_qty,
        'calculated_eoh', boh_qty + total_in_qty - total_out_qty + adjust_qty,
        'difference', eoh_qty - (boh_qty + total_in_qty - total_out_qty + adjust_qty)
    ),
    process_code,
    product_code,
    company_code
FROM trx_prod_inventory
WHERE balance_check = FALSE;
```

---

## 7. 테이블 관계도 (ERD)

```
┌─────────────────────┐
│  src_mes_production │
│  (MES 원천)          │
└──────────┬──────────┘
           │ ETL
           ▼
┌──────────────────────────────────────────────────────────────┐
│                         Master Tables                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │ mst_product │  │ mst_process │  │ mst_scenario│           │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘           │
└─────────┼────────────────┼────────────────┼──────────────────┘
          │                │                │
          ▼                ▼                ▼
     ┌─────────────────────────────────────────┐
     │         trx_prod_inventory              │
     │         (생산수불)                       │
     └────────────────────┬────────────────────┘
                          │
                          ▼
     ┌─────────────────────────────────────────┐
     │         hst_process_movement            │
     │         (공정간 이력)                    │
     └────────────────────┬────────────────────┘
                          │
                          ▼ (선택)
     ┌─────────────────────────────────────────┐
     │         err_inventory_check             │
     │         (에러 체크)                      │
     └─────────────────────────────────────────┘
```

---

## 8. 시나리오별 데이터 흐름

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              시나리오별 데이터 흐름                              │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  ACTUAL (생산 실적)                                                              │
│  └─ MES 실시간 데이터 → src_mes_production → trx_prod_inventory                │
│     └─ 일별 마감 처리                                                           │
│                                                                                  │
│  FORECAST (속보 - 향후 3개월)                                                    │
│  └─ 예측 모델 / 수동 입력 → trx_prod_inventory                                  │
│     └─ 주간/월간 업데이트                                                        │
│                                                                                  │
│  PLAN (계획 - 내년)                                                              │
│  └─ 연간 계획 수립 → trx_prod_inventory                                         │
│     └─ 분기별 리비전                                                             │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 9. 다음 단계

1. ✅ 테이블 정의 완료
2. ⬜ PostgreSQL에 테이블 생성
3. ⬜ 샘플 데이터 생성
4. ⬜ ETL 프로세스 정의
5. ⬜ 에러 체크 테이블 적용 여부 결정

---

**참고:**
- 컬럼명 네이밍 규칙: snake_case
- PK 네이밍: 테이블_id (예: inv_id)
- FK 참조용 인덱스 자동 생성
