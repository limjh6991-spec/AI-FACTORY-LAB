"""
Vertical AI Factory - FastAPI Server

SpacePro MES/MRP AI Demo 페이지와 연동하기 위한 REST API 서버
"""

import os
import sys
from pathlib import Path

# 프로젝트 루트를 path에 추가
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Any
from dotenv import load_dotenv

from infrastructure.database import init_database, execute_query
from application.graph import run_workflow


# 환경 변수 로드
env_path = project_root.parent / ".env"
load_dotenv(env_path)

# FastAPI 앱 생성
app = FastAPI(
    title="Vertical AI Factory API",
    description="다중 에이전트 기반 SQL 생성 시스템",
    version="1.0.0"
)

# CORS 설정 (SpacePro에서 호출 허용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request/Response 모델
class QueryRequest(BaseModel):
    question: str
    company_code: str = "BINARY"  # BINARY, DOU, DOU_MES
    provider: str = "gemini"       # gemini, ollama


class ScreenDesignRequest(BaseModel):
    text: str  # 자연어 화면 설계 요청


class AgentOutput(BaseModel):
    thought: Optional[str] = None
    plan: Optional[str] = None
    target_table: Optional[str] = None
    required_columns: Optional[list] = None
    filter_conditions: Optional[str] = None
    aggregation: Optional[str] = None
    sql_query: Optional[str] = None
    reasoning: Optional[str] = None
    explanation: Optional[str] = None
    validation_result: Optional[bool] = None
    security_passed: Optional[bool] = None
    efficiency_score: Optional[int] = None
    feedback: Optional[str] = None
    warnings: Optional[list] = None


class QueryResponse(BaseModel):
    status: str
    company_code: str = "BINARY"
    graph_context: Optional[str] = None
    analyst: Optional[dict] = None
    writer: Optional[dict] = None
    critic: Optional[dict] = None
    final_sql: Optional[str] = None
    execution_result: Optional[list] = None
    error: Optional[str] = None
    critique_count: int = 0
    provider: str = "gemini"


# 시작 시 DB 초기화
@app.on_event("startup")
async def startup_event():
    """서버 시작 시 DB 초기화"""
    if not os.getenv("GOOGLE_API_KEY"):
        print("⚠️  GOOGLE_API_KEY가 설정되지 않았습니다.")
        print("📝 .env 파일에 GOOGLE_API_KEY를 설정해주세요.")
    
    result = init_database()
    print(f"📦 Database 초기화: {result}")


@app.get("/")
async def root():
    """헬스 체크"""
    return {
        "service": "Vertical AI Factory",
        "status": "running",
        "version": "1.0.0"
    }


@app.get("/health")
async def health_check():
    """상태 확인"""
    api_key_set = bool(os.getenv("GOOGLE_API_KEY"))
    return {
        "status": "healthy",
        "api_key_configured": api_key_set
    }


