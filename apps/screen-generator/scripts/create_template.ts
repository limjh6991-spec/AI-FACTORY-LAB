import XLSX from 'xlsx';
import path from 'path';

// 화면 생성을 위한 Excel 템플릿 생성
const createScreenTemplate = () => {
  const workbook = XLSX.utils.book_new();

  // 1. 메타정보 시트
  const metaData = [
    ['화면정의서', ''],
    ['화면명', ''],  // 예: 품목별 재고현황
    ['화면명(영문)', ''],  // 예: ItemStockStatus
    ['테이블명', ''],  // 예: TB_ITEM_STOCK (DB 테이블명)
    ['옵션', ''],  // 예: 년월, 자재 (쉼표로 구분)
  ];

  const metaSheet = XLSX.utils.aoa_to_sheet(metaData);
  
  // 열 너비 설정
  metaSheet['!cols'] = [
    { wch: 15 }, // A
    { wch: 40 }, // B
  ];

  XLSX.utils.book_append_sheet(workbook, metaSheet, '메타정보');

  // 2. 그리드컬럼 시트 (헤더 구조 정의)
  const gridData = [
    ['품목별 재고현황'],  // 제목행
    ['품목코드', '품목명', '규격', '단위', '창고', '기초', null, '입고', null, '출고', null, '기말', null],  // 1차 헤더
    [null, null, null, null, null, '수량', '금액', '수량', '금액', '수량', '금액', '수량', '금액'],  // 2차 헤더
    ['합계', '', '', '', '', '', '', '', '', '', '', '', ''],  // 합계행
  ];

  const dataSheet = XLSX.utils.aoa_to_sheet(gridData);
  
  // 열 너비 설정
  dataSheet['!cols'] = [
    { wch: 12 }, { wch: 15 }, { wch: 12 }, { wch: 8 }, { wch: 10 },
    { wch: 10 }, { wch: 12 }, { wch: 10 }, { wch: 12 }, { wch: 10 },
    { wch: 12 }, { wch: 10 }, { wch: 12 },
  ];
  
  // 병합 셀 설정 (그룹 헤더)
  dataSheet['!merges'] = [
    { s: { r: 1, c: 5 }, e: { r: 1, c: 6 } },   // 기초 (F2:G2)
    { s: { r: 1, c: 7 }, e: { r: 1, c: 8 } },   // 입고 (H2:I2)
    { s: { r: 1, c: 9 }, e: { r: 1, c: 10 } },  // 출고 (J2:K2)
    { s: { r: 1, c: 11 }, e: { r: 1, c: 12 } }, // 기말 (L2:M2)
  ];

  XLSX.utils.book_append_sheet(workbook, dataSheet, '그리드컬럼');

  // 3. 샘플데이터 시트
  const sampleData = [
    ['샘플 데이터'],  // 제목행
    ['품목코드', '품목명', '규격', '단위', '창고', '기초수량', '기초금액', '입고수량', '입고금액', '출고수량', '출고금액', '기말수량', '기말금액'],  // 헤더
    ['ITEM001', '원자재A', '100x50', 'EA', '창고1', 1000, 5000000, 500, 2500000, 300, 1500000, 1200, 6000000],
    ['ITEM002', '원자재B', '200x100', 'KG', '창고1', 500, 2000000, 200, 800000, 150, 600000, 550, 2200000],
    ['ITEM003', '부품C', '50x30', 'EA', '창고2', 2000, 3000000, 800, 1200000, 600, 900000, 2200, 3300000],
  ];

  const sampleSheet = XLSX.utils.aoa_to_sheet(sampleData);
  sampleSheet['!cols'] = [
    { wch: 12 }, { wch: 15 }, { wch: 12 }, { wch: 8 }, { wch: 10 },
    { wch: 10 }, { wch: 12 }, { wch: 10 }, { wch: 12 }, { wch: 10 },
    { wch: 12 }, { wch: 10 }, { wch: 12 },
  ];

  XLSX.utils.book_append_sheet(workbook, sampleSheet, '샘플데이터');

  // 4. 가이드 시트
  const guideData = [
    ['📋 화면 생성 템플릿 사용 가이드'],
    [''],
    ['1. 메타정보 시트'],
    ['   - 화면명: 화면 상단에 표시될 제목'],
    ['   - 화면명(영문): 파일명 및 컴포넌트명으로 사용'],
    ['   - 테이블명: 데이터를 조회할 DB 테이블명'],
    ['   - 옵션: 사용할 공통 옵션 컴포넌트 (쉼표로 구분)'],
    [''],
    ['2. 사용 가능한 옵션'],
    ['   - 년월: YearMonthPicker (년월 선택)'],
    ['   - 년: YearPicker (년도 선택)'],
    ['   - 자재: MaterialSelect (자재/품목 선택)'],
    ['   - 거래처: CustomerSelect (거래처/고객 선택)'],
    ['   - 부서: DepartmentSelect (부서 선택)'],
    ['   - 계정: AccountSelect (계정과목 선택)'],
    ['   - 모델: ModelSelect (모델/제품 선택)'],
    ['   - 사업장: SiteSelect (사업장 선택)'],
    ['   - 비용: ExpenSelSelect (비용 선택)'],
    [''],
    ['3. 그리드컬럼 시트'],
    ['   - Row 1: 화면 제목'],
    ['   - Row 2: 1차 헤더 (그룹 헤더는 셀 병합)'],
    ['   - Row 3: 2차 헤더 (상세 컬럼명)'],
    ['   - Row 4+: 합계행 ("합계", "소계" 키워드 포함)'],
    [''],
    ['4. 샘플데이터 시트'],
    ['   - Row 1: 제목'],
    ['   - Row 2: 헤더 (단일 행, 병합 없음)'],
    ['   - Row 3+: 샘플 데이터'],
    [''],
    ['5. 옵션 사용 예시'],
    ['   - 옵션: 년월, 자재'],
    ['   - 옵션: 년, 거래처, 부서'],
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
