import psycopg2
import json

DB_CONFIG = {
    "host": "localhost",
    "port": "5433",
    "database": "spacepro",
    "user": "postgres",
    "password": "postgres"
}

def inspect_ocung_macodes():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cur = conn.cursor()
        cur.execute("SET search_path TO spacepro, public")

        # Find all macodes for O궁 contract 23D220097
        print("--- All Macodes for Contract 23D220097 ---")
        cur.execute("SELECT macode, maname FROM sp_macode_info WHERE contno = '23D220097'")
        rows = cur.fetchall()
        print(json.dumps(rows, default=str, indent=2, ensure_ascii=False))
        
        # Check if 'IAHANWCQ' exists in sp_contract_info (as source)
        cur.execute("SELECT COUNT(*) FROM sp_contract_info WHERE contno = '23D220097' AND macode = 'IAHANWCQ'")
        count = cur.fetchone()[0]
        print(f"\nIAHANWCQ records in sp_contract_info: {count}")

        conn.close()

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    inspect_ocung_macodes()