@app.post("/api/query", response_model=QueryResponse)
async def process_query(request: QueryRequest):
    """
    사용자 질문을 처리하여 SQL 생성
    
    워크플로우:
    1. Analyst Agent: 질문 분석 및 Plan 수립
    2. Writer Agent: SQL 쿼리 생성
    3. Critic Agent: SQL 검증 (실패 시 최대 3회 재시도)
    """
    if not request.question.strip():
        raise HTTPException(status_code=400, detail="질문을 입력해주세요.")
    
    if not os.getenv("GOOGLE_API_KEY"):
        raise HTTPException(
            status_code=500, 
            detail="GOOGLE_API_KEY가 설정되지 않았습니다."
        )
    
    try:
        # LLM Provider 설정
        import os
        os.environ["LLM_PROVIDER"] = request.provider
        
        # 워크플로우 실행 (company_code 전달)
        result = run_workflow(request.question, request.company_code)
        
        # 응답 구성
        response = QueryResponse(
            status=result.get("status", "unknown"),
            company_code=request.company_code,
            graph_context=result.get("graph_context"),
            critique_count=result.get("critique_count", 0),
            final_sql=result.get("final_sql"),
            error=result.get("error"),
            provider=request.provider
        )
        
        # Analyst 결과
        if result.get("analyst_output"):
            analyst = result["analyst_output"]
            response.analyst = {
                "thought": analyst.thought,
                "plan": analyst.plan,
                "target_table": analyst.target_table,
                "required_columns": analyst.required_columns,
                "filter_conditions": analyst.filter_conditions,
                "aggregation": analyst.aggregation
            }
        
        # Writer 결과
        if result.get("writer_output"):
            writer = result["writer_output"]
            response.writer = {
                "sql_query": writer.sql_query,
                "reasoning": writer.reasoning,
                "explanation": writer.explanation
            }
        
        # Critic 결과
        if result.get("critic_output"):
            critic = result["critic_output"]
            response.critic = {
                "validation_result": critic.validation_result,
                "security_passed": critic.security_passed,
                "efficiency_score": critic.efficiency_score,
                "feedback": critic.feedback,
                "warnings": critic.warnings
            }
        
        # SQL 실행 결과 (성공 시)
        if result.get("final_sql"):
            try:
                query_result = execute_query(result["final_sql"])
                response.execution_result = query_result[:20]  # 최대 20개
            except Exception as e:
                response.execution_result = None
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============================================
# 그래프 시각화 API
# ============================================

