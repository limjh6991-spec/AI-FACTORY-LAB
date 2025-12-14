/**
 * 화면 생성기 API 라우터 (리팩토링 버전)
 * 
 * 구조:
 * - _shared/: 공통 타입, 유틸리티, 검증 로직
 * - procedures/: tRPC 프로시저 (validate, preview, query, tempScreen, publish)
 * - templates/: 화면 유형별 템플릿 생성기 (향후 확장)
 * 
 * 지원 화면 유형:
 * - SIMPLE_GRID: 단순 조회 화면 (현재)
 * - SIMPLE_GRID_CRUD: 단순 CRUD 화면 (향후)
 * - COMPLEX_GRID: 복잡 조회 화면 (향후)
 * - COMPLEX_GRID_CRUD: 복잡 CRUD 화면 (향후)
 * - GRID_WITH_CHART: CRUD + 차트 화면 (향후)
 * 
 * @module screenGenerator
 */

import { createTRPCRouter } from "~/server/api/trpc";
import {
  validateTemplate,
  generatePreview,
  generatePreviewTemplate,
  generateCrudPreview,
  generateQuery,
  getTableList,
  getTableColumns,
  saveTempScreen,
  getTempScreenList,
  getTempScreen,
  deleteTempScreen,
  publishScreen,
  generateReactComponent,
} from "./procedures";

/**
 * 화면 생성기 tRPC 라우터
 */
export const screenGeneratorRouter = createTRPCRouter({
  // ============================================================
  // 검증 (Validation)
  // ============================================================
  
  /** Excel 템플릿 검증 */
  validateTemplate,
  
  // ============================================================
  // 미리보기 (Preview)
  // ============================================================
  
  /** Claude API + 템플릿 기반 미리보기 생성 */
  generatePreview,
  
  /** 템플릿 기반 미리보기 생성 (Claude API 없이) */
  generatePreviewTemplate,
  
  /** CRUD 화면 미리보기 생성 */
  generateCrudPreview,
  
  // ============================================================
  // 쿼리 (Query)
  // ============================================================
  
  /** SQL 쿼리 자동 생성 */
  generateQuery,
  
  /** DB 테이블 목록 조회 */
  getTableList,
  
  /** 테이블 컬럼 정보 조회 */
  getTableColumns,
  
  // ============================================================
  // 임시화면 관리 (Temp Screen)
  // ============================================================
  
  /** 임시화면 저장 */
  saveTempScreen,
  
  /** 임시화면 목록 조회 */
  getTempScreenList,
  
  /** 임시화면 상세 조회 */
  getTempScreen,
  
  /** 임시화면 삭제 */
  deleteTempScreen,
  
  // ============================================================
  // 발행 (Publish)
  // ============================================================
  
  /** 임시화면을 정식 화면으로 발행 */
  publishScreen,
  
  /** React 컴포넌트 생성 */
  generateReactComponent,
});

// 타입 re-export
export * from './_shared/types';
