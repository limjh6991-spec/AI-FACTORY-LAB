#!/usr/bin/env python3
"""
MS SQL Server의 doi_ 테이블들을 PostgreSQL로 마이그레이션하는 스크립트
"""
import pymssql
import psycopg2
from psycopg2.extras import execute_values
import json

# MS SQL Server 연결 정보
MSSQL_CONFIG = {
    'server': '172.16.200.204',
    'port': 1433,
    'database': '도우제조MES시스템TEST',
    'user': 'TEST_MES_USER',
    'password': 'Dowoo1!',
}

# PostgreSQL 연결 정보
POSTGRES_CONFIG = {
    'host': 'localhost',
    'port': 5432,
    'database': 'ai_factory_db',
    'user': 'postgres',
    'password': 'postgres',
}

def get_mssql_connection():
    """MS SQL Server 연결"""
    return pymssql.connect(
        server=MSSQL_CONFIG['server'],
        port=MSSQL_CONFIG['port'],
        database=MSSQL_CONFIG['database'],
        user=MSSQL_CONFIG['user'],
        password=MSSQL_CONFIG['password'],
        charset='utf8'
    )

def get_postgres_connection():
    """PostgreSQL 연결"""
    return psycopg2.connect(
        host=POSTGRES_CONFIG['host'],
        port=POSTGRES_CONFIG['port'],
        database=POSTGRES_CONFIG['database'],
        user=POSTGRES_CONFIG['user'],
        password=POSTGRES_CONFIG['password']
    )

def get_doi_tables():
    """doi_ 로 시작하는 테이블 목록 조회"""
    conn = get_mssql_connection()
    cursor = conn.cursor()
    
    query = """
        SELECT TABLE_NAME
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_TYPE = 'BASE TABLE'
        AND TABLE_NAME LIKE 'doi_%'
        OR TABLE_NAME LIKE 'new_doi_%'
        ORDER BY TABLE_NAME
    """
    
    cursor.execute(query)
    tables = [row[0] for row in cursor.fetchall()]
    
    cursor.close()
    conn.close()
    
    return tables

def get_table_schema(table_name):
    """테이블 스키마 조회"""
    conn = get_mssql_connection()
    cursor = conn.cursor()
    
    query = f"""
        SELECT 
            COLUMN_NAME,
            DATA_TYPE,
            CHARACTER_MAXIMUM_LENGTH,
            IS_NULLABLE,
            COLUMN_DEFAULT
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = '{table_name}'
        ORDER BY ORDINAL_POSITION
    """
    
    cursor.execute(query)
    columns = cursor.fetchall()
    
    cursor.close()
    conn.close()
    
    return columns

def mssql_type_to_postgres(data_type, max_length):
    """MS SQL 타입을 PostgreSQL 타입으로 변환"""
    type_mapping = {
        'int': 'INTEGER',
        'bigint': 'BIGINT',
        'smallint': 'SMALLINT',
        'tinyint': 'SMALLINT',
        'bit': 'BOOLEAN',
        'decimal': 'DECIMAL',
        'numeric': 'NUMERIC',
        'money': 'DECIMAL(19,4)',
        'smallmoney': 'DECIMAL(10,4)',
        'float': 'DOUBLE PRECISION',
        'real': 'REAL',
        'datetime': 'TIMESTAMP',
        'datetime2': 'TIMESTAMP',
        'smalldatetime': 'TIMESTAMP',
        'date': 'DATE',
        'time': 'TIME',
        'char': f'CHAR({max_length})' if max_length else 'CHAR(1)',
        'varchar': f'VARCHAR({max_length})' if max_length and max_length > 0 else 'TEXT',
        'text': 'TEXT',
        'nchar': f'CHAR({max_length})' if max_length else 'CHAR(1)',
        'nvarchar': f'VARCHAR({max_length})' if max_length and max_length > 0 else 'TEXT',
        'ntext': 'TEXT',
        'binary': 'BYTEA',
        'varbinary': 'BYTEA',
        'image': 'BYTEA',
        'uniqueidentifier': 'UUID',
    }
    
    return type_mapping.get(data_type.lower(), 'TEXT')

