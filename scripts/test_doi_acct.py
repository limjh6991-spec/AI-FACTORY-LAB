#!/usr/bin/env python3
"""
DOI_ACCT 테이블 조회 테스트
"""
import psycopg2
from psycopg2.extras import RealDictCursor

POSTGRES_CONFIG = {
    'host': 'localhost',
    'port': 5432,
    'database': 'ai_factory_db',
    'user': 'postgres',
    'password': 'postgres',
}

def main():
    conn = psycopg2.connect(**POSTGRES_CONFIG)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    print("=" * 80)
    print("🔍 DOI_ACCT 테이블 조회 테스트")
    print("=" * 80)
    
    # 1. 테이블명 확인
    print("\n1️⃣ 테이블명 확인:")
    cursor.execute("""
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name ILIKE '%acct%'
        ORDER BY table_name
    """)
    tables = cursor.fetchall()
    for table in tables:
        print(f"   - {table['table_name']}")
    
    # 2. 올바른 쿼리 (큰따옴표 사용)
    print("\n2️⃣ 올바른 조회 방법:")
    print('   ✅ SELECT * FROM "DOI_ACCT" LIMIT 5;')
    
    cursor.execute('SELECT * FROM "DOI_ACCT" LIMIT 5')
    rows = cursor.fetchall()
    
    if rows:
        print(f"\n   조회 결과: {len(rows)}개 행")
        print("\n   샘플 데이터:")
        for i, row in enumerate(rows, 1):
            print(f"\n   [{i}]")
            for key, value in list(row.items())[:5]:  # 처음 5개 컬럼만
                print(f"      {key}: {value}")
            print("      ...")
    
    # 3. 잘못된 쿼리 예시
    print("\n3️⃣ 잘못된 조회 방법:")
    print("   ❌ SELECT * FROM doi_acct")
    print("   → 오류: relation 'doi_acct' does not exist")
    
    print("\n" + "=" * 80)
    print("💡 PostgreSQL 테이블명 규칙:")
    print("=" * 80)
    print("1. 대문자 테이블명은 큰따옴표로 감싸야 함")
    print('   예: SELECT * FROM "DOI_ACCT"')
    print("\n2. 소문자로 생성된 테이블은 따옴표 불필요")
    print("   예: SELECT * FROM doi_common_code")
    print("\n3. Prisma에서 사용할 때는 @@map으로 매핑 필요")
    print('   예: @@map("DOI_ACCT")')
    print("=" * 80)
    
    cursor.close()
    conn.close()

if __name__ == '__main__':
    main()
