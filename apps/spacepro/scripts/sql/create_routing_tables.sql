-- ============================================
-- SpacePro: Routing-Based Capacity Simulation Schema
-- Version: 1.0
-- Date: 2025-12-30
-- ============================================

-- TB_ROUTING_MST: 품목별 공정 라우팅 마스터
CREATE TABLE IF NOT EXISTS spacepro.tb_routing_mst (
    item_code       VARCHAR(50)     NOT NULL,
    revision        VARCHAR(10)     NOT NULL DEFAULT '1.0',
    op_seq          INT             NOT NULL,
    op_name         VARCHAR(100)    NOT NULL,
    workcenter_code VARCHAR(50)     NOT NULL,
    machine_code    VARCHAR(50),
    setup_time      DECIMAL(10,2)   DEFAULT 0,
    cycle_time      DECIMAL(10,4)   NOT NULL,
    process_yield   DECIMAL(5,2)    DEFAULT 100.00,
    queue_time      DECIMAL(10,2)   DEFAULT 0,
    move_time       DECIMAL(10,2)   DEFAULT 0,
    status          VARCHAR(20)     DEFAULT 'ACTIVE',
    effective_from  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    effective_to    TIMESTAMP,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (item_code, revision, op_seq)
);

CREATE INDEX IF NOT EXISTS idx_routing_item ON spacepro.tb_routing_mst(item_code, status);
CREATE INDEX IF NOT EXISTS idx_routing_workcenter ON spacepro.tb_routing_mst(workcenter_code);

COMMENT ON TABLE spacepro.tb_routing_mst IS '품목별 공정 라우팅 마스터 (리비전 관리)';
COMMENT ON COLUMN spacepro.tb_routing_mst.process_yield IS '공정 수율 - 투입 대비 양품 비율';

-- TB_BOM_PROCESS: 공정별 자재 투입 BOM
CREATE TABLE IF NOT EXISTS spacepro.tb_bom_process (
    parent_item     VARCHAR(50)     NOT NULL,
    child_item      VARCHAR(50)     NOT NULL,
    op_seq          INT             NOT NULL,
    routing_rev     VARCHAR(10)     NOT NULL DEFAULT '1.0',
    qty_per         DECIMAL(15,5)   NOT NULL,
    material_yield  DECIMAL(5,2)    DEFAULT 100.00,
    scrap_rate      DECIMAL(5,2)    DEFAULT 0,
    is_phantom      BOOLEAN         DEFAULT FALSE,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (parent_item, child_item, op_seq, routing_rev)
);

COMMENT ON COLUMN spacepro.tb_bom_process.material_yield IS '자재 수율 - 100%미만 시 추가 투입 필요';

-- TB_MACHINE_EVENT: 설비 비가동 이력 및 MTBF/MTTR
CREATE TABLE IF NOT EXISTS spacepro.tb_machine_event (
    event_id        BIGSERIAL       PRIMARY KEY,
    machine_code    VARCHAR(50)     NOT NULL,
    event_type      VARCHAR(20)     NOT NULL,
    event_reason    VARCHAR(200),
    start_time      TIMESTAMP,
    end_time        TIMESTAMP,
    duration_min    INT,
    is_planned      BOOLEAN         DEFAULT FALSE,
    mtbf_hours      DECIMAL(10,2),
    mttr_hours      DECIMAL(10,2),
    failure_rate    DECIMAL(8,6),
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_machine_event_code ON spacepro.tb_machine_event(machine_code, event_type);
CREATE INDEX IF NOT EXISTS idx_machine_event_time ON spacepro.tb_machine_event(start_time, end_time);

-- ============================================
-- 샘플 데이터: Case A - 금속 가공 (METAL-001)
-- ============================================
INSERT INTO spacepro.tb_routing_mst (item_code, revision, op_seq, op_name, workcenter_code, machine_code, setup_time, cycle_time, process_yield) VALUES
('METAL-001', '1.0', 10, '절단', 'WC-CUT', 'M-CUT-01', 15, 2.5, 98.0),
('METAL-001', '1.0', 20, 'CNC가공', 'WC-CNC', 'M-CNC-01', 45, 8.0, 92.0),
('METAL-001', '1.0', 30, '열처리', 'WC-HEAT', 'M-FURNACE-01', 60, 0.5, 99.0),
('METAL-001', '1.0', 40, '검사', 'WC-QC', 'M-CMM-01', 5, 3.0, 100.0)
ON CONFLICT (item_code, revision, op_seq) DO NOTHING;

INSERT INTO spacepro.tb_bom_process (parent_item, child_item, op_seq, routing_rev, qty_per, material_yield) VALUES
('METAL-001', 'RAW-STEEL', 10, '1.0', 1.2, 95.0),
('METAL-001', 'TOOL-BIT', 20, '1.0', 0.01, 100.0)
ON CONFLICT (parent_item, child_item, op_seq, routing_rev) DO NOTHING;

-- ============================================
-- 샘플 데이터: Case B - 조립/화학 (CHEM-002)
-- ============================================
INSERT INTO spacepro.tb_routing_mst (item_code, revision, op_seq, op_name, workcenter_code, machine_code, setup_time, cycle_time, process_yield) VALUES
('CHEM-002', '1.0', 10, '성형', 'WC-MOLD', 'M-INJ-01', 30, 1.0, 95.0),
('CHEM-002', '1.0', 20, '건조', 'WC-DRY', 'M-OVEN-01', 10, 15.0, 100.0),
('CHEM-002', '1.0', 30, '조립', 'WC-ASSY', 'M-ASSY-01', 20, 5.0, 98.0),
('CHEM-002', '1.0', 40, '포장', 'WC-PACK', 'M-PACK-01', 5, 0.5, 100.0)
ON CONFLICT (item_code, revision, op_seq) DO NOTHING;

INSERT INTO spacepro.tb_bom_process (parent_item, child_item, op_seq, routing_rev, qty_per, material_yield) VALUES
('CHEM-002', 'RESIN-A', 10, '1.0', 0.8, 92.0),
('CHEM-002', 'ADDITIVE-B', 10, '1.0', 0.05, 100.0),
('CHEM-002', 'COMP-X', 30, '1.0', 2.0, 100.0),
('CHEM-002', 'SCREW-5MM', 30, '1.0', 4.0, 100.0),
('CHEM-002', 'BOX-M', 40, '1.0', 1.0, 100.0)
ON CONFLICT (parent_item, child_item, op_seq, routing_rev) DO NOTHING;

-- ============================================
-- 설비 MTBF/MTTR 기준값 INSERT
-- ============================================
INSERT INTO spacepro.tb_machine_event (machine_code, event_type, mtbf_hours, mttr_hours, failure_rate) VALUES
('M-CNC-01', 'BASELINE', 120, 4, 0.008333),
('M-FURNACE-01', 'BASELINE', 500, 8, 0.002000),
('M-INJ-01', 'BASELINE', 80, 2, 0.012500),
('M-OVEN-01', 'BASELINE', 300, 1, 0.003333),
('M-CUT-01', 'BASELINE', 200, 2, 0.005000),
('M-ASSY-01', 'BASELINE', 400, 1.5, 0.002500),
('M-PACK-01', 'BASELINE', 600, 0.5, 0.001667),
('M-CMM-01', 'BASELINE', 1000, 3, 0.001000);

SELECT 'Routing schema created and sample data inserted' as result;
