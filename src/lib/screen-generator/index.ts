/**
 * 화면 생성기 모듈 메인 인덱스
 * 
 * 이 모듈은 screenGenerator.ts에서 분리된 유틸리티 함수들을 제공합니다.
 * 
 * 구조:
 * - types.ts: 공통 타입 정의
 * - db-metadata.ts: DB 메타데이터 로드 및 검색
 * - id-generator.ts: 화면 ID 생성
 * - api-key.ts: API 키 관리
 * - query-generator.ts: SQL 쿼리 생성 (LLM 교체 대비)
 * - converters/: 코드 변환 모듈
 * - templates/: 템플릿 생성 모듈
 * - prompts/: LLM 프롬프트 모듈
 * - utils/: 유틸리티 함수
 */

// 타입 export
export * from './types';

// DB 메타데이터
export { 
  loadDbMetadata, 
  findTableMeta, 
  clearDbMetadataCache,
  searchTables,
  getTableColumns,
  findColumnByKoreanName,
} from './db-metadata';

// ID 생성
export { 
  generateScreenId, 
  isValidScreenId, 
  extractScreenNumber 
} from './id-generator';

// API 키
export { 
  getAnthropicApiKey, 
  isValidApiKey 
} from './api-key';

// 쿼리 생성
export { 
  generateSqlQuery,
  generateSqlQueryWithLLM,
  buildQueryPrompt,
  type QueryGeneratorProvider,
} from './query-generator';

// 컨버터
export { convertToNextPage } from './converters';

// 템플릿
export { 
  AG_GRID_STYLES,
  AG_GRID_CSS,
  CARBON_COLORS,
  COMPONENT_SIZES,
  generateReactFromTemplate, 
  createDefaultGridData,
  generateHtmlFromTemplate,
} from './templates';

// 프롬프트
export { 
  buildColumnStructureDescription,
  buildJsonDataPrompt,
  buildReactComponentPrompt,
} from './prompts';

// 유틸리티
export { 
  capitalize,
  koreanToEnglish,
  toKebabCase,
  toSnakeCase,
  sanitizeFilename,
  formatNumber,
  formatDate,
  getCurrentYearMonth,
  deepClone,
  isEmpty,
  intersection,
  unique,
} from './utils';