def create_postgres_table(table_name, columns):
    """PostgreSQL에 테이블 생성"""
    conn = get_postgres_connection()
    cursor = conn.cursor()
    
    # 기존 테이블 삭제
    drop_query = f'DROP TABLE IF EXISTS "{table_name}" CASCADE'
    cursor.execute(drop_query)
    
    # 컬럼 정의 생성
    column_defs = []
    for col_name, data_type, max_length, is_nullable, default in columns:
        pg_type = mssql_type_to_postgres(data_type, max_length)
        nullable = '' if is_nullable == 'YES' else 'NOT NULL'
        column_defs.append(f'"{col_name}" {pg_type} {nullable}')
    
    # 테이블 생성
    create_query = f'''
        CREATE TABLE "{table_name}" (
            {', '.join(column_defs)}
        )
    '''
    
    cursor.execute(create_query)
    conn.commit()
    
    cursor.close()
    conn.close()
    
    print(f"✅ Created table: {table_name}")

def migrate_table_data(table_name):
    """테이블 데이터 마이그레이션"""
    # MS SQL에서 데이터 조회
    mssql_conn = get_mssql_connection()
    mssql_cursor = mssql_conn.cursor(as_dict=True)
    
    query = f'SELECT * FROM [{table_name}]'
    mssql_cursor.execute(query)
    rows = mssql_cursor.fetchall()
    
    if not rows:
        print(f"⚠️  No data in table: {table_name}")
        mssql_cursor.close()
        mssql_conn.close()
        return 0
    
    # PostgreSQL에 데이터 삽입
    postgres_conn = get_postgres_connection()
    postgres_cursor = postgres_conn.cursor()
    
    # 컬럼명 추출
    columns = list(rows[0].keys())
    column_names = ', '.join([f'"{col}"' for col in columns])
    
    # 데이터 변환 (datetime, None 처리)
    values = []
    for row in rows:
        row_values = []
        for col in columns:
            val = row[col]
            # datetime 객체를 문자열로 변환
            if hasattr(val, 'strftime'):
                val = val.strftime('%Y-%m-%d %H:%M:%S')
            row_values.append(val)
        values.append(tuple(row_values))
    
    # Bulk Insert
    placeholders = ', '.join(['%s'] * len(columns))
    insert_query = f'INSERT INTO "{table_name}" ({column_names}) VALUES ({placeholders})'
    
    postgres_cursor.executemany(insert_query, values)
    postgres_conn.commit()
    
    row_count = len(values)
    print(f"✅ Migrated {row_count} rows to: {table_name}")
    
    mssql_cursor.close()
    mssql_conn.close()
    postgres_cursor.close()
    postgres_conn.close()
    
    return row_count

def main():
    """메인 함수"""
    print("🚀 Starting DOI tables migration...")
    print(f"📊 Source: {MSSQL_CONFIG['server']} ({MSSQL_CONFIG['database']})")
    print(f"📊 Target: {POSTGRES_CONFIG['host']} ({POSTGRES_CONFIG['database']})")
    print("-" * 60)
    
    # doi_ 테이블 목록 조회
    tables = get_doi_tables()
    print(f"📋 Found {len(tables)} DOI tables:")
    for table in tables:
        print(f"   - {table}")
    print("-" * 60)
    
    total_rows = 0
    
    # 각 테이블 마이그레이션
    for table_name in tables:
        try:
            print(f"\n📦 Processing: {table_name}")
            
            # 스키마 조회
            columns = get_table_schema(table_name)
            
            # PostgreSQL 테이블 생성
            create_postgres_table(table_name, columns)
            
            # 데이터 마이그레이션
            row_count = migrate_table_data(table_name)
            total_rows += row_count
            
        except Exception as e:
            print(f"❌ Error migrating {table_name}: {str(e)}")
            continue
    
    print("\n" + "=" * 60)
    print(f"✅ Migration completed!")
    print(f"📊 Total tables: {len(tables)}")
    print(f"📊 Total rows: {total_rows}")
    print("=" * 60)

if __name__ == '__main__':
    main()
