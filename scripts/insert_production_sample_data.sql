-- =====================================================
-- 생산 실적 샘플 데이터 등록
-- 복잡한 그리드 화면 테스트용
-- =====================================================

USE [도우제조MES시스템TEST];
GO

-- 기존 데이터 삭제
DELETE FROM dbo.new_doi_prd_result;
GO

-- 샘플 데이터 삽입 (30건)
-- 2025-11-25 ~ 2025-11-30 (6일간)
-- 공장: F001(본사), F002(2공장)
-- 라인: L01, L02, L03
-- 근무조: A, B, C

DECLARE @i INT = 1;
DECLARE @date DATE = '2025-11-25';
DECLARE @factories TABLE (cd VARCHAR(10));
DECLARE @lines TABLE (cd VARCHAR(10));
DECLARE @shifts TABLE (cd VARCHAR(2));
DECLARE @items TABLE (cd VARCHAR(20), nm VARCHAR(100), spec VARCHAR(100), unit VARCHAR(10));

-- 공장 코드
INSERT INTO @factories VALUES ('F001'), ('F002');

-- 라인 코드
INSERT INTO @lines VALUES ('L01'), ('L02'), ('L03');

-- 근무조
INSERT INTO @shifts VALUES ('A'), ('B'), ('C');

-- 품목 마스터
INSERT INTO @items VALUES 
    ('P0001', '알루미늄 프레임 A-100', '100x50x2.0t', 'EA'),
    ('P0002', '스테인리스 파이프 S-200', 'Φ50x3.0t x 6M', 'M'),
    ('P0003', '강판 SP-300', '1000x2000x5.0t', 'EA'),
    ('P0004', '볼트 M8x30', 'M8 x 30mm', 'EA'),
    ('P0005', '너트 M8', 'M8 육각', 'EA');

-- 30건의 샘플 데이터 생성
WHILE @i <= 30
BEGIN
    INSERT INTO dbo.new_doi_prd_result (
        result_id, prd_date, factory_cd, line_cd, shift_cd,
        item_cd, item_nm, spec, unit,
        plan_qty, prod_qty, good_qty, defect_qty,
        defect_type, defect_reason,
        start_time, end_time, work_time, stop_time,
        worker_id, worker_nm, team_cd,
        inspect_yn, inspect_result, inspector_id,
        remark, status, confirm_yn,
        reg_id, reg_dt
    )
    SELECT
        'R' + RIGHT('0000' + CAST(@i AS VARCHAR), 5) AS result_id,
        DATEADD(DAY, (@i - 1) / 5, @date) AS prd_date,
        (SELECT TOP 1 cd FROM @factories ORDER BY NEWID()) AS factory_cd,
        (SELECT TOP 1 cd FROM @lines ORDER BY NEWID()) AS line_cd,
        (SELECT TOP 1 cd FROM @shifts ORDER BY NEWID()) AS shift_cd,
        item.cd AS item_cd,
        item.nm AS item_nm,
        item.spec AS spec,
        item.unit AS unit,
        ABS(CHECKSUM(NEWID()) % 900 + 100) AS plan_qty,
        ABS(CHECKSUM(NEWID()) % 850 + 80) AS prod_qty,
        ABS(CHECKSUM(NEWID()) % 800 + 70) AS good_qty,
        ABS(CHECKSUM(NEWID()) % 50) AS defect_qty,
        CASE ABS(CHECKSUM(NEWID()) % 4)
            WHEN 0 THEN '치수불량'
            WHEN 1 THEN '외관불량'
            WHEN 2 THEN '기능불량'
            ELSE NULL
        END AS defect_type,
        CASE ABS(CHECKSUM(NEWID()) % 3)
            WHEN 0 THEN '원자재 불량'
            WHEN 1 THEN '가공 오류'
            ELSE '설비 이상'
        END AS defect_reason,
        DATEADD(HOUR, 8, DATEADD(DAY, (@i - 1) / 5, @date)) AS start_time,
        DATEADD(HOUR, 17, DATEADD(DAY, (@i - 1) / 5, @date)) AS end_time,
        480 AS work_time,
        ABS(CHECKSUM(NEWID()) % 60) AS stop_time,
        'W' + RIGHT('000' + CAST(ABS(CHECKSUM(NEWID()) % 10 + 1) AS VARCHAR), 3) AS worker_id,
        '작업자' + CAST(ABS(CHECKSUM(NEWID()) % 10 + 1) AS VARCHAR) AS worker_nm,
        'T' + CAST(ABS(CHECKSUM(NEWID()) % 3 + 1) AS VARCHAR) AS team_cd,
        CASE WHEN @i % 2 = 0 THEN 'Y' ELSE 'N' END AS inspect_yn,
        CASE WHEN @i % 2 = 0 THEN (CASE WHEN @i % 3 = 0 THEN 'FAIL' ELSE 'PASS' END) ELSE NULL END AS inspect_result,
        CASE WHEN @i % 2 = 0 THEN 'I' + RIGHT('000' + CAST(ABS(CHECKSUM(NEWID()) % 5 + 1) AS VARCHAR), 3) ELSE NULL END AS inspector_id,
        CASE 
            WHEN @i % 5 = 0 THEN '긴급 생산 건'
            WHEN @i % 7 = 0 THEN '재작업 필요'
            ELSE NULL
        END AS remark,
        CASE 
            WHEN @i % 4 = 0 THEN 'CONFIRM'
            WHEN @i % 4 = 1 THEN 'TEMP'
            ELSE 'TEMP'
        END AS status,
        CASE WHEN @i % 4 = 0 THEN 'Y' ELSE 'N' END AS confirm_yn,
        'ADMIN' AS reg_id,
        DATEADD(HOUR, 18, DATEADD(DAY, (@i - 1) / 5, @date)) AS reg_dt
    FROM (SELECT TOP 1 * FROM @items ORDER BY NEWID()) item;

    SET @i = @i + 1;
