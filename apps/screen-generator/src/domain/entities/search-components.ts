/**
 * 화면 생성기 - 공통 검색 컴포넌트 타입 정의
 *
 * 검색 조건을 동적으로 생성하는 대신,
 * 미리 정의된 공통 컴포넌트 중에서 선택하는 방식
 */

export enum SearchComponentType {
  TEXT_INPUT = 'TEXT_INPUT',           // 일반 텍스트 입력
  NUMBER_INPUT = 'NUMBER_INPUT',       // 숫자 입력
  DATE_PICKER = 'DATE_PICKER',         // 날짜 선택
  DATE_RANGE = 'DATE_RANGE',           // 날짜 범위 (시작일~종료일)
  YEAR_MONTH = 'YEAR_MONTH',           // 년월 선택 (YYYYMM)
  SELECT = 'SELECT',                   // 단일 선택 드롭다운
  MULTI_SELECT = 'MULTI_SELECT',       // 다중 선택
  CHECKBOX = 'CHECKBOX',               // 체크박스
  // BiSelect 시리즈 (마스터 공통 컴포넌트)
  BI_SITE = 'BI_SITE',                 // 사업장 선택
  BI_SCENARIO = 'BI_SCENARIO',         // 시나리오 선택
  BI_DEPT = 'BI_DEPT',                 // 부서 선택
  BI_COST_CENTER = 'BI_COST_CENTER',   // 코스트센터 선택
  BI_USER = 'BI_USER',                 // 사원 선택
  BI_ACCOUNT = 'BI_ACCOUNT',           // 계정 선택
  BI_EXPENSE = 'BI_EXPENSE',           // 경비항목 선택
  BI_CUSTOMER = 'BI_CUSTOMER',         // 거래처 선택
  BI_EQUIPMENT = 'BI_EQUIPMENT',       // 설비 선택
  BI_PRODUCT = 'BI_PRODUCT',           // 제품 선택
}

/**
 * 검색 컴포넌트 정의
 */
export interface SearchComponentDef {
  id: string;                          // 고유 ID (예: text-input-1)
  type: SearchComponentType;           // 컴포넌트 타입
  label: string;                       // 화면에 표시될 레이블
  name: string;                        // state 변수명 (예: searchText)
  placeholder?: string;                // 입력 힌트
  required?: boolean;                  // 필수 여부
  width?: number;                      // 그리드 너비 (1-12)
  options?: Array<{                    // SELECT, MULTI_SELECT용 옵션
    label: string;
    value: string;
  }>;
  defaultValue?: string | string[];    // 기본값
}

/**
 * 미리 정의된 공통 검색 컴포넌트 카탈로그
 */
