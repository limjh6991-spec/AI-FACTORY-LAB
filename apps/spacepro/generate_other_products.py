import psycopg2
import psycopg2.extras

# Configuration
DB_CONFIG = {
    "host": "localhost",
    "port": "5433",
    "database": "spacepro",
    "user": "postgres",
    "password": "postgres"
}

# Source (Template)
SOURCE_CONTNO = '23D220097'
SOURCE_MACODE = 'IAHANWCQ'

# Targets
TARGETS = [
    {"contno": "24D110012", "macode": "SHBD001", "team": "C02", "name": "SH"},
    {"contno": "24D110015", "macode": "SDAB002", "team": "C02", "name": "SD"},
    {"contno": "24A220033", "macode": "SFCD003", "team": "C03", "name": "SF"}
]

def generate_data():
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cur.execute("SET search_path TO spacepro, public")

    try:
        # 1. Fetch Source sp_contract_info
        print(f"Fetching source sp_contract_info for {SOURCE_CONTNO}...")
        cur.execute("SELECT * FROM sp_contract_info WHERE contno = %s ORDER BY rn", (SOURCE_CONTNO,))
        source_contracts = cur.fetchall()
        print(f"Found {len(source_contracts)} rows in sp_contract_info.")

        # 2. Fetch Source sp_prcode_detail_info
        print(f"Fetching source sp_prcode_detail_info for {SOURCE_CONTNO}...")
        cur.execute("SELECT * FROM sp_prcode_detail_info WHERE contno = %s ORDER BY pr_seq, pr_detail_seq", (SOURCE_CONTNO,))
        source_details = cur.fetchall()
        print(f"Found {len(source_details)} rows in sp_prcode_detail_info.")

        for target in TARGETS:
            t_contno = target['contno']
            t_macode = target['macode']
            t_team = target['team']
            t_name = target['name']

            print(f"\nProcessing Target: {t_name} ({t_contno} / {t_macode})")

            # --- sp_contract_info ---
            # Delete existing
            cur.execute("DELETE FROM sp_contract_info WHERE contno = %s", (t_contno,))
            
            # Insert new
            for row in source_contracts:
                # Construct new row data
                # Columns: undertaking_team_id, grcode, contno, macode, rn, prcode, prname, mtou_chk, price, prcd_ratio, contracted_man_hours, site
                # We skip 'id' and 'created_at' to let DB handle them (if id is serial) or default
                
                # Note: 'id' is likely SERIAL, so we don't insert it.
                
                insert_query = """
                INSERT INTO sp_contract_info 
                (undertaking_team_id, grcode, contno, macode, rn, prcode, prname, mtou_chk, price, prcd_ratio, contracted_man_hours, site)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
                
                # Modify prname to distinguish? The user said "similar".
                # Let's keep prcode the same (it's standard usually) but maybe prefix prname?
                # Actually, in manufacturing, processes codes are often shared.
                # User said "O궁 제품과 비슷하게", implying the structure is the same.
                # I will stick to exact copy of structure, just changing the keys.
                
                cur.execute(insert_query, (
                    t_team,             # New Team
                    row['grcode'],
                    t_contno,           # New Contno
                    t_macode,           # New Macode
                    row['rn'],
                    row['prcode'],
                    row['prname'],      # Keep same process name
                    row['mtou_chk'],
                    row['price'],
                    row['prcd_ratio'],
                    row['contracted_man_hours'],
                    row['site']
                ))
            print(f"  Inserted {len(source_contracts)} rows into sp_contract_info.")

            # --- sp_prcode_detail_info ---
            # Delete existing
            cur.execute("DELETE FROM sp_prcode_detail_info WHERE contno = %s", (t_contno,))

            # Insert new
            for row in source_details:
                # Columns: contno, macode, prcode, prname, pr_seq, prname_detail, pr_detail_seq, worker, working_time, working_day, eqp_type_id, eqp_id, eqp_name
                
                insert_query_detail = """
                INSERT INTO sp_prcode_detail_info
                (contno, macode, prcode, prname, pr_seq, prname_detail, pr_detail_seq, worker, working_time, working_day, eqp_type_id, eqp_id, eqp_name)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
                
                cur.execute(insert_query_detail, (
                    t_contno,           # New Contno
                    t_macode,           # New Macode
                    row['prcode'],
                    row['prname'],
                    row['pr_seq'],
                    row['prname_detail'],
                    row['pr_detail_seq'],
                    row['worker'],
                    row['working_time'],
                    row['working_day'],
                    row['eqp_type_id'],
                    row['eqp_id'],
                    row['eqp_name']
                ))
            print(f"  Inserted {len(source_details)} rows into sp_prcode_detail_info.")

        conn.commit()
        print("\nAll data generation completed successfully.")

    except Exception as e:
        conn.rollback()
        print(f"Error: {e}")
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    generate_data()
