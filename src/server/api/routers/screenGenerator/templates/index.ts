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

// Templates
export { SimpleGridCrudTemplate } from './simpleGridCrud';

// Future templates (예정)
// export { SimpleGridTemplate } from './simpleGrid';
// export { ComplexGridTemplate } from './complexGrid';
// export { ComplexGridCrudTemplate } from './complexGridCrud';
// export { GridWithChartTemplate } from './gridWithChart';

import { ScreenType } from '../_shared/types';
import { BaseTemplate } from './base';
import { SimpleGridCrudTemplate } from './simpleGridCrud';

/**
 * 화면 유형에 따른 템플릿 인스턴스 반환
 * 
 * @param screenType 화면 유형
 * @returns 해당 템플릿 인스턴스 또는 null
 */
export function getTemplateByScreenType(screenType: ScreenType): BaseTemplate | null {
  switch (screenType) {
    case ScreenType.SIMPLE_GRID_CRUD:
      return new SimpleGridCrudTemplate();
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
 * 모든 템플릿 목록 반환
 */
export function getAllTemplates(): BaseTemplate[] {
  return [
    new SimpleGridCrudTemplate(),
    // 추후 추가될 템플릿들
  ];
}
