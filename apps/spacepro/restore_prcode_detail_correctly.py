
import pandas as pd
import psycopg2
import os

# Configuration
EXCEL_PATH = '/home/roarm_m3/ai-factory-lab/apps/spacepro/데이터포맷정리.xlsx'
SHEET_NAME = '사업 및 설비정보'
HEADER_ROW_IDX = 55 # 0-based index for row 55 is 55? Excel row 56. 
# "row 55" in dataframe itertuples/scan usually implies 0-based index. 
# Step 585 said: "FOUND ... at row 55". That was `for idx, row in df.iterrows()`. 
# Default pd.read_excel header=None gives 0-based index. So row 55 is the 56th row.
# To use this as header, we read with header=55.

DB_PARAMS = {
    "host": "localhost",
    "port": "5433",
    "database": "spacepro",
    "user": "postgres",
    "password": "postgres"
}

def restore_table():
    try:
        print(f"Reading Excel: {EXCEL_PATH} ({SHEET_NAME}) at header row {HEADER_ROW_IDX}")
        
        # Read Excel
        df = pd.read_excel(EXCEL_PATH, sheet_name=SHEET_NAME, header=HEADER_ROW_IDX)
        
        # Columns of interest (matches the printed row in Step 585)
        # ['contno' 'macode' 'prcode' 'prname' 'pr_seq' 'prname_detail'
        #  'pr_detail_seq' 'worker' 'working_time' 'working_day' 'eqp_type_id'
        #  'eqp_id' 'eqp_name' nan ...]
        
        # Filter columns to only known ones to avoid 'nan' columns
        expected_cols = [
            "contno", "macode", "prcode", "prname", "pr_seq", 
            "prname_detail", "pr_detail_seq", "worker", "working_time", "working_day", 
            "eqp_type_id", "eqp_id", "eqp_name"
        ]
        
        # Filter DF to only these columns
        # Check if they exist in df.columns
        valid_cols = [c for c in expected_cols if c in df.columns]
        if len(valid_cols) < len(expected_cols):
            print(f"Warning: Some columns missing. Found: {valid_cols}")
            print(f"File Header Columns: {df.columns.tolist()}")
        
        df = df[valid_cols]
        
        # Drop rows that are completely empty or have missing key fields (like prcode)
        # Note: Row immediately after header might be description?
        # Let's inspect first row of data
        print("First row data sample:")
        print(df.iloc[0:2].values)
        
        # It's possible row 56 (index 0) is a Korean description row. 
        # If so, we should drop it. 
        # Inspecting previous standard: Row 0=Header, Row 1=Korean Desc.
        # Check if 'prcode' value in first row is '공정코드' or similar korean text
        first_val = str(df.iloc[0]['prcode'])
        if '공정코드' in first_val or 'nan' == first_val:
            print("Dropping first row (description)...")
            df = df.iloc[1:].reset_index(drop=True)
            
        df = df.dropna(subset=['prcode']) # Drop rows where prcode is missing
        print(f"Data rows to insert: {len(df)}")

        # Connect DB
        conn = psycopg2.connect(**DB_PARAMS)
        cur = conn.cursor()
        
        table_name = "sp_prcode_detail_info"
        
        # Drop
        print(f"Dropping table {table_name}...")
        cur.execute(f"DROP TABLE IF EXISTS spacepro.{table_name} CASCADE;")
        
        # Create
        # Schema definition based on typical usage
        create_sql = f"""
        CREATE TABLE spacepro.{table_name} (
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
        print("Creating table...")
        cur.execute(create_sql)
        
        # Insert
        cols_str = ', '.join(valid_cols)
        placeholders = ', '.join(['%s'] * len(valid_cols))
        insert_sql = f"INSERT INTO spacepro.{table_name} ({cols_str}) VALUES ({placeholders})"
        
        count = 0
        for _, row in df.iterrows():
            values = [None if pd.isna(val) else val for val in row]
            cur.execute(insert_sql, values)
            count += 1
            
        conn.commit()
        print(f"Success! Inserted {count} rows.")
        cur.close()
        conn.close()

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    restore_table()
