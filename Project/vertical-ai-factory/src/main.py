#!/usr/bin/env python3
"""
Vertical AI Factory - Main Entrypoint

다중 에이전트 시스템 실행
- Analyst: 질문 분석 및 Plan 수립
- Writer: SQL 쿼리 생성
- Critic: SQL 검증 및 피드백
"""

import os
import sys
from pathlib import Path

# 프로젝트 루트를 path에 추가
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

from dotenv import load_dotenv
from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.syntax import Syntax
from rich import print as rprint

from infrastructure.database import init_database, execute_query
from application.graph import run_workflow


# Rich 콘솔
console = Console()


def print_banner():
    """배너 출력"""
    banner = """
╔═══════════════════════════════════════════════╗
║       🏭 Vertical AI Factory                  ║
║       Multi-Agent SQL Generator               ║
╚═══════════════════════════════════════════════╝
    """
    console.print(banner, style="bold cyan")


def print_result(result: dict):
    """결과 출력"""
    
    # 상태 표시
    status = result.get("status", "unknown")
    if status == "completed":
        console.print("\n✅ [bold green]워크플로우 완료![/]")
    elif status == "error":
        console.print(f"\n❌ [bold red]오류 발생: {result.get('error')}[/]")
        return
    else:
        console.print(f"\n⚠️ [yellow]상태: {status}[/]")
    
    # Analyst 결과
    if result.get("analyst_output"):
        analyst = result["analyst_output"]
        console.print(Panel(
            f"[bold]사고 과정:[/] {analyst.thought}\n\n"
            f"[bold]대상 테이블:[/] {analyst.target_table}\n"
            f"[bold]필요 컬럼:[/] {', '.join(analyst.required_columns)}\n"
            f"[bold]필터 조건:[/] {analyst.filter_conditions or '없음'}\n"
            f"[bold]집계:[/] {analyst.aggregation or '없음'}\n\n"
            f"[bold cyan]실행 계획:[/]\n{analyst.plan}",
            title="🔍 Analyst Agent",
            border_style="blue"
        ))
    
    # Writer 결과
    if result.get("writer_output"):
        writer = result["writer_output"]
        console.print(Panel(
            f"[bold]추론:[/] {writer.reasoning}\n\n"
            f"[bold]설명:[/] {writer.explanation}\n\n"
            f"[bold cyan]생성된 SQL:[/]",
            title="✍️ Writer Agent",
            border_style="green"
        ))
        console.print(Syntax(writer.sql_query, "sql", theme="monokai", line_numbers=True))
    
    # Critic 결과
    if result.get("critic_output"):
        critic = result["critic_output"]
        validation = "✅ 통과" if critic.validation_result else "❌ 실패"
        security = "✅" if critic.security_passed else "❌"
        
        table = Table(title="검증 결과", show_header=False)
        table.add_row("검증 결과", validation)
        table.add_row("보안 검사", security)
        table.add_row("효율성 점수", "⭐" * critic.efficiency_score)
        
        if critic.warnings:
            table.add_row("경고", "\n".join(critic.warnings))
        
        console.print(Panel(table, title="🔒 Critic Agent", border_style="yellow"))
        console.print(f"[dim]피드백: {critic.feedback}[/]")
    
    # 재시도 횟수
    if result.get("critique_count", 0) > 0:
        console.print(f"\n[dim]재시도 횟수: {result['critique_count']}회[/]")
    
    # 최종 SQL
    if result.get("final_sql"):
        console.print(Panel(
            Syntax(result["final_sql"], "sql", theme="monokai"),
            title="🎯 최종 승인된 SQL",
            border_style="bold green"
        ))
        
        # SQL 실행 결과 (옵션)
        try:
            query_result = execute_query(result["final_sql"])
            if query_result:
                result_table = Table(title="📊 쿼리 실행 결과")
                
                # 첫 번째 행에서 컬럼명 추출
                if query_result:
                    for key in query_result[0].keys():
                        result_table.add_column(key)
                    
                    for row in query_result[:10]:  # 최대 10개만 표시
                        result_table.add_row(*[str(v) for v in row.values()])
                
                console.print(result_table)
        except Exception as e:
            console.print(f"[dim]쿼리 실행 오류: {e}[/]")


def main():
    """메인 함수"""
    # 환경 변수 로드
    env_path = project_root.parent / ".env"
    load_dotenv(env_path)
    
    # API 키 확인
    if not os.getenv("GOOGLE_API_KEY"):
        console.print("[bold red]⚠️  GOOGLE_API_KEY가 설정되지 않았습니다.[/]")
        console.print("[dim].env 파일에 GOOGLE_API_KEY를 설정해주세요.[/]")
        console.print("[dim]Google AI Studio에서 발급: https://aistudio.google.com/apikey[/]")
        sys.exit(1)
    
    print_banner()
    
    # DB 초기화
    console.print("[dim]📦 Database 초기화...[/]")
    init_result = init_database()
    console.print(f"[dim]{init_result}[/]\n")
    
    # 테스트 질문들
    test_questions = [
        "10월달 식비가 얼마나 나왔어?",
        # "카테고리별 총 지출을 알려줘",
        # "가장 비싼 지출 3개를 보여줘",
    ]
    
    for question in test_questions:
        console.print(Panel(
            f"[bold]{question}[/]",
            title="💬 사용자 질문",
            border_style="magenta"
        ))
        
        # 워크플로우 실행
        with console.status("[bold cyan]AI 에이전트 실행 중...[/]"):
            result = run_workflow(question)
        
        # 결과 출력
        print_result(result)
        console.print("\n" + "=" * 60 + "\n")


if __name__ == "__main__":
    main()
