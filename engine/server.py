"""
AI Factory - FastAPI Server
웹 브라우저에서 PI 문서를 입력받아 화면 스키마와 코드를 생성하는 API 서버
"""

import sys
from pathlib import Path

# generator 모듈 import를 위한 경로 추가
sys.path.append(str(Path(__file__).parent.parent / 'generator'))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from generator import generate_code
import uvicorn
from typing import List, Optional
from datetime import datetime

# FastAPI 앱 생성
app = FastAPI(
    title="AI Factory Code Generator API",
    description="PI 문서에서 Vue 화면 코드를 자동 생성하는 API",
    version="1.0.0"
)

# CORS 설정 (Vue 개발 서버 8080에서 접근 허용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 도메인 허용 (운영 환경에서는 제한 필요)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request Body 모델
class GenerateRequest(BaseModel):
    piText: str

    model_config = {
        "json_schema_extra": {
            "example": {
                "piText": """
화면명: 제품별 원가 조회
화면ID: COST001

[검색조건]
- 제품코드 (필수)
- 사업부 (선택, 드롭다운)

[조회 결과]
- 제품코드
- 제품명
- 단위원가
"""
            }
        }
    }


# Response 모델
class FileInfo(BaseModel):
    filename: str
    code: str
    path: str


class GenerateResponse(BaseModel):
    success: bool
    message: str
    files: list[FileInfo]


@app.get("/")
async def root():
    """API 서버 상태 확인"""
    return {
        "status": "running",
        "service": "AI Factory Code Generator",
        "version": "1.0.0",
        "endpoints": {
            "generate": "POST /generate",
            "health": "GET /health"
        }
    }


@app.get("/health")
async def health_check():
    """헬스 체크 엔드포인트"""
    return {"status": "healthy"}


@app.post("/generate", response_model=GenerateResponse)
async def generate_screen_code(request: GenerateRequest):
    """
    PI 문서를 받아서 화면 코드를 생성합니다.
    
    - **piText**: PI 문서 텍스트
    
    Returns:
        - success: 성공 여부
        - message: 결과 메시지
        - files: 생성된 파일 리스트
    """
    try:
        # PI 텍스트 검증
        if not request.piText or request.piText.strip() == "":
            raise HTTPException(
                status_code=400,
                detail="PI 문서 텍스트가 비어있습니다."
            )
        
        # 코드 생성
        files = generate_code(request.piText)
        
        # 응답 생성
        return GenerateResponse(
            success=True,
            message=f"{len(files)}개 파일이 성공적으로 생성되었습니다.",
            files=[FileInfo(**file_info) for file_info in files]
        )
        
    except ValueError as e:
        # JSON 파싱 오류 등
        raise HTTPException(
            status_code=400,
            detail=f"입력 데이터 오류: {str(e)}"
        )
    except RuntimeError as e:
        # Gemini API 오류 등
        raise HTTPException(
            status_code=500,
            detail=f"코드 생성 중 오류 발생: {str(e)}"
        )
    except Exception as e:
        # 기타 예상치 못한 오류
        raise HTTPException(
            status_code=500,
            detail=f"서버 내부 오류: {str(e)}"
        )


if __name__ == "__main__":
    print("=" * 60)
    print("🚀 AI Factory API Server Starting...")
    print("=" * 60)
    print(f"📍 Server: http://localhost:8000")
    print(f"📖 API Docs: http://localhost:8000/docs")
    print(f"🔧 ReDoc: http://localhost:8000/redoc")
    print("=" * 60)
    
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # 개발 모드: 코드 변경시 자동 재시작
        log_level="info"
    )


# ===== 임시 메뉴 관리 API =====
# Spring Boot 백엔드가 준비될 때까지 사용하는 임시 API

class MenuDto(BaseModel):
    menuId: str
    upMenuId: Optional[str] = None
    menuName: str
    menuUrl: Optional[str] = None
    sortNo: int = 99
    useYn: str = "Y"
    iconCls: Optional[str] = None
    regDt: Optional[str] = None
    children: List['MenuDto'] = []

