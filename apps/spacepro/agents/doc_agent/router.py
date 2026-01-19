"""
문서 Agent - 변경이력/매뉴얼 자동 생성
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

router = APIRouter()


class ChangeLogEntry(BaseModel):
    """변경 이력 항목"""
    date: str
    author: str
    type: str  # feature, bugfix, refactor
    description: str
    files: List[str] = []


class ChangeLogRequest(BaseModel):
    """변경 이력 생성 요청"""
    entries: List[ChangeLogEntry]
    version: str
    project_name: str = "SpacePro"


class ManualRequest(BaseModel):
    """매뉴얼 생성 요청"""
    screen_name: str
    screen_path: str
    features: List[str]
    columns: Optional[List[dict]] = None


class ReleaseNoteRequest(BaseModel):
    """릴리즈 노트 생성 요청"""
    version: str
    release_date: str
    features: List[str] = []
    bugfixes: List[str] = []
    breaking_changes: List[str] = []


@router.post("/changelog")
async def generate_changelog(request: ChangeLogRequest):
    """변경 이력 마크다운 생성"""
    
    md = f"# {request.project_name} 변경 이력\n\n"
    md += f"## v{request.version}\n\n"
    
    for entry in request.entries:
        type_emoji = {
            "feature": "✨",
            "bugfix": "🐛",
            "refactor": "♻️",
            "docs": "📝",
        }.get(entry.type, "📌")
        
        md += f"### {type_emoji} {entry.description}\n"
        md += f"- **날짜**: {entry.date}\n"
        md += f"- **작성자**: {entry.author}\n"
        
        if entry.files:
            md += f"- **수정 파일**:\n"
            for f in entry.files:
                md += f"  - `{f}`\n"
        
        md += "\n"
    
    return {
        "success": True,
        "markdown": md,
        "filename": f"CHANGELOG_{request.version}.md",
    }


@router.post("/manual")
async def generate_manual(request: ManualRequest):
    """화면 매뉴얼 생성"""
    
    md = f"# {request.screen_name} 사용자 매뉴얼\n\n"
    md += f"**경로**: `{request.screen_path}`\n\n"
    md += "---\n\n"
    
    md += "## 1. 화면 개요\n\n"
    md += f"{request.screen_name} 화면은 다음 기능을 제공합니다:\n\n"
    
    for feature in request.features:
        md += f"- {feature}\n"
    
    md += "\n## 2. 기능 설명\n\n"
    
    if "조회" in request.features or "검색" in " ".join(request.features):
        md += "### 2.1 조회\n"
        md += "1. 검색 조건을 입력합니다.\n"
        md += "2. [조회] 버튼을 클릭합니다.\n"
        md += "3. 그리드에 결과가 표시됩니다.\n\n"
    
    if "추가" in request.features or "등록" in " ".join(request.features):
        md += "### 2.2 신규 등록\n"
        md += "1. [추가] 버튼을 클릭합니다.\n"
        md += "2. 빈 행에 데이터를 입력합니다.\n"
        md += "3. [저장] 버튼을 클릭합니다.\n\n"
    
    if "수정" in request.features:
        md += "### 2.3 수정\n"
        md += "1. 수정할 셀을 더블클릭합니다.\n"
        md += "2. 값을 수정합니다.\n"
        md += "3. [저장] 버튼을 클릭합니다.\n\n"
    
    if "삭제" in request.features:
        md += "### 2.4 삭제\n"
        md += "1. 삭제할 행을 체크합니다.\n"
        md += "2. [삭제] 버튼을 클릭합니다.\n"
        md += "3. 확인 메시지에서 [확인]을 클릭합니다.\n\n"
    
    if request.columns:
        md += "## 3. 필드 설명\n\n"
        md += "| 필드명 | 설명 | 필수 |\n"
        md += "|--------|------|------|\n"
        for col in request.columns:
            required = "✅" if col.get("required") else ""
            md += f"| {col.get('label', col.get('name'))} | - | {required} |\n"
    
    md += f"\n---\n\n*생성일시: {datetime.now().strftime('%Y-%m-%d %H:%M')}*\n"
    
    return {
        "success": True,
        "markdown": md,
        "filename": f"MANUAL_{request.screen_path.replace('/', '_')}.md",
    }


@router.post("/release-note")
async def generate_release_note(request: ReleaseNoteRequest):
    """릴리즈 노트 생성"""
    
    md = f"# 릴리즈 노트 v{request.version}\n\n"
    md += f"**릴리즈 일자**: {request.release_date}\n\n"
    md += "---\n\n"
    
    if request.features:
        md += "## ✨ 신규 기능\n\n"
        for f in request.features:
            md += f"- {f}\n"
        md += "\n"
    
    if request.bugfixes:
        md += "## 🐛 버그 수정\n\n"
        for b in request.bugfixes:
            md += f"- {b}\n"
        md += "\n"
    
    if request.breaking_changes:
        md += "## ⚠️ Breaking Changes\n\n"
        for bc in request.breaking_changes:
            md += f"- {bc}\n"
        md += "\n"
    
    return {
        "success": True,
        "markdown": md,
        "filename": f"RELEASE_v{request.version}.md",
    }
