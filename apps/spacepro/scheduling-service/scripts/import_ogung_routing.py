"""
O궁 Excel 데이터 Import 스크립트
ERP 공정 + 세분화 데이터를 SpacePro 라우팅 테이블에 import
"""
import pandas as pd
import psycopg2
from psycopg2.extras import RealDictCursor

# DB 연결
def get_connection():
    return psycopg2.connect(
        host='localhost',
        database='ai_factory_db',
        user='postgres',
        password='postgres'
    )

def import_ogung_routing(xlsx_path: str):
    """O궁 공정세분화 데이터 import"""
    
    # Excel 읽기
    df = pd.read_excel(xlsx_path, sheet_name='O궁_공정세분화', header=None)
    
    print("=" * 60)
    print("📊 O궁 공정 데이터 Import 시작")
    print("=" * 60)
    
    conn = get_connection()
    cur = conn.cursor()
    
    # 기존 O궁 데이터 삭제
    cur.execute("DELETE FROM spacepro.tb_routing_detail WHERE item_code = 'IAHANWCQ'")
    cur.execute("DELETE FROM spacepro.tb_routing_mst WHERE item_code = 'IAHANWCQ'")
    conn.commit()
    print("✓ 기존 IAHANWCQ 데이터 삭제 완료")
    
    # 데이터 파싱 (행 2부터 시작, 행 1이 헤더)
    current_op_seq = 0
    erp_procs = []
    
    for i in range(2, len(df)):
        row = df.iloc[i]
        
        # ERP 공정 정보 (왼쪽 영역)
        prcode = row[4] if pd.notna(row[4]) else None
        prname = row[5] if pd.notna(row[5]) else None
        계약공수 = float(row[8]) if pd.notna(row[8]) else 0
        작업장 = row[11] if pd.notna(row[11]) else 'WC-DEFAULT'
        
        # 세분화 정보 (오른쪽 영역)
        daily_proc = row[21] if pd.notna(row[21]) else None
        detail_proc = row[22] if pd.notna(row[22]) else None
        workers = int(row[23]) if pd.notna(row[23]) and str(row[23]).isdigit() else 0
        work_time = float(row[24]) if pd.notna(row[24]) else 0
        equip = str(row[25]).replace('\n', ' ') if pd.notna(row[25]) else None
        material_name = row[26] if pd.notna(row[26]) else None
        material_code = row[27] if pd.notna(row[27]) else None
        
        # 소요량 파싱 (숫자가 아닌 경우 None)
        try:
            qty = float(row[29]) if pd.notna(row[29]) and str(row[29]) not in ['-', 'NaN', ''] else None
        except (ValueError, TypeError):
            qty = None
            
        unit = row[30] if pd.notna(row[30]) else None
        
        # 리드타임 파싱 (숫자가 아닌 경우 0)
        try:
            lead_time = int(float(row[31])) if pd.notna(row[31]) else 0
        except (ValueError, TypeError):
            lead_time = 0
        
        # 외주 여부 판단
        outsource_yn = 'Y' if workers == 0 or '외주' in str(row[23]) else 'N'
        
        # ERP 공정이 있으면 새 공정 시작
        if prcode:
            current_op_seq += 10
            erp_procs.append({
                'op_seq': current_op_seq,
                'prcode': prcode,
                'prname': prname,
                'cycle_time': 계약공수,
                'workcenter': 작업장,
                'sub_seq': 0,
                'details': []
            })
        
        # 세분화 정보가 있으면 현재 공정에 추가
        if detail_proc and erp_procs:
            erp_procs[-1]['sub_seq'] += 1
            erp_procs[-1]['details'].append({
                'sub_seq': erp_procs[-1]['sub_seq'],
                'sub_op_name': detail_proc,
                'workers': workers if workers > 0 else 1,
                'work_time': work_time,
                'equipment': equip,
                'material_code': material_code,
                'material_name': material_name,
                'qty': qty,
                'unit': unit,
                'lead_time_days': lead_time,
                'outsource_yn': outsource_yn
            })
    
    print(f"✓ 파싱 완료: {len(erp_procs)}개 공정")
    
    # DB Insert
    item_code = 'IAHANWCQ'
    revision = '1.0'
    
    for proc in erp_procs:
        # 메인 라우팅 INSERT
        cur.execute("""
            INSERT INTO spacepro.tb_routing_mst 
            (item_code, revision, op_seq, op_name, prcode, workcenter_code, 
             cycle_time, process_yield, status, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, 'ACTIVE', NOW())
        """, (
            item_code, revision, proc['op_seq'], proc['prname'], proc['prcode'],
            proc['workcenter'], proc['cycle_time'], 100
        ))
        
        # 세부공정 INSERT
        for detail in proc['details']:
            cur.execute("""
                INSERT INTO spacepro.tb_routing_detail
                (item_code, revision, op_seq, sub_seq, sub_op_name, workers, work_time,
                 equipment, material_code, material_name, qty, unit, lead_time_days, 
                 outsource_yn, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW())
            """, (
                item_code, revision, proc['op_seq'], detail['sub_seq'],
                detail['sub_op_name'], detail['workers'], detail['work_time'],
                detail['equipment'], detail['material_code'], detail['material_name'],
                detail['qty'], detail['unit'], detail['lead_time_days'], detail['outsource_yn']
            ))
    
    conn.commit()
    
    # 결과 확인
    cur.execute("SELECT COUNT(*) FROM spacepro.tb_routing_mst WHERE item_code = %s", (item_code,))
    mst_count = cur.fetchone()[0]
    
    cur.execute("SELECT COUNT(*) FROM spacepro.tb_routing_detail WHERE item_code = %s", (item_code,))
    detail_count = cur.fetchone()[0]
    
    print(f"✓ Import 완료:")
    print(f"  - tb_routing_mst: {mst_count}건")
    print(f"  - tb_routing_detail: {detail_count}건")
    
    cur.close()
    conn.close()
    
    return {'mst_count': mst_count, 'detail_count': detail_count}


if __name__ == "__main__":
    xlsx_path = '/home/roarm_m3/ai-factory-lab/apps/spacepro/docs/space_pro_20260116.xlsx'
    result = import_ogung_routing(xlsx_path)
    print(f"\n🎉 Import 성공: {result}")
