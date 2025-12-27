-- ============================================================
-- 생산수불 테이블 생성 스크립트 (bi_ 접두어)
-- Database: ai_factory_db (PostgreSQL)
-- Created: 2025-12-27
-- ============================================================

-- ============================================================
-- 1. Source 테이블: MES 원천 데이터
-- ============================================================

DROP TABLE IF EXISTS bi_src_mes_production CASCADE;
CREATE TABLE bi_src_mes_production (
    src_id BIGSERIAL PRIMARY KEY,
    mes_trans_id VARCHAR(50) NOT NULL,
    mes_trans_date TIMESTAMP NOT NULL,
    mes_plant_code VARCHAR(20) NOT NULL,
    process_code VARCHAR(20) NOT NULL,
    product_code VARCHAR(50) NOT NULL,
    lot_no VARCHAR(50),
    trans_type VARCHAR(20) NOT NULL,
    qty DECIMAL(15,4) NOT NULL,
    uom VARCHAR(10) DEFAULT 'EA',
    quality_status VARCHAR(10),
    defect_code VARCHAR(20),
    equipment_code VARCHAR(20),
    worker_id VARCHAR(20),
    raw_data JSONB,
    etl_date TIMESTAMP DEFAULT NOW(),
    is_processed BOOLEAN DEFAULT FALSE,
    company_code VARCHAR(20) NOT NULL
);

CREATE INDEX idx_bi_src_mes_date ON bi_src_mes_production(mes_trans_date);
CREATE INDEX idx_bi_src_mes_process ON bi_src_mes_production(process_code);
CREATE INDEX idx_bi_src_mes_product ON bi_src_mes_production(product_code);
CREATE INDEX idx_bi_src_mes_processed ON bi_src_mes_production(is_processed);

COMMENT ON TABLE bi_src_mes_production IS 'MES 원천 생산 데이터';

-- ============================================================
-- 2. Master 테이블: 제품 마스터
-- ============================================================

