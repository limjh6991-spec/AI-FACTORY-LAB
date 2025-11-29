-- COST001 테스트 데이터 INSERT
-- 생성일: 2025-11-29

USE [your_database_name];
GO

-- 기존 테스트 데이터 삭제
DELETE FROM new_doi_cost_monthly_dept_cost WHERE base_ym = '202511';
GO

-- 2025년 11월 테스트 데이터 INSERT
INSERT INTO new_doi_cost_monthly_dept_cost (base_ym, dept_code, account_code, current_amount, previous_amount, variance_amount, variance_rate)
VALUES 
    ('202511', 'D001', 'A001', 15000000.00, 14000000.00, 1000000.00, 7.14),
    ('202511', 'D001', 'A002', 8500000.00, 8000000.00, 500000.00, 6.25),
    ('202511', 'D001', 'A003', 3200000.00, 3500000.00, -300000.00, -8.57),
    
    ('202511', 'D002', 'A001', 12000000.00, 11500000.00, 500000.00, 4.35),
    ('202511', 'D002', 'A002', 6800000.00, 7200000.00, -400000.00, -5.56),
    ('202511', 'D002', 'A003', 4500000.00, 4300000.00, 200000.00, 4.65),
    
    ('202511', 'D003', 'A001', 18000000.00, 17500000.00, 500000.00, 2.86),
    ('202511', 'D003', 'A002', 9200000.00, 9000000.00, 200000.00, 2.22),
    ('202511', 'D003', 'A003', 5600000.00, 6000000.00, -400000.00, -6.67),
    
    ('202511', 'D004', 'A001', 10500000.00, 10000000.00, 500000.00, 5.00),
    ('202511', 'D004', 'A002', 7300000.00, 7000000.00, 300000.00, 4.29),
    ('202511', 'D004', 'A003', 3800000.00, 4000000.00, -200000.00, -5.00);
GO

PRINT '✅ 테스트 데이터 INSERT 완료 (12건)';
PRINT '   - 기준년월: 202511 (2025년 11월)';
PRINT '   - 부서: D001~D004 (4개)';
PRINT '   - 계정: A001~A003 (3개)';
GO

-- 데이터 확인
SELECT 
    base_ym AS '기준년월',
    dept_code AS '부서코드',
    account_code AS '계정코드',
    FORMAT(current_amount, 'N0') AS '당월금액',
    FORMAT(previous_amount, 'N0') AS '전월금액',
    FORMAT(variance_amount, 'N0') AS '차이금액',
    FORMAT(variance_rate, 'N2') + '%' AS '차이율'
FROM new_doi_cost_monthly_dept_cost
WHERE base_ym = '202511'
ORDER BY dept_code, account_code;
GO
