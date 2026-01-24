import pandas as pd
import psycopg2
from psycopg2 import sql
import numpy as np

# Configuration
DB_CONFIG = {
    "host": "localhost",
    "port": "5433",
    "database": "spacepro",
    "user": "postgres",
    "password": "postgres"
}
EXCEL_FILE = '/home/roarm_m3/ai-factory-lab/apps/spacepro/데이터포맷정리.xlsx'
SHEET_NAME = 'Sheet5'
TABLE_NAME = 'sp_prcode_detail_info'

def migrate():
    print(f"Reading Excel file: {EXCEL_FILE}...")
    try:
        # Read Excel, skip first 2 rows (header is row 0, description is row 1)
        # We manually define columns based on previous inspection to ensure correctness
        # Columns: contno, macode, prcode, prname, pr_seq, prname_detail, pr_detail_seq, worker, working_time, working_day, eqp_type_id, eqp_id, eqp_name
        
        # Read entire sheet without header first to access data from row index 2
        df_raw = pd.read_excel(EXCEL_FILE, sheet_name=SHEET_NAME, header=None)
        
        # Extract data starting from 3rd row (index 2)
        data_df = df_raw.iloc[2:].copy()
        
        # Set column names manually as read from the inspection
        data_df.columns = [
            "contno", "macode", "prcode", "prname", "pr_seq", 
            "prname_detail", "pr_detail_seq", "worker", "working_time", "working_day", 
            "eqp_type_id", "eqp_id", "eqp_name"
        ]
        
        # Replace NaN with None for SQL insertion
        data_df = data_df.astype(object).where(pd.notnull(data_df), None)
        
        print(f"Data prepared: {len(data_df)} rows found.")

    except Exception as e:
        print(f"Failed to read Excel: {e}")
        return

    try:
        print("Connecting to database...")
        conn = psycopg2.connect(**DB_CONFIG)
        cur = conn.cursor()
        
        # Set schema search path
        cur.execute("SET search_path TO spacepro, public")

        # Drop existing table
        print(f"Dropping table {TABLE_NAME} if exists...")
        cur.execute(f"DROP TABLE IF EXISTS {TABLE_NAME}")

        # Create table
        print(f"Creating table {TABLE_NAME}...")
        create_table_query = f"""
        CREATE TABLE {TABLE_NAME} (
            contno VARCHAR(100),
            macode VARCHAR(100),
            prcode VARCHAR(100),
            prname VARCHAR(255),
            pr_seq INTEGER,
            prname_detail VARCHAR(255),
            pr_detail_seq INTEGER,
            worker NUMERIC,
            working_time NUMERIC,
            working_day NUMERIC,
            eqp_type_id VARCHAR(100),
            eqp_id VARCHAR(100),
            eqp_name VARCHAR(255)
        );
        """
        cur.execute(create_table_query)

        # Insert data
        print("Inserting data...")
        insert_query = f"""
        INSERT INTO {TABLE_NAME} (
            contno, macode, prcode, prname, pr_seq, 
            prname_detail, pr_detail_seq, worker, working_time, working_day, 
            eqp_type_id, eqp_id, eqp_name
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        
        values = [tuple(x) for x in data_df.values]
        cur.executemany(insert_query, values)
        
        conn.commit()
        print("Migration completed successfully!")
        
        # Verify count
        cur.execute(f"SELECT COUNT(*) FROM {TABLE_NAME}")
        count = cur.fetchone()[0]
        print(f"Total rows in DB: {count}")

        cur.close()
        conn.close()

    except Exception as e:
        print(f"Database error: {e}")
        if 'conn' in locals() and conn:
            conn.rollback()

if __name__ == "__main__":
    migrate()
