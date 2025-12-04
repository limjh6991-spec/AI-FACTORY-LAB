#!/usr/bin/env tsx
/**
 * 🔍 MSSQL DB 메타데이터 수집 스크립트
 * 
 * 도우제조MES시스템TEST 데이터베이스에서 테이블/컬럼 정보 수집
 * PostgreSQL에 없는 테이블 분석
 */

import sql from 'mssql';
import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// MSSQL 연결 설정
// ============================================================================

const mssqlConfig: sql.config = {
  server: '172.16.200.204',
  port: 1433,
  database: '도우제조MES시스템TEST',
  user: 'TEST_MES_USER',
  password: 'Dowoo1!',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true
  },
  connectionTimeout: 30000,
  requestTimeout: 60000
};

// ============================================================================
// 타입 정의
// ============================================================================

interface ColumnInfo {
  name: string;
  type: string;
  maxLength: number | null;
  nullable: boolean;
  isPrimaryKey: boolean;
}

interface TableInfo {
  name: string;
  schema: string;
  columns: ColumnInfo[];
  rowCount?: number;
}

// ============================================================================
// 메타데이터 수집 함수
// ============================================================================

async function collectMssqlMetadata(): Promise<void> {
  console.log('='.repeat(70));
  console.log('🔍 MSSQL DB 메타데이터 수집 시작');
  console.log('='.repeat(70));
  console.log(`📍 서버: ${mssqlConfig.server}:${mssqlConfig.port}`);
  console.log(`📂 데이터베이스: ${mssqlConfig.database}`);
  
  let pool: sql.ConnectionPool | null = null;
  
  try {
    // 1. DB 연결
    console.log('\n🔗 MSSQL 연결 중...');
    pool = await sql.connect(mssqlConfig);
    console.log('  ✅ 연결 성공!');
    
    // 2. 테이블 목록 조회
    console.log('\n📋 테이블 목록 조회 중...');
    
    const tablesResult = await pool.request().query(`
      SELECT 
        t.TABLE_SCHEMA as [schema],
        t.TABLE_NAME as [name],
        t.TABLE_TYPE as [type]
      FROM INFORMATION_SCHEMA.TABLES t
      WHERE t.TABLE_TYPE = 'BASE TABLE'
      ORDER BY t.TABLE_SCHEMA, t.TABLE_NAME
    `);
    
    const tables = tablesResult.recordset;
    console.log(`  📊 총 테이블 수: ${tables.length}개`);
    
    // 3. 각 테이블의 컬럼 정보 수집
    console.log('\n📊 컬럼 정보 수집 중...');
    
    const tableInfos: TableInfo[] = [];
    
    for (const table of tables) {
      // 컬럼 정보 조회
      const columnsResult = await pool.request()
        .input('schema', sql.NVarChar, table.schema)
        .input('table', sql.NVarChar, table.name)
        .query(`
          SELECT 
            c.COLUMN_NAME as name,
            c.DATA_TYPE as type,
            c.CHARACTER_MAXIMUM_LENGTH as maxLength,
            CASE WHEN c.IS_NULLABLE = 'YES' THEN 1 ELSE 0 END as nullable,
            CASE WHEN pk.COLUMN_NAME IS NOT NULL THEN 1 ELSE 0 END as isPrimaryKey
          FROM INFORMATION_SCHEMA.COLUMNS c
          LEFT JOIN (
            SELECT ku.TABLE_SCHEMA, ku.TABLE_NAME, ku.COLUMN_NAME
            FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
            JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE ku
              ON tc.CONSTRAINT_NAME = ku.CONSTRAINT_NAME
              AND tc.TABLE_SCHEMA = ku.TABLE_SCHEMA
              AND tc.TABLE_NAME = ku.TABLE_NAME
            WHERE tc.CONSTRAINT_TYPE = 'PRIMARY KEY'
          ) pk ON c.TABLE_SCHEMA = pk.TABLE_SCHEMA 
              AND c.TABLE_NAME = pk.TABLE_NAME 
              AND c.COLUMN_NAME = pk.COLUMN_NAME
          WHERE c.TABLE_SCHEMA = @schema AND c.TABLE_NAME = @table
          ORDER BY c.ORDINAL_POSITION
        `);
      
      const columns: ColumnInfo[] = columnsResult.recordset.map((col: {
        name: string;
        type: string;
        maxLength: number | null;
        nullable: number;
        isPrimaryKey: number;
      }) => ({
        name: col.name,
        type: col.type,
        maxLength: col.maxLength,
        nullable: col.nullable === 1,
        isPrimaryKey: col.isPrimaryKey === 1
      }));
      
      tableInfos.push({
        name: table.name,
        schema: table.schema,
        columns
      });
      
      // 진행상황 표시
      if (tableInfos.length % 50 === 0) {
        console.log(`  📊 진행: ${tableInfos.length}/${tables.length}`);
      }
    }
    
    console.log(`  ✅ ${tableInfos.length}개 테이블 정보 수집 완료`);
    
    // 4. PostgreSQL 테이블과 비교
    console.log('\n🔄 PostgreSQL 테이블과 비교 중...');
    
    const pgMetadataPath = path.join(process.cwd(), 'data/db_metadata.json');
    let pgTables: string[] = [];
    
    if (fs.existsSync(pgMetadataPath)) {
      const pgMetadata = JSON.parse(fs.readFileSync(pgMetadataPath, 'utf-8'));
      if (pgMetadata.tables && Array.isArray(pgMetadata.tables)) {
        pgTables = pgMetadata.tables.map((t: { name: string }) => t.name.toLowerCase());
        console.log(`  📂 PostgreSQL 테이블: ${pgTables.length}개`);
      } else {
        console.log('  ⚠️ PostgreSQL 메타데이터 형식이 다릅니다. 비교 건너뜁니다.');
      }
    } else {
      console.log('  ⚠️ PostgreSQL 메타데이터 파일 없음');
    }
    
    // MSSQL 전용 테이블 (PostgreSQL에 없는 것)
    const mssqlOnlyTables = tableInfos.filter(t => 
      !pgTables.includes(t.name.toLowerCase())
    );
    
    console.log(`  📊 MSSQL 전용 테이블: ${mssqlOnlyTables.length}개`);
    
    // 5. 테이블 분류
    const doiTables = tableInfos.filter(t => t.name.toLowerCase().startsWith('doi_'));
    const dwTables = tableInfos.filter(t => t.name.toLowerCase().startsWith('dw_'));
    const newDoiTables = tableInfos.filter(t => t.name.toLowerCase().startsWith('new_doi_'));
    const otherTables = tableInfos.filter(t => 
      !t.name.toLowerCase().startsWith('doi_') && 
      !t.name.toLowerCase().startsWith('dw_') &&
      !t.name.toLowerCase().startsWith('new_doi_')
    );
    
    console.log('\n📊 테이블 분류:');
    console.log(`  - doi_ 접두어: ${doiTables.length}개`);
    console.log(`  - dw_ 접두어: ${dwTables.length}개`);
    console.log(`  - new_doi_ 접두어: ${newDoiTables.length}개`);
    console.log(`  - 기타: ${otherTables.length}개`);
    
    // 6. 결과 저장
    const outputDir = path.join(process.cwd(), 'data/mssql_metadata');
    fs.mkdirSync(outputDir, { recursive: true });
    
    // 전체 메타데이터 저장
    fs.writeFileSync(
      path.join(outputDir, 'all_tables.json'),
      JSON.stringify(tableInfos, null, 2),
      'utf-8'
    );
    
    // doi_ 테이블만 저장
    fs.writeFileSync(
      path.join(outputDir, 'doi_tables.json'),
      JSON.stringify(doiTables, null, 2),
      'utf-8'
    );
    
    // MSSQL 전용 테이블 저장
    fs.writeFileSync(
      path.join(outputDir, 'mssql_only_tables.json'),
      JSON.stringify(mssqlOnlyTables, null, 2),
      'utf-8'
    );
    
    // 7. 통계 출력
    console.log('\n' + '='.repeat(70));
    console.log('📊 MSSQL 메타데이터 수집 결과');
    console.log('='.repeat(70));
    console.log(`  📋 총 테이블: ${tableInfos.length}개`);
    console.log(`  📊 총 컬럼: ${tableInfos.reduce((sum, t) => sum + t.columns.length, 0)}개`);
    console.log(`  🆕 MSSQL 전용 테이블: ${mssqlOnlyTables.length}개`);
    
    // 8. doi_ 테이블 상세 출력
    console.log('\n📋 doi_ 테이블 목록:');
    doiTables.slice(0, 30).forEach(t => {
      console.log(`  - ${t.name} (${t.columns.length}개 컬럼)`);
    });
    if (doiTables.length > 30) {
      console.log(`  ... 외 ${doiTables.length - 30}개`);
    }
    
    // 9. new_doi_ 테이블 상세 출력
    if (newDoiTables.length > 0) {
      console.log('\n📋 new_doi_ 테이블 목록:');
      newDoiTables.forEach(t => {
        console.log(`  - ${t.name} (${t.columns.length}개 컬럼)`);
        t.columns.forEach(c => {
          console.log(`      ${c.isPrimaryKey ? '🔑' : '  '} ${c.name}: ${c.type}${c.maxLength ? `(${c.maxLength})` : ''}`);
        });
      });
    }
    
    console.log('\n📂 저장 위치:', outputDir);
    console.log('  - all_tables.json');
    console.log('  - doi_tables.json');
    console.log('  - mssql_only_tables.json');
    
    console.log('\n' + '='.repeat(70));
    console.log('✅ 수집 완료!');
    console.log('='.repeat(70));
    
  } catch (error) {
    console.error('❌ 오류 발생:', error);
    throw error;
  } finally {
    if (pool) {
      await pool.close();
      console.log('\n🔌 MSSQL 연결 종료');
    }
  }
}

// 실행
collectMssqlMetadata().catch(console.error);
