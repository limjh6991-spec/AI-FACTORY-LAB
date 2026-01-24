
import pandas as pd
import psycopg2
import os
import re

# Configuration
EXCEL_PATH = '/home/roarm_m3/ai-factory-lab/apps/spacepro/데이터포맷정리.xlsx'
SHEET_NAME = 'Sheet6'
DB_PARAMS = {
    "host": "localhost",
    "port": "5433",
    "database": "spacepro",
    "user": "postgres",
    "password": "postgres"
}

def recreate_table():
    try:
        # Read Excel
        print(f"Reading Excel: {EXCEL_PATH} ({SHEET_NAME})")
        
        # Determine Table Name from Row 1
        df_meta = pd.read_excel(EXCEL_PATH, sheet_name=SHEET_NAME, header=None, nrows=1)
        table_name_raw = df_meta.iloc[0, 0] # e.g. "4. sp_prcode_detail_info(제품정보)"
        
        # Parse table name extracting 'sp_...'
        match = re.search(r'(sp_[a-zA-Z0-9_]+)', str(table_name_raw))
        if match:
            table_name = match.group(1)
        else:
            table_name = "sp_prcode_detail_info" # Fallback
            
        print(f"Target Table: {table_name}")

        # Scan for English headers.
        # Often row 2 (index 1) is Korean description, Row 3 (index 2) might be English codes?
        # Let's read a chunk and find a row that looks like db columns (e.g. contains 'prcode', 'contno')
        df_preview = pd.read_excel(EXCEL_PATH, sheet_name=SHEET_NAME, header=None, nrows=5)
        print("Previewing first 5 rows to find headers:")
        print(df_preview)
        
        header_row_idx = 1 # Default to row 2 (0-based index 1)
        # Search for a row containing typical column names like 'prcode' or 'macode' or 'contno'
        for idx, row in df_preview.iterrows():
            row_str = str(row.values).lower()
            if 'prcode' in row_str or 'contno' in row_str or 'macode' in row_str:
                header_row_idx = idx
                print(f"Detected English headers at row index {idx}")
                break
        
        # Read Data with detected header
        df = pd.read_excel(EXCEL_PATH, sheet_name=SHEET_NAME, header=header_row_idx)
        
        # If the row immediately following header is description (Korean), drop it
        # Check if first row values are markedly different or clearly descriptions
        # Simple heuristic: remove first row if it contains Korean characters and header didn't
        # But usually formatted as: TableName, EnglishCols, KoreanDesc, Data... 
        # So if we found EnglishCols at idx, idx+1 is KoreanDesc.
        
        # Start data AFTER description row
        df = df.iloc[1:].reset_index(drop=True)
        df = df.dropna(how='all') 
        
        columns = df.columns.tolist()
        print(f"Columns: {columns}")
        print(f"Data rows: {len(df)}")

        # Connect to DB
        conn = psycopg2.connect(**DB_PARAMS)
        cur = conn.cursor()

        # Drop Table
        print(f"Dropping table {table_name}...")
        cur.execute(f"DROP TABLE IF EXISTS spacepro.{table_name} CASCADE;")
        
        # Create Table
        create_cols = []
        for col in columns:
            col_name = str(col).strip()
            col_type = "TEXT" 
            create_cols.append(f"{col_name} {col_type}")
        
        create_sql = f"CREATE TABLE spacepro.{table_name} ({', '.join(create_cols)});"
        print(f"Creating table: {create_sql}")
        cur.execute(create_sql)
        
        # Insert Data
        insert_sql = f"INSERT INTO spacepro.{table_name} ({', '.join(columns)}) VALUES ({', '.join(['%s']*len(columns))})"
        
        count = 0
        for _, row in df.iterrows():
            # Convert NaN to None for SQL NULL
            values = [None if pd.isna(val) else str(val) for val in row]
            cur.execute(insert_sql, values)
            count += 1
            
        conn.commit()
        print(f"Data inserted successfully: {count} rows.")
        
        cur.close()
        conn.close()

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    recreate_table()
