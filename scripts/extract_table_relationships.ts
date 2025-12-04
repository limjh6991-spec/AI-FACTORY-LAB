#!/usr/bin/env tsx
/**
 * 테이블 관계 자동 추출
 * - PostgreSQL Foreign Key 정보 추출
 * - 컬럼명 기반 암시적 관계 추론
 * - 메타데이터에 관계 정보 추가
 */

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface Relationship {
  fromTable: string;
  fromColumn: string;
  toTable: string;
  toColumn: string;
  type: 'FK' | 'INFERRED';
  confidence: number;
}

async function extractForeignKeys(): Promise<Relationship[]> {
  console.log('🔍 Foreign Key 관계 추출 중...\n');
  
  const fks = await prisma.$queryRaw<any[]>`
    SELECT
      tc.table_name AS from_table,
      kcu.column_name AS from_column,
      ccu.table_name AS to_table,
      ccu.column_name AS to_column
    FROM information_schema.table_constraints AS tc
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
    WHERE tc.constraint_type = 'FOREIGN KEY'
      AND tc.table_schema = 'public'
      AND tc.table_name LIKE 'doi_%'
  `;
  
  console.log(`✅ 발견된 FK: ${fks.length}개\n`);
  
  return fks.map(fk => ({
    fromTable: fk.from_table,
    fromColumn: fk.from_column,
    toTable: fk.to_table,
    toColumn: fk.to_column,
    type: 'FK',
    confidence: 100
  }));
}

async function inferRelationships(): Promise<Relationship[]> {
  console.log('🧠 암시적 관계 추론 중...\n');
  
  // db_metadata_enhanced.json 로드
  const metadataPath = path.join(process.cwd(), 'data', 'db_metadata_enhanced.json');
  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
  
  const relationships: Relationship[] = [];
  const doiTables = metadata.filter((t: any) => t.name.startsWith('doi_'));
  
  // 컬럼명 기반 관계 추론
  for (const table of doiTables) {
    for (const column of table.columns) {
      // CODE, 코드로 끝나는 컬럼 찾기
      if (column.name.match(/(CODE|코드)$/i)) {
        // 다른 테이블에서 매칭되는 PK 찾기
        for (const targetTable of doiTables) {
          if (targetTable.name === table.name) continue;
          
          const pkColumn = targetTable.columns.find((c: any) => 
            c.name === column.name || 
            c.korean_name === column.korean_name
          );
          
          if (pkColumn) {
            relationships.push({
              fromTable: table.name,
              fromColumn: column.name,
              toTable: targetTable.name,
              toColumn: pkColumn.name,
              type: 'INFERRED',
              confidence: 70
            });
          }
        }
      }
    }
  }
  
  console.log(`✅ 추론된 관계: ${relationships.length}개\n`);
  
  return relationships;
}

async function main() {
  console.log('='.repeat(70));
  console.log('🔗 테이블 관계 추출');
  console.log('='.repeat(70) + '\n');
  
  // 1. FK 추출
  const fkRelationships = await extractForeignKeys();
  
  // 2. 암시적 관계 추론
  const inferredRelationships = await inferRelationships();
  
  // 3. 결합
  const allRelationships = [...fkRelationships, ...inferredRelationships];
  
  // 4. 저장
  const outputPath = path.join(process.cwd(), 'data', 'table_relationships.json');
  fs.writeFileSync(
    outputPath,
    JSON.stringify(allRelationships, null, 2),
    'utf-8'
  );
  
  console.log('\n' + '='.repeat(70));
  console.log('✅ 관계 추출 완료');
  console.log('='.repeat(70));
  console.log(`📁 저장 위치: ${outputPath}`);
  console.log(`📊 총 관계 수: ${allRelationships.length}개`);
  console.log(`   - FK: ${fkRelationships.length}개`);
  console.log(`   - 추론: ${inferredRelationships.length}개`);
  
  // 5. 샘플 출력
  console.log('\n📋 샘플 관계:');
  allRelationships.slice(0, 5).forEach((rel, i) => {
    console.log(`  ${i+1}. ${rel.fromTable}.${rel.fromColumn} → ${rel.toTable}.${rel.toColumn}`);
    console.log(`     타입: ${rel.type}, 신뢰도: ${rel.confidence}%`);
  });
  
  await prisma.$disconnect();
}

main().catch(console.error);
