import psycopg2

DB_CONFIG = {
    "host": "localhost",
    "port": "5433",
    "database": "spacepro",
    "user": "postgres",
    "password": "postgres"
}

TARGET_CONTRACT = '23D220097'
TARGET_TEAM = 'C01'
TARGET_GRCODE = '9'

def consolidate_contract():
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor()
    cur.execute("SET search_path TO spacepro, public")

    try:
        print(f"Migrating SH, SD, SF to Contract: {TARGET_CONTRACT}, Team: {TARGET_TEAM}")

        # Use % as literal by checking binding or better yet, simply use binding for the prefix
        # Actually in psycopg2, if you pass arguments, you must escape literal % as %%
        
        # 1. Update sp_macode_info
        update_macode_query = """
        UPDATE sp_macode_info
        SET contno = %s, grcode = %s
        WHERE macode LIKE 'SH%%' OR macode LIKE 'SD%%' OR macode LIKE 'SF%%'
        """
        cur.execute(update_macode_query, (TARGET_CONTRACT, TARGET_GRCODE))
        print(f"Updated sp_macode_info: {cur.rowcount} rows")

        # 2. Update sp_contract_info
        update_contract_query = """
        UPDATE sp_contract_info
        SET contno = %s, undertaking_team_id = %s, grcode = %s
        WHERE macode LIKE 'SH%%' OR macode LIKE 'SD%%' OR macode LIKE 'SF%%'
        """
        cur.execute(update_contract_query, (TARGET_CONTRACT, TARGET_TEAM, TARGET_GRCODE))
        print(f"Updated sp_contract_info: {cur.rowcount} rows")

        # 3. Update sp_prcode_detail_info
        update_detail_query = """
        UPDATE sp_prcode_detail_info
        SET contno = %s
        WHERE macode LIKE 'SH%%' OR macode LIKE 'SD%%' OR macode LIKE 'SF%%'
        """
        cur.execute(update_detail_query, (TARGET_CONTRACT,))
        print(f"Updated sp_prcode_detail_info: {cur.rowcount} rows")
        
        conn.commit()
        print("Consolidation completed successfully.")

    except Exception as e:
        conn.rollback()
        print(f"Error: {e}")
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    consolidate_contract()
