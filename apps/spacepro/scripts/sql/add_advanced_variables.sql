-- ============================================================
-- 고급 시뮬레이션 변수 테이블 추가
-- Schema: spacepro (PostgreSQL)
-- Created: 2025-12-30
-- ============================================================

-- ============================================================
-- 1. sp_capacity_mst 테이블에 고급 변수 컬럼 추가
-- ============================================================

-- 수율 (Yield Rate) - 100개 투입 시 정품 비율
ALTER TABLE spacepro.sp_capacity_mst 
ADD COLUMN IF NOT EXISTS yield_rate DECIMAL(5,2) DEFAULT 100.0;

-- 재작업률 (Rework Rate) - 불량 중 재작업 비율
ALTER TABLE spacepro.sp_capacity_mst 
ADD COLUMN IF NOT EXISTS rework_rate DECIMAL(5,2) DEFAULT 0.0;

-- 월간 비가동 시간 (Downtime Hours)
ALTER TABLE spacepro.sp_capacity_mst 
ADD COLUMN IF NOT EXISTS downtime_hours DECIMAL(5,2) DEFAULT 0.0;

-- 작업 인원 수 (Manpower)
ALTER TABLE spacepro.sp_capacity_mst 
ADD COLUMN IF NOT EXISTS manpower INT DEFAULT 1;

COMMENT ON COLUMN spacepro.sp_capacity_mst.yield_rate IS '수율 (%) - 100개 투입 시 정품 비율';
COMMENT ON COLUMN spacepro.sp_capacity_mst.rework_rate IS '재작업률 (%) - 불량 중 재작업 비율';
COMMENT ON COLUMN spacepro.sp_capacity_mst.downtime_hours IS '월간 비가동 시간 (시간)';
COMMENT ON COLUMN spacepro.sp_capacity_mst.manpower IS '작업 인원 수';

-- ============================================================
-- 2. sp_workcenter_mst 테이블에 고급 변수 컬럼 추가
-- ============================================================

-- 외주 여부 및 지연일
ALTER TABLE spacepro.sp_workcenter_mst 
ADD COLUMN IF NOT EXISTS is_outsourced BOOLEAN DEFAULT FALSE;

ALTER TABLE spacepro.sp_workcenter_mst 
ADD COLUMN IF NOT EXISTS outsourcing_delay_days INT DEFAULT 0;

-- 기종 변경 기본 시간 (분)
ALTER TABLE spacepro.sp_workcenter_mst 
ADD COLUMN IF NOT EXISTS default_setup_time DECIMAL(10,2) DEFAULT 30.0;

COMMENT ON COLUMN spacepro.sp_workcenter_mst.is_outsourced IS '외주 공정 여부';
COMMENT ON COLUMN spacepro.sp_workcenter_mst.outsourcing_delay_days IS '외주 입고 지연일 (Safety Margin)';
COMMENT ON COLUMN spacepro.sp_workcenter_mst.default_setup_time IS '기본 기종변경 시간 (분)';

-- ============================================================
-- 3. 기종변경 시간 행렬 테이블 (Sequence Dependent Setup)
-- ============================================================

DROP TABLE IF EXISTS spacepro.sp_setup_matrix CASCADE;
CREATE TABLE spacepro.sp_setup_matrix (
    id SERIAL PRIMARY KEY,
    workcenter_code VARCHAR(50) NOT NULL REFERENCES spacepro.sp_workcenter_mst(workcenter_code),
    from_item_code VARCHAR(50),      -- NULL이면 최초 시작
    to_item_code VARCHAR(50) NOT NULL,
    setup_time DECIMAL(10,2) NOT NULL,  -- 기종변경 시간 (분)
    setup_type VARCHAR(20) DEFAULT 'NORMAL',  -- NORMAL, DIFFICULT, EASY
    remark VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(workcenter_code, from_item_code, to_item_code)
);

