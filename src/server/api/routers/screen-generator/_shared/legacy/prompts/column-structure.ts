/**
 * 컬럼 구조 설명 생성 (LLM 프롬프트용)
 */
export function buildColumnStructureDescription(gridColumns: any): string {
  const { row2, row3, merges } = gridColumns;
  
  // 병합 정보로 그룹 헤더 맵 생성
  const groupMap = new Map<number, string>();
  for (const merge of merges || []) {
    if (merge.startRow === 1 && merge.endRow === 1 && merge.startCol !== merge.endCol) {
      const header = row2[merge.startCol]?.toString().trim();
      if (header) {
        for (let c = merge.startCol; c <= merge.endCol; c++) {
          groupMap.set(c, header);
        }
      }
    }
  }
  
  // 컬럼 목록 생성
  const columns: string[] = [];
  let currentGroup = "";
  
  for (let col = 0; col < row3.length; col++) {
    const group = groupMap.get(col) || "";
    const detail = row3[col]?.toString().trim() || row2[col]?.toString().trim();
    
    if (!detail) continue;
    
    if (group && group !== currentGroup) {
      currentGroup = group;
      columns.push(`\n[그룹: ${group}]`);
    }
    
    if (group) {
      columns.push(`  - ${detail}`);
    } else {
      columns.push(`- ${detail} (단일 컬럼)`);
    }
  }
  
  return columns.join("\n");
}
