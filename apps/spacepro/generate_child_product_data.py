
import pandas as pd
import psycopg2
import psycopg2.extras

# Configuration
EXCEL_PATH = '/home/roarm_m3/ai-factory-lab/apps/spacepro/데이터포맷정리.xlsx'
SHEET_NAME_TARGETS = 'Sheet6'
SOURCE_MACODE = 'IAHANWCQ'
DB_PARAMS = {
    "host": "localhost",
    "port": "5433",
    "database": "spacepro",
    "user": "postgres",
    "password": "postgres"
}

def generate_mock_data():
    conn = None
    try:
        # 1. Read Target Products from Sheet6
        print(f"Reading Targets from {EXCEL_PATH} ({SHEET_NAME_TARGETS})...")
        # Sheet6 header detection: usually row 0 or 1 based on previous inspection
        # Step 548 showed row 0 is 'undertaking_team_id', 'contno', ...
        df_targets = pd.read_excel(EXCEL_PATH, sheet_name=SHEET_NAME_TARGETS, header=0)
        
        # Helper to get column regardless of exact name (handling whitespace etc)
        def get_col(df, candidates):
            for c in candidates:
                if c in df.columns: return df[c]
                # check case insensitive
                for existing in df.columns:
                    if str(existing).lower() == c.lower(): return df[existing]
            return None

        # Filter targets
        macode_col = get_col(df_targets, ['macode', '제품코드'])
        contno_col = get_col(df_targets, ['contno', '계약코드'])
        
        if macode_col is None or contno_col is None:
            print("Error: Could not find 'macode' or 'contno' columns in Sheet6")
            print(f"Columns found: {df_targets.columns.tolist()}")
            return

        # List of (contno, macode) targets
        targets = []
        for idx, row in df_targets.iterrows():
            m = row[macode_col.name]
            c = row[contno_col.name]
            if pd.notna(m) and str(m).strip() != '':
                targets.append({'contno': str(c).strip(), 'macode': str(m).strip()})
        
        print(f"Found {len(targets)} targets in Sheet6.")
        
        # 2. Fetch Template Data from DB
        conn = psycopg2.connect(**DB_PARAMS)
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        
        print(f"Fetching template data for macode='{SOURCE_MACODE}'...")
        cur.execute("""
            SELECT * FROM spacepro.sp_prcode_detail_info 
            WHERE macode = %s
        """, (SOURCE_MACODE,))
        template_rows = cur.fetchall()
        
        if not template_rows:
            print(f"Error: No template data found for {SOURCE_MACODE} in sp_prcode_detail_info.")
            return
            
        print(f"Template has {len(template_rows)} rows.")

        # 3. Insert Mock Data for Targets
        insert_sql = """
            INSERT INTO spacepro.sp_prcode_detail_info
            (contno, macode, prcode, prname, pr_seq, prname_detail, pr_detail_seq, worker, working_time, working_day, eqp_type_id, eqp_id, eqp_name)
            VALUES (%(contno)s, %(macode)s, %(prcode)s, %(prname)s, %(pr_seq)s, %(prname_detail)s, %(pr_detail_seq)s, %(worker)s, %(working_time)s, %(working_day)s, %(eqp_type_id)s, %(eqp_id)s, %(eqp_name)s)
        """
        
        total_inserted = 0
        
        for target in targets:
            tgt_macode = target['macode']
            tgt_contno = target['contno']
            
            if tgt_macode == SOURCE_MACODE:
                print(f"Skipping source {tgt_macode}...")
                continue
                
            print(f"Generating data for {tgt_macode} (Contract: {tgt_contno})...")
            
            # Delete existing data for this target to avoid duplicates/mess
            cur.execute("DELETE FROM spacepro.sp_prcode_detail_info WHERE macode = %s", (tgt_macode,))
            
            # Insert new rows
            for row in template_rows:
                # Create new row dict
                new_row = dict(row)
                new_row['contno'] = tgt_contno
                new_row['macode'] = tgt_macode
                
                # Execute insert
                cur.execute(insert_sql, new_row)
                total_inserted += 1
                
        conn.commit()
        print(f"Success! Generated {total_inserted} rows for {len(targets)-1} targets.")

    except Exception as e:
        print(f"Error: {e}")
        if conn: conn.rollback()
    finally:
        if conn: conn.close()

if __name__ == "__main__":
    generate_mock_data()
