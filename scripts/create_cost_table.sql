-- COST001 부서별 월별 원가 테이블 생성
-- 생성일: 2025-11-29

-- 기존 테이블이 있으면 삭제
IF OBJECT_ID('dbo.new_doi_cost_monthly_dept_cost', 'U') IS NOT NULL
    DROP TABLE dbo.new_doi_cost_monthly_dept_cost;
GO

-- 테이블 생성
CREATE TABLE dbo.new_doi_cost_monthly_dept_cost (
    base_ym VARCHAR(6) NOT NULL,           -- 기준년월 (YYYYMM)
    dept_code VARCHAR(20) NOT NULL,         -- 부서코드
    account_code VARCHAR(20) NOT NULL,      -- 계정코드
    current_amount DECIMAL(18, 2) NULL,     -- 당월금액
    previous_amount DECIMAL(18, 2) NULL,    -- 전월금액
    variance_amount DECIMAL(18, 2) NULL,    -- 차이금액
    variance_rate DECIMAL(10, 2) NULL,      -- 차이율(%)
    reg_dt DATETIME DEFAULT GETDATE(),      -- 등록일시
    
    CONSTRAINT PK_new_doi_cost_monthly_dept_cost PRIMARY KEY (base_ym, dept_code, account_code)
);
GO

-- 인덱스 생성
CREATE INDEX IX_new_doi_cost_monthly_dept_cost_01 ON dbo.new_doi_cost_monthly_dept_cost(base_ym);
CREATE INDEX IX_new_doi_cost_monthly_dept_cost_02 ON dbo.new_doi_cost_monthly_dept_cost(dept_code);
GO

PRINT '✅ new_doi_cost_monthly_dept_cost 테이블 생성 완료';
GO
