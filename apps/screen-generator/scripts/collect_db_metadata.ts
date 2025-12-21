import { PrismaClient } from '../generated/prisma/index.js';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

/**
 * PostgreSQL information_schema에서 직접 메타데이터 수집
 * doi_ 접두어 테이블만 수집
 */
async function collectDBMetadata() {
  console.log('🔍 DB 메타데이터 수집 중 (doi_ 접두어 테이블만)...\n');
  
  // 1. doi_ 접두어 테이블만 가져오기
  const tablesResult = await prisma.$queryRaw<Array<{table_name: string}>>`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      AND table_name LIKE 'doi_%'
    ORDER BY table_name
  `;
  
  console.log(`✅ 총 ${tablesResult.length}개 테이블 발견\n`);
  
  const tables: any[] = [];
  
  for (const { table_name } of tablesResult) {
    console.log(`📊 분석 중: ${table_name}`);
    
    try {
      // 2. 테이블의 컬럼 정보 가져오기
      const columnsResult = await prisma.$queryRaw<Array<{
        column_name: string;
        data_type: string;
        character_maximum_length: number | null;
        is_nullable: string;
      }>>`
        SELECT 
          column_name,
          data_type,
          character_maximum_length,
          is_nullable
        FROM information_schema.columns
        WHERE table_schema = 'public' 
          AND table_name = ${table_name}
        ORDER BY ordinal_position
      `;
      
      const columns = columnsResult.map(col => ({
        name: col.column_name,
        korean_name: inferKoreanName(col.column_name),
        type: col.data_type,
        max_length: col.character_maximum_length,
        nullable: col.is_nullable === 'YES',
      }));
      
      // 3. 테이블 레코드 수 가져오기
      const countResult = await prisma.$queryRawUnsafe<Array<{count: bigint}>>(
        `SELECT COUNT(*) as count FROM "${table_name}"`
      );
      const recordCount = countResult && countResult[0] ? Number(countResult[0].count) : 0;
      
      tables.push({
        name: table_name,
        korean_name: inferKoreanName(table_name),
        columns,
        recordCount,
      });
      
      console.log(`   ✓ ${columns.length}개 컬럼, ${recordCount}건`);
    } catch (error) {
      console.log(`   ⚠️  스킵 (에러: ${error})`);
    }
  }
  
  // JSON 파일로 저장
  const outputPath = path.join(process.cwd(), 'data', 'db_metadata.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(tables, null, 2), 'utf-8');
  
  console.log('\n' + '='.repeat(70));
  console.log(`✅ DB 메타데이터 수집 완료!`);
  console.log(`📂 저장 위치: ${outputPath}`);
  console.log(`📊 총 ${tables.length}개 테이블, ${tables.reduce((sum, t) => sum + t.columns.length, 0)}개 컬럼`);
  console.log('='.repeat(70));
  
  return tables;
}

/**
 * 영문 컬럼명/테이블명에서 한글명 추론
 */
function inferKoreanName(name: string): string {
  const dictionary: Record<string, string> = {
    // 테이블 접두어 (모든 DB 접두어 포함)
    'new_doi_': '',
    'doi_': '',
    'tb_': '',
    'tbl_': '',
    'mst_': '마스터',
    'trn_': '거래',
    'his_': '이력',
    'tmp_': '임시',
    
    // 테이블 접미어 (기준정보 마스터 테이블)
    '_mast': '마스터',
    
    // 업무 영역
    'sys_': '시스템',
    'cost_': '원가',
    'prd_': '생산',
    'prod_': '생산',
    'inv_': '재고',
    'sal_': '판매',
    'pur_': '구매',
    'mat_': '자재',
    'qual_': '품질',
    'plan_': '계획',
    'ord_': '주문',
    'ship_': '출하',
    'recv_': '입고',
    'wip_': '재공',
    'fin_': '재무',
    'hr_': '인사',
    'acct_': '회계',
    
    // 공통 테이블/엔티티 명
    'model': '제품',          // ⭐ 제품 = model
    'model_mast': '제품마스터', // ⭐ 제품 기준정보
    'bom_mast': 'BOM마스터',   // ⭐ BOM 기준정보
    'cust_mast': '고객마스터',  // ⭐ 고객 기준정보
    'material_mast': '자재마스터', // ⭐ 자재 기준정보
    'menu': '메뉴',
    'user': '사용자',
    'dept': '부서',
    'product': '제품',
    'process': '공정',
    'material': '자재',
    'customer': '고객',
    'cust': '고객',
    'vendor': '거래처',
    'supplier': '공급업체',
    'warehouse': '창고',
    'location': '위치',
    'item': '품목',
    'order': '주문',
    'invoice': '송장',
    'delivery': '배송',
    'shipment': '출하',
    'receipt': '입고',
    'stock': '재고',
    'inventory': '재고',
    'transaction': '거래',
    'master': '마스터',
    'detail': '상세',
    'header': '헤더',
    'line': '라인',
    'spec': '사양',
    'standard': '표준',
    'plan': '계획',
    'actual': '실적',
    'target': '목표',
    'forecast': '예측',
    'budget': '예산',
    'schedule': '일정',
    'calendar': '달력',
    'holiday': '휴일',
    'shift': '교대',
    'work': '작업',
    'operation': '작업',
    'inspection': '검사',
    'quality': '품질',
    'defect': '불량',
    'rework': '재작업',
    'scrap': '스크랩',
    'waste': '폐기',
    'bom': 'BOM',
    'lotrun': '로트런',
    'subul': '수불',
    'rma': '반품',
    'sga': '판관비',
    'slco': '판매원가',
    'stco': '표준원가',
    'smce': '제조원가',
    'rnd': '연구개발',
    
    // 시간 관련
    'monthly': '월별',
    'daily': '일별',
    'weekly': '주별',
    'yearly': '연별',
    'quarter': '분기',
    'period': '기간',
    'year': '년',
    'month': '월',
    'day': '일',
    'hour': '시',
    'minute': '분',
    'second': '초',
    
    // 컬럼 접미어
    '_id': 'ID',
    '_nm': '명',
    '_name': '명칭',
    '_no': '번호',
    '_num': '번호',
    '_number': '번호',
    '_dt': '일자',
    '_date': '일자',
    '_time': '시간',
    '_datetime': '일시',
    '_timestamp': '시각',
    '_amt': '금액',
    '_amount': '금액',
    '_qty': '수량',
    '_quantity': '수량',
    '_cnt': '건수',
    '_count': '건수',
    '_pct': '비율',
    '_percent': '비율',
    '_rate': '율',
    '_ratio': '비율',
    '_yn': '여부',
    '_flag': '플래그',
    '_cd': '코드',
    '_code': '코드',
    '_type': '유형',
    '_status': '상태',
    '_state': '상태',
    '_level': '레벨',
    '_grade': '등급',
    '_class': '클래스',
    '_category': '분류',
    '_group': '그룹',
    '_div': '구분',
    '_division': '부문',
    '_dept': '부서',
    '_team': '팀',
    '_section': '섹션',
    '_unit': '단위',
    '_uom': '단위',
    '_price': '가격',
    '_cost': '원가',
    '_value': '값',
    '_weight': '중량',
    '_volume': '용량',
    '_size': '크기',
    '_length': '길이',
    '_width': '너비',
    '_height': '높이',
    '_seq': '순번',
    '_order': '순서',
    '_sort': '정렬',
    '_rank': '순위',
    '_priority': '우선순위',
    '_desc': '설명',
    '_description': '설명',
    '_remark': '비고',
    '_note': '참고',
    '_comment': '코멘트',
    '_memo': '메모',
    '_user': '사용자',
    '_by': '자',
    '_emp': '직원',
    '_employee': '직원',
    '_mgr': '관리자',
    '_manager': '관리자',
    '_addr': '주소',
    '_address': '주소',
    '_tel': '전화',
    '_phone': '전화',
    '_fax': '팩스',
    '_email': '이메일',
    '_url': 'URL',
    '_path': '경로',
    '_file': '파일',
    '_img': '이미지',
    '_image': '이미지',
    '_use': '사용',
    '_enable': '활성화',
    '_active': '활성',
    '_valid': '유효',
    '_reg': '등록',
    '_register': '등록',
    '_mod': '수정',
    '_modify': '수정',
    '_upd': '수정',
    '_update': '수정',
    '_del': '삭제',
    '_delete': '삭제',
    '_create': '생성',
    '_ins': '입력',
    '_insert': '입력',
    '_start': '시작',
    '_end': '종료',
    '_from': '시작',
    '_to': '종료',
    '_begin': '시작',
    '_finish': '완료',
    '_complete': '완료',
    '_cancel': '취소',
    '_approve': '승인',
    '_reject': '반려',
    '_confirm': '확인',
    '_min': '최소',
    '_max': '최대',
    '_avg': '평균',
    '_sum': '합계',
    '_total': '합계',
    '_subtotal': '소계',
  };
  
  let korean = name;
  
  // 사전 기반 변환
  for (const [eng, kor] of Object.entries(dictionary)) {
    korean = korean.replace(new RegExp(eng, 'gi'), kor);
  }
  
  // snake_case → 공백
  korean = korean.replace(/_/g, ' ').trim();
  
  return korean || name;
}

async function main() {
  try {
    const metadata = await collectDBMetadata();
    
    console.log('\n📋 샘플 테이블 (처음 3개):');
    metadata.slice(0, 3).forEach((table, idx) => {
      console.log(`\n${idx + 1}. ${table.name} (${table.korean_name})`);
      console.log(`   레코드: ${table.recordCount}건`);
      console.log(`   컬럼:`);
      table.columns.slice(0, 5).forEach((col: any) => {
        console.log(`     - ${col.name} (${col.korean_name}): ${col.type}`);
      });
      if (table.columns.length > 5) {
        console.log(`     ... 외 ${table.columns.length - 5}개`);
      }
    });
    
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);
