/**
 * 화면 생성 템플릿 모듈
 * 
 * 각 화면 유형별 템플릿을 export합니다.
 * 
 * @module screenGenerator/templates
 */

// Base
export {
  BaseTemplate,
  type ComponentGenerationResult,
  type ApiGenerationResult,
  type ScreenGenerationResult,
  type ICrudTemplate,
} from './base';

// Templates - AG Grid
export { SimpleGridCrudTemplate } from './simple-grid-crud';

// Templates - RealGrid
export { RealGridCrudTemplate } from './realgrid-crud';

// Future templates (예정)
// export { SimpleGridTemplate } from './simpleGrid';
// export { ComplexGridTemplate } from './complexGrid';
// export { ComplexGridCrudTemplate } from './complexGridCrud';
// export { GridWithChartTemplate } from './gridWithChart';

import { ScreenType } from '../_shared/types';
import { BaseTemplate } from './base';
import { SimpleGridCrudTemplate } from './simple-grid-crud';
import { RealGridCrudTemplate } from './realgrid-crud';

/**
 * 화면 유형에 따른 템플릿 인스턴스 반환
 * 
 * @param screenType 화면 유형
 * @returns 해당 템플릿 인스턴스 또는 null
 */
export function getTemplateByScreenType(screenType: ScreenType): BaseTemplate | null {
  switch (screenType) {
    // AG Grid 템플릿
    case ScreenType.SIMPLE_GRID_CRUD:
      return new SimpleGridCrudTemplate();
    // RealGrid 템플릿
    case ScreenType.REALGRID_CRUD:
      return new RealGridCrudTemplate();
    // 추후 추가될 템플릿들
    // case ScreenType.SIMPLE_GRID:
    //   return new SimpleGridTemplate();
    // case ScreenType.COMPLEX_GRID:
    //   return new ComplexGridTemplate();
    // case ScreenType.COMPLEX_GRID_CRUD:
    //   return new ComplexGridCrudTemplate();
    // case ScreenType.GRID_WITH_CHART:
    //   return new GridWithChartTemplate();
    default:
      return null;
  }
}

/**
 * 그리드 유형 (AG Grid / RealGrid)
 */
export type GridType = 'ag-grid' | 'realgrid';

/**
 * 그리드 유형에 따른 CRUD 템플릿 반환
 * 
 * @param gridType 그리드 유형
 * @returns 해당 템플릿 인스턴스
 */
export function getCrudTemplateByGridType(gridType: GridType): BaseTemplate {
  switch (gridType) {
    case 'realgrid':
      return new RealGridCrudTemplate();
    case 'ag-grid':
    default:
      return new SimpleGridCrudTemplate();
  }
}

/**
 * 모든 템플릿 목록 반환
 */
export function getAllTemplates(): BaseTemplate[] {
  return [
    new SimpleGridCrudTemplate(),
    new RealGridCrudTemplate(),
    // 추후 추가될 템플릿들
  ];
}

