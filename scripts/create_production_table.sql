-- =====================================================
-- 생산 실적 관리 테이블 생성 스크립트
-- 복잡한 그리드 화면 테스트용
-- =====================================================

USE [도우제조MES시스템TEST];
GO

-- 기존 테이블이 있으면 삭제 (테스트용)
IF OBJECT_ID('dbo.new_doi_prd_result', 'U') IS NOT NULL
    DROP TABLE dbo.new_doi_prd_result;
GO

-- 생산 실적 테이블 생성
CREATE TABLE dbo.new_doi_prd_result (
    -- 기본키
    result_id       VARCHAR(20) NOT NULL PRIMARY KEY,       -- 실적 ID
    
    -- 생산 정보
    prd_date        DATE NOT NULL,                          -- 생산 일자
    factory_cd      VARCHAR(10) NOT NULL,                   -- 공장 코드
    line_cd         VARCHAR(10) NOT NULL,                   -- 라인 코드
    shift_cd        VARCHAR(2),                             -- 근무 조 (A/B/C)
    
    -- 제품 정보
    item_cd         VARCHAR(20) NOT NULL,                   -- 품목 코드
    item_nm         VARCHAR(100),                           -- 품목명
    spec            VARCHAR(100),                           -- 규격
    unit            VARCHAR(10),                            -- 단위
    
    -- 실적 수량
    plan_qty        DECIMAL(15,2) DEFAULT 0,                -- 계획 수량
    prod_qty        DECIMAL(15,2) DEFAULT 0,                -- 생산 수량
    good_qty        DECIMAL(15,2) DEFAULT 0,                -- 양품 수량
    defect_qty      DECIMAL(15,2) DEFAULT 0,                -- 불량 수량
    
    -- 불량 상세
    defect_type     VARCHAR(50),                            -- 불량 유형
    defect_reason   VARCHAR(200),                           -- 불량 사유
    
    -- 작업 시간
    start_time      DATETIME,                               -- 작업 시작 시간
    end_time        DATETIME,                               -- 작업 종료 시간
    work_time       INT,                                    -- 작업 시간 (분)
    stop_time       INT DEFAULT 0,                          -- 정지 시간 (분)
    
    -- 작업자 정보
    worker_id       VARCHAR(20),                            -- 작업자 ID
    worker_nm       VARCHAR(50),                            -- 작업자명
    team_cd         VARCHAR(10),                            -- 팀 코드
    
    -- 품질 정보
    inspect_yn      CHAR(1) DEFAULT 'N',                    -- 검사 여부 (Y/N)
    inspect_result  VARCHAR(10),                            -- 검사 결과 (PASS/FAIL)
    inspector_id    VARCHAR(20),                            -- 검사자 ID
    
    -- 비고
    remark          VARCHAR(500),                           -- 비고
    
    -- 상태 관리
    status          VARCHAR(10) DEFAULT 'TEMP',             -- 상태 (TEMP/CONFIRM/CANCEL)
    confirm_yn      CHAR(1) DEFAULT 'N',                    -- 확정 여부 (Y/N)
    
    -- 시스템 정보
    reg_id          VARCHAR(20),                            -- 등록자 ID
    reg_dt          DATETIME DEFAULT GETDATE(),             -- 등록 일시
    upd_id          VARCHAR(20),                            -- 수정자 ID
    upd_dt          DATETIME,                               -- 수정 일시
    
    -- 인덱스
    INDEX idx_prd_date (prd_date),
    INDEX idx_factory_line (factory_cd, line_cd),
    INDEX idx_item (item_cd),
    INDEX idx_status (status)
);
GO

PRINT '✅ new_doi_prd_result 테이블이 생성되었습니다.';
GO

-- 테이블 구조 확인
SELECT 
    COLUMN_NAME AS '컬럼명',
    DATA_TYPE AS '데이터타입',
    CHARACTER_MAXIMUM_LENGTH AS '길이',
    IS_NULLABLE AS 'NULL허용',
    COLUMN_DEFAULT AS '기본값'
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'new_doi_prd_result'
ORDER BY ORDINAL_POSITION;
GO
