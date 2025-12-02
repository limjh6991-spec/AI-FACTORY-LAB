#!/usr/bin/env python3
"""
대문자 테이블명을 소문자로 변경하는 스크립트
"""
import psycopg2

POSTGRES_CONFIG = {
    'host': 'localhost',
    'port': 5432,
    'database': 'ai_factory_db',
    'user': 'postgres',
    'password': 'postgres',
}

def get_uppercase_tables():
    """대문자가 포함된 테이블 목록 조회"""
    conn = psycopg2.connect(**POSTGRES_CONFIG)
    cursor = conn.cursor()
    
    query = """
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name != lower(table_name)  -- 대문자가 포함된 테이블만
        ORDER BY table_name
    """
    
    cursor.execute(query)
    tables = [row[0] for row in cursor.fetchall()]
    
    cursor.close()
    conn.close()
    
    return tables

def rename_table(old_name, new_name):
    """테이블명 변경"""
    conn = psycopg2.connect(**POSTGRES_CONFIG)
    cursor = conn.cursor()
    
    try:
        # 테이블명 변경
        query = f'ALTER TABLE "{old_name}" RENAME TO "{new_name}"'
        cursor.execute(query)
        conn.commit()
        print(f"✅ {old_name} → {new_name}")
        return True
    except Exception as e:
        print(f"❌ {old_name} 변경 실패: {str(e)}")
        conn.rollback()
        return False
    finally:
        cursor.close()
        conn.close()

def main():
    """메인 함수"""
    print("=" * 80)
    print("🔄 테이블명 소문자 변경 작업 시작")
    print("=" * 80)
    
    # 대문자 테이블 목록 조회
    tables = get_uppercase_tables()
    
    if not tables:
        print("✅ 모든 테이블이 이미 소문자입니다!")
        return
    
    print(f"\n📋 변경할 테이블: {len(tables)}개\n")
    
    success_count = 0
    fail_count = 0
    
    for old_name in tables:
        new_name = old_name.lower()
        
        if rename_table(old_name, new_name):
            success_count += 1
        else:
            fail_count += 1
    
    print("\n" + "=" * 80)
    print("📊 변경 완료")
    print("=" * 80)
    print(f"✅ 성공: {success_count}개")
    print(f"❌ 실패: {fail_count}개")
    print("=" * 80)
    
    # 변경 후 테이블 목록 확인
    print("\n🔍 변경 후 테이블 목록:")
    conn = psycopg2.connect(**POSTGRES_CONFIG)
    cursor = conn.cursor()
    cursor.execute("""
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND (table_name LIKE '%doi%' OR table_name = 'product')
        ORDER BY table_name 
        LIMIT 20
    """)
    
    for row in cursor.fetchall():
        print(f"   - {row[0]}")
    
    cursor.close()
    conn.close()

if __name__ == '__main__':
    main()
