import psycopg2
import psycopg2.extras

DB_CONFIG = {
    "host": "localhost",
    "port": "5433",
    "database": "spacepro",
    "user": "postgres",
    "password": "postgres"
}

CONTRACT_NO = '23D220097'
SOURCE_MACODE = 'IAHANWCQ'

def distribute_hierarchy():
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cur.execute("SET search_path TO spacepro, public")

    try:
        # 1. Fetch Source Data (IAHANWCQ)
        print(f"Fetching source data for {SOURCE_MACODE}...")
        
        # Source Contract Info (Processes)
        cur.execute("""
            SELECT undertaking_team_id, grcode, contno, prcode, prname, row_number() over (order by rn) as rn, mtou_chk, price, prcd_ratio, contracted_man_hours, site
            FROM sp_contract_info 
            WHERE contno = %s AND macode = %s
            ORDER BY rn
        """, (CONTRACT_NO, SOURCE_MACODE))
        source_contracts = cur.fetchall()
        print(f"  > Source Contract Rows: {len(source_contracts)}")

        # Source Detail Info (Sub-processes)
        cur.execute("""
            SELECT prcode, prname, pr_seq, prname_detail, pr_detail_seq, worker, working_time, working_day, eqp_type_id, eqp_id, eqp_name
            FROM sp_prcode_detail_info 
            WHERE contno = %s AND macode = %s
            ORDER BY pr_seq, pr_detail_seq
        """, (CONTRACT_NO, SOURCE_MACODE))
        source_details = cur.fetchall()
        print(f"  > Source Detail Rows: {len(source_details)}")

        if not source_contracts:
            print("Error: No source contract data found.")
            return

        # 2. Identify Target Macodes
        # Get all macodes for this contract EXCEPT the source one
        cur.execute("""
            SELECT macode 
            FROM sp_macode_info 
            WHERE contno = %s AND macode != %s
        """, (CONTRACT_NO, SOURCE_MACODE))
        targets = [row['macode'] for row in cur.fetchall()]
        
        print(f"\nFound {len(targets)} target macodes to update: {targets}")

        # 3. Duplicate Data
        for target_macode in targets:
            print(f"\nProcessing Target: {target_macode}...")
            
            # --- sp_contract_info ---
            # Clear existing for target
            cur.execute("DELETE FROM sp_contract_info WHERE contno = %s AND macode = %s", (CONTRACT_NO, target_macode))
            
            # Insert new
            inserted_contracts = 0
            for row in source_contracts:
                cur.execute("""
                    INSERT INTO sp_contract_info 
                    (undertaking_team_id, grcode, contno, macode, rn, prcode, prname, mtou_chk, price, prcd_ratio, contracted_man_hours, site)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, (
                    row['undertaking_team_id'],
                    row['grcode'],
                    CONTRACT_NO,
                    target_macode,
                    row['rn'],
                    row['prcode'],
                    row['prname'],
                    row['mtou_chk'],
                    row['price'],
                    row['prcd_ratio'],
                    row['contracted_man_hours'],
                    row['site']
                ))
                inserted_contracts += 1
            print(f"  > Inserted {inserted_contracts} contract info rows.")

            # --- sp_prcode_detail_info ---
            # Clear existing for target
            cur.execute("DELETE FROM sp_prcode_detail_info WHERE contno = %s AND macode = %s", (CONTRACT_NO, target_macode))
            
            # Insert new
            inserted_details = 0
            for row in source_details:
                cur.execute("""
                    INSERT INTO sp_prcode_detail_info
                    (contno, macode, prcode, prname, pr_seq, prname_detail, pr_detail_seq, worker, working_time, working_day, eqp_type_id, eqp_id, eqp_name)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, (
                    CONTRACT_NO,
                    target_macode,
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
                inserted_details += 1
            print(f"  > Inserted {inserted_details} detail info rows.")

        conn.commit()
        print("\nDistribution completed successfully.")

    except Exception as e:
        conn.rollback()
        print(f"Error: {e}")
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    distribute_hierarchy()
