/**
 * 유틸리티 헬퍼 함수 모음
 */

/**
 * 문자열 첫 글자 대문자 변환
 * @param str 변환할 문자열
 * @returns 첫 글자가 대문자인 문자열
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 한글 이름을 영문 변수명으로 변환
 * @param koreanName 한글 이름
 * @returns 영문 변수명
 */
export function koreanToEnglish(koreanName: string): string {
  const mappings: Record<string, string> = {
    '년월': 'yearMonth',
    '년도': 'year',
    '자재': 'material',
    '품번': 'partNumber',
    '품명': 'partName',
    '거래처': 'customer',
    '부서': 'department',
    '계정': 'account',
    '모델': 'model',
    '사업장': 'site',
    '수량': 'qty',
    '금액': 'amount',
    '단가': 'price',
  };
  
  return mappings[koreanName] || koreanName;
}

/**
 * 영문 변수명을 kebab-case로 변환
 * @param str camelCase 또는 PascalCase 문자열
 * @returns kebab-case 문자열
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * 영문 변수명을 snake_case로 변환
 * @param str camelCase 또는 PascalCase 문자열
 * @returns snake_case 문자열
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

/**
 * 파일명에서 안전하지 않은 문자 제거
 * @param filename 원본 파일명
 * @returns 안전한 파일명
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[<>:"/\\|?*]/g, '')
    .replace(/\s+/g, '_')
    .trim();
}

/**
 * 숫자를 천 단위 쉼표 포맷으로 변환
 * @param num 숫자
 * @returns 포맷된 문자열
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('ko-KR');
}

/**
 * 날짜를 YYYY-MM-DD 형식으로 변환
 * @param date Date 객체
 * @returns 포맷된 날짜 문자열
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 현재 년월을 YYYYMM 형식으로 반환
 * @returns YYYYMM 형식 문자열
 */
export function getCurrentYearMonth(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}${month}`;
}

/**
 * 딥 클론 (JSON 호환 객체용)
 * @param obj 복제할 객체
 * @returns 복제된 객체
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 객체가 비어있는지 확인
 * @param obj 확인할 객체
 * @returns 비어있으면 true
 */
export function isEmpty(obj: any): boolean {
  if (obj == null) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  if (typeof obj === 'string') return obj.trim().length === 0;
  return false;
}

/**
 * 두 배열의 교집합 반환
 * @param arr1 첫 번째 배열
 * @param arr2 두 번째 배열
 * @returns 교집합 배열
 */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter(item => set2.has(item));
}

/**
 * 배열에서 중복 제거
 * @param arr 원본 배열
 * @returns 중복 제거된 배열
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}
