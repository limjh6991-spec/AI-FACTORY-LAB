#!/usr/bin/env tsx
/**
 * 정규식 패턴 테스트
 */

const chunkText = `테이블: 부서원가

한글 컬럼명으로 검색:
yyyymm → yyyymm (character varying)
sel코드 → sel_code (character varying)
site → site (character varying)
코스트센터 → 코스트센터 (character varying)`;

const pattern1 = /컬럼명:\s*([^(]+)\s*\(([^)]+)\)/g;
const pattern2 = /([^→\n]+)\s*→\s*(\w+)\s*\(([^)]+)\)/g;

console.log('=== 패턴 1 (컬럼명:) 테스트 ===');
let match1;
while ((match1 = pattern1.exec(chunkText)) !== null) {
  console.log(`발견: "${match1[1].trim()}" → "${match1[2].trim()}"`);
}

console.log('\n=== 패턴 2 (→) 테스트 ===');
let match2;
while ((match2 = pattern2.exec(chunkText)) !== null) {
  console.log(`발견: "${match2[1]?.trim()}" → "${match2[2]?.trim()}"`);
}

console.log('\n=== 유사도 계산 테스트 ===');
function calculateSimilarity(str1: string, str2: string): number {
  const norm1 = str1.toLowerCase().trim();
  const norm2 = str2.toLowerCase().trim();
  
  if (norm1 === norm2) return 1.0;
  if (norm1.includes(norm2) || norm2.includes(norm1)) return 0.8;
  
  const set1 = new Set(norm1.split(''));
  const set2 = new Set(norm2.split(''));
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  
  return intersection.size / union.size;
}

const excelColumn = '부서코드';
const candidates = ['yyyymm', 'sel코드', 'site', '코스트센터'];

candidates.forEach(candidate => {
  const score = calculateSimilarity(excelColumn, candidate);
  console.log(`"${excelColumn}" vs "${candidate}" = ${(score * 100).toFixed(1)}%`);
});
