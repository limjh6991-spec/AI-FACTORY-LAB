-- ============================================================
-- MRP 자재 소요량 예측을 위한 마스터 테이블 및 샘플 데이터
-- Schema: spacepro (PostgreSQL)
-- Prefix: sp_
-- Created: 2025-12-30
-- ============================================================

-- ============================================
-- 1. 품목 마스터 테이블
-- ============================================

DROP TABLE IF EXISTS spacepro.sp_item_mst CASCADE;

CREATE TABLE spacepro.sp_item_mst (
    id SERIAL PRIMARY KEY,
    item_code VARCHAR(50) NOT NULL UNIQUE,
    item_name VARCHAR(200) NOT NULL,
    item_type VARCHAR(20) NOT NULL,  -- RAW, SEMI, PRODUCT
    unit VARCHAR(20) DEFAULT 'EA',
    lead_time INT DEFAULT 0,         -- 조달 리드타임 (일)
    safety_stock DECIMAL(15, 3) DEFAULT 0,
    standard_cost DECIMAL(15, 2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

COMMENT ON TABLE spacepro.sp_item_mst IS '품목 마스터';

-- ============================================
-- 2. BOM 마스터 테이블
-- ============================================

DROP TABLE IF EXISTS spacepro.sp_bom_mst CASCADE;

CREATE TABLE spacepro.sp_bom_mst (
    id SERIAL PRIMARY KEY,
    parent_item VARCHAR(50) NOT NULL,     -- 모품목
    child_item VARCHAR(50) NOT NULL,      -- 자품목
    bom_level INT DEFAULT 1,              -- BOM 레벨
    quantity DECIMAL(15, 5) DEFAULT 1,    -- 소요량
    loss_rate DECIMAL(5, 2) DEFAULT 0,    -- 로스율 (%)
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(parent_item, child_item)
);

COMMENT ON TABLE spacepro.sp_bom_mst IS 'BOM 마스터';

-- ============================================
-- 3. 재고 현황 테이블
-- ============================================

DROP TABLE IF EXISTS spacepro.sp_inventory CASCADE;

CREATE TABLE spacepro.sp_inventory (
    id SERIAL PRIMARY KEY,
    item_code VARCHAR(50) NOT NULL UNIQUE,
    on_hand_qty DECIMAL(15, 3) DEFAULT 0,    -- 현재고
    allocated_qty DECIMAL(15, 3) DEFAULT 0,  -- 할당수량
    in_transit_qty DECIMAL(15, 3) DEFAULT 0, -- 입고예정
    unit VARCHAR(20) DEFAULT 'EA',
    warehouse VARCHAR(50) DEFAULT 'MAIN',
    updated_at TIMESTAMP DEFAULT NOW()
);

COMMENT ON TABLE spacepro.sp_inventory IS '품목별 재고 현황';

-- ============================================
-- 인덱스 생성
-- ============================================

CREATE INDEX idx_item_code ON spacepro.sp_item_mst(item_code);
CREATE INDEX idx_item_type ON spacepro.sp_item_mst(item_type);
CREATE INDEX idx_bom_parent ON spacepro.sp_bom_mst(parent_item);
CREATE INDEX idx_bom_child ON spacepro.sp_bom_mst(child_item);
CREATE INDEX idx_inventory_item ON spacepro.sp_inventory(item_code);

-- ============================================
-- 품목 샘플 데이터
-- ============================================

INSERT INTO spacepro.sp_item_mst (item_code, item_name, item_type, unit, lead_time, safety_stock, standard_cost) VALUES
-- 완제품
('PROD-001', '스마트워치 A1', 'PRODUCT', 'EA', 0, 100, 150000),
('PROD-002', '스마트워치 A2', 'PRODUCT', 'EA', 0, 50, 180000),
-- 반제품
('SEMI-001', 'PCB 모듈', 'SEMI', 'EA', 2, 200, 25000),
('SEMI-002', '디스플레이 어셈블리', 'SEMI', 'EA', 3, 150, 45000),
('SEMI-003', '케이스 어셈블리', 'SEMI', 'EA', 1, 100, 15000),
-- 원자재
('MAT-001', 'PCB 기판', 'RAW', 'EA', 7, 500, 5000),
('MAT-002', 'CPU 칩', 'RAW', 'EA', 14, 300, 18000),
('MAT-003', 'OLED 패널', 'RAW', 'EA', 21, 200, 35000),
('MAT-004', '배터리', 'RAW', 'EA', 10, 400, 8000),
('MAT-005', '알루미늄 케이스', 'RAW', 'EA', 5, 300, 12000),
('MAT-006', '고릴라 글래스', 'RAW', 'EA', 14, 200, 8000),
('MAT-007', '실리콘 밴드', 'RAW', 'EA', 3, 500, 3000),
('MAT-008', '포장박스', 'RAW', 'EA', 2, 1000, 500);

-- ============================================
-- BOM 샘플 데이터
-- ============================================

INSERT INTO spacepro.sp_bom_mst (parent_item, child_item, bom_level, quantity, loss_rate) VALUES
-- 완제품 PROD-001 → 반제품/원자재
('PROD-001', 'SEMI-001', 1, 1, 2.0),     -- PCB 모듈 1개
('PROD-001', 'SEMI-002', 1, 1, 1.5),     -- 디스플레이 어셈블리 1개
('PROD-001', 'SEMI-003', 1, 1, 1.0),     -- 케이스 어셈블리 1개
('PROD-001', 'MAT-004', 1, 1, 3.0),      -- 배터리 1개
('PROD-001', 'MAT-007', 1, 1, 5.0),      -- 실리콘 밴드 1개
('PROD-001', 'MAT-008', 1, 1, 0.5),      -- 포장박스 1개

-- 반제품 SEMI-001 (PCB 모듈) → 원자재
('SEMI-001', 'MAT-001', 2, 1, 2.0),      -- PCB 기판 1개
('SEMI-001', 'MAT-002', 2, 1, 1.0),      -- CPU 칩 1개

-- 반제품 SEMI-002 (디스플레이 어셈블리) → 원자재
('SEMI-002', 'MAT-003', 2, 1, 3.0),      -- OLED 패널 1개
('SEMI-002', 'MAT-006', 2, 1, 2.0),      -- 고릴라 글래스 1개

-- 반제품 SEMI-003 (케이스 어셈블리) → 원자재
('SEMI-003', 'MAT-005', 2, 1, 1.5),      -- 알루미늄 케이스 1개

-- 완제품 PROD-002 (다른 구성)
('PROD-002', 'SEMI-001', 1, 1, 2.0),
('PROD-002', 'SEMI-002', 1, 1, 1.5),
('PROD-002', 'MAT-004', 1, 1, 3.0),
('PROD-002', 'MAT-008', 1, 1, 0.5);

-- ============================================
-- 재고 샘플 데이터
-- ============================================

INSERT INTO spacepro.sp_inventory (item_code, on_hand_qty, allocated_qty, in_transit_qty) VALUES
('MAT-001', 1500, 200, 500),   -- PCB 기판
('MAT-002', 800, 100, 300),    -- CPU 칩
('MAT-003', 400, 50, 200),     -- OLED 패널
('MAT-004', 1200, 150, 400),   -- 배터리
('MAT-005', 600, 80, 200),     -- 알루미늄 케이스
('MAT-006', 350, 30, 150),     -- 고릴라 글래스
('MAT-007', 2000, 100, 500),   -- 실리콘 밴드
('MAT-008', 5000, 200, 1000),  -- 포장박스
('SEMI-001', 300, 50, 100),    -- PCB 모듈
('SEMI-002', 200, 30, 80),     -- 디스플레이 어셈블리
('SEMI-003', 250, 40, 100);    -- 케이스 어셈블리

-- ============================================
-- 결과 확인
-- ============================================

SELECT 'sp_item_mst' as table_name, count(*) as count FROM spacepro.sp_item_mst
UNION ALL
SELECT 'sp_bom_mst', count(*) FROM spacepro.sp_bom_mst
UNION ALL
SELECT 'sp_inventory', count(*) FROM spacepro.sp_inventory;
