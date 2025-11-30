"""
생산 실적 샘플 데이터 등록 스크립트
복잡한 그리드 화면 테스트용 - 30건
"""

import pymssql
from datetime import datetime, timedelta
import random

# DB 연결 정보
SERVER = '172.16.200.204'
PORT = 1433
DATABASE = '도우제조MES시스템TEST'
USER = 'TEST_MES_USER'
PASSWORD = 'Dowoo1!'

# 샘플 데이터 설정
FACTORIES = ['F001', 'F002']
LINES = ['L01', 'L02', 'L03']
SHIFTS = ['A', 'B', 'C']
ITEMS = [
    ('P0001', '알루미늄 프레임 A-100', '100x50x2.0t', 'EA'),
    ('P0002', '스테인리스 파이프 S-200', 'Φ50x3.0t x 6M', 'M'),
    ('P0003', '강판 SP-300', '1000x2000x5.0t', 'EA'),
    ('P0004', '볼트 M8x30', 'M8 x 30mm', 'EA'),
    ('P0005', '너트 M8', 'M8 육각', 'EA'),
]
DEFECT_TYPES = ['치수불량', '외관불량', '기능불량', None]
DEFECT_REASONS = ['원자재 불량', '가공 오류', '설비 이상']
STATUSES = ['TEMP', 'CONFIRM']

try:
    print("=" * 60)
    print("SQL Server 접속 중...")
    print(f"서버: {SERVER}:{PORT}")
    print(f"데이터베이스: {DATABASE}")
    print("=" * 60)
    
    conn = pymssql.connect(
        server=SERVER,
        port=PORT,
        user=USER,
        password=PASSWORD,
        database=DATABASE
    )
    
    cursor = conn.cursor()
    print("\n✅ DB 연결 성공!")
    
    # 기존 데이터 삭제
    print("\n기존 데이터 삭제 중...")
    cursor.execute("DELETE FROM new_doi_prd_result")
    conn.commit()
    print("✅ 기존 데이터 삭제 완료!")
    
    # 30건의 샘플 데이터 생성
    print("\n샘플 데이터 생성 중...")
    base_date = datetime(2025, 11, 25)
    
    for i in range(1, 31):
        # 랜덤 데이터 생성
        prd_date = base_date + timedelta(days=(i-1) // 5)
        factory_cd = random.choice(FACTORIES)
        line_cd = random.choice(LINES)
        shift_cd = random.choice(SHIFTS)
        
        item = random.choice(ITEMS)
        item_cd, item_nm, spec, unit = item
        
        plan_qty = random.randint(100, 1000)
        prod_qty = random.randint(80, plan_qty)
        good_qty = random.randint(70, prod_qty)
        defect_qty = prod_qty - good_qty
        
        defect_type = random.choice(DEFECT_TYPES)
        defect_reason = random.choice(DEFECT_REASONS) if defect_qty > 0 else None
        
        start_time = datetime.combine(prd_date, datetime.strptime('08:00', '%H:%M').time())
        end_time = datetime.combine(prd_date, datetime.strptime('17:00', '%H:%M').time())
        work_time = 480
        stop_time = random.randint(0, 60)
        
        worker_id = f"W{random.randint(1, 10):03d}"
        worker_nm = f"작업자{random.randint(1, 10)}"
        team_cd = f"T{random.randint(1, 3)}"
        
        inspect_yn = 'Y' if i % 2 == 0 else 'N'
        inspect_result = random.choice(['PASS', 'FAIL']) if inspect_yn == 'Y' else None
        inspector_id = f"I{random.randint(1, 5):03d}" if inspect_yn == 'Y' else None
        
        remark = '긴급 생산 건' if i % 5 == 0 else ('재작업 필요' if i % 7 == 0 else None)
        status = 'CONFIRM' if i % 4 == 0 else 'TEMP'
        confirm_yn = 'Y' if status == 'CONFIRM' else 'N'
        
        reg_dt = end_time + timedelta(hours=1)
        
        # 데이터 삽입
        insert_sql = """
        INSERT INTO new_doi_prd_result (
            result_id, prd_date, factory_cd, line_cd, shift_cd,
            item_cd, item_nm, spec, unit,
            plan_qty, prod_qty, good_qty, defect_qty,
            defect_type, defect_reason,
            start_time, end_time, work_time, stop_time,
            worker_id, worker_nm, team_cd,
            inspect_yn, inspect_result, inspector_id,
            remark, status, confirm_yn,
            reg_id, reg_dt
        ) VALUES (
            %s, %s, %s, %s, %s,
            %s, %s, %s, %s,
            %s, %s, %s, %s,
            %s, %s,
            %s, %s, %s, %s,
            %s, %s, %s,
            %s, %s, %s,
            %s, %s, %s,
            %s, %s
        )
        """
        
        cursor.execute(insert_sql, (
            f"R{i:05d}", prd_date, factory_cd, line_cd, shift_cd,
            item_cd, item_nm, spec, unit,
            plan_qty, prod_qty, good_qty, defect_qty,
            defect_type, defect_reason,
            start_time, end_time, work_time, stop_time,
            worker_id, worker_nm, team_cd,
            inspect_yn, inspect_result, inspector_id,
            remark, status, confirm_yn,
            'ADMIN', reg_dt
        ))
        
        if i % 10 == 0:
            print(f"  {i}/30 건 생성 중...")
    
    conn.commit()
    print("✅ 샘플 데이터 30건 생성 완료!")
    
    # 결과 확인
    print("\n📊 데이터 집계:")
    print("-" * 80)
    
    cursor.execute("""
        SELECT 
            COUNT(*) AS total_count,
            MIN(prd_date) AS start_date,
            MAX(prd_date) AS end_date,
            SUM(plan_qty) AS total_plan,
            SUM(prod_qty) AS total_prod,
            SUM(good_qty) AS total_good,
            SUM(defect_qty) AS total_defect
        FROM new_doi_prd_result
    """)
    
    row = cursor.fetchone()
    print(f"총 건수: {row[0]}")
    print(f"기간: {row[1]} ~ {row[2]}")
    print(f"계획수량 합계: {row[3]:,.0f}")
    print(f"생산수량 합계: {row[4]:,.0f}")
    print(f"양품수량 합계: {row[5]:,.0f}")
    print(f"불량수량 합계: {row[6]:,.0f}")
    
    # 공장별 집계
    print("\n📊 공장별 집계:")
    print("-" * 80)
    cursor.execute("""
        SELECT 
            factory_cd,
            COUNT(*) AS cnt,
            SUM(prod_qty) AS prod,
            SUM(good_qty) AS good,
            SUM(defect_qty) AS defect
        FROM new_doi_prd_result
        GROUP BY factory_cd
        ORDER BY factory_cd
    """)
    
    for row in cursor.fetchall():
        print(f"  {row[0]}: {row[1]}건 | 생산 {row[2]:,.0f} | 양품 {row[3]:,.0f} | 불량 {row[4]:,.0f}")
    
    cursor.close()
    conn.close()
    
    print("\n" + "=" * 60)
    print("✅ 모든 작업 완료!")
    print("=" * 60)
    
except Exception as e:
    print(f"\n❌ 오류 발생: {e}")
    import traceback
    traceback.print_exc()
