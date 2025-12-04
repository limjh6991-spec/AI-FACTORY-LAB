/**
 * 🧪 실제 Excel 생성 테스트 (DB 연결)
 * 
 * Purpose: tRPC API를 통해 실제 Excel 파일 생성 테스트
 * Usage: npx tsx scripts/test_excel_generation_with_db.ts
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

// tRPC 클라이언트 직접 호출 대신 HTTP 요청 사용
async function testExcelGeneration() {
  console.log('🤖 Excel 보고서 생성 테스트 (실제 DB 연결)\n');
  console.log('=' .repeat(80));

  const reportRequests = [
    {
      reportName: '부서별 원가 분석',
      description: '부서별 단위원가와 총원가를 분석한 보고서'
    }
  ];

  for (const request of reportRequests) {
    console.log(`\n📊 테스트: ${request.reportName}`);
    console.log('-'.repeat(80));

    try {
      // Agent Excel Generator로 보고서 설계
      const { AgentExcelGenerator } = await import('../src/lib/agent-excel-generator');
      const generator = new AgentExcelGenerator();
      await generator.initialize();

      const design = await generator.generateReportDesign(request);
      
      console.log('\n✅ Agent 설계 완료!');
      console.log(`컬럼 수: ${design.columns.length}`);
      console.log(`테이블: ${design.tables.join(', ')}`);
      console.log('\nSQL 쿼리:');
      console.log('```sql');
      console.log(design.sqlQuery);
      console.log('```');

      // SQL 검증 - 큰따옴표 확인
      const hasQuotes = design.sqlQuery.includes('"');
      console.log(`\n✓ SQL 큰따옴표 사용: ${hasQuotes ? '✅' : '❌'}`);

      if (!hasQuotes) {
        console.log('⚠️  경고: SQL에 큰따옴표가 없습니다. PostgreSQL 오류 발생 가능!');
      }

      // DB 연결 테스트를 위한 Prisma 사용
      console.log('\n🔍 DB 연결 테스트...');
      const { PrismaClient } = await import('../generated/prisma/index.js');
      const prisma = new PrismaClient();

      try {
        // SQL 실행
        const data = await prisma.$queryRawUnsafe<Record<string, any>[]>(
          design.sqlQuery
        );
        
        console.log(`✅ SQL 실행 성공! 조회된 행: ${data.length}개`);
        
        if (data.length > 0) {
          console.log('\n📊 첫 번째 행 샘플:');
          // BigInt를 문자열로 변환
          const sample = JSON.parse(
            JSON.stringify(data[0], (key, value) =>
              typeof value === 'bigint' ? value.toString() : value
            )
          );
          console.log(JSON.stringify(sample, null, 2));
        }

        // Excel 파일 생성
        console.log('\n📁 Excel 파일 생성 중...');
        const excelBuffer = generator.createExcelBuffer(design, data);
        
        const filePath = join(
          process.cwd(),
          'data',
          `test_${request.reportName.replace(/\s+/g, '_')}_${Date.now()}.xlsx`
        );
        
        writeFileSync(filePath, excelBuffer);
        console.log(`✅ Excel 파일 생성 완료: ${filePath}`);
        console.log(`   파일 크기: ${(excelBuffer.length / 1024).toFixed(2)} KB`);

      } catch (dbError) {
        console.error('❌ DB 실행 오류:', dbError instanceof Error ? dbError.message : dbError);
        
        // SQL 디버깅 정보
        console.log('\n🔍 SQL 디버깅:');
        const lines = design.sqlQuery.split('\n');
        lines.forEach((line, idx) => {
          console.log(`${idx + 1}: ${line}`);
        });
      } finally {
        await prisma.$disconnect();
      }

    } catch (error) {
      console.error('\n❌ 테스트 실패:', error instanceof Error ? error.message : error);
    }
  }

  console.log('\n\n✅ 모든 테스트 완료!');
}

testExcelGeneration().catch(console.error);
