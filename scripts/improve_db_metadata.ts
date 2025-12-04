/**
 * DB 메타데이터 품질 개선 스크립트
 * 
 * 개선 사항:
 * 1. 시스템 컬럼 분류 (createdAt, updatedAt, createdBy, updatedBy)
 * 2. 데이터 타입별 분류 (숫자, 문자, 날짜)
 * 3. 의미적 설명 추가
 * 4. 동의어/유사어 확장
 * 5. 예시 값 추가 (가능한 경우)
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';

// 시스템 컬럼 목록 (매핑에서 제외해야 함)
const SYSTEM_COLUMNS = [
  'id', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy',
  'created_at', 'updated_at', 'created_by', 'updated_by',
  'insert_dt', 'update_dt', 'insert_id', 'update_id',
  'reg_dt', 'mod_dt', 'reg_id', 'mod_id'
];

// 데이터 타입 매핑
const DATA_TYPE_CATEGORIES = {
  number: ['integer', 'numeric', 'decimal', 'bigint', 'smallint', 'real', 'double precision', 'float'],
  text: ['character varying', 'varchar', 'text', 'char', 'character'],
  date: ['timestamp', 'date', 'time', 'timestamp without time zone', 'timestamp with time zone'],
  boolean: ['boolean', 'bool'],
};

// 한글 동의어 사전 (Excel 컬럼 → DB 컬럼 매핑 지원)
const KOREAN_SYNONYMS: Record<string, string[]> = {
  // 제품 관련 ⭐ model = 제품
  '제품명': ['제품', '품명', '상품명', '모델명', 'MODEL', 'PRODUCT', 'ITEM', '모델'],
  '제품코드': ['품번', '품목코드', '상품코드', 'PRODUCT_CODE', 'ITEM_CODE', 'MODEL', '모델코드'],
  '모델': ['MODEL', '모델명', '기종', 'MODEL_NAME', '제품', '제품코드', '제품명'],
  '모델코드': ['MODEL', '제품코드', '품번'],
  '모델명': ['MODEL', '제품명', '품명'],
  
  // 부서/조직 관련
  '부서코드': ['부서', '부문', '코스트센터', 'COST_CENTER', 'DEPT', 'DEPT_CODE'],
  '부서명': ['부서', '부문명', '코스트센터명', 'DEPT_NM'],
  
  // 금액 관련
  '원가': ['비용', '금액', 'COST', 'AMOUNT', '차변금액', '대변금액', 'UNIT_COST'],
  '단가': ['가격', 'PRICE', 'UNIT_PRICE', '원가'],
  '수량': ['QTY', 'QUANTITY', '수불수량', 'IN_QTY', 'OUT_QTY'],
  '금액': ['AMOUNT', 'AMT', '비용', '원가'],
  
  // 날짜 관련
  '일자': ['DATE', 'DT', '날짜', '년월', 'YYYYMM', 'YYYYMMDD'],
  '작업일자': ['WORK_DATE', '생산일', '제조일', '작업일'],
  '년월': ['YYYYMM', '기준년월', '월'],
  
  // 마스터(기준정보) 테이블 관련 ⭐
  '제품마스터': ['model_mast', 'doi_model_mast', '제품기준정보'],
  'BOM마스터': ['bom_mast', 'doi_bom_mast', 'BOM기준정보'],
  '고객마스터': ['cust_mast', 'doi_cust_mast', '고객기준정보'],
  '자재마스터': ['material_mast', 'doi_material_mast', '자재기준정보'],
  
  // 기타
  '사이트': ['SITE', '공장', '사업장', 'DW_SITE'],
  '계정과목': ['계정', 'ACCOUNT', '계정코드', '과목'],
  '비고': ['REMARK', '메모', 'NOTE', '설명'],
  '사양': ['SPEC', '스펙', '규격'],
};

// 컬럼명으로 의미 추론
function inferColumnMeaning(columnName: string, koreanName: string): string {
  const name = columnName.toLowerCase();
  const korean = koreanName.toLowerCase();
  
  // 금액 관련
  if (name.includes('amt') || name.includes('amount') || name.includes('cost') || 
      name.includes('price') || korean.includes('금액') || korean.includes('원가')) {
    return '금액/원가 데이터';
  }
  
  // 수량 관련
  if (name.includes('qty') || name.includes('quantity') || korean.includes('수량')) {
    return '수량 데이터';
  }
  
  // 날짜 관련
  if (name.includes('date') || name.includes('dt') || name.includes('yyyymm') ||
      korean.includes('일자') || korean.includes('년월')) {
    return '날짜 데이터';
  }
  
  // 코드 관련
  if (name.includes('code') || name.includes('cd') || korean.includes('코드')) {
    return '코드/식별자';
  }
  
  // 이름 관련
  if (name.includes('name') || name.includes('nm') || korean.includes('명')) {
    return '이름/명칭';
  }
  
  return '일반 데이터';
}

// 데이터 타입 카테고리 반환
function getDataTypeCategory(dbType: string): string {
  const type = dbType.toLowerCase();
  
  for (const [category, types] of Object.entries(DATA_TYPE_CATEGORIES)) {
    if (types.some(t => type.includes(t))) {
      return category;
    }
  }
  
  return 'unknown';
}

// 시스템 컬럼 여부 확인
function isSystemColumn(columnName: string): boolean {
  const name = columnName.toLowerCase();
  return SYSTEM_COLUMNS.some(sys => name === sys.toLowerCase() || name.includes(sys.toLowerCase()));
}

// 동의어 확장
function expandSynonyms(koreanName: string): string[] {
  const synonyms: string[] = [koreanName];
  
  for (const [key, values] of Object.entries(KOREAN_SYNONYMS)) {
    if (koreanName.includes(key) || values.some(v => koreanName.toLowerCase().includes(v.toLowerCase()))) {
      synonyms.push(...values.filter(v => !synonyms.includes(v)));
    }
  }
  
  return [...new Set(synonyms)];
}

interface OriginalColumn {
  name: string;
  korean_name: string;
  type: string;
  max_length: number | null;
  nullable: boolean;
}

interface OriginalTable {
  name: string;
  korean_name: string;
  columns: OriginalColumn[];
  recordCount: number;
}

interface EnhancedColumn extends OriginalColumn {
  isSystemColumn: boolean;
  dataTypeCategory: string;
  meaning: string;
  synonyms: string[];
  searchText: string; // Vector 검색용 통합 텍스트
}

interface EnhancedTable extends Omit<OriginalTable, 'columns'> {
  columns: EnhancedColumn[];
  businessColumns: EnhancedColumn[]; // 시스템 컬럼 제외
}

async function improveMetadata() {
  console.log('📊 DB 메타데이터 품질 개선 시작...\n');
  
  // 1. 기존 메타데이터 로드
  const metadataPath = path.join(process.cwd(), 'data', 'db_metadata.json');
  const originalData: OriginalTable[] = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
  
  console.log(`📁 로드된 테이블: ${originalData.length}개`);
  
  // 2. 메타데이터 품질 개선
  const enhancedData: EnhancedTable[] = originalData.map(table => {
    const enhancedColumns: EnhancedColumn[] = table.columns.map(col => {
      const isSystem = isSystemColumn(col.name);
      const dataTypeCategory = getDataTypeCategory(col.type);
      const meaning = inferColumnMeaning(col.name, col.korean_name);
      const synonyms = expandSynonyms(col.korean_name);
      
      // Vector 검색용 통합 텍스트 생성
      const searchText = [
        `테이블: ${table.name} (${table.korean_name})`,
        `컬럼: ${col.name} (${col.korean_name})`,
        `타입: ${col.type} (${dataTypeCategory})`,
        `의미: ${meaning}`,
        `동의어: ${synonyms.join(', ')}`,
        isSystem ? '⚠️ 시스템 컬럼 - 매핑 비권장' : '✅ 비즈니스 컬럼',
      ].join(' | ');
      
      return {
        ...col,
        isSystemColumn: isSystem,
        dataTypeCategory,
        meaning,
        synonyms,
        searchText,
      };
    });
    
    return {
      ...table,
      columns: enhancedColumns,
      businessColumns: enhancedColumns.filter(c => !c.isSystemColumn),
    };
  });
  
  // 3. 통계 출력
  let totalColumns = 0;
  let systemColumns = 0;
  let businessColumns = 0;
  
  enhancedData.forEach(table => {
    totalColumns += table.columns.length;
    systemColumns += table.columns.filter(c => c.isSystemColumn).length;
    businessColumns += table.businessColumns.length;
  });
  
  console.log('\n📈 개선 통계:');
  console.log(`   전체 컬럼: ${totalColumns}개`);
  console.log(`   시스템 컬럼: ${systemColumns}개 (매핑 제외)`);
  console.log(`   비즈니스 컬럼: ${businessColumns}개 (매핑 대상)`);
  
  // 4. 개선된 메타데이터 저장
  const enhancedPath = path.join(process.cwd(), 'data', 'db_metadata_enhanced.json');
  fs.writeFileSync(enhancedPath, JSON.stringify(enhancedData, null, 2));
  console.log(`\n✅ 개선된 메타데이터 저장: ${enhancedPath}`);
  
  // 5. Vector DB용 청크 생성 (비즈니스 컬럼만)
  const chunks: { id: string; text: string; metadata: Record<string, any> }[] = [];
  
  enhancedData.forEach(table => {
    // 테이블 수준 청크
    chunks.push({
      id: `table_${table.name}`,
      text: `테이블명: ${table.name} | 한글명: ${table.korean_name} | 컬럼수: ${table.businessColumns.length}개 | 레코드수: ${table.recordCount}개 | 비즈니스 컬럼: ${table.businessColumns.map(c => c.korean_name).join(', ')}`,
      metadata: {
        type: 'table',
        tableName: table.name,
        koreanName: table.korean_name,
        columnCount: table.businessColumns.length,
      },
    });
    
    // 비즈니스 컬럼 수준 청크 (시스템 컬럼 제외!)
    table.businessColumns.forEach(col => {
      chunks.push({
        id: `column_${table.name}_${col.name}`,
        text: col.searchText,
        metadata: {
          type: 'column',
          tableName: table.name,
          tableKoreanName: table.korean_name,
          columnName: col.name,
          columnKoreanName: col.korean_name,
          dataType: col.type,
          dataTypeCategory: col.dataTypeCategory,
          meaning: col.meaning,
          synonyms: col.synonyms,
          isSystemColumn: false,
        },
      });
    });
  });
  
  const chunksPath = path.join(process.cwd(), 'data', 'db_metadata_chunks.json');
  fs.writeFileSync(chunksPath, JSON.stringify(chunks, null, 2));
  console.log(`✅ Vector DB용 청크 저장: ${chunksPath} (${chunks.length}개)`);
  
  // 6. 샘플 출력
  console.log('\n📋 샘플 출력 (doi_dept_cost 테이블):');
  const sampleTable = enhancedData.find(t => t.name === 'doi_dept_cost');
  if (sampleTable) {
    console.log(`\n테이블: ${sampleTable.name} (${sampleTable.korean_name})`);
    console.log('비즈니스 컬럼:');
    sampleTable.businessColumns.slice(0, 5).forEach(col => {
      console.log(`  - ${col.name} (${col.korean_name})`);
      console.log(`    타입: ${col.dataTypeCategory}, 의미: ${col.meaning}`);
      console.log(`    동의어: ${col.synonyms.join(', ')}`);
    });
  }
  
  return { enhancedData, chunks };
}

// 실행
improveMetadata()
  .then(() => console.log('\n🎉 메타데이터 품질 개선 완료!'))
  .catch(console.error);
