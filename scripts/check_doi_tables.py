#!/usr/bin/env python3
"""
마이그레이션된 DOI 테이블 확인 스크립트
"""
import psycopg2

POSTGRES_CONFIG = {
    'host': 'localhost',
    'port': 5432,
    'database': 'ai_factory_db',
    'user': 'postgres',
    'password': 'postgres',
}

def main():
    conn = psycopg2.connect(**POSTGRES_CONFIG)
    cursor = conn.cursor()
    
    # 테이블 목록 및 행 개수 조회
    query = """
        SELECT 
            table_name,
            (SELECT COUNT(*) 
             FROM information_schema.columns 
             WHERE table_name = t.table_name) as column_count
        FROM information_schema.tables t
        WHERE table_schema = 'public' 
        AND (table_name LIKE 'doi_%' OR table_name LIKE 'DOI_%' OR table_name LIKE 'new_doi_%')
        ORDER BY table_name
    """
    
    cursor.execute(query)
    tables = cursor.fetchall()
    
    print("=" * 80)
    print("📊 마이그레이션된 DOI 테이블 목록")
    print("=" * 80)
    print(f"{'테이블명':<50} {'컬럼 수':>10} {'행 수':>15}")
    print("-" * 80)
    
    total_rows = 0
    
    for table_name, column_count in tables:
        cursor.execute(f'SELECT COUNT(*) FROM "{table_name}"')
        row_count = cursor.fetchone()[0]
        total_rows += row_count
        print(f"{table_name:<50} {column_count:>10} {row_count:>15,}")
    
    print("=" * 80)
    print(f"{'총계:':<50} {len(tables)} 테이블 {total_rows:>15,} 행")
    print("=" * 80)
    
    # 주요 테이블 상세 확인
    important_tables = ['new_doi_sys_menu', 'DOI_CM_USER', 'DOI_DEPT', 'DOI_MODEL_MAST']
    
    print("\n" + "=" * 80)
    print("📋 주요 테이블 샘플 데이터")
    print("=" * 80)
    
    for table_name in important_tables:
        print(f"\n🔹 {table_name}")
        print("-" * 80)
        
        cursor.execute(f'SELECT * FROM "{table_name}" LIMIT 3')
        rows = cursor.fetchall()
        
        if rows:
            # 컬럼명 조회
            cursor.execute(f"""
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = '{table_name}'
                ORDER BY ordinal_position
            """)
            columns = [col[0] for col in cursor.fetchall()]
            
            print("  컬럼:", ", ".join(columns[:5]) + ("..." if len(columns) > 5 else ""))
            print(f"  총 {len(rows)} 행 표시 (샘플):")
            for i, row in enumerate(rows, 1):
                print(f"    {i}. {row[:3]}...")
        else:
            print("  (데이터 없음)")
    
    cursor.close()
    conn.close()

if __name__ == '__main__':
    main()