COMMENT ON TABLE spacepro.sp_setup_matrix IS '기종변경 시간 행렬 (Sequence Dependent Setup)';
COMMENT ON COLUMN spacepro.sp_setup_matrix.from_item_code IS '변경 전 품목 (NULL=최초 시작)';
COMMENT ON COLUMN spacepro.sp_setup_matrix.to_item_code IS '변경 후 품목';
COMMENT ON COLUMN spacepro.sp_setup_matrix.setup_time IS '기종변경 소요 시간 (분)';

-- ============================================================
-- 4. 시뮬레이션 시나리오 테이블
-- ============================================================

DROP TABLE IF EXISTS spacepro.sp_simulation_scenario CASCADE;
CREATE TABLE spacepro.sp_simulation_scenario (
    id SERIAL PRIMARY KEY,
    scenario_code VARCHAR(50) NOT NULL UNIQUE,
    scenario_name VARCHAR(200) NOT NULL,
    plan_month VARCHAR(7) NOT NULL,  -- YYYY-MM
    description TEXT,
    -- 글로벌 파라미터
    global_yield_rate DECIMAL(5,2) DEFAULT 100.0,
    global_rework_rate DECIMAL(5,2) DEFAULT 0.0,
    global_downtime_rate DECIMAL(5,2) DEFAULT 0.0,  -- 비가동률 (%)
    global_efficiency_factor DECIMAL(5,2) DEFAULT 100.0,  -- 효율 계수 (%)
    -- 외부 요인
    outsourcing_delay_enabled BOOLEAN DEFAULT FALSE,
    extra_shift_enabled BOOLEAN DEFAULT FALSE,  -- 추가 근무 적용
    -- 환경 변수
    weather_factor DECIMAL(5,2) DEFAULT 100.0,  -- 날씨 영향 계수 (%)
    night_shift_efficiency DECIMAL(5,2) DEFAULT 90.0,  -- 야간 효율 (%)
    -- 메타
    is_baseline BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    created_by VARCHAR(50)
);

COMMENT ON TABLE spacepro.sp_simulation_scenario IS '시뮬레이션 시나리오 정의';

-- ============================================================
-- 5. 샘플 데이터 업데이트
-- ============================================================

-- 기존 케파 정의에 고급 변수 값 설정
UPDATE spacepro.sp_capacity_mst SET 
    yield_rate = 95.0,
    rework_rate = 3.0,
    downtime_hours = 4.0,
    manpower = 2
WHERE workcenter_code = 'WC-SMT-01';

UPDATE spacepro.sp_capacity_mst SET 
    yield_rate = 92.0,
    rework_rate = 5.0,
    downtime_hours = 6.0,
    manpower = 3
WHERE workcenter_code = 'WC-ASSY-01';

UPDATE spacepro.sp_capacity_mst SET 
    yield_rate = 98.0,
    rework_rate = 1.0,
    downtime_hours = 2.0,
    manpower = 1
WHERE workcenter_code = 'WC-PACK-01';

-- 기종변경 시간 샘플
INSERT INTO spacepro.sp_setup_matrix (workcenter_code, from_item_code, to_item_code, setup_time, setup_type) VALUES
('WC-SMT-01', NULL, 'ITEM-A001', 45, 'NORMAL'),
('WC-SMT-01', 'ITEM-A001', 'ITEM-A002', 30, 'EASY'),
('WC-SMT-01', 'ITEM-A002', 'ITEM-A001', 60, 'DIFFICULT'),
('WC-ASSY-01', NULL, 'ITEM-A001', 20, 'NORMAL'),
('WC-ASSY-01', 'ITEM-A001', 'ITEM-B001', 45, 'DIFFICULT');

-- 시나리오 샘플
INSERT INTO spacepro.sp_simulation_scenario (scenario_code, scenario_name, plan_month, description, is_baseline) VALUES
('BASE-2025-01', '2025년 1월 기준 시나리오', '2025-01', '표준 조건 기준 시뮬레이션', TRUE),
('OPT-2025-01', '2025년 1월 낙관적 시나리오', '2025-01', '수율 향상, 비가동 감소 가정', FALSE),
('PES-2025-01', '2025년 1월 비관적 시나리오', '2025-01', '수율 저하, 외주 지연 가정', FALSE);

SELECT 'Advanced Simulation Variables Added Successfully!' AS result;
