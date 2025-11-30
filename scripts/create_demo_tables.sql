-- ============================================
-- RealGrid Demo 테이블 생성 스크립트
-- 작성일: 2025-11-30
-- 목적: Grid1, Grid2, Grid3 샘플 데이터 저장
-- ============================================

USE [도우제조MES시스템TEST];
GO

-- ============================================
-- Grid1: 주문 데이터 (Column Layout Demo)
-- ============================================
IF OBJECT_ID('new_doi_demo_orders', 'U') IS NOT NULL
    DROP TABLE new_doi_demo_orders;
GO

CREATE TABLE new_doi_demo_orders (
    order_id INT IDENTITY(1,1) PRIMARY KEY,
    order_no NVARCHAR(20) NOT NULL,
    customer_id NVARCHAR(20) NOT NULL,
    country NVARCHAR(50),
    company_name NVARCHAR(100),
    employee_id NVARCHAR(20),
    order_date DATE,
    phone NVARCHAR(20),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);
GO

PRINT '✅ new_doi_demo_orders 테이블 생성 완료';
GO

-- ============================================
-- Grid2: 직원 데이터 (Cell Merging Demo)
-- ============================================
IF OBJECT_ID('new_doi_demo_employee', 'U') IS NOT NULL
    DROP TABLE new_doi_demo_employee;
GO

CREATE TABLE new_doi_demo_employee (
    emp_id INT IDENTITY(1,1) PRIMARY KEY,
    dept_name NVARCHAR(50) NOT NULL,
    dept_name_en NVARCHAR(50),
    emp_name NVARCHAR(50) NOT NULL,
    position NVARCHAR(20),
    hire_date DATE,
    salary INT,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);
GO

PRINT '✅ new_doi_demo_employee 테이블 생성 완료';
GO

-- ============================================
-- Grid3: 판매 실적 데이터 (Combined Example)
-- ============================================
IF OBJECT_ID('new_doi_demo_sales', 'U') IS NOT NULL
    DROP TABLE new_doi_demo_sales;
GO

CREATE TABLE new_doi_demo_sales (
    sales_id INT IDENTITY(1,1) PRIMARY KEY,
    year NVARCHAR(10) NOT NULL,
    quarter NVARCHAR(10) NOT NULL,
    month NVARCHAR(10) NOT NULL,
    region NVARCHAR(50) NOT NULL,
    category NVARCHAR(50),
    target_amount BIGINT,
    actual_amount BIGINT,
    achievement_rate DECIMAL(5,1),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);
GO

PRINT '✅ new_doi_demo_sales 테이블 생성 완료';
GO

-- ============================================
-- 인덱스 생성
-- ============================================
CREATE INDEX idx_orders_date ON new_doi_demo_orders(order_date);
CREATE INDEX idx_employee_dept ON new_doi_demo_employee(dept_name);
CREATE INDEX idx_sales_period ON new_doi_demo_sales(year, quarter, month);
GO

PRINT '✅ 인덱스 생성 완료';
PRINT '';
PRINT '===========================================';
PRINT '모든 테이블 생성 완료!';
PRINT '다음 단계: insert_demo_data.sql 실행';
PRINT '===========================================';
GO
