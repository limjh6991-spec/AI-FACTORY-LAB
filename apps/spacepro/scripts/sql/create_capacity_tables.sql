-- ============================================================
-- 생산 케파 시뮬레이션 마스터 테이블 생성 스크립트
-- Schema: spacepro (PostgreSQL)
-- Created: 2025-12-30
-- Prefix: sp_
-- ============================================================

-- 스키마 생성 (없으면)
CREATE SCHEMA IF NOT EXISTS spacepro;

-- ============================================================
-- 1. 작업장(Work Center) 마스터
-- ============================================================

DROP TABLE IF EXISTS spacepro.sp_workcenter_mst CASCADE;
CREATE TABLE spacepro.sp_workcenter_mst (
    id SERIAL PRIMARY KEY,
    workcenter_code VARCHAR(50) NOT NULL UNIQUE,
    workcenter_name VARCHAR(200) NOT NULL,
    workcenter_type VARCHAR(20) DEFAULT 'LINE',  -- LINE, CELL, STATION
    department VARCHAR(100),
    capacity_uom VARCHAR(20) DEFAULT 'EA/HR',    -- EA/HR, KG/DAY, etc.
    std_capacity DECIMAL(15,3) DEFAULT 0,        -- 표준 생산능력
    max_capacity DECIMAL(15,3) DEFAULT 0,        -- 최대 생산능력
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

COMMENT ON TABLE spacepro.sp_workcenter_mst IS '작업장(Work Center) 마스터';
COMMENT ON COLUMN spacepro.sp_workcenter_mst.workcenter_type IS 'LINE: 라인, CELL: 셀, STATION: 스테이션';
COMMENT ON COLUMN spacepro.sp_workcenter_mst.capacity_uom IS '케파 단위 (EA/HR, KG/DAY 등)';

-- ============================================================
-- 2. 교대조(Shift) 마스터
-- ============================================================

DROP TABLE IF EXISTS spacepro.sp_shift_mst CASCADE;
CREATE TABLE spacepro.sp_shift_mst (
    id SERIAL PRIMARY KEY,
    shift_code VARCHAR(20) NOT NULL UNIQUE,
    shift_name VARCHAR(100) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    break_minutes INT DEFAULT 0,                 -- 휴식 시간(분)
    work_hours DECIMAL(4,2) DEFAULT 8.0,         -- 실 가동 시간
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

COMMENT ON TABLE spacepro.sp_shift_mst IS '교대조(Shift) 마스터';
COMMENT ON COLUMN spacepro.sp_shift_mst.break_minutes IS '휴식 시간(분)';
COMMENT ON COLUMN spacepro.sp_shift_mst.work_hours IS '실 가동 시간';

-- ============================================================
-- 3. 작업 달력(Working Calendar) 마스터
-- ============================================================

DROP TABLE IF EXISTS spacepro.sp_calendar_mst CASCADE;
CREATE TABLE spacepro.sp_calendar_mst (
    id SERIAL PRIMARY KEY,
    calendar_code VARCHAR(20) NOT NULL,
    calendar_date DATE NOT NULL,
    day_type VARCHAR(20) DEFAULT 'WORKDAY',      -- WORKDAY, HOLIDAY, HALF
    shift_code VARCHAR(20) REFERENCES spacepro.sp_shift_mst(shift_code),
    workcenter_code VARCHAR(50) REFERENCES spacepro.sp_workcenter_mst(workcenter_code),
    available_hours DECIMAL(4,2) DEFAULT 8.0,    -- 가용 시간
    remark VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(calendar_code, calendar_date, workcenter_code)
);

COMMENT ON TABLE spacepro.sp_calendar_mst IS '작업 달력(Working Calendar) 마스터';
COMMENT ON COLUMN spacepro.sp_calendar_mst.day_type IS 'WORKDAY: 근무일, HOLIDAY: 휴일, HALF: 반일근무';

-- ============================================================
-- 4. 생산능력(Capacity) 정의 마스터
-- ============================================================

DROP TABLE IF EXISTS spacepro.sp_capacity_mst CASCADE;
CREATE TABLE spacepro.sp_capacity_mst (
    id SERIAL PRIMARY KEY,
    workcenter_code VARCHAR(50) NOT NULL REFERENCES spacepro.sp_workcenter_mst(workcenter_code),
    item_code VARCHAR(50),                       -- NULL이면 작업장 기본 케파
    capacity_type VARCHAR(20) DEFAULT 'EFFECTIVE', -- DESIGN, EFFECTIVE, DEMONSTRATED
    uph DECIMAL(10,2) DEFAULT 0,                 -- 시간당 생산량
    setup_time DECIMAL(10,2) DEFAULT 0,          -- 셋업 시간(분)
    efficiency DECIMAL(5,2) DEFAULT 100.0,       -- 효율 (%)
    valid_from DATE DEFAULT CURRENT_DATE,
    valid_to DATE DEFAULT '9999-12-31',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(workcenter_code, item_code, capacity_type, valid_from)
);

COMMENT ON TABLE spacepro.sp_capacity_mst IS '생산능력(Capacity) 정의 마스터';
COMMENT ON COLUMN spacepro.sp_capacity_mst.capacity_type IS 'DESIGN: 설계능력, EFFECTIVE: 유효능력, DEMONSTRATED: 실증능력';
COMMENT ON COLUMN spacepro.sp_capacity_mst.uph IS '시간당 생산량 (Units Per Hour)';

-- ============================================================
-- 5. 샘플 데이터
-- ============================================================

-- 작업장 샘플
INSERT INTO spacepro.sp_workcenter_mst (workcenter_code, workcenter_name, workcenter_type, department, capacity_uom, std_capacity, max_capacity) VALUES
('WC-SMT-01', 'SMT 라인 1', 'LINE', '생산1팀', 'EA/HR', 500, 600),
('WC-SMT-02', 'SMT 라인 2', 'LINE', '생산1팀', 'EA/HR', 450, 550),
('WC-ASSY-01', '조립 라인 1', 'LINE', '생산2팀', 'EA/HR', 300, 400),
('WC-TEST-01', '테스트 스테이션', 'STATION', 'QC팀', 'EA/HR', 200, 250),
('WC-PACK-01', '포장 라인', 'LINE', '생산3팀', 'EA/HR', 800, 1000);

-- 교대조 샘플
INSERT INTO spacepro.sp_shift_mst (shift_code, shift_name, start_time, end_time, break_minutes, work_hours) VALUES
('DAY', '주간조', '08:00', '17:00', 60, 8.0),
('NIGHT', '야간조', '20:00', '05:00', 60, 8.0),
('FLEX', '탄력근무', '09:00', '18:00', 60, 8.0);

-- 작업 달력 샘플 (2025년 1월)
INSERT INTO spacepro.sp_calendar_mst (calendar_code, calendar_date, day_type, shift_code, available_hours) VALUES
('CAL-2025', '2025-01-01', 'HOLIDAY', NULL, 0),
('CAL-2025', '2025-01-02', 'WORKDAY', 'DAY', 8.0),
('CAL-2025', '2025-01-03', 'WORKDAY', 'DAY', 8.0),
('CAL-2025', '2025-01-04', 'HALF', 'DAY', 4.0),
('CAL-2025', '2025-01-05', 'HOLIDAY', NULL, 0),
('CAL-2025', '2025-01-06', 'WORKDAY', 'DAY', 8.0),
('CAL-2025', '2025-01-07', 'WORKDAY', 'DAY', 8.0),
('CAL-2025', '2025-01-08', 'WORKDAY', 'DAY', 8.0),
('CAL-2025', '2025-01-09', 'WORKDAY', 'DAY', 8.0),
('CAL-2025', '2025-01-10', 'WORKDAY', 'DAY', 8.0);

-- 케파 정의 샘플
INSERT INTO spacepro.sp_capacity_mst (workcenter_code, item_code, capacity_type, uph, setup_time, efficiency) VALUES
('WC-SMT-01', NULL, 'EFFECTIVE', 500, 30, 85.0),
('WC-SMT-01', 'ITEM-A001', 'EFFECTIVE', 480, 45, 88.0),
('WC-SMT-02', NULL, 'EFFECTIVE', 450, 30, 82.0),
('WC-ASSY-01', NULL, 'EFFECTIVE', 300, 20, 90.0),
('WC-ASSY-01', 'ITEM-A001', 'EFFECTIVE', 280, 25, 92.0),
('WC-TEST-01', NULL, 'EFFECTIVE', 200, 10, 95.0),
('WC-PACK-01', NULL, 'EFFECTIVE', 800, 15, 88.0);

SELECT 'Capacity Simulation Master Tables Created Successfully!' AS result;
