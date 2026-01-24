import psycopg2
import psycopg2.extras
import uuid

DB_CONFIG = {
    "host": "localhost",
    "port": "5433",
    "database": "spacepro",
    "user": "postgres",
    "password": "postgres"
}

# Patterns
PRODUCTS = [
    {"contno": "24D110012", "main_macode": "SHBD001", "name": "SH", "team": "C02"},
    {"contno": "24D110015", "main_macode": "SDAB002", "name": "SD", "team": "C02"},
    {"contno": "24A220033", "main_macode": "SFCD003", "name": "SF", "team": "C03"}
]

OUNG_MAIN = "IAHANWCQ"
OUNG_CONTNO = "23D220097"

def manage_data():
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cur.execute("SET search_path TO spacepro, public")

    try:
        print("--- 1. Cleaning sp_contract_info (Keeping only Main Codes) ---")
        # Define 'Main' codes as those that don't have a dash '-' or are specifically known bases?
        # Actually, let's just delete ALL for the target contracts and re-insert ONLY the main one.
        # For O궁, we delete everything except IAHANWCQ.
        
        # O궁 Cleanup
        cur.execute("DELETE FROM sp_contract_info WHERE contno = %s AND macode != %s", (OUNG_CONTNO, OUNG_MAIN))
        print(f"Cleaned O궁 contract info. Rows remaining: {cur.rowcount}") # Rowcount might be inaccurate for delete, check count later.

        print("\n--- 2. Generating Child Macodes for SH, SD, SF ---")
        for prod in PRODUCTS:
            contno = prod['contno']
            main_macode = prod['main_macode']
            name = prod['name']
            
            # Create 3 child variants
            variants = [f"{main_macode}-01", f"{main_macode}-02", f"{main_macode}-03"]
            
            for var_macode in variants:
                # Check exist
                cur.execute("SELECT 1 FROM sp_macode_info WHERE macode = %s", (var_macode,))
                if not cur.fetchone():
                    # Insert
                    # Need grcode, chcode etc. similar to main
                    cur.execute("SELECT * FROM sp_macode_info WHERE macode = %s", (main_macode,))
                    main_info = cur.fetchone()
                    if main_info:
                        insert_query = """
                        INSERT INTO sp_macode_info (
                            grcode, chcode, contno, contid, macode, maname, created_at
                        ) VALUES (%s, %s, %s, %s, %s, %s, NOW())
                        """
                        cur.execute(insert_query, (
                            main_info['grcode'],
                            main_info['chcode'],
                            contno,
                            main_info['contid'],
                            var_macode,
                            main_info['maname'] # Keep same name? User said "O궁 has no children", implying these are same product?
                        ))
            print(f"Ensured variants for {name}: {variants}")

        print("\n--- 3. Regenerating sp_contract_info for SH, SD, SF (Main Only) ---")
        
        # Get Template (O궁 Main)
        cur.execute("SELECT * FROM sp_contract_info WHERE contno = %s AND macode = %s", (OUNG_CONTNO, OUNG_MAIN))
        template_contracts = cur.fetchall()
        
        for prod in PRODUCTS:
            contno = prod['contno']
            main_macode = prod['main_macode']
            team = prod['team']
            
            # Delete logic: Clear ALL for this contract first
            cur.execute("DELETE FROM sp_contract_info WHERE contno = %s", (contno,))
            
            # Insert Main Only
            for row in template_contracts:
                cur.execute("""
                    INSERT INTO sp_contract_info 
                    (undertaking_team_id, grcode, contno, macode, rn, prcode, prname, mtou_chk, price, prcd_ratio, contracted_man_hours, site)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, (
                    team,
                    row['grcode'],
                    contno,
                    main_macode,
                    row['rn'],
                    row['prcode'],
                    row['prname'],
                    row['mtou_chk'],
                    row['price'],
                    row['prcd_ratio'],
                    row['contracted_man_hours'],
                    row['site']
                ))
            print(f"Populated sp_contract_info for {main_macode}")

        print("\n--- 4. Regenerating sp_prcode_detail_info for SH, SD, SF (Main + Children) ---")
        
        # Get Template (O궁 Detail)
        cur.execute("SELECT * FROM sp_prcode_detail_info WHERE contno = %s AND macode = %s", (OUNG_CONTNO, OUNG_MAIN))
        template_details = cur.fetchall()

        for prod in PRODUCTS:
            contno = prod['contno']
            main_macode = prod['main_macode']
            
            # Get all macodes for this contract (Main + newly created children)
            cur.execute("SELECT macode FROM sp_macode_info WHERE contno = %s", (contno,))
            all_macodes = [r[0] for r in cur.fetchall()]
            
            # Delete existing details
            cur.execute("DELETE FROM sp_prcode_detail_info WHERE contno = %s", (contno,))
            
            for target_macode in all_macodes:
                # Insert
                for row in template_details:
                    cur.execute("""
                        INSERT INTO sp_prcode_detail_info
                        (contno, macode, prcode, prname, pr_seq, prname_detail, pr_detail_seq, worker, working_time, working_day, eqp_type_id, eqp_id, eqp_name)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """, (
                        contno,
                        target_macode, # Target Macode
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
            print(f"Populated sp_prcode_detail_info for {len(all_macodes)} macodes in {contno}")

        conn.commit()
        print("\nData regeneration completed.")

    except Exception as e:
        conn.rollback()
        print(f"Error: {e}")
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    manage_data()