# 임시 메뉴 데이터 (메모리 저장)
temp_menus = [
    {
        "menuId": "M001",
        "upMenuId": None,
        "menuName": "시스템 관리",
        "menuUrl": None,
        "sortNo": 1,
        "useYn": "Y",
        "iconCls": "bi-gear",
        "regDt": "2025-01-29"
    },
    {
        "menuId": "M001-01",
        "upMenuId": "M001",
        "menuName": "메뉴 관리",
        "menuUrl": "/admin/menu-generator",
        "sortNo": 1,
        "useYn": "Y",
        "iconCls": "bi-list-ul",
        "regDt": "2025-01-29"
    },
    {
        "menuId": "M001-02",
        "upMenuId": "M001",
        "menuName": "화면 생성기",
        "menuUrl": "/admin/screen-generator",
        "sortNo": 2,
        "useYn": "Y",
        "iconCls": "bi-magic",
        "regDt": "2025-01-29"
    },
    {
        "menuId": "M002",
        "upMenuId": None,
        "menuName": "원가 관리",
        "menuUrl": None,
        "sortNo": 2,
        "useYn": "Y",
        "iconCls": "bi-calculator",
        "regDt": "2025-01-29"
    },
    {
        "menuId": "M002-01",
        "upMenuId": "M002",
        "menuName": "제품별 원가",
        "menuUrl": "/standard/COST001",
        "sortNo": 1,
        "useYn": "Y",
        "iconCls": "bi-box",
        "regDt": "2025-01-29"
    },
    {
        "menuId": "M002-02",
        "upMenuId": "M002",
        "menuName": "부서별 원가",
        "menuUrl": "/standard/COST002",
        "sortNo": 2,
        "useYn": "Y",
        "iconCls": "bi-building",
        "regDt": "2025-01-29"
    }
]

@app.get("/api/system/menu/tree")
async def get_menu_tree():
    """메뉴 트리 조회 (임시 API)"""
    def build_tree(flat_list):
        menu_map = {}
        roots = []
        
        # 맵 생성
        for menu in flat_list:
            menu_map[menu["menuId"]] = {**menu, "children": []}
        
        # 부모-자식 연결
        for menu in flat_list:
            node = menu_map[menu["menuId"]]
            if menu["upMenuId"] and menu["upMenuId"] in menu_map:
                menu_map[menu["upMenuId"]]["children"].append(node)
            else:
                roots.append(node)
        
        # 정렬
        def sort_tree(nodes):
            nodes.sort(key=lambda x: x["sortNo"])
            for node in nodes:
                if node["children"]:
                    sort_tree(node["children"])
        
        sort_tree(roots)
        return roots
    
    return build_tree(temp_menus)

@app.post("/api/system/menu")
async def add_menu(menu: dict):
    """메뉴 추가 (임시 API)"""
    menu["regDt"] = datetime.now().strftime("%Y-%m-%d")
    temp_menus.append(menu)
    return {"success": True, "message": "메뉴가 추가되었습니다.", "menuId": menu["menuId"]}

@app.put("/api/system/menu")
async def update_menu(menu: dict):
    """메뉴 수정 (임시 API)"""
    for i, m in enumerate(temp_menus):
        if m["menuId"] == menu["menuId"]:
            temp_menus[i] = {**menu, "regDt": m["regDt"]}
            return {"success": True, "message": "메뉴가 수정되었습니다."}
    return {"success": False, "message": "메뉴를 찾을 수 없습니다."}

@app.delete("/api/system/menu/{menuId}")
async def delete_menu(menuId: str):
    """메뉴 삭제 (임시 API)"""
    global temp_menus
    temp_menus = [m for m in temp_menus if m["menuId"] != menuId]
    return {"success": True, "message": "메뉴가 삭제되었습니다."}
