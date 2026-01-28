from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor
import os

router = APIRouter(
    prefix="/dashboard",
    tags=["dashboard"],
    responses={404: {"description": "Not found"}},
)

# DB Config (Environment variables preferred in prod, using defaults for now)
DB_HOST = os.getenv("DB_HOST", "db")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "spacepro")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "postgres")

def get_db_connection():
    conn = psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )
    return conn

@router.get("/team-status")
def get_team_status():
    """
    Get status by undertaking team:
    - Contract Count
    - Product Count (Active/Total)
    - Progress Rate (Mocked)
    """
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SET search_path TO spacepro, public")
        
        # Query to aggregate data
        # We join team -> contract -> macode
        # We use COUNT(DISTINCT) to get unique contracts and products
        
        query = """
        SELECT 
            t.undertaking_team_id as team_id, 
            t.undertaking_team_name as team_name,
            COUNT(DISTINCT c.contno) as contract_count,
            COUNT(DISTINCT m.macode) as product_count
        FROM sp_undertaking_team_mst t
        LEFT JOIN sp_contract_info c ON t.undertaking_team_id = c.undertaking_team_id
        LEFT JOIN sp_macode_info m ON c.contno = m.contno
        GROUP BY t.undertaking_team_id, t.undertaking_team_name
        ORDER BY t.undertaking_team_id
        """
        
        cur.execute(query)
        rows = cur.fetchall()
        
        result = []
        for row in rows:
            # Mock progress rate for now (random 0-100 or fixed?)
            # User said "Simple Management Plan Simulation", maybe 0 is safer until simulated.
            # But "Progress Rate" implies execution status.
            # Let's return 0 for now as we have no execution data.
            progress_rate = 0 
            
            # If there are contracts, maybe we can fake it or check if any 'work_result' exists?
            # No work result table in context summary.
            
            result.append({
                "team_id": row["team_id"],
                "team_name": row["team_name"],
                "contract_count": row["contract_count"],
                "product_count": row["product_count"],
                "progress_rate": progress_rate
            })
            
        cur.close()
        conn.close()
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/team-contracts/{team_id}")
def get_team_contracts(team_id: str):
    """
    Get contracts and simulated schedule for a team.
    Returns list of contracts with their products and simulated status.
    Now includes contid (contract name) for display purposes.
    """
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SET search_path TO spacepro, public")

        # 1. Get distinct contracts for the team with contid from sp_macode_info
        query_contracts = """
        SELECT DISTINCT c.contno, m.contid
        FROM sp_contract_info c
        LEFT JOIN sp_macode_info m ON c.contno = m.contno
        WHERE c.undertaking_team_id = %s
        ORDER BY c.contno
        """
        cur.execute(query_contracts, (team_id,))
        contracts = cur.fetchall()
        
        result = []
        for cont in contracts:
            contno = cont['contno']
            contid = cont['contid'] or contno  # fallback to contno if contid is null
            
            # 2. Get products for this contract
            query_products = """
            SELECT DISTINCT c.macode, m.maname 
            FROM sp_contract_info c
            LEFT JOIN sp_macode_info m ON c.macode = m.macode
            WHERE c.contno = %s
            ORDER BY c.macode
            """
            cur.execute(query_products, (contno,))
            products = cur.fetchall()
            
            product_list = []
            for prod in products:
                macode = prod['macode']
                maname = prod['maname'] or macode
                
                # 3. Get Representative Processes for this product
                query_processes = """
                SELECT prcode, prname, rn
                FROM sp_contract_info
                WHERE contno = %s AND macode = %s
                ORDER BY rn
                """
                cur.execute(query_processes, (contno, macode))
                processes = cur.fetchall()
                
                # 4. Simulate Schedule & Status
                simulated_processes = []
                current_day = 1
                
                for idx, proc in enumerate(processes):
                    duration = 2
                    start_day = current_day
                    end_day = current_day + duration
                    current_day = end_day 
                    
                    if idx < 3:
                        status = "Done"
                    elif idx < 5:
                        status = "In Progress"
                    else:
                        status = "Pending"
                        
                    simulated_processes.append({
                        "prcode": proc['prcode'],
                        "prname": proc['prname'],
                        "rn": proc['rn'],
                        "start_day": start_day,
                        "end_day": end_day,
                        "status": status
                    })
                
                product_list.append({
                    "macode": macode,
                    "maname": maname,
                    "processes": simulated_processes
                })
            
            result.append({
                "contno": contno,
                "contid": contid,
                "products": product_list
            })

        cur.close()
        conn.close()
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

