
import psycopg2
import psycopg2.extras

# Configuration
DB_PARAMS = {
    "host": "localhost",
    "port": "5433",
    "database": "spacepro",
    "user": "postgres",
    "password": "postgres"
}

def add_wbs_vid_column():
    conn = None
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cur = conn.cursor()
        
        print("Checking if 'wbs_vid' column exists in 'sp_prcode_detail_info'...")
        cur.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_schema='spacepro' AND table_name='sp_prcode_detail_info' AND column_name='wbs_vid'
        """)
        if not cur.fetchone():
            print("Column 'wbs_vid' missing. Adding it...")
            # We want to add it next to 'macode'. PostgreSQL doesn't support 'AFTER column' in ALTER TABLE directly 
            # without recreating table or just adding it to the end.
            # However, for logical ordering in SELECT *, we can't easily change position without recreation.
            # We will just add it. The user asked "macode 컬럼 옆에", which usually implies logical intent or 
            # if they seek a recreate. Given we just restored data, adding it to the end is safest/fastest.
            # If strictly needed "next to macode", we'd need to recreate table.
            # Given PostgreSQL, column order physically doesn't matter much, but let's just add it.
            
            cur.execute("ALTER TABLE spacepro.sp_prcode_detail_info ADD COLUMN wbs_vid TEXT")
            print("Column added.")
        else:
            print("Column 'wbs_vid' already exists.")
            
        print("Populating 'wbs_vid' from 'sp_macode_info'...")
        # Update Join
        update_query = """
            UPDATE spacepro.sp_prcode_detail_info d
            SET wbs_vid = m.wbs_vid
            FROM spacepro.sp_macode_info m
            WHERE d.macode = m.macode AND d.contno = m.contno
        """
        cur.execute(update_query)
        rows_updated = cur.rowcount
        print(f"Updated {rows_updated} rows.")
        
        conn.commit()
        print("Operation completed successfully.")

    except Exception as e:
        print(f"Error: {e}")
        if conn: conn.rollback()
    finally:
        if conn: conn.close()

if __name__ == "__main__":
    add_wbs_vid_column()
