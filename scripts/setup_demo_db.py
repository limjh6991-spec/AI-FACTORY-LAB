#!/usr/bin/env python3
"""
RealGrid Demo 데이터베이스 설정 스크립트
테이블 생성 및 샘플 데이터 삽입 (pymssql 사용)
"""

import pymssql
import os

# DB 연결 정보
SERVER = '172.16.200.204'
PORT = 1433
DATABASE = '도우제조MES시스템TEST'
USER = 'TEST_MES_USER'
PASSWORD = 'Dowoo1!'

def execute_sql_file(cursor, filepath):
    """SQL 파일을 읽어서 실행"""
    print(f"\n📄 {os.path.basename(filepath)} 실행 중...")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        sql_content = f.read()
    
    # GO 구문으로 분리
    sql_batches = [batch.strip() for batch in sql_content.split('GO') if batch.strip()]
    
    for i, batch in enumerate(sql_batches, 1):
        # PRINT 문이나 주석만 있는 배치는 건너뛰기
        if batch.startswith('--') or batch.upper().startswith('PRINT'):
            continue
            
        try:
            cursor.execute(batch)
            print(f"  ✅ Batch {i}/{len(sql_batches)} 완료")
        except Exception as e:
            print(f"  ❌ Batch {i} 실패: {e}")
            # 테이블이 이미 존재하는 경우는 무시
            if 'already exists' not in str(e).lower():
                raise

def main():
    try:
        print("🔌 DB 연결 중...")
        
        # pymssql 연결
        conn = pymssql.connect(
            server=SERVER,
            port=PORT,
            user=USER,
            password=PASSWORD,
            database=DATABASE,
            charset='utf8'
        )
        cursor = conn.cursor()
        
        print("✅ DB 연결 성공!")
        
        # 현재 스크립트 디렉토리
        script_dir = os.path.dirname(os.path.abspath(__file__))
        
        # 1. 테이블 생성
        table_sql = os.path.join(script_dir, 'create_demo_tables.sql')
        execute_sql_file(cursor, table_sql)
        conn.commit()
        print("\n✅ 테이블 생성 완료!")
        
        # 2. 데이터 삽입
        data_sql = os.path.join(script_dir, 'insert_demo_data.sql')
        execute_sql_file(cursor, data_sql)
        conn.commit()
        print("\n✅ 데이터 삽입 완료!")
        
        # 결과 확인
        print("\n📊 데이터 확인:")
        tables = [
            ('new_doi_demo_orders', 'Grid1 - Orders'),
            ('new_doi_demo_employee', 'Grid2 - Employee'),
            ('new_doi_demo_sales', 'Grid3 - Sales')
        ]
        
        for table_name, description in tables:
            cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
            row = cursor.fetchone()
            count = row[0] if row else 0
            print(f"  • {description}: {count}건")
        
        cursor.close()
        conn.close()
        
        print("\n🎉 모든 작업이 완료되었습니다!")
        
    except Exception as e:
        print(f"\n❌ 오류 발생: {e}")
        import traceback
        traceback.print_exc()
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
