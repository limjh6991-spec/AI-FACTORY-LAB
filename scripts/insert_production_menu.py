"""
생산 관리 메뉴 등록 스크립트
현재 메뉴 구조에 맞게 '생산 관리 > 생산 실적 관리' 메뉴 추가
"""

import pymssql

# DB 연결 정보
SERVER = '172.16.200.204'
PORT = 1433
DATABASE = '도우제조MES시스템TEST'
USER = 'TEST_MES_USER'
PASSWORD = 'Dowoo1!'

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
    
    # 1. 대분류 메뉴: 생산 관리 (M004)
    print("\n📋 Step 1: 대분류 메뉴 등록 중...")
    
    # 기존 메뉴 확인
    cursor.execute("SELECT COUNT(*) FROM new_doi_sys_menu WHERE menu_id = 'M004'")
    if cursor.fetchone()[0] == 0:
        cursor.execute("""
            INSERT INTO new_doi_sys_menu (menu_id, up_menu_id, menu_nm, menu_url, sort_no, use_yn, icon_cls, reg_dt)
            VALUES ('M004', NULL, '생산 관리', NULL, 3, 'Y', 'bi-gear-wide-connected', GETDATE())
        """)
        print("  ✅ M004: 생산 관리 (대분류) 등록 완료")
    else:
        print("  ⚠️  M004: 생산 관리 (이미 존재)")
    
    # 2. 중분류 메뉴: 생산 실적 (M004-01)
    print("\n📋 Step 2: 중분류 메뉴 등록 중...")
    
    cursor.execute("SELECT COUNT(*) FROM new_doi_sys_menu WHERE menu_id = 'M004-01'")
    if cursor.fetchone()[0] == 0:
        cursor.execute("""
            INSERT INTO new_doi_sys_menu (menu_id, up_menu_id, menu_nm, menu_url, sort_no, use_yn, icon_cls, reg_dt)
            VALUES ('M004-01', 'M004', '생산 실적', NULL, 1, 'Y', 'bi-bar-chart-line', GETDATE())
        """)
        print("  ✅ M004-01: 생산 실적 (중분류) 등록 완료")
    else:
        print("  ⚠️  M004-01: 생산 실적 (이미 존재)")
    
    # 3. 소분류 메뉴: 생산 실적 관리 (M004-01-01)
    print("\n📋 Step 3: 소분류 메뉴 등록 중...")
    
    cursor.execute("SELECT COUNT(*) FROM new_doi_sys_menu WHERE menu_id = 'M004-01-01'")
    if cursor.fetchone()[0] == 0:
        cursor.execute("""
            INSERT INTO new_doi_sys_menu (menu_id, up_menu_id, menu_nm, menu_url, sort_no, use_yn, icon_cls, reg_dt)
            VALUES ('M004-01-01', 'M004-01', '생산 실적 관리', '/production/ProductionResult', 1, 'Y', 'bi-list-check', GETDATE())
        """)
        print("  ✅ M004-01-01: 생산 실적 관리 등록 완료")
    else:
        print("  ⚠️  M004-01-01: 생산 실적 관리 (이미 존재)")
    
    conn.commit()
    
    # 결과 확인
    print("\n📊 등록된 메뉴 확인:")
    print("-" * 80)
    
    cursor.execute("""
        SELECT 
            menu_id,
            up_menu_id,
            menu_nm,
            menu_url,
            sort_no,
            use_yn,
            icon_cls
        FROM new_doi_sys_menu
        WHERE menu_id LIKE 'M004%'
        ORDER BY menu_id
    """)
    
    print(f"{'메뉴ID':<15} {'상위메뉴':<15} {'메뉴명':<20} {'URL':<30} {'정렬':<5} {'사용':<5} {'아이콘'}")
    print("-" * 80)
    
    for row in cursor.fetchall():
        menu_id = row[0]
        up_menu_id = row[1] if row[1] else '-'
        menu_nm = row[2]
        menu_url = row[3] if row[3] else '-'
        sort_no = row[4]
        use_yn = row[5]
        icon_cls = row[6] if row[6] else '-'
        
        print(f"{menu_id:<15} {up_menu_id:<15} {menu_nm:<20} {menu_url:<30} {sort_no:<5} {use_yn:<5} {icon_cls}")
    
    # 전체 메뉴 트리 확인
    print("\n📊 전체 메뉴 트리:")
    print("-" * 80)
    
    cursor.execute("""
        SELECT 
            menu_id,
            menu_nm,
            menu_url,
            up_menu_id
        FROM new_doi_sys_menu
        WHERE up_menu_id IS NULL
        ORDER BY sort_no, menu_id
    """)
    
    for root in cursor.fetchall():
        print(f"📁 {root[0]}: {root[1]}")
        
        # 2단계 메뉴
        cursor.execute("""
            SELECT menu_id, menu_nm, menu_url
            FROM new_doi_sys_menu
            WHERE up_menu_id = %s
            ORDER BY sort_no, menu_id
        """, (root[0],))
        
        for level2 in cursor.fetchall():
            print(f"  📂 {level2[0]}: {level2[1]}")
            
            # 3단계 메뉴
            cursor.execute("""
                SELECT menu_id, menu_nm, menu_url
                FROM new_doi_sys_menu
                WHERE up_menu_id = %s
                ORDER BY sort_no, menu_id
            """, (level2[0],))
            
            for level3 in cursor.fetchall():
                url = level3[2] if level3[2] else ''
                print(f"    📄 {level3[0]}: {level3[1]} {url}")
    
    cursor.close()
    conn.close()
    
    print("\n" + "=" * 60)
    print("✅ 모든 작업 완료!")
    print("=" * 60)
    
except Exception as e:
    print(f"\n❌ 오류 발생: {e}")
    import traceback
    traceback.print_exc()
