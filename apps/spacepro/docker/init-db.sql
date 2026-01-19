-- =====================================================
-- SpacePro PostgreSQL Initialization Script
-- Docker 컨테이너 최초 실행 시 자동 실행
-- =====================================================

-- spacepro 스키마 생성
CREATE SCHEMA IF NOT EXISTS spacepro;

-- 스키마 권한 설정
GRANT ALL ON SCHEMA spacepro TO postgres;
GRANT ALL ON ALL TABLES IN SCHEMA spacepro TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA spacepro GRANT ALL ON TABLES TO postgres;

-- =====================================================
-- 메뉴 마스터 테이블
-- =====================================================
CREATE TABLE IF NOT EXISTS spacepro.tb_menu_mst (
    id SERIAL PRIMARY KEY,
    menu_code VARCHAR(20) UNIQUE NOT NULL,
    menu_name VARCHAR(100) NOT NULL,
    menu_name_en VARCHAR(100),
    menu_path VARCHAR(200),
    menu_icon VARCHAR(50),
    parent_id INTEGER REFERENCES spacepro.tb_menu_mst(id),
    menu_level INTEGER DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    menu_type VARCHAR(20) DEFAULT 'MENU',
    is_active BOOLEAN DEFAULT TRUE,
    description VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 품목 마스터 테이블
-- =====================================================
CREATE TABLE IF NOT EXISTS spacepro.tb_item_mst (
    id SERIAL PRIMARY KEY,
    item_code VARCHAR(50) UNIQUE NOT NULL,
    item_name VARCHAR(200) NOT NULL,
    item_type VARCHAR(20) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    lead_time INTEGER DEFAULT 0,
    safety_stock DECIMAL(15, 3) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- BOM 마스터 테이블
-- =====================================================
CREATE TABLE IF NOT EXISTS spacepro.tb_bom_mst (
    id SERIAL PRIMARY KEY,
    parent_item VARCHAR(50) NOT NULL,
    child_item VARCHAR(50) NOT NULL,
    bom_level INTEGER DEFAULT 1,
    quantity DECIMAL(15, 5) DEFAULT 1,
    loss_rate DECIMAL(5, 2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(parent_item, child_item)
);

-- =====================================================
-- 공정 마스터 테이블
-- =====================================================
CREATE TABLE IF NOT EXISTS spacepro.tb_process_mst (
    id SERIAL PRIMARY KEY,
    process_code VARCHAR(50) UNIQUE NOT NULL,
    process_name VARCHAR(200) NOT NULL,
    work_center VARCHAR(50),
    std_time DECIMAL(10, 2) DEFAULT 0,
    setup_time DECIMAL(10, 2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 설비 마스터 테이블
-- =====================================================
CREATE TABLE IF NOT EXISTS spacepro.tb_machine_mst (
    id SERIAL PRIMARY KEY,
    machine_code VARCHAR(50) UNIQUE NOT NULL,
    machine_name VARCHAR(200) NOT NULL,
    machine_type VARCHAR(50),
    manufacturer VARCHAR(100),
    uph INTEGER DEFAULT 0,
    efficiency DECIMAL(5, 2) DEFAULT 100,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 작업자 마스터 테이블
-- =====================================================
CREATE TABLE IF NOT EXISTS spacepro.tb_worker_mst (
    id SERIAL PRIMARY KEY,
    worker_code VARCHAR(50) UNIQUE NOT NULL,
    worker_name VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    position VARCHAR(50),
    shift_group VARCHAR(20),
    skill_level VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 공정 라우팅 마스터 테이블
-- =====================================================
CREATE TABLE IF NOT EXISTS spacepro.tb_routing_mst (
    id SERIAL PRIMARY KEY,
    item_code VARCHAR(50) NOT NULL,
    prcode VARCHAR(50),
    op_seq INTEGER NOT NULL,
    op_name VARCHAR(100) NOT NULL,
    machine_code VARCHAR(50),
    setup_time INTEGER DEFAULT 0,
    cycle_time DECIMAL(10, 4) DEFAULT 0,
    process_yield DECIMAL(5, 2) DEFAULT 100,
    revision INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(item_code, op_seq, revision)
);

-- =====================================================
-- 시뮬레이션 시나리오 테이블
-- =====================================================
CREATE TABLE IF NOT EXISTS spacepro.tb_simulation_scenario (
    scenario_id SERIAL PRIMARY KEY,
    scenario_name VARCHAR(200) NOT NULL,
    description TEXT,
    plan_month VARCHAR(7),
    algorithm VARCHAR(20) DEFAULT 'OR_TOOLS',
    orders JSONB,
    result JSONB,
    status VARCHAR(20) DEFAULT 'DRAFT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 오더 진행 현황 테이블
-- =====================================================
CREATE TABLE IF NOT EXISTS spacepro.tb_order_progress (
    progress_id SERIAL PRIMARY KEY,
    scenario_id INTEGER REFERENCES spacepro.tb_simulation_scenario(scenario_id),
    item_code VARCHAR(50) NOT NULL,
    planned_qty INTEGER DEFAULT 0,
    produced_qty INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'PLANNED',
    priority VARCHAR(10) DEFAULT 'NORMAL',
    delay_reason VARCHAR(50),
    delay_note TEXT,
    source_progress_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 완료 메시지
DO $$
BEGIN
    RAISE NOTICE 'SpacePro database initialization completed successfully!';
END $$;