END;
GO

PRINT '✅ 샘플 데이터 30건이 등록되었습니다.';
GO

-- 데이터 확인
SELECT 
    COUNT(*) AS '총 건수',
    MIN(prd_date) AS '시작일',
    MAX(prd_date) AS '종료일',
    SUM(plan_qty) AS '계획수량 합계',
    SUM(prod_qty) AS '생산수량 합계',
    SUM(good_qty) AS '양품수량 합계',
    SUM(defect_qty) AS '불량수량 합계'
FROM dbo.new_doi_prd_result;
GO

-- 공장별 집계
SELECT 
    factory_cd AS '공장',
    COUNT(*) AS '건수',
    SUM(prod_qty) AS '생산수량',
    SUM(good_qty) AS '양품수량',
    SUM(defect_qty) AS '불량수량',
    CAST(SUM(defect_qty) * 100.0 / NULLIF(SUM(prod_qty), 0) AS DECIMAL(5,2)) AS '불량률(%)'
FROM dbo.new_doi_prd_result
GROUP BY factory_cd
ORDER BY factory_cd;
GO

-- 일자별 집계
SELECT 
    prd_date AS '생산일자',
    COUNT(*) AS '건수',
    SUM(prod_qty) AS '생산수량',
    SUM(good_qty) AS '양품수량',
    CAST(AVG(work_time) AS INT) AS '평균작업시간(분)'
FROM dbo.new_doi_prd_result
GROUP BY prd_date
ORDER BY prd_date;
GO

-- 상세 데이터 조회 (최근 10건)
SELECT TOP 10
    result_id AS '실적ID',
    prd_date AS '생산일자',
    factory_cd AS '공장',
    line_cd AS '라인',
    item_nm AS '품목명',
    prod_qty AS '생산수량',
    good_qty AS '양품수량',
    defect_qty AS '불량수량',
    status AS '상태'
FROM dbo.new_doi_prd_result
ORDER BY prd_date DESC, result_id DESC;
GO
