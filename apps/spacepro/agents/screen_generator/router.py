"""
화면 생성 Agent - RealGrid CRUD 화면 자동 생성
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
import os
from jinja2 import Environment, FileSystemLoader

router = APIRouter()

# 템플릿 로더 설정
template_dir = os.path.join(os.path.dirname(__file__), "templates")
jinja_env = Environment(loader=FileSystemLoader(template_dir))


class ColumnDef(BaseModel):
    """컬럼 정의"""
    name: str
    label: str
    type: str = "text"  # text, number, date, select
    width: int = 100
    editable: bool = True
    required: bool = False


class ScreenRequest(BaseModel):
    """화면 생성 요청"""
    table_name: str
    screen_name: str
    screen_path: str  # 예: /master/item
    columns: List[ColumnDef]
    screen_type: str = "crud"  # crud, list, form
    use_search: bool = True
    use_pagination: bool = True


class ScreenResponse(BaseModel):
    """화면 생성 응답"""
    success: bool
    page_tsx: str
    api_route: Optional[str] = None
    message: str


@router.post("/generate", response_model=ScreenResponse)
async def generate_screen(request: ScreenRequest):
    """
    RealGrid 기반 CRUD 화면 생성
    
    - table_name: DB 테이블명 (예: tb_item_mst)
    - screen_name: 화면명 (예: 품목 관리)
    - screen_path: 라우트 경로 (예: /master/item)
    - columns: 컬럼 정의 배열
    """
    try:
        # 템플릿 렌더링
        template = jinja_env.get_template("realgrid_crud.tsx.jinja2")
        
        page_tsx = template.render(
            table_name=request.table_name,
            screen_name=request.screen_name,
            screen_path=request.screen_path,
            columns=request.columns,
            use_search=request.use_search,
            use_pagination=request.use_pagination,
        )
        
        # API 라우트 생성
        api_template = jinja_env.get_template("api_route.ts.jinja2")
        api_route = api_template.render(
            table_name=request.table_name,
            columns=request.columns,
        )
        
        return ScreenResponse(
            success=True,
            page_tsx=page_tsx,
            api_route=api_route,
            message=f"'{request.screen_name}' 화면이 생성되었습니다."
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/templates")
async def list_templates():
    """사용 가능한 템플릿 목록"""
    return {
        "templates": [
            {"id": "crud", "name": "CRUD 화면", "description": "조회/추가/수정/삭제"},
            {"id": "list", "name": "목록 화면", "description": "조회 전용"},
            {"id": "form", "name": "입력 화면", "description": "폼 기반 입력"},
        ]
    }


@router.post("/preview")
async def preview_screen(request: ScreenRequest):
    """화면 미리보기 (코드 생성 전 확인)"""
    return {
        "table_name": request.table_name,
        "screen_name": request.screen_name,
        "column_count": len(request.columns),
        "features": {
            "search": request.use_search,
            "pagination": request.use_pagination,
            "crud": request.screen_type == "crud",
        }
    }
