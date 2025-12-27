#!/usr/bin/env python3
"""
PostgreSQL 생산수불 테이블 생성 스크립트
"""

import os
import sys
from pathlib import Path

# 환경 변수 로드
from dotenv import load_dotenv
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(env_path)

try:
    import psycopg2
except ImportError:
    print("❌ psycopg2 설치 필요: pip install psycopg2-binary")
    sys.exit(1)

def get_database_url():
    return os.getenv(
        "POSTGRES_URL",
        "postgresql://roarm_m3:2024-merry-christmas@localhost:5432/ai_factory_db"
    )

def execute_sql():
    sql_file = Path(__file__).parent / "create_production_tables.sql"
    
    if not sql_file.exists():
        print(f"❌ SQL 파일 없음: {sql_file}")
        return False
    
    sql_content = sql_file.read_text()
    
    try:
        db_url = get_database_url()
        print(f"🔄 연결 중: {db_url.split('@')[1] if '@' in db_url else db_url}")
        
        conn = psycopg2.connect(db_url)
        conn.autocommit = True
        cursor = conn.cursor()
        
        # SQL 실행
        cursor.execute(sql_content)
        
        # 결과 확인
        cursor.execute("SELECT result FROM (SELECT 'Production Tables Created!' AS result) t")
        result = cursor.fetchone()
        print(f"✅ {result[0] if result else 'Complete'}")
        
        # 테이블 확인
        cursor.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name LIKE 'bi_%'
            ORDER BY table_name
        """)
        tables = cursor.fetchall()
        
        print(f"\n📋 생성된 테이블 ({len(tables)}개):")
        for t in tables:
            cursor.execute(f"SELECT COUNT(*) FROM {t[0]}")
            count = cursor.fetchone()[0]
            print(f"   - {t[0]}: {count} rows")
        
        cursor.close()
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ 오류: {e}")
        return False

if __name__ == "__main__":
    print("=" * 60)
    print("🏭 생산수불 테이블 생성 스크립트")
    print("=" * 60)
    
    success = execute_sql()
    
    if success:
        print("\n✅ 테이블 생성 완료!")
    else:
        print("\n❌ 테이블 생성 실패")
        sys.exit(1)
