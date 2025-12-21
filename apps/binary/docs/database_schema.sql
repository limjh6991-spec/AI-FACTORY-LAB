-- =====================================================
-- Binary Soft 프로젝트 관리 시스템 - 데이터베이스 스키마
-- 기준정보 테이블 (Master Tables)
-- =====================================================

-- 스키마 생성
CREATE SCHEMA IF NOT EXISTS binary;

-- =====================================================
-- 1. 시스템 공통
-- =====================================================

-- 공통코드 마스터
CREATE TABLE binary.bi_code_mst (
    code_group      VARCHAR(20) NOT NULL,           -- 코드그룹
    code            VARCHAR(20) NOT NULL,           -- 코드
    code_name       VARCHAR(100) NOT NULL,          -- 코드명
    code_name_en    VARCHAR(100),                   -- 코드명(영문)
    description     TEXT,                           -- 설명
    sort_order      INTEGER DEFAULT 0,              -- 정렬순서
    use_yn          CHAR(1) DEFAULT 'Y',            -- 사용여부
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (code_group, code)
);

COMMENT ON TABLE binary.bi_code_mst IS '공통코드 마스터';

-- 메뉴 마스터
CREATE TABLE binary.bi_menu_mst (
    menu_id         SERIAL PRIMARY KEY,             -- 메뉴ID
    menu_code       VARCHAR(20) NOT NULL UNIQUE,    -- 메뉴코드
    menu_name       VARCHAR(100) NOT NULL,          -- 메뉴명
    menu_name_en    VARCHAR(100),                   -- 메뉴명(영문)
    menu_path       VARCHAR(200),                   -- 메뉴경로
    menu_icon       VARCHAR(50),                    -- 메뉴아이콘
    parent_id       INTEGER,                        -- 상위메뉴ID
    menu_level      INTEGER DEFAULT 1,              -- 메뉴레벨
    sort_order      INTEGER DEFAULT 0,              -- 정렬순서
    menu_type       VARCHAR(10) DEFAULT 'MENU',     -- 메뉴유형 (GROUP/MENU)
    use_yn          CHAR(1) DEFAULT 'Y',            -- 사용여부
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE binary.bi_menu_mst IS '메뉴 마스터';

-- =====================================================
-- 2. 조직/인력 관련
-- =====================================================

-- 부서 마스터
CREATE TABLE binary.bi_dept_mst (
    dept_id         SERIAL PRIMARY KEY,             -- 부서ID
    dept_code       VARCHAR(20) NOT NULL UNIQUE,    -- 부서코드
    dept_name       VARCHAR(100) NOT NULL,          -- 부서명
    parent_id       INTEGER,                        -- 상위부서ID
    sort_order      INTEGER DEFAULT 0,              -- 정렬순서
    use_yn          CHAR(1) DEFAULT 'Y',            -- 사용여부
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE binary.bi_dept_mst IS '부서 마스터';

-- 역할 마스터
CREATE TABLE binary.bi_role_mst (
    role_id         SERIAL PRIMARY KEY,             -- 역할ID
    role_code       VARCHAR(20) NOT NULL UNIQUE,    -- 역할코드
    role_name       VARCHAR(50) NOT NULL,           -- 역할명
    description     TEXT,                           -- 설명
    sort_order      INTEGER DEFAULT 0,              -- 정렬순서
    use_yn          CHAR(1) DEFAULT 'Y',            -- 사용여부
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE binary.bi_role_mst IS '역할 마스터 (PM, PL, 개발자, QA 등)';

-- 직원 마스터 (간소화)
CREATE TABLE binary.bi_emp_mst (
    emp_id          SERIAL PRIMARY KEY,             -- 직원ID
    emp_code        VARCHAR(20) NOT NULL UNIQUE,    -- 사번
    emp_name        VARCHAR(50) NOT NULL,           -- 이름
    dept_id         INTEGER,                        -- 부서ID
    email           VARCHAR(100),                   -- 이메일
    phone           VARCHAR(20),                    -- 전화번호
    use_yn          CHAR(1) DEFAULT 'Y',            -- 사용여부
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dept_id) REFERENCES binary.bi_dept_mst(dept_id)
);

COMMENT ON TABLE binary.bi_emp_mst IS '직원 마스터';

-- =====================================================
-- 3. 고객 관련
-- =====================================================

-- 고객사 마스터 (담당자 정보 통합)
CREATE TABLE binary.bi_client_mst (
    client_id       SERIAL PRIMARY KEY,             -- 고객사ID
    client_code     VARCHAR(20) NOT NULL UNIQUE,    -- 고객코드
    client_name     VARCHAR(100) NOT NULL,          -- 고객명
    industry        VARCHAR(50),                    -- 업종
    contact_name    VARCHAR(50),                    -- 담당자명
    contact_position VARCHAR(50),                   -- 직책
    contact_phone   VARCHAR(20),                    -- 연락처
    contact_email   VARCHAR(100),                   -- 이메일
    use_yn          CHAR(1) DEFAULT 'Y',            -- 사용여부
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE binary.bi_client_mst IS '고객사 마스터';

-- =====================================================
-- 4. 프로젝트 관련 (코드 테이블)
-- =====================================================

-- 프로젝트 유형
CREATE TABLE binary.bi_project_type (
    type_id         SERIAL PRIMARY KEY,             -- 유형ID
    type_code       VARCHAR(20) NOT NULL UNIQUE,    -- 유형코드
    type_name       VARCHAR(50) NOT NULL,           -- 유형명 (SI, SM, 컨설팅 등)
    description     TEXT,                           -- 설명
    sort_order      INTEGER DEFAULT 0,              -- 정렬순서
    use_yn          CHAR(1) DEFAULT 'Y',            -- 사용여부
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE binary.bi_project_type IS '프로젝트 유형 (SI, SM, 컨설팅, 솔루션 등)';

-- 프로젝트 단계
CREATE TABLE binary.bi_project_phase (
    phase_id        SERIAL PRIMARY KEY,             -- 단계ID
    phase_code      VARCHAR(20) NOT NULL UNIQUE,    -- 단계코드
    phase_name      VARCHAR(50) NOT NULL,           -- 단계명 (수주, 착수, 개발 등)
    description     TEXT,                           -- 설명
    sort_order      INTEGER DEFAULT 0,              -- 정렬순서
    use_yn          CHAR(1) DEFAULT 'Y',            -- 사용여부
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE binary.bi_project_phase IS '프로젝트 단계 (수주, 착수, 개발, 검수, 종료)';

-- 프로젝트 상태
CREATE TABLE binary.bi_project_status (
    status_id       SERIAL PRIMARY KEY,             -- 상태ID
    status_code     VARCHAR(20) NOT NULL UNIQUE,    -- 상태코드
    status_name     VARCHAR(50) NOT NULL,           -- 상태명 (진행중, 완료 등)
    color           VARCHAR(20),                    -- 표시색상
    description     TEXT,                           -- 설명
    sort_order      INTEGER DEFAULT 0,              -- 정렬순서
    use_yn          CHAR(1) DEFAULT 'Y',            -- 사용여부
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE binary.bi_project_status IS '프로젝트 상태 (진행중, 완료, 지연, 대기, 중단)';

-- 이슈 유형
CREATE TABLE binary.bi_issue_type (
    issue_type_id   SERIAL PRIMARY KEY,             -- 이슈유형ID
    issue_type_code VARCHAR(20) NOT NULL UNIQUE,    -- 이슈유형코드
    issue_type_name VARCHAR(50) NOT NULL,           -- 이슈유형명
    color           VARCHAR(20),                    -- 표시색상
    description     TEXT,                           -- 설명
    sort_order      INTEGER DEFAULT 0,              -- 정렬순서
    use_yn          CHAR(1) DEFAULT 'Y',            -- 사용여부
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE binary.bi_issue_type IS '이슈 유형 (버그, 요청사항, 위험 등)';

-- 우선순위 마스터
CREATE TABLE binary.bi_priority_mst (
    priority_id     SERIAL PRIMARY KEY,             -- 우선순위ID
    priority_code   VARCHAR(20) NOT NULL UNIQUE,    -- 우선순위코드
    priority_name   VARCHAR(50) NOT NULL,           -- 우선순위명
    color           VARCHAR(20),                    -- 표시색상
    priority_level  INTEGER DEFAULT 0,              -- 우선순위레벨 (낮을수록 높음)
    description     TEXT,                           -- 설명
    use_yn          CHAR(1) DEFAULT 'Y',            -- 사용여부
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE binary.bi_priority_mst IS '우선순위 (긴급, 높음, 중간, 낮음)';

-- =====================================================
-- 5. 프로젝트 마스터 및 정보
-- =====================================================

-- 프로젝트 마스터
CREATE TABLE binary.bi_project_mst (
    project_id      SERIAL PRIMARY KEY,             -- 프로젝트ID
    project_code    VARCHAR(20) NOT NULL UNIQUE,    -- 프로젝트코드
    project_name    VARCHAR(200) NOT NULL,          -- 프로젝트명
    description     TEXT,                           -- 프로젝트 설명
    use_yn          CHAR(1) DEFAULT 'Y',            -- 사용여부
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE binary.bi_project_mst IS '프로젝트 마스터';

-- 프로젝트 정보 (상세 정보 및 FK 연결)
CREATE TABLE binary.bi_project_info (
    project_info_id SERIAL PRIMARY KEY,             -- 프로젝트정보ID
    project_id      INTEGER NOT NULL,               -- 프로젝트ID (FK)
    type_id         INTEGER,                        -- 프로젝트 유형ID (FK)
    phase_id        INTEGER,                        -- 현재 단계ID (FK)
    status_id       INTEGER,                        -- 상태ID (FK)
    priority_id     INTEGER,                        -- 우선순위ID (FK)
    client_id       INTEGER,                        -- 고객사ID (FK)
    pm_emp_id       INTEGER,                        -- PM 직원ID (FK)
    start_date      DATE,                           -- 시작일
    end_date        DATE,                           -- 종료일
    budget          DECIMAL(15,2),                  -- 예산
    progress        INTEGER DEFAULT 0,              -- 진행률 (0-100)
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES binary.bi_project_mst(project_id),
    FOREIGN KEY (type_id) REFERENCES binary.bi_project_type(type_id),
    FOREIGN KEY (phase_id) REFERENCES binary.bi_project_phase(phase_id),
    FOREIGN KEY (status_id) REFERENCES binary.bi_project_status(status_id),
    FOREIGN KEY (priority_id) REFERENCES binary.bi_priority_mst(priority_id),
    FOREIGN KEY (client_id) REFERENCES binary.bi_client_mst(client_id),
    FOREIGN KEY (pm_emp_id) REFERENCES binary.bi_emp_mst(emp_id)
);

COMMENT ON TABLE binary.bi_project_info IS '프로젝트 정보 (상세 정보 및 관계)';

-- 프로젝트 배정 직원 (프로젝트-직원 다대다 관계)
CREATE TABLE binary.bi_project_member (
    project_member_id SERIAL PRIMARY KEY,           -- 배정ID
    project_id      INTEGER NOT NULL,               -- 프로젝트ID (FK)
    emp_id          INTEGER NOT NULL,               -- 직원ID (FK)
    role_id         INTEGER,                        -- 역할ID (FK)
    join_date       DATE,                           -- 투입일
    leave_date      DATE,                           -- 철수일
    allocation      INTEGER DEFAULT 100,            -- 투입률 (%)
    is_active       CHAR(1) DEFAULT 'Y',            -- 활성여부
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES binary.bi_project_mst(project_id),
    FOREIGN KEY (emp_id) REFERENCES binary.bi_emp_mst(emp_id),
    FOREIGN KEY (role_id) REFERENCES binary.bi_role_mst(role_id),
    UNIQUE (project_id, emp_id)
);

COMMENT ON TABLE binary.bi_project_member IS '프로젝트 배정 직원';

-- =====================================================
-- 6. 문서/산출물 관련
-- =====================================================

-- 문서 유형
CREATE TABLE binary.bi_doc_type (
    doc_type_id     SERIAL PRIMARY KEY,             -- 문서유형ID
    doc_type_code   VARCHAR(20) NOT NULL UNIQUE,    -- 문서유형코드
    doc_type_name   VARCHAR(50) NOT NULL,           -- 문서유형명
    description     TEXT,                           -- 설명
    sort_order      INTEGER DEFAULT 0,              -- 정렬순서
    use_yn          CHAR(1) DEFAULT 'Y',            -- 사용여부
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE binary.bi_doc_type IS '문서 유형 (제안서, 계획서, 설계서, 보고서 등)';

-- 산출물 마스터
CREATE TABLE binary.bi_deliverable_mst (
    deliverable_id  SERIAL PRIMARY KEY,             -- 산출물ID
    deliverable_code VARCHAR(20) NOT NULL UNIQUE,   -- 산출물코드
    deliverable_name VARCHAR(100) NOT NULL,         -- 산출물명
    phase_id        INTEGER,                        -- 해당 단계ID
    doc_type_id     INTEGER,                        -- 문서유형ID
    is_required     CHAR(1) DEFAULT 'N',            -- 필수여부
    template_path   VARCHAR(200),                   -- 템플릿 경로
    description     TEXT,                           -- 설명
    sort_order      INTEGER DEFAULT 0,              -- 정렬순서
    use_yn          CHAR(1) DEFAULT 'Y',            -- 사용여부
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (phase_id) REFERENCES binary.bi_project_phase(phase_id),
    FOREIGN KEY (doc_type_id) REFERENCES binary.bi_doc_type(doc_type_id)
);

COMMENT ON TABLE binary.bi_deliverable_mst IS '산출물 마스터 (단계별 필수 산출물 정의)';

-- =====================================================
-- 인덱스 생성
-- =====================================================

CREATE INDEX idx_emp_dept ON binary.bi_emp_mst(dept_id);
CREATE INDEX idx_emp_name ON binary.bi_emp_mst(emp_name);
CREATE INDEX idx_client_name ON binary.bi_client_mst(client_name);
CREATE INDEX idx_project_name ON binary.bi_project_mst(project_name);
CREATE INDEX idx_project_info_project ON binary.bi_project_info(project_id);
CREATE INDEX idx_project_info_client ON binary.bi_project_info(client_id);
CREATE INDEX idx_project_info_status ON binary.bi_project_info(status_id);
CREATE INDEX idx_project_member_project ON binary.bi_project_member(project_id);
CREATE INDEX idx_project_member_emp ON binary.bi_project_member(emp_id);
CREATE INDEX idx_deliverable_phase ON binary.bi_deliverable_mst(phase_id);
