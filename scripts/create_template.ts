import XLSX from 'xlsx';
import path from 'path';

// 화면 생성을 위한 Excel 템플릿 생성
const createScreenTemplate = () => {
  const workbook = XLSX.utils.book_new();

  // 1. 메타정보 시트
  const metaData = [
    ['화면 정의 템플릿'],
    [''],
    ['항목', '값', '설명'],
    ['화면명(한글)', '', '예: 품목별 재고현황'],
    ['화면명(영문)', '', '예: ItemStockStatus'],
    ['테이블명', '', '예: TB_ITEM_STOCK (DB 테이블명)'],
    ['설명', '', '화면에 대한 설명'],
    [''],
    ['조회조건 정의'],
    ['조건명', 'DB컬럼', '타입', '기본값', '필수여부'],
    ['기준일자', 'BASE_DATE', 'date', '', 'Y'],
    ['품목코드', 'ITEM_CD', 'text', '', 'N'],
    ['품목명', 'ITEM_NM', 'text', '', 'N'],
    ['창고코드', 'WH_CD', 'combo', '', 'N'],
  ];

  const metaSheet = XLSX.utils.aoa_to_sheet(metaData);
  
  // 열 너비 설정
  metaSheet['!cols'] = [
    { wch: 20 }, // A
    { wch: 30 }, // B
    { wch: 40 }, // C
    { wch: 15 }, // D
    { wch: 10 }, // E
  ];

  XLSX.utils.book_append_sheet(workbook, metaSheet, '메타정보');

  // 2. 데이터 시트 (그리드 구조 정의)
  const gridData = [
    ['품목별 재고현황'], // 제목행
    [''], // 빈행
    ['품목코드', '품목명', '규격', '단위', '창고', '전일재고', '입고수량', '출고수량', '현재고', '비고'],
    ['ITEM001', '원자재A', '100x50', 'EA', '창고1', 1000, 500, 300, 1200, ''],
    ['ITEM002', '원자재B', '200x100', 'KG', '창고1', 500, 200, 150, 550, ''],
    ['ITEM003', '부품C', '50x30', 'EA', '창고2', 2000, 800, 600, 2200, ''],
    [''], // 빈행
    ['합계', '', '', '', '', 3500, 1500, 1050, 3950, ''], // 합계행
  ];

  const dataSheet = XLSX.utils.aoa_to_sheet(gridData);
  
  // 열 너비 설정
  dataSheet['!cols'] = [
    { wch: 12 }, // 품목코드
    { wch: 15 }, // 품목명
    { wch: 12 }, // 규격
    { wch: 8 },  // 단위
    { wch: 10 }, // 창고
    { wch: 12 }, // 전일재고
    { wch: 12 }, // 입고수량
    { wch: 12 }, // 출고수량
    { wch: 12 }, // 현재고
    { wch: 15 }, // 비고
  ];

  XLSX.utils.book_append_sheet(workbook, dataSheet, '데이터');

  // 3. 가이드 시트
  const guideData = [
    ['📋 화면 생성 템플릿 사용 가이드'],
    [''],
    ['1. 메타정보 시트'],
    ['   - 화면명(한글): 화면 상단에 표시될 제목'],
    ['   - 화면명(영문): 파일명 및 컴포넌트명으로 사용'],
    ['   - 테이블명: 데이터를 조회할 DB 테이블명'],
    ['   - 조회조건: 검색 폼에 표시될 조건들'],
    [''],
    ['2. 데이터 시트'],
    ['   - 첫 번째 행: 화면 제목 (선택사항)'],
    ['   - 헤더 행: 그리드 컬럼명 정의'],
    ['   - 데이터 행: 샘플 데이터 (구조 파악용)'],
    ['   - 합계 행: "합계", "소계" 등의 키워드 포함 시 자동 인식'],
    [''],
    ['3. 조회조건 타입'],
    ['   - text: 일반 텍스트 입력'],
    ['   - date: 날짜 선택'],
    ['   - combo: 콤보박스 (드롭다운)'],
    ['   - number: 숫자 입력'],
    [''],
    ['4. 주의사항'],
    ['   - 헤더명은 DB 컬럼과 매핑되므로 정확히 입력'],
    ['   - 숫자 컬럼은 숫자 형식으로 입력'],
    ['   - 날짜는 YYYY-MM-DD 형식 권장'],
  ];

  const guideSheet = XLSX.utils.aoa_to_sheet(guideData);
  guideSheet['!cols'] = [{ wch: 60 }];

  XLSX.utils.book_append_sheet(workbook, guideSheet, '가이드');

  // 파일 저장
  const outputPath = path.join(process.cwd(), 'public', 'templates', 'screen_template.xlsx');
  XLSX.writeFile(workbook, outputPath);
  
  console.log(`✅ 템플릿 생성 완료: ${outputPath}`);
};

createScreenTemplate();
