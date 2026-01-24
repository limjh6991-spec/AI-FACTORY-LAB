import pandas as pd
import json

file_path = '/home/roarm_m3/ai-factory-lab/apps/spacepro/데이터포맷정리.xlsx'


def inspect_excel():
    try:
        # Load workbook
        print(f"Reading {file_path}...")
        xl = pd.ExcelFile(file_path)
        print(f"Sheet names: {xl.sheet_names}")

        target_cols = ["working_day", "작업일수", "Standard_work_days", "working_time", "총작업시간"]
        
        for sheet in xl.sheet_names:
            print(f"Scanning {sheet} (first 100 rows)...")
            try:
                df = pd.read_excel(xl, sheet_name=sheet, header=None, nrows=100)
                # Search for target string
                for idx, row in df.iterrows():
                    row_vals = [str(x).lower() for x in row.values]
                    matches = [t for t in target_cols if any(t in val for val in row_vals)]
                    if matches:
                        print(f"FOUND {matches} in sheet '{sheet}' at row {idx}")
                        # Print row and surrounding
                        print(f"Row data: {row.values}")
            except Exception as e:
                print(f"Error reading {sheet}: {e}")




                
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    inspect_excel()
