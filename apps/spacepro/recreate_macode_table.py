
import pandas as pd
import psycopg2
import os

# Configuration
EXCEL_PATH = '/home/roarm_m3/ai-factory-lab/apps/spacepro/데이터포맷정리.xlsx'
SHEET_NAME = 'Sheet5'
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
        # Read header rows (0-based index: 0=Table Name, 1=Col Names, 2=Description)
        # Data starts at row 3 (which is 4th row in Excel 1-based indexing)
        # Actually header=1 means row 2 (0-indexed 1) is the header.
        
        # Determine Table Name from Row 1 (Index 0)
        df_meta = pd.read_excel(EXCEL_PATH, sheet_name=SHEET_NAME, header=None, nrows=1)
        table_name_raw = df_meta.iloc[0, 0] # e.g. "table: sp_macode_info" or "3. sp_macode_info(제품정보)"
        # Simple parsing: extract "sp_..." part or just hardcode if it's specific
        import re
        match = re.search(r'(sp_[a-zA-Z0-9_]+)', str(table_name_raw))
        if match:
            table_name = match.group(1)
        else:
            table_name = "sp_macode_info" # Fallback
            
        print(f"Target Table: {table_name}")

        # Read Column Names from Row 2 (Index 1) and Data from Row 4 (Index 3)
        # Note: pandas header row is 0-indexed relative to the read area.
        # If we skip row 0, the next row (row 1 in file, 2nd row) becomes header.
        df = pd.read_excel(EXCEL_PATH, sheet_name=SHEET_NAME, header=1)
        
        # Row 2 (Index 2 in file) is description, usually becomes the first data row in this read.
        # We should drop it.
        # df.iloc[0] is the description row.
        column_descriptions = df.iloc[0].to_dict()
        df = df.iloc[1:].reset_index(drop=True)
        
        # Limit data rows as requested (4~22 in Excel -> 19 rows of data)
        # Excel Row 4 is index 0 in our current df
        # Excel Row 22 is index 18
        df = df.iloc[0:19] 

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
        # Infer types simplistically (mostly TEXT for simplicity in this context, or scan data)
        # Assuming all text for safety unless known integer
        create_cols = []
        for col in columns:
            col_name = str(col).strip()
            # Basic type inference could go here, but for "code" and "name", TEXT is safe
            col_type = "TEXT" 
            create_cols.append(f"{col_name} {col_type}")
        
        create_sql = f"CREATE TABLE spacepro.{table_name} ({', '.join(create_cols)});"
        print(f"Creating table: {create_sql}")
        cur.execute(create_sql)
        
        # Insert Data
        insert_sql = f"INSERT INTO spacepro.{table_name} ({', '.join(columns)}) VALUES ({', '.join(['%s']*len(columns))})"
        
        for _, row in df.iterrows():
            # Convert NaN to None for SQL NULL
            values = [None if pd.isna(val) else str(val) for val in row]
            cur.execute(insert_sql, values)
            
        conn.commit()
        print("Data inserted successfully.")
        
        cur.close()
        conn.close()

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    recreate_table()