@app.get("/api/graph/langgraph")
async def get_langgraph_visualization():
    """
    LangGraph 워크플로우를 Mermaid 다이어그램으로 반환
    """
    try:
        from application.graph import graph
        
        # LangGraph의 내장 Mermaid 출력 사용
        mermaid_code = graph.get_graph().draw_mermaid()
        
        return {
            "status": "success",
            "format": "mermaid",
            "diagram": mermaid_code,
            "description": "LangGraph 워크플로우: graph_context → analyst → writer → critic"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LangGraph 시각화 오류: {str(e)}")


@app.get("/api/graph/knowledge")
async def get_knowledge_graph_visualization():
    """
    Knowledge Graph를 D3.js Force Graph 호환 JSON으로 반환
    """
    try:
        from infrastructure.knowledge_graph import get_knowledge_graph
        from infrastructure.database.init_knowledge_graph import init_knowledge_graph
        
        kg = get_knowledge_graph()
        
        # Knowledge Graph가 초기화되지 않았으면 초기화
        if not kg.is_initialized:
            init_knowledge_graph(use_cache=True)
        
        # NetworkX 그래프를 D3.js 형식으로 변환
        nodes = []
        for node_id, attrs in kg.graph.nodes(data=True):
            # node_type 또는 type 속성 사용
            node_type = attrs.get("node_type") or attrs.get("type", "unknown")
            
            # 라벨 결정: standard_name, table_name, column_name 순으로 확인
            label = (attrs.get("standard_name") or 
                    attrs.get("table_name") or 
                    attrs.get("column_name") or 
                    attrs.get("label") or 
                    node_id.split(":")[-1] if ":" in node_id else node_id)
            
            nodes.append({
                "id": node_id,
                "label": label,
                "type": node_type,
                "category": attrs.get("category", ""),
                "company_code": attrs.get("company_code", ""),
                "schema": attrs.get("schema", ""),
                "data_type": attrs.get("data_type", ""),
            })
        
        links = []
        for source, target, attrs in kg.graph.edges(data=True):
            links.append({
                "source": source,
                "target": target,
                "type": attrs.get("edge_type") or attrs.get("type", ""),
                "label": attrs.get("label", "")
            })
        
        stats = kg.get_stats()
        
        return {
            "status": "success",
            "format": "d3_force",
            "nodes": nodes,
            "links": links,
            "stats": stats
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Knowledge Graph 시각화 오류: {str(e)}")


@app.get("/api/graph/extended")
async def get_extended_knowledge_graph_visualization():
    """
    확장 Knowledge Graph 정보 반환
    
    포함 정보:
    - UI 컴포넌트 매핑
    - JOIN 관계
    - 프로세스 흐름
    """
    try:
        from infrastructure.database.init_knowledge_graph import init_extended_knowledge_graph
        
        ekg = init_extended_knowledge_graph(use_cache=True)
        
        # UI 컴포넌트
        ui_components = ekg.get_all_ui_components()
        
        # JOIN 관계
        join_relations = ekg.get_all_join_relationships()
        
        # 프로세스
        processes = ekg.get_all_processes()
        process_flows = {}
        for proc in processes:
            process_flows[proc["id"]] = ekg.get_process_flow(proc["id"])
        
        # 통계
        stats = ekg.get_extended_stats()
        
        return {
            "status": "success",
            "ui_components": ui_components,
            "join_relations": join_relations,
            "processes": processes,
            "process_flows": process_flows,
            "stats": stats
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"확장 Knowledge Graph 오류: {str(e)}")


@app.get("/api/graph/ui-component")
async def get_ui_component_for_column(column_name: str, data_type: str = None):
    """
    컬럼명에 적합한 UI 컴포넌트 추천
    
    Args:
        column_name: 컬럼명
        data_type: 데이터 타입 (optional)
    """
    try:
        from infrastructure.database.init_knowledge_graph import init_extended_knowledge_graph
        
        ekg = init_extended_knowledge_graph(use_cache=True)
        result = ekg.get_ui_component(column_name, data_type)
        
        return {
            "status": "success",
            "column_name": column_name,
            "data_type": data_type,
            **result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"UI 컴포넌트 조회 오류: {str(e)}")


@app.get("/api/graph/join-sql")
async def generate_join_sql(tables: str, company_code: str = "BINARY"):
    """
    테이블 목록에서 자동으로 JOIN SQL 생성
    
    Args:
        tables: 콤마 구분 테이블명 (예: product_master,bom_master)
        company_code: 회사 코드
    """
    try:
        from infrastructure.database.init_knowledge_graph import init_extended_knowledge_graph
        
        ekg = init_extended_knowledge_graph(use_cache=True)
        table_list = [t.strip() for t in tables.split(",") if t.strip()]
        
        sql = ekg.generate_join_sql(table_list, company_code)
        
        return {
            "status": "success",
            "tables": table_list,
            "company_code": company_code,
            "sql": sql
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"JOIN SQL 생성 오류: {str(e)}")


@app.post("/api/screen/design")
async def design_screen_from_kg(request: ScreenDesignRequest):
    """
    Knowledge Graph 기반 화면 설계
    
    자연어 요청을 분석하여 RealGrid 형식의 화면 구조 JSON 생성
    
    Args:
        request.text: "도우회사의 생산실적 표현 화면 설계"
    
    Returns:
        {
            "status": "success",
            "parsed": {...},
            "related_nodes": {...},
            "context": {...},
            "screen": {...}
        }
    """
    try:
        from infrastructure.database.init_knowledge_graph import init_extended_knowledge_graph
        
        ekg = init_extended_knowledge_graph(use_cache=True)
        result = ekg.design_screen(request.text)
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"화면 설계 오류: {str(e)}")


@app.get("/api/graph/production-flow")
async def get_production_flow_visualization(yyyymm: str = "202410", scenario: str = "ACTUAL-2024"):
    """
    생산수불 공정 흐름을 Sankey 다이어그램 호환 JSON으로 반환
    
    Args:
        yyyymm: 기준년월 (YYYYMM)
        scenario: 시나리오 코드
    """
    try:
        import psycopg2
        from psycopg2.extras import RealDictCursor
        
        db_url = os.getenv(
            "POSTGRES_URL",
            "postgresql://roarm_m3:2024-merry-christmas@localhost:5432/ai_factory_db"
        )
        
        conn = psycopg2.connect(db_url)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        # 공정 마스터 조회 (순서대로)
        cursor.execute("""
            SELECT process_code, process_name, area_code, area_ord, process_type
            FROM bi_mst_process
            WHERE is_active = TRUE
            ORDER BY area_code, area_ord
        """)
        processes = cursor.fetchall()
        
        # 생산수불 조회
        cursor.execute("""
            SELECT 
                process_code, product_code,
                boh_qty, eoh_qty,
                new_input_qty, process_in_qty, process_out_qty,
                loss_qty, defect_out_qty, bonus_qty
            FROM bi_trx_prod_inventory
            WHERE inv_yyyymm = %s AND scenario_code = %s
            ORDER BY process_code
        """, (yyyymm, scenario))
        inventory = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        # Sankey 형식으로 변환
        nodes = []
        links = []
        node_index = {}
        
        # 노드 생성 (공정별)
        for i, p in enumerate(processes):
            node_id = p['process_code']
            nodes.append({
                "id": node_id,
                "name": p['process_name'],
                "area": p['area_code'],
                "order": p['area_ord'],
                "type": p['process_type']
            })
            node_index[node_id] = i
        
        # 외부 노드 추가
        ext_nodes = [
            {"id": "INPUT", "name": "원재료 투입", "area": "EXT", "order": 0, "type": "EXTERNAL"},
            {"id": "OUTPUT", "name": "완제품", "area": "EXT", "order": 99, "type": "EXTERNAL"},
            {"id": "LOSS", "name": "손실/불량", "area": "EXT", "order": 100, "type": "LOSS"}
        ]
        for n in ext_nodes:
            node_index[n['id']] = len(nodes)
            nodes.append(n)
        
        # 링크 생성 (공정간 흐름)
        for inv in inventory:
            proc = inv['process_code']
            
            # 신규 투입 (INPUT → 첫 공정)
            if float(inv['new_input_qty'] or 0) > 0:
                links.append({
                    "source": node_index.get("INPUT", 0),
                    "target": node_index.get(proc, 0),
                    "value": float(inv['new_input_qty']),
                    "type": "NEW_INPUT"
                })
            
            # 다음 공정으로 출고
            if float(inv['process_out_qty'] or 0) > 0:
                # 다음 공정 찾기
                next_proc = None
                for p in processes:
                    if p['process_code'] == proc:
                        curr_ord = p['area_ord']
                        curr_area = p['area_code']
                        for np in processes:
                            if np['area_code'] == curr_area and np['area_ord'] == curr_ord + 1:
                                next_proc = np['process_code']
                                break
                        break
                
                if next_proc and next_proc in node_index:
                    links.append({
                        "source": node_index.get(proc, 0),
                        "target": node_index.get(next_proc, 0),
                        "value": float(inv['process_out_qty']),
                        "type": "PROCESS_OUT"
                    })
                else:
                    # 마지막 공정 → OUTPUT
                    links.append({
                        "source": node_index.get(proc, 0),
                        "target": node_index.get("OUTPUT", 0),
                        "value": float(inv['process_out_qty']),
                        "type": "GOODS_OUT"
                    })
            
            # 손실
            loss_total = float(inv['loss_qty'] or 0) + float(inv['defect_out_qty'] or 0)
            if loss_total > 0:
                links.append({
                    "source": node_index.get(proc, 0),
                    "target": node_index.get("LOSS", 0),
                    "value": loss_total,
                    "type": "LOSS"
                })
        
        return {
            "status": "success",
            "format": "sankey",
            "yyyymm": yyyymm,
            "scenario": scenario,
            "data": {
                "nodes": nodes,
                "links": links
            },
            "stats": {
                "total_nodes": len(nodes),
                "total_links": len(links),
                "total_processes": len(processes),
                "inventory_records": len(inventory)
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"생산 흐름 시각화 오류: {str(e)}")


# 시각화 페이지 정적 파일 서빙
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

visualization_path = project_root / "visualization"
if visualization_path.exists():
    app.mount("/visualization", StaticFiles(directory=str(visualization_path), html=True), name="visualization")


if __name__ == "__main__":
    import uvicorn
    
    print("\n🏭 Vertical AI Factory API Server Starting...")
    print("📍 http://localhost:8100")
    print("📊 Visualization: http://localhost:8100/visualization/")
    print("📚 API Docs: http://localhost:8100/docs\n")
    
    uvicorn.run(
        "api_server:app",
        host="0.0.0.0",
        port=8100,
        reload=True
    )
