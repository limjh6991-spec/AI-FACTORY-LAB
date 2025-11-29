"""
DB 테이블 생성 스크립트
SQL Server에 메뉴 관리 테이블 생성
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
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='new_doi_sys_menu' AND xtype='U')
BEGIN
    CREATE TABLE new_doi_sys_menu (
        menu_id       VARCHAR(20) NOT NULL PRIMARY KEY,  -- 메뉴ID
        up_menu_id    VARCHAR(20),                       -- 상위메뉴ID (최상위는 NULL or 'ROOT')
        menu_nm       VARCHAR(100) NOT NULL,             -- 메뉴명
        menu_url      VARCHAR(200),                      -- 이동 경로 (Vue 라우터 Path)
        sort_no       INT DEFAULT 0,                     -- 정렬 순서
        use_yn        CHAR(1) DEFAULT 'Y',               -- 사용 여부
        icon_cls      VARCHAR(50),                       -- 아이콘 클래스
        reg_dt        DATETIME DEFAULT GETDATE()         -- 등록일시
    );
    PRINT 'new_doi_sys_menu 테이블이 생성되었습니다.';
END
ELSE
BEGIN
    PRINT 'new_doi_sys_menu 테이블이 이미 존재합니다.';
END
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
        WHERE TABLE_NAME = 'new_doi_sys_menu'
        ORDER BY ORDINAL_POSITION
    """)
    
    print("\n📋 테이블 구조:")
    print("-" * 80)
    print(f"{'컬럼명':<20} {'타입':<15} {'길이':<10} {'NULL':<10} {'기본값'}")
    print("-" * 80)
    
    for row in cursor.fetchall():
        col_name = row[0]
        data_type = row[1]
        max_length = row[2] if row[2] else '-'
        nullable = row[3]
        default_val = row[4] if row[4] else '-'
        print(f"{col_name:<20} {data_type:<15} {str(max_length):<10} {nullable:<10} {default_val}")
    
    print("-" * 80)
    
    cursor.close()
    conn.close()
    
    print("\n✅ 모든 작업이 완료되었습니다.")
    
except pymssql.Error as e:
    print(f"\n❌ 데이터베이스 오류: {e}")
except Exception as e:
    print(f"\n❌ 오류 발생: {e}")
