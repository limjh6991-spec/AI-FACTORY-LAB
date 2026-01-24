import psycopg2
import json

# Configuration
DB_CONFIG = {
    "host": "localhost",
    "port": "5433",
    "database": "spacepro",
    "user": "postgres",
    "password": "postgres"
}

def inspect_data():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cur = conn.cursor()
        cur.execute("SET search_path TO spacepro, public")

        # 1. Get SH, SD, SF info from sp_macode_info
        print("--- sp_macode_info (SH, SD, SF) ---")
        cur.execute("SELECT * FROM sp_macode_info WHERE macode IN ('SHBD001', 'SDAB002', 'SFCD003') OR maname LIKE '%SH%' OR maname LIKE '%SD%' OR maname LIKE '%SF%'")
        columns = [desc[0] for desc in cur.description]
        rows = cur.fetchall()
        print(json.dumps([dict(zip(columns, row)) for row in rows], default=str, indent=2, ensure_ascii=False))

        # 2. Get O궁 pattern from sp_contract_info (contract 23D220097 is known for O궁 from context)
        print("\n--- sp_contract_info (O궁 pattern: 23D220097) ---")
        cur.execute("SELECT * FROM sp_contract_info WHERE contno = '23D220097' LIMIT 5")
        columns = [desc[0] for desc in cur.description]
        rows = cur.fetchall()
        print(json.dumps([dict(zip(columns, row)) for row in rows], default=str, indent=2, ensure_ascii=False))

        # 3. Get O궁 pattern from sp_prcode_detail_info
        print("\n--- sp_prcode_detail_info (O궁 pattern: 23D220097 or associated prcodes) ---")
        cur.execute("SELECT * FROM sp_prcode_detail_info WHERE contno = '23D220097' LIMIT 5")
        columns = [desc[0] for desc in cur.description]
        rows = cur.fetchall()
        print(json.dumps([dict(zip(columns, row)) for row in rows], default=str, indent=2, ensure_ascii=False))

        conn.close()

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    inspect_data()