DROP TABLE IF EXISTS bi_mst_product CASCADE;
CREATE TABLE bi_mst_product (
    product_code VARCHAR(50) PRIMARY KEY,
    product_name VARCHAR(200) NOT NULL,
    product_type VARCHAR(20),
    product_group VARCHAR(50),
    spec VARCHAR(200),
    uom VARCHAR(10) DEFAULT 'EA',
    standard_cost DECIMAL(15,4),
    is_active BOOLEAN DEFAULT TRUE,
    company_code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

COMMENT ON TABLE bi_mst_product IS '제품 마스터';

-- ============================================================
-- 3. Master 테이블: 공정 마스터
-- ============================================================

DROP TABLE IF EXISTS bi_mst_process CASCADE;
CREATE TABLE bi_mst_process (
    process_code VARCHAR(20) PRIMARY KEY,
    process_name VARCHAR(100) NOT NULL,
    process_type VARCHAR(20),
    area_code VARCHAR(20),
    area_ord INT NOT NULL,
    prev_process_code VARCHAR(20),
    next_process_code VARCHAR(20),
    rework_process_code VARCHAR(20),
    virtual_wh_code VARCHAR(20),
    loss_tolerance DECIMAL(5,4) DEFAULT 0,
    sample_rate DECIMAL(5,4) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    company_code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_bi_mst_process_order ON bi_mst_process(area_code, area_ord);

COMMENT ON TABLE bi_mst_process IS '공정 마스터 (area_ord: 공정 순서)';

-- ============================================================
-- 4. Master 테이블: 시나리오 마스터
-- ============================================================

DROP TABLE IF EXISTS bi_mst_scenario CASCADE;
CREATE TABLE bi_mst_scenario (
    scenario_code VARCHAR(20) PRIMARY KEY,
    scenario_name VARCHAR(100) NOT NULL,
    scenario_type VARCHAR(20) NOT NULL,
    period_type VARCHAR(10) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    version INT DEFAULT 1,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    company_code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    created_by VARCHAR(50)
);

COMMENT ON TABLE bi_mst_scenario IS '시나리오 마스터 (ACTUAL/FORECAST/PLAN)';

-- ============================================================
-- 5. Transaction 테이블: 생산수불 (월별 집계)
-- ============================================================

DROP TABLE IF EXISTS bi_trx_prod_inventory CASCADE;
CREATE TABLE bi_trx_prod_inventory (
    inv_id BIGSERIAL PRIMARY KEY,
    inv_yyyymm VARCHAR(6) NOT NULL,
    scenario_code VARCHAR(20) NOT NULL,
    process_code VARCHAR(20) NOT NULL,
    product_code VARCHAR(50) NOT NULL,
    boh_qty DECIMAL(15,4) DEFAULT 0,
    eoh_qty DECIMAL(15,4) DEFAULT 0,
    boh_cost DECIMAL(18,4) DEFAULT 0,
    eoh_cost DECIMAL(18,4) DEFAULT 0,
    unit_cost DECIMAL(15,4) DEFAULT 0,
    new_input_qty DECIMAL(15,4) DEFAULT 0,
    process_in_qty DECIMAL(15,4) DEFAULT 0,
    rework_in_qty DECIMAL(15,4) DEFAULT 0,
    return_in_qty DECIMAL(15,4) DEFAULT 0,
    bonus_qty DECIMAL(15,4) DEFAULT 0,
    process_out_qty DECIMAL(15,4) DEFAULT 0,
    goods_out_qty DECIMAL(15,4) DEFAULT 0,
    defect_out_qty DECIMAL(15,4) DEFAULT 0,
    scrap_out_qty DECIMAL(15,4) DEFAULT 0,
    sample_out_qty DECIMAL(15,4) DEFAULT 0,
    loss_qty DECIMAL(15,4) DEFAULT 0,
    adjust_qty DECIMAL(15,4) DEFAULT 0,
    closing_status VARCHAR(20) DEFAULT 'OPEN',
    closed_at TIMESTAMP,
    closed_by VARCHAR(50),
    company_code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(inv_yyyymm, scenario_code, process_code, product_code, company_code)
);

CREATE INDEX idx_bi_trx_inv_yyyymm ON bi_trx_prod_inventory(inv_yyyymm);
CREATE INDEX idx_bi_trx_inv_process ON bi_trx_prod_inventory(process_code);
CREATE INDEX idx_bi_trx_inv_product ON bi_trx_prod_inventory(product_code);
CREATE INDEX idx_bi_trx_inv_scenario ON bi_trx_prod_inventory(scenario_code);
CREATE INDEX idx_bi_trx_inv_closing ON bi_trx_prod_inventory(closing_status);

COMMENT ON TABLE bi_trx_prod_inventory IS '생산수불 (월별 집계)';

-- ============================================================
-- 6. History 테이블: 공정간 수불 이력
-- ============================================================

DROP TABLE IF EXISTS bi_hst_process_movement CASCADE;
CREATE TABLE bi_hst_process_movement (
    movement_id BIGSERIAL PRIMARY KEY,
    movement_date DATE NOT NULL,
    movement_time TIMESTAMP NOT NULL,
    inv_yyyymm VARCHAR(6) NOT NULL,
    scenario_code VARCHAR(20) NOT NULL,
    from_process_code VARCHAR(20),
    from_location_type VARCHAR(20),
    to_process_code VARCHAR(20),
    to_location_type VARCHAR(20),
    product_code VARCHAR(50) NOT NULL,
    lot_no VARCHAR(50),
    qty DECIMAL(15,4) NOT NULL,
    uom VARCHAR(10) DEFAULT 'EA',
    quality_status VARCHAR(10),
    trans_type VARCHAR(30) NOT NULL,
    src_mes_id BIGINT REFERENCES bi_src_mes_production(src_id),
    inv_id BIGINT REFERENCES bi_trx_prod_inventory(inv_id),
    remark TEXT,
    company_code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_bi_hst_movement_date ON bi_hst_process_movement(movement_date);
CREATE INDEX idx_bi_hst_movement_yyyymm ON bi_hst_process_movement(inv_yyyymm);
CREATE INDEX idx_bi_hst_movement_from ON bi_hst_process_movement(from_process_code);
CREATE INDEX idx_bi_hst_movement_to ON bi_hst_process_movement(to_process_code);

COMMENT ON TABLE bi_hst_process_movement IS '공정간 이동 이력';

-- ============================================================
-- 7. Validation 테이블: 에러 체크
-- ============================================================

DROP TABLE IF EXISTS bi_err_inventory_check CASCADE;
CREATE TABLE bi_err_inventory_check (
    error_id BIGSERIAL PRIMARY KEY,
    error_date DATE NOT NULL,
    inv_yyyymm VARCHAR(6),
    check_type VARCHAR(30) NOT NULL,
    table_name VARCHAR(50) NOT NULL,
    record_id BIGINT,
    error_code VARCHAR(20) NOT NULL,
    error_message TEXT NOT NULL,
    error_detail JSONB,
    severity VARCHAR(10) DEFAULT 'ERROR',
    process_code VARCHAR(20),
    product_code VARCHAR(50),
    scenario_code VARCHAR(20),
    status VARCHAR(20) DEFAULT 'OPEN',
    resolved_at TIMESTAMP,
    resolved_by VARCHAR(50),
    resolution_note TEXT,
    company_code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_bi_err_check_date ON bi_err_inventory_check(error_date);
CREATE INDEX idx_bi_err_check_yyyymm ON bi_err_inventory_check(inv_yyyymm);
CREATE INDEX idx_bi_err_check_status ON bi_err_inventory_check(status);
CREATE INDEX idx_bi_err_check_type ON bi_err_inventory_check(check_type);

COMMENT ON TABLE bi_err_inventory_check IS '에러 체크';

-- ============================================================
-- 8. 샘플 데이터
-- ============================================================

INSERT INTO bi_mst_process (process_code, process_name, process_type, area_code, area_ord, company_code) VALUES
('FAB-001', '웨이퍼 준비', 'MAIN', 'FAB', 1, 'BINARY'),
('FAB-002', '포토 리소그래피', 'MAIN', 'FAB', 2, 'BINARY'),
('FAB-003', '에칭', 'MAIN', 'FAB', 3, 'BINARY'),
('ASSY-001', '다이 본딩', 'MAIN', 'ASSY', 1, 'BINARY'),
('ASSY-002', '와이어 본딩', 'MAIN', 'ASSY', 2, 'BINARY'),
('TEST-001', '전기 테스트', 'INSP', 'TEST', 1, 'BINARY'),
('REWORK-001', '재작업', 'REWORK', 'REWORK', 1, 'BINARY');

INSERT INTO bi_mst_product (product_code, product_name, product_type, uom, standard_cost, company_code) VALUES
('CHIP-A001', '메모리 칩 A001', 'FG', 'EA', 15.50, 'BINARY'),
('CHIP-B002', '로직 칩 B002', 'FG', 'EA', 25.00, 'BINARY'),
('WAFER-001', '실리콘 웨이퍼', 'RAW', 'EA', 500.00, 'BINARY');

INSERT INTO bi_mst_scenario (scenario_code, scenario_name, scenario_type, period_type, start_date, end_date, is_current, company_code) VALUES
('ACTUAL-2024', '2024년 생산 실적', 'ACTUAL', 'MONTHLY', '2024-01-01', '2024-12-31', TRUE, 'BINARY'),
('FORECAST-2025Q1', '2025년 1분기 속보', 'FORECAST', 'MONTHLY', '2025-01-01', '2025-03-31', TRUE, 'BINARY'),
('PLAN-2025', '2025년 연간 계획', 'PLAN', 'MONTHLY', '2025-01-01', '2025-12-31', TRUE, 'BINARY');

INSERT INTO bi_trx_prod_inventory (
    inv_yyyymm, scenario_code, process_code, product_code,
    boh_qty, eoh_qty, boh_cost, eoh_cost, unit_cost,
    new_input_qty, process_in_qty, process_out_qty, loss_qty,
    closing_status, company_code
) VALUES
('202410', 'ACTUAL-2024', 'FAB-001', 'WAFER-001', 100, 120, 50000, 60000, 500.00, 50, 0, 30, 0, 'CLOSED', 'BINARY'),
('202410', 'ACTUAL-2024', 'FAB-002', 'WAFER-001', 80, 100, 40000, 50000, 500.00, 0, 30, 10, 0, 'CLOSED', 'BINARY'),
('202410', 'ACTUAL-2024', 'FAB-003', 'WAFER-001', 50, 55, 25000, 27500, 500.00, 0, 10, 5, 0, 'CLOSED', 'BINARY');

SELECT 'Production Tables (bi_ prefix) Created Successfully!' AS result;
