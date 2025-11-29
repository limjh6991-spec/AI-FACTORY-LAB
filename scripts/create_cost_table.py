"""
COST001 테이블 생성 및 테스트 데이터 INSERT 스크립트
SQL Server에 부서별 월별 원가 테이블 생성
"""

import pymssql

# DB 연결 정보
SERVER = '172.16.200.204'
PORT = 1433
DATABASE = '도우제조MES시스템TEST'
USER = 'TEST_MES_USER'
PASSWORD = 'Dowoo1!'

# 테이블 생성 SQL
CREATE_TABLE_SQL = """
IF OBJECT_ID('dbo.new_doi_cost_monthly_dept_cost', 'U') IS NOT NULL
    DROP TABLE dbo.new_doi_cost_monthly_dept_cost;

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

CREATE INDEX IX_new_doi_cost_monthly_dept_cost_01 ON dbo.new_doi_cost_monthly_dept_cost(base_ym);
CREATE INDEX IX_new_doi_cost_monthly_dept_cost_02 ON dbo.new_doi_cost_monthly_dept_cost(dept_code);
"""

# 테스트 데이터 INSERT SQL
INSERT_TEST_DATA_SQL = """
DELETE FROM new_doi_cost_monthly_dept_cost WHERE base_ym = '202511';

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
"""

try:
    print("=" * 80)
    print("SQL Server 접속 중...")
    print(f"서버: {SERVER}:{PORT}")
    print(f"데이터베이스: {DATABASE}")
    print("=" * 80)
    
    # DB 연결
    conn = pymssql.connect(
        server=SERVER,
        port=PORT,
        user=USER,
        password=PASSWORD,
        database=DATABASE
    )
    
    cursor = conn.cursor()
    print("✅ DB 연결 성공!\n")
    
    # 1. 테이블 생성
    print("📋 테이블 생성 중...")
    print("-" * 80)
    cursor.execute(CREATE_TABLE_SQL)
    conn.commit()
    print("✅ new_doi_cost_monthly_dept_cost 테이블 생성 완료!\n")
    
    # 2. 테스트 데이터 INSERT
    print("📊 테스트 데이터 INSERT 중...")
    print("-" * 80)
    cursor.execute(INSERT_TEST_DATA_SQL)
    conn.commit()
    print("✅ 테스트 데이터 INSERT 완료! (12건)")
    print("   - 기준년월: 202511 (2025년 11월)")
    print("   - 부서: D001~D004 (4개)")
    print("   - 계정: A001~A003 (3개)\n")
    
    # 3. 데이터 확인
    print("🔍 INSERT된 데이터 확인:")
    print("-" * 80)
    cursor.execute("""
        SELECT 
            base_ym,
            dept_code,
            account_code,
            current_amount,
            previous_amount,
            variance_amount,
            variance_rate
        FROM new_doi_cost_monthly_dept_cost
        WHERE base_ym = '202511'
        ORDER BY dept_code, account_code
    """)
    
    rows = cursor.fetchall()
    print(f"{'기준년월':<10} {'부서':<10} {'계정':<10} {'당월금액':>15} {'전월금액':>15} {'차이금액':>15} {'차이율':>10}")
    print("-" * 80)
    for row in rows:
        print(f"{row[0]:<10} {row[1]:<10} {row[2]:<10} {row[3]:>15,.0f} {row[4]:>15,.0f} {row[5]:>15,.0f} {row[6]:>9.2f}%")
    
    print("\n" + "=" * 80)
    print("✅ 모든 작업이 성공적으로 완료되었습니다!")
    print("=" * 80)
    
    cursor.close()
    conn.close()

except Exception as e:
    print(f"\n❌ 오류 발생: {e}")
    import traceback
    traceback.print_exc()
