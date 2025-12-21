"""
Mock Database for Vertical AI Factory
SQLite-based test database with costs table and LangChain-compatible tools.
"""

import sqlite3
import os
from pathlib import Path
from typing import List, Dict, Any
from langchain_core.tools import tool


# Database path
DB_DIR = Path(__file__).parent.parent.parent / "data"
DB_PATH = DB_DIR / "costs.db"


def get_connection() -> sqlite3.Connection:
    """Get database connection."""
    DB_DIR.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn


def init_database() -> str:
    """
    Initialize the mock database with costs table and dummy data.
    Returns a status message.
    """
    conn = get_connection()
    cursor = conn.cursor()
    
    # Create costs table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS costs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            category TEXT NOT NULL,
            amount REAL NOT NULL,
            description TEXT
        )
    """)
    
    # Check if data already exists
    cursor.execute("SELECT COUNT(*) FROM costs")
    if cursor.fetchone()[0] > 0:
        conn.close()
        return "Database already initialized with data."
    
    # Insert dummy data (10 records)
    dummy_data = [
        ("2024-10-01", "식비", 15000, "점심 식사"),
        ("2024-10-03", "교통비", 5000, "택시비"),
        ("2024-10-05", "식비", 25000, "팀 저녁 식사"),
        ("2024-10-08", "사무용품", 35000, "프린터 잉크"),
        ("2024-10-10", "식비", 12000, "점심 식사"),
        ("2024-10-12", "통신비", 55000, "인터넷 요금"),
        ("2024-10-15", "식비", 18000, "팀 점심"),
        ("2024-10-18", "교통비", 8000, "출장 교통비"),
        ("2024-10-22", "식비", 22000, "저녁 회식"),
        ("2024-10-25", "복리후생", 45000, "간식비"),
    ]
    
    cursor.executemany(
        "INSERT INTO costs (date, category, amount, description) VALUES (?, ?, ?, ?)",
        dummy_data
    )
    
    conn.commit()
    conn.close()
    
    return f"Database initialized with {len(dummy_data)} records at {DB_PATH}"


@tool
def get_schema_info() -> str:
    """
    데이터베이스의 스키마 정보를 조회합니다.
    테이블 구조(CREATE 문)를 반환합니다.
    데이터는 조회하지 않고 구조만 확인할 때 사용합니다.
    
    Returns:
        str: 데이터베이스 테이블의 CREATE 문
    """
    conn = get_connection()
    cursor = conn.cursor()
    
    # Get all table schemas
    cursor.execute("""
        SELECT name, sql FROM sqlite_master 
        WHERE type='table' AND name NOT LIKE 'sqlite_%'
    """)
    
    schemas = []
    for row in cursor.fetchall():
        table_name = row['name']
        create_sql = row['sql']
        
        # Get column info
        cursor.execute(f"PRAGMA table_info({table_name})")
        columns = cursor.fetchall()
        
        # Get sample data count
        cursor.execute(f"SELECT COUNT(*) as cnt FROM {table_name}")
        count = cursor.fetchone()['cnt']
        
        schema_info = f"""
## 테이블: {table_name}
### CREATE 문:
```sql
{create_sql}
```

### 컬럼 정보:
| 컬럼명 | 타입 | NULL 허용 | 기본값 | PK |
|--------|------|----------|--------|-----|
"""
        for col in columns:
            nullable = "N" if col['notnull'] else "Y"
            pk = "Y" if col['pk'] else "N"
            default = col['dflt_value'] if col['dflt_value'] else "-"
            schema_info += f"| {col['name']} | {col['type']} | {nullable} | {default} | {pk} |\n"
        
        schema_info += f"\n### 데이터 건수: {count}건\n"
        schemas.append(schema_info)
    
    conn.close()
    
    return "\n---\n".join(schemas) if schemas else "No tables found in database."


@tool
def validate_query(sql: str) -> Dict[str, Any]:
    """
    SQL 쿼리의 문법을 검증하고 안전성을 확인합니다.
    실제로 쿼리를 실행하지는 않습니다.
    
    Args:
        sql: 검증할 SQL 쿼리문
        
    Returns:
        dict: 검증 결과 (is_valid, is_safe, errors, warnings)
    """
    result = {
        "is_valid": True,
        "is_safe": True,
        "errors": [],
        "warnings": []
    }
    
    sql_upper = sql.upper().strip()
    
    # Safety check - dangerous keywords
    dangerous_keywords = ["DROP", "DELETE", "UPDATE", "INSERT", "ALTER", "TRUNCATE", "CREATE"]
    for keyword in dangerous_keywords:
        if keyword in sql_upper:
            result["is_safe"] = False
            result["errors"].append(f"보안 위반: '{keyword}' 키워드는 허용되지 않습니다.")
    
    # Syntax validation using EXPLAIN
    if result["is_safe"]:
        try:
            conn = get_connection()
            cursor = conn.cursor()
            cursor.execute(f"EXPLAIN {sql}")
            conn.close()
        except sqlite3.Error as e:
            result["is_valid"] = False
            result["errors"].append(f"SQL 문법 오류: {str(e)}")
    
    # Warnings
    if "SELECT *" in sql_upper:
        result["warnings"].append("성능 경고: SELECT * 대신 필요한 컬럼만 명시하세요.")
    
    if "LIMIT" not in sql_upper and "SELECT" in sql_upper:
        result["warnings"].append("성능 경고: LIMIT 절이 없습니다. 대량 데이터 조회 시 성능 저하가 발생할 수 있습니다.")
    
    return result


def execute_query(sql: str) -> List[Dict[str, Any]]:
    """
    SQL 쿼리를 실행하고 결과를 반환합니다.
    SELECT 쿼리만 허용됩니다.
    
    Args:
        sql: 실행할 SQL 쿼리문 (SELECT만 허용)
        
    Returns:
        list: 쿼리 결과 (딕셔너리 리스트)
    """
    # Validate first
    validation = validate_query.invoke({"sql": sql})
    
    if not validation["is_safe"]:
        raise ValueError(f"안전하지 않은 쿼리입니다: {validation['errors']}")
    
    if not validation["is_valid"]:
        raise ValueError(f"유효하지 않은 쿼리입니다: {validation['errors']}")
    
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(sql)
    
    rows = cursor.fetchall()
    result = [dict(row) for row in rows]
    
    conn.close()
    return result


# Test function
if __name__ == "__main__":
    print("=== Initializing Database ===")
    print(init_database())
    
    print("\n=== Schema Info ===")
    print(get_schema_info.invoke({}))
    
    print("\n=== Test Query Validation ===")
    test_queries = [
        "SELECT * FROM costs",
        "SELECT category, SUM(amount) FROM costs GROUP BY category",
        "DROP TABLE costs",
    ]
    
    for query in test_queries:
        print(f"\nQuery: {query}")
        result = validate_query.invoke({"sql": query})
        print(f"Result: {result}")
