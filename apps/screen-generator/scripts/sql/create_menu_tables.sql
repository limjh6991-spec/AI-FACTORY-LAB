-- ============================================================
-- AI Factory Lab - 시스템 메뉴 테이블 생성 스크립트
-- 실행: psql -d ai_factory_db -f scripts/sql/create_menu_tables.sql
-- ============================================================

-- 1. 역할 테이블
CREATE TABLE IF NOT EXISTS sys_role (
    role_id         VARCHAR(20)     PRIMARY KEY,
    role_name       VARCHAR(50)     NOT NULL,
    role_desc       VARCHAR(200)    NULL,
    is_active       BOOLEAN         DEFAULT TRUE,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
);

-- 2. 메뉴 테이블
CREATE TABLE IF NOT EXISTS sys_menu (
    menu_id         VARCHAR(20)     PRIMARY KEY,
    parent_id       VARCHAR(20)     NULL,
    menu_level      SMALLINT        NOT NULL DEFAULT 1,
    sort_order      INTEGER         NOT NULL DEFAULT 0,
    menu_name       VARCHAR(100)    NOT NULL,
    menu_name_en    VARCHAR(100)    NULL,
    menu_path       VARCHAR(200)    NULL,
    menu_icon       VARCHAR(50)     NULL,
    screen_id       VARCHAR(20)     NULL,
    screen_type     VARCHAR(20)     DEFAULT 'list',
    is_active       BOOLEAN         DEFAULT TRUE,
    is_visible      BOOLEAN         DEFAULT TRUE,
    badge_text      VARCHAR(20)     NULL,
    badge_type      VARCHAR(20)     NULL,
    created_by      VARCHAR(50)     NULL,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    updated_by      VARCHAR(50)     NULL,
    updated_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_parent_menu FOREIGN KEY (parent_id) REFERENCES sys_menu(menu_id)
);

