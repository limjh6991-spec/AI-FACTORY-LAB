"""
테스트: ExtendedKnowledgeGraph 검증

사용법:
    cd apps/vertical-ai-factory/src
    ../venv/bin/python -m infrastructure.test_knowledge_graph_extended
"""

from rich.console import Console
from rich.table import Table
from rich.panel import Panel

from infrastructure.database.init_knowledge_graph import init_knowledge_graph
from infrastructure.knowledge_graph_extended import (
    get_extended_knowledge_graph,
    reset_extended_knowledge_graph
)


def main():
    console = Console()
    
    console.print("\n[bold blue]🧪 ExtendedKnowledgeGraph 테스트[/bold blue]\n")
    
    # 1. 기본 KG 초기화
    console.print("[cyan]1. 기본 Knowledge Graph 초기화[/cyan]")
    kg = init_knowledge_graph(use_cache=True)
    
    # 2. 확장 KG 초기화
    console.print("\n[cyan]2. 확장 Knowledge Graph 초기화[/cyan]")
    reset_extended_knowledge_graph()
    ekg = get_extended_knowledge_graph(kg, inject_defaults=True)
    
    # 3. 통계 출력
    console.print("\n[cyan]3. 확장 그래프 통계[/cyan]")
    stats = ekg.get_extended_stats()
    
    stats_table = Table(title="Extended Graph Statistics")
    stats_table.add_column("Metric", style="cyan")
    stats_table.add_column("Value", style="green")
    
    for key, value in stats.items():
        stats_table.add_row(key, str(value))
    
    console.print(stats_table)
    
    # 4. UI 컴포넌트 테스트
    console.print("\n[cyan]4. UI 컴포넌트 매핑 테스트[/cyan]")
    test_columns = [
        ("order_date", None),
        ("use_yn", None),
        ("product_code", None),
        ("order_amount", None),
        ("input_qty", None),
        ("memo", None),
        ("random_field", "VARCHAR"),
        ("some_field", "DATE"),
    ]
    
    ui_table = Table(title="Column → UI Component Mapping")
    ui_table.add_column("Column", style="cyan")
    ui_table.add_column("Data Type", style="yellow")
    ui_table.add_column("Component", style="green")
    ui_table.add_column("Matched By", style="magenta")
    
    for col, dtype in test_columns:
        result = ekg.get_ui_component(col, dtype)
        ui_table.add_row(
            col, 
            dtype or "-",
            result["component"],
            result.get("matched_by", "-")
        )
    
    console.print(ui_table)
    
    # 5. JOIN 관계 테스트
    console.print("\n[cyan]5. JOIN 관계 테스트[/cyan]")
    joins = ekg.get_all_join_relationships()
    
    if joins:
        join_table = Table(title="Registered JOIN Relationships")
        join_table.add_column("Source", style="cyan")
        join_table.add_column("Target", style="cyan")
        join_table.add_column("Source Col", style="yellow")
        join_table.add_column("Target Col", style="yellow")
        join_table.add_column("Type", style="green")
        
        for j in joins:
            join_table.add_row(
                j["source_table"],
                j["target_table"],
                j["source_column"],
                j["target_column"],
                j["join_type"]
            )
        
        console.print(join_table)
    else:
        console.print("[yellow]  등록된 JOIN 관계가 없습니다.[/yellow]")
    
    # 6. 프로세스 테스트
    console.print("\n[cyan]6. 프로세스 흐름 테스트[/cyan]")
    processes = ekg.get_all_processes()
    
    for proc in processes:
        console.print(f"\n[bold green]📋 {proc['name']}[/bold green] ({proc['category']})")
        
        activities = ekg.get_process_flow(proc["id"])
        for act in activities:
            tables_str = ", ".join(act.get("tables", []))
            console.print(f"  {act['sequence']}. {act['name']}")
            if tables_str:
                console.print(f"     └─ Tables: {tables_str}")
    
    # 7. SQL 생성 테스트
    console.print("\n[cyan]7. JOIN SQL 생성 테스트[/cyan]")
    
    # 테이블이 있는 경우에만 테스트
    test_cases = [
        (["product_master"], "BINARY"),
        (["product_master", "bom_master"], "BINARY"),
    ]
    
    for tables, company in test_cases:
        sql = ekg.generate_join_sql(tables, company)
        console.print(Panel(
            sql if sql else "(테이블 매핑 없음)",
            title=f"Tables: {tables}, Company: {company}",
            border_style="blue"
        ))
    
    console.print("\n[bold green]✅ 테스트 완료![/bold green]\n")


if __name__ == "__main__":
    main()
