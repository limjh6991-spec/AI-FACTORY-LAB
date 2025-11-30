"""
생산 실적 테이블 생성 스크립트
복잡한 그리드 화면 테스트용
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
IF OBJECT_ID('dbo.new_doi_prd_result', 'U') IS NOT NULL
    DROP TABLE dbo.new_doi_prd_result

CREATE TABLE dbo.new_doi_prd_result (
    -- 기본키
    result_id       VARCHAR(20) NOT NULL PRIMARY KEY,
    
    -- 생산 정보
    prd_date        DATE NOT NULL,
    factory_cd      VARCHAR(10) NOT NULL,
    line_cd         VARCHAR(10) NOT NULL,
    shift_cd        VARCHAR(2),
    
    -- 제품 정보
    item_cd         VARCHAR(20) NOT NULL,
    item_nm         VARCHAR(100),
    spec            VARCHAR(100),
    unit            VARCHAR(10),
    
    -- 실적 수량
    plan_qty        DECIMAL(15,2) DEFAULT 0,
    prod_qty        DECIMAL(15,2) DEFAULT 0,
    good_qty        DECIMAL(15,2) DEFAULT 0,
    defect_qty      DECIMAL(15,2) DEFAULT 0,
    
    -- 불량 상세
    defect_type     VARCHAR(50),
    defect_reason   VARCHAR(200),
    
    -- 작업 시간
    start_time      DATETIME,
    end_time        DATETIME,
    work_time       INT,
    stop_time       INT DEFAULT 0,
    
    -- 작업자 정보
    worker_id       VARCHAR(20),
    worker_nm       VARCHAR(50),
    team_cd         VARCHAR(10),
    
    -- 품질 정보
    inspect_yn      CHAR(1) DEFAULT 'N',
    inspect_result  VARCHAR(10),
    inspector_id    VARCHAR(20),
    
    -- 비고
    remark          VARCHAR(500),
    
    -- 상태 관리
    status          VARCHAR(10) DEFAULT 'TEMP',
    confirm_yn      CHAR(1) DEFAULT 'N',
    
    -- 시스템 정보
    reg_id          VARCHAR(20),
    reg_dt          DATETIME DEFAULT GETDATE(),
    upd_id          VARCHAR(20),
    upd_dt          DATETIME
)

CREATE INDEX idx_prd_date ON new_doi_prd_result(prd_date)
CREATE INDEX idx_factory_line ON new_doi_prd_result(factory_cd, line_cd)
CREATE INDEX idx_item ON new_doi_prd_result(item_cd)
CREATE INDEX idx_status ON new_doi_prd_result(status)
"""

try:
    print("=" * 60)
    print("SQL Server 접속 중...")
    print(f"서버: {SERVER}:{PORT}")
    print(f"데이터베이스: {DATABASE}")
    print("=" * 60)
    
    # DB 연결
    conn = pymssql.connect(
        server=SERVER,
        port=PORT,
        user=USER,
        password=PASSWORD,
        database=DATABASE
    )
    
    cursor = conn.cursor()
    print("\n✅ DB 연결 성공!")
    print("\n테이블 생성 중...")
    
    # 테이블 생성
    cursor.execute(CREATE_TABLE_SQL)
    conn.commit()
    
    print("✅ 테이블 생성 완료!")
    
    # 테이블 확인
    cursor.execute("""
        SELECT 
            COLUMN_NAME,
            DATA_TYPE,
            CHARACTER_MAXIMUM_LENGTH,
            IS_NULLABLE,
            COLUMN_DEFAULT
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = 'new_doi_prd_result'
        ORDER BY ORDINAL_POSITION
    """)
    
    print("\n📋 테이블 구조:")
    print("-" * 80)
    print(f"{'컬럼명':<20} {'타입':<15} {'길이':<10} {'NULL':<10} {'기본값'}")
    print("-" * 80)
    
    for row in cursor.fetchall():
        col_name = row[0]
        data_type = row[1]
        max_len = row[2] if row[2] else ''
        is_null = row[3]
        default_val = row[4] if row[4] else ''
        print(f"{col_name:<20} {data_type:<15} {str(max_len):<10} {is_null:<10} {str(default_val)[:20]}")
    
    cursor.close()
    conn.close()
    
    print("\n" + "=" * 60)
    print("✅ 모든 작업 완료!")
    print("=" * 60)
    
except Exception as e:
    print(f"\n❌ 오류 발생: {e}")
    import traceback
    traceback.print_exc()