-- 3. 메뉴-역할 매핑 테이블
CREATE TABLE IF NOT EXISTS sys_menu_role (
    id              SERIAL          PRIMARY KEY,
    menu_id         VARCHAR(20)     NOT NULL,
    role_id         VARCHAR(20)     NOT NULL,
    can_read        BOOLEAN         DEFAULT TRUE,
    can_create      BOOLEAN         DEFAULT FALSE,
    can_update      BOOLEAN         DEFAULT FALSE,
    can_delete      BOOLEAN         DEFAULT FALSE,
    can_export      BOOLEAN         DEFAULT FALSE,
    can_print       BOOLEAN         DEFAULT FALSE,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_menu_role_menu FOREIGN KEY (menu_id) REFERENCES sys_menu(menu_id),
    CONSTRAINT fk_menu_role_role FOREIGN KEY (role_id) REFERENCES sys_role(role_id),
    CONSTRAINT uk_menu_role UNIQUE (menu_id, role_id)
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_menu_parent ON sys_menu(parent_id);
CREATE INDEX IF NOT EXISTS idx_menu_level ON sys_menu(menu_level);
CREATE INDEX IF NOT EXISTS idx_menu_path ON sys_menu(menu_path);
CREATE INDEX IF NOT EXISTS idx_menu_sort ON sys_menu(sort_order);
CREATE INDEX IF NOT EXISTS idx_menu_role_menu ON sys_menu_role(menu_id);
CREATE INDEX IF NOT EXISTS idx_menu_role_role ON sys_menu_role(role_id);

-- ============================================================
-- 초기 데이터: 역할
-- ============================================================
INSERT INTO sys_role (role_id, role_name, role_desc) VALUES
('ADMIN', '시스템관리자', '모든 메뉴 접근 가능'),
('MANAGER', '관리자', '관리 기능 접근 가능'),
('USER', '일반사용자', '기본 조회 기능만'),
('VIEWER', '조회전용', '조회만 가능')
ON CONFLICT (role_id) DO NOTHING;

-- ============================================================
-- 초기 데이터: 메뉴
-- ============================================================
INSERT INTO sys_menu (menu_id, parent_id, menu_level, sort_order, menu_name, menu_path, menu_icon, screen_type) VALUES
-- 대시보드
('MNU000', NULL, 1, 0, '대시보드', '/', 'LayoutDashboard', 'dashboard'),

-- 생산관리
('MNU100', NULL, 1, 100, '생산관리', NULL, 'Factory', 'folder'),
('MNU110', 'MNU100', 2, 110, '생산계획 관리', '/screens/sc110', 'Calendar', 'list'),
('MNU120', 'MNU100', 2, 120, '작업지시 현황', '/screens/sc120', 'ClipboardList', 'list'),
('MNU130', 'MNU100', 2, 130, '생산실적 조회', '/screens/sc130', 'BarChart', 'report'),
('MNU140', 'MNU100', 2, 140, '생산 수불 현황', '/screens/sc140', 'ArrowLeftRight', 'report'),

-- 재고관리
('MNU200', NULL, 1, 200, '재고관리', NULL, 'Package', 'folder'),
('MNU210', 'MNU200', 2, 210, '재고 현황 조회', '/screens/sc210', 'Search', 'list'),
('MNU220', 'MNU200', 2, 220, '입출고 관리', '/screens/sc220', 'ArrowRightLeft', 'form'),
('MNU230', 'MNU200', 2, 230, '재고 실사', '/screens/sc230', 'ClipboardCheck', 'form'),
('MNU240', 'MNU200', 2, 240, '안전재고 관리', '/screens/sc240', 'ShieldAlert', 'list'),

-- 영업관리
('MNU300', NULL, 1, 300, '영업관리', NULL, 'Handshake', 'folder'),
('MNU310', 'MNU300', 2, 310, '수주 관리', '/screens/sc310', 'FileText', 'form'),
('MNU320', 'MNU300', 2, 320, '출하 관리', '/screens/sc320', 'Truck', 'form'),
('MNU330', 'MNU300', 2, 330, '매출 현황', '/screens/sc330', 'TrendingUp', 'report'),
('MNU340', 'MNU300', 2, 340, '판매관리비 집계', '/screens/sc982157', 'Calculator', 'report'),

-- 원가관리
('MNU400', NULL, 1, 400, '원가관리', NULL, 'DollarSign', 'folder'),
('MNU410', 'MNU400', 2, 410, '원가 계산', '/screens/sc410', 'Calculator', 'form'),
('MNU420', 'MNU400', 2, 420, '부서별 원가 분석', '/screens/sc420', 'PieChart', 'report'),
('MNU430', 'MNU400', 2, 430, '제품별 원가 조회', '/screens/sc430', 'Search', 'list'),

-- 기준정보
('MNU500', NULL, 1, 500, '기준정보', NULL, 'Database', 'folder'),
('MNU510', 'MNU500', 2, 510, '품목 마스터', '/screens/sc510', 'Boxes', 'list'),
('MNU520', 'MNU500', 2, 520, 'BOM 관리', '/screens/sc520', 'GitBranch', 'form'),
('MNU530', 'MNU500', 2, 530, '거래처 관리', '/screens/sc530', 'Building', 'list'),
('MNU540', 'MNU500', 2, 540, '부서 관리', '/screens/sc540', 'Users', 'list'),
('MNU550', 'MNU500', 2, 550, '일반코드 관리', '/screens/sc550', 'ListTree', 'list'),

-- 리포트
('MNU600', NULL, 1, 600, '리포트', NULL, 'FileBarChart', 'folder'),
('MNU610', 'MNU600', 2, 610, '일일 생산 현황', '/screens/sc610', 'CalendarDays', 'report'),
('MNU620', 'MNU600', 2, 620, '월간 매출 분석', '/screens/sc620', 'BarChart3', 'report'),
('MNU630', 'MNU600', 2, 630, '재고 추이 분석', '/screens/sc630', 'LineChart', 'report'),

-- 시스템
('MNU900', NULL, 1, 900, '시스템', NULL, 'Settings', 'folder'),
('MNU910', 'MNU900', 2, 910, '사용자 관리', '/screens/sc910', 'UserCog', 'list'),
('MNU920', 'MNU900', 2, 920, '권한 관리', '/screens/sc920', 'ShieldCheck', 'list'),
('MNU930', 'MNU900', 2, 930, '메뉴 관리', '/screens/sc930', 'Menu', 'list'),
('MNU940', 'MNU900', 2, 940, '시스템 설정', '/screens/sc940', 'Cog', 'form')
ON CONFLICT (menu_id) DO NOTHING;

-- ============================================================
-- 관리자 역할에 모든 메뉴 권한 부여
-- ============================================================
INSERT INTO sys_menu_role (menu_id, role_id, can_read, can_create, can_update, can_delete, can_export, can_print)
SELECT menu_id, 'ADMIN', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE
FROM sys_menu
ON CONFLICT (menu_id, role_id) DO NOTHING;

-- 일반 사용자 역할에 조회 권한만 부여
INSERT INTO sys_menu_role (menu_id, role_id, can_read, can_create, can_update, can_delete, can_export, can_print)
SELECT menu_id, 'USER', TRUE, FALSE, FALSE, FALSE, TRUE, TRUE
FROM sys_menu
WHERE menu_level = 2
ON CONFLICT (menu_id, role_id) DO NOTHING;

-- ============================================================
-- 완료 확인
-- ============================================================
SELECT 'sys_role' as table_name, count(*) as count FROM sys_role
UNION ALL
SELECT 'sys_menu', count(*) FROM sys_menu
UNION ALL
SELECT 'sys_menu_role', count(*) FROM sys_menu_role;