export const SEARCH_COMPONENT_CATALOG: Array<{
  type: SearchComponentType;
  displayName: string;
  description: string;
  icon: string;
  example: string;
}> = [
    {
      type: SearchComponentType.TEXT_INPUT,
      displayName: '텍스트 입력',
      description: '일반 텍스트 검색 (부서명, 사용자명 등)',
      icon: 'Type',
      example: '부서명',
    },
    {
      type: SearchComponentType.NUMBER_INPUT,
      displayName: '숫자 입력',
      description: '숫자 검색 (사번, 금액 등)',
      icon: 'Hash',
      example: '사번',
    },
    {
      type: SearchComponentType.DATE_PICKER,
      displayName: '날짜 선택',
      description: '단일 날짜 선택',
      icon: 'Calendar',
      example: '조회일자',
    },
    {
      type: SearchComponentType.DATE_RANGE,
      displayName: '날짜 범위',
      description: '시작일 ~ 종료일 범위 선택',
      icon: 'CalendarRange',
      example: '기간',
    },
    {
      type: SearchComponentType.YEAR_MONTH,
      displayName: '년월 선택',
      description: 'YYYYMM 형식 년월 선택',
      icon: 'CalendarDays',
      example: '조회월',
    },
    {
      type: SearchComponentType.SELECT,
      displayName: '단일 선택',
      description: '드롭다운 단일 선택',
      icon: 'ChevronDown',
      example: '상태',
    },
    {
      type: SearchComponentType.MULTI_SELECT,
      displayName: '다중 선택',
      description: '여러 항목 선택 가능',
      icon: 'ListChecks',
      example: '부서 (다중)',
    },
    {
      type: SearchComponentType.CHECKBOX,
      displayName: '체크박스',
      description: 'ON/OFF 토글',
      icon: 'CheckSquare',
      example: '삭제 포함',
    },
    // BiSelect 시리즈 (마스터 공통 컴포넌트)
    {
      type: SearchComponentType.BI_SITE,
      displayName: '사업장 선택',
      description: 'BiSiteSelect - 사업장(공장) 선택',
      icon: 'Building2',
      example: '사업장',
    },
    {
      type: SearchComponentType.BI_SCENARIO,
      displayName: '시나리오 선택',
      description: 'BiScenarioSelect - 시나리오 선택',
      icon: 'FileStack',
      example: '시나리오',
    },
    {
      type: SearchComponentType.BI_DEPT,
      displayName: '부서 선택',
      description: 'BiDeptSelect - 부서 선택',
      icon: 'Users',
      example: '부서',
    },
    {
      type: SearchComponentType.BI_COST_CENTER,
      displayName: '코스트센터 선택',
      description: 'BiCostCenterSelect - 코스트센터 선택',
      icon: 'DollarSign',
      example: '코스트센터',
    },
    {
      type: SearchComponentType.BI_USER,
      displayName: '사원 선택',
      description: 'BiUserSelect - 사원 선택',
      icon: 'UserCircle',
      example: '사원',
    },
    {
      type: SearchComponentType.BI_ACCOUNT,
      displayName: '계정 선택',
      description: 'BiAccountSelect - 계정 선택',
      icon: 'Wallet',
      example: '계정',
    },
    {
      type: SearchComponentType.BI_EXPENSE,
      displayName: '경비항목 선택',
      description: 'BiExpenseSelect - 경비항목 선택',
      icon: 'Receipt',
      example: '경비항목',
    },
    {
      type: SearchComponentType.BI_CUSTOMER,
      displayName: '거래처 선택',
      description: 'BiCustomerSelect - 거래처 선택',
      icon: 'Store',
      example: '거래처',
    },
    {
      type: SearchComponentType.BI_EQUIPMENT,
      displayName: '설비 선택',
      description: 'BiEquipmentSelect - 설비 선택',
      icon: 'Settings',
      example: '설비',
    },
    {
      type: SearchComponentType.BI_PRODUCT,
      displayName: '제품 선택',
      description: 'BiProductSelect - 제품 선택',
      icon: 'Package',
      example: '제품',
    },
  ];

/**
 * 검색 컴포넌트 타입별 기본 state 변수명 생성
 */
export function generateStateName(type: SearchComponentType, index: number): string {
  const prefix: Record<SearchComponentType, string> = {
    [SearchComponentType.TEXT_INPUT]: 'searchText',
    [SearchComponentType.NUMBER_INPUT]: 'searchNumber',
    [SearchComponentType.DATE_PICKER]: 'searchDate',
    [SearchComponentType.DATE_RANGE]: 'searchDateRange',
    [SearchComponentType.YEAR_MONTH]: 'searchYearMonth',
    [SearchComponentType.SELECT]: 'searchSelect',
    [SearchComponentType.MULTI_SELECT]: 'searchMultiSelect',
    [SearchComponentType.CHECKBOX]: 'searchCheckbox',
    [SearchComponentType.BI_SITE]: 'site',
    [SearchComponentType.BI_SCENARIO]: 'scenario',
    [SearchComponentType.BI_DEPT]: 'dept',
    [SearchComponentType.BI_COST_CENTER]: 'costCenter',
    [SearchComponentType.BI_USER]: 'user',
    [SearchComponentType.BI_ACCOUNT]: 'account',
    [SearchComponentType.BI_EXPENSE]: 'expense',
    [SearchComponentType.BI_CUSTOMER]: 'customer',
    [SearchComponentType.BI_EQUIPMENT]: 'equipment',
    [SearchComponentType.BI_PRODUCT]: 'product',
  };

  return `${prefix[type] || 'search'}${index}`;
}

/**
 * 검색 컴포넌트 타입별 기본 placeholder 생성
 */
export function generatePlaceholder(type: SearchComponentType, label: string): string {
  switch (type) {
    case SearchComponentType.TEXT_INPUT:
      return `${label} 입력`;
    case SearchComponentType.NUMBER_INPUT:
      return `${label} 입력`;
    case SearchComponentType.DATE_PICKER:
      return 'YYYY-MM-DD';
    case SearchComponentType.DATE_RANGE:
      return 'YYYY-MM-DD ~ YYYY-MM-DD';
    case SearchComponentType.YEAR_MONTH:
      return 'YYYYMM';
    case SearchComponentType.SELECT:
      return `${label} 선택`;
    case SearchComponentType.MULTI_SELECT:
      return `${label} 선택 (다중)`;
    case SearchComponentType.CHECKBOX:
      return '';
    default:
      return label;
  }
}
