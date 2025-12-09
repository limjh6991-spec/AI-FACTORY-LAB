/**
 * 화면 생성 템플릿 기반 클래스
 * 
 * 모든 화면 유형별 템플릿이 상속받아야 하는 추상 클래스
 * 공통 유틸리티 메서드와 인터페이스를 정의합니다.
 * 
 * @module screenGenerator/templates/base/BaseTemplate
 */

import { 
  type ParsedData, 
  type GridColumnDef,
  ScreenType 
} from '../../_shared/types';

// ============================================================
// 생성 결과 타입
// ============================================================

/**
 * 컴포넌트 생성 결과
 */
export interface ComponentGenerationResult {
  /** 생성 성공 여부 */
  success: boolean;
  /** 파일 경로 (상대 경로) */
  filePath: string;
  /** 파일명 */
  fileName: string;
  /** 생성된 코드 */
  code: string;
  /** 에러 메시지 */
  error?: string;
}

/**
 * API 라우터 생성 결과
 */
export interface ApiGenerationResult {
  /** 생성 성공 여부 */
  success: boolean;
  /** 라우터 파일 경로 */
  routerPath: string;
  /** 라우터 코드 */
  routerCode: string;
  /** 프로시저 목록 */
  procedures: string[];
  /** 에러 메시지 */
  error?: string;
}

/**
 * 전체 화면 생성 결과
 */
export interface ScreenGenerationResult {
  /** 생성 성공 여부 */
  success: boolean;
  /** 화면 ID */
  screenId: string;
  /** 화면명 */
  screenName: string;
  /** 생성된 컴포넌트 정보 */
  component: ComponentGenerationResult;
  /** 생성된 API 정보 (CRUD인 경우) */
  api?: ApiGenerationResult;
  /** 경고 메시지 목록 */
  warnings: string[];
  /** 생성 시간 (ms) */
  generationTime: number;
}

// ============================================================
// 추상 템플릿 클래스
// ============================================================

/**
 * 화면 생성 템플릿 추상 클래스
 * 
 * @abstract
 * @example
 * ```typescript
 * class SimpleGridCrudTemplate extends BaseTemplate {
 *   protected screenType = ScreenType.SIMPLE_GRID_CRUD;
 *   
 *   async generateComponent(data: CrudParsedData): Promise<ComponentGenerationResult> {
 *     // CRUD 컴포넌트 생성 로직
 *   }
 * }
 * ```
 */
export abstract class BaseTemplate {
  // ============================================================
  // 추상 멤버 (서브클래스에서 구현 필수)
  // ============================================================
  
  /** 템플릿이 지원하는 화면 유형 */
  protected abstract readonly screenType: ScreenType;
  
  /** 템플릿 설명 */
  protected abstract readonly description: string;

  /**
   * 컴포넌트 코드 생성
   * @param data 파싱된 Excel 데이터
   * @returns 컴포넌트 생성 결과
   */
  abstract generateComponent(data: ParsedData): Promise<ComponentGenerationResult>;

  // ============================================================
  // 공통 유틸리티 메서드
  // ============================================================

  /**
   * 화면 유형 반환
   */
  getScreenType(): ScreenType {
    return this.screenType;
  }

  /**
   * 템플릿 설명 반환
   */
  getDescription(): string {
    return this.description;
  }

  /**
   * 컬럼명을 camelCase로 변환
   * @param columnName DB 컬럼명 (snake_case)
   * @returns camelCase 문자열
   */
  protected toCamelCase(columnName: string): string {
    return columnName
      .toLowerCase()
      .replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
  }

  /**
   * 컬럼명을 PascalCase로 변환
   * @param columnName DB 컬럼명 (snake_case)
   * @returns PascalCase 문자열
   */
  protected toPascalCase(columnName: string): string {
    const camel = this.toCamelCase(columnName);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
  }

  /**
   * 화면 ID를 컴포넌트명으로 변환
   * @param screenId 화면 ID (예: SC001)
   * @param screenName 화면명 (예: 거래처관리)
   * @returns 컴포넌트명 (예: SC001CustomerMasterScreen)
   */
  protected getComponentName(screenId: string, screenName: string): string {
    // 한글 화면명은 영문 suffix로 대체
    const suffix = this.getEnglishSuffix(screenName);
    return `${screenId}${suffix}Screen`;
  }

  /**
   * 한글 화면명에서 영문 suffix 추출
   * @param screenName 한글 화면명
   * @returns 영문 suffix
   */
  protected getEnglishSuffix(screenName: string): string {
    // 화면명 매핑 (확장 가능)
    const nameMapping: Record<string, string> = {
      '거래처관리': 'CustomerMaster',
      '품목관리': 'ItemMaster',
      '창고관리': 'WarehouseMaster',
      '부서관리': 'DepartmentMaster',
      '직원관리': 'EmployeeMaster',
      '코드관리': 'CommonCode',
      '단위관리': 'UnitMaster',
      '계정과목': 'AccountMaster',
      '프로젝트관리': 'ProjectMaster',
      '설비관리': 'EquipmentMaster',
    };

    return nameMapping[screenName] ?? 'Master';
  }

  /**
   * 파일명 생성 (컴포넌트용)
   * @param screenId 화면 ID
   * @returns 파일명
   */
  protected getFileName(screenId: string): string {
    return `${screenId}Screen.tsx`;
  }

  /**
   * 상대 경로 생성
   * @param screenId 화면 ID
   * @param isTemp 임시 저장 여부
   * @returns 상대 경로
   */
  protected getFilePath(screenId: string, isTemp: boolean = true): string {
    const basePath = isTemp 
      ? 'generated/screens/temp'
      : 'generated/screens/published';
    return `${basePath}/${screenId}/${this.getFileName(screenId)}`;
  }

  /**
   * 컬럼 정의를 AG Grid ColDef 문자열로 변환
   * @param columns 컬럼 정의 배열
   * @returns AG Grid ColDef 코드 문자열
   */
  protected generateColumnDefs(columns: GridColumnDef[]): string {
    const colDefs = columns.map(col => {
      const parts: string[] = [];
      
      parts.push(`headerName: '${col.headerName}'`);
      parts.push(`field: '${col.field}'`);
      
      if (col.width) {
        parts.push(`width: ${col.width}`);
      }
      
      if (col.type) {
        parts.push(`type: '${col.type}'`);
      }
      
      if (col.align) {
        const alignClass = col.align === 'right' ? 'ag-right-aligned-cell' : 
                          col.align === 'center' ? 'ag-center-aligned-cell' : '';
        if (alignClass) {
          parts.push(`cellClass: '${alignClass}'`);
        }
      }

      return `    { ${parts.join(', ')} }`;
    });

    return `[\n${colDefs.join(',\n')}\n  ]`;
  }

  /**
   * Import 문 생성
   * @param imports Import 정보 배열
   * @returns Import 코드 문자열
   */
  protected generateImports(imports: Array<{
    items: string[];
    from: string;
    isType?: boolean;
  }>): string {
    return imports.map(({ items, from, isType }) => {
      const typePrefix = isType ? 'type ' : '';
      return `import { ${typePrefix}${items.join(', ')} } from '${from}';`;
    }).join('\n');
  }

  /**
   * 기본 컴포넌트 코드 래퍼 생성
   * @param componentName 컴포넌트명
   * @param imports Import 코드
   * @param body 컴포넌트 본문
   * @returns 전체 컴포넌트 코드
   */
  protected wrapComponent(
    componentName: string,
    imports: string,
    body: string
  ): string {
    return `/**
 * ${componentName}
 * 
 * 이 파일은 AI Factory Lab에 의해 자동 생성되었습니다.
 * 수정이 필요한 경우 직접 편집하거나 재생성해주세요.
 * 
 * @generated
 */

'use client';

${imports}

${body}

export default ${componentName};
`;
  }

  /**
   * 에러 결과 생성 헬퍼
   * @param error 에러 메시지
   * @param screenId 화면 ID
   * @returns 실패 결과 객체
   */
  protected createErrorResult(
    error: string,
    screenId: string = 'unknown'
  ): ComponentGenerationResult {
    return {
      success: false,
      filePath: '',
      fileName: '',
      code: '',
      error,
    };
  }

  /**
   * 현재 날짜/시간 문자열 (주석용)
   */
  protected getTimestamp(): string {
    return new Date().toISOString();
  }
}

// ============================================================
// CRUD 템플릿 확장 인터페이스
// ============================================================

/**
 * CRUD 템플릿 인터페이스
 * CRUD 기능이 있는 템플릿이 구현해야 하는 추가 메서드
 */
export interface ICrudTemplate {
  /**
   * API 라우터 코드 생성
   * @param data 파싱된 CRUD 데이터
   * @returns API 생성 결과
   */
  generateApi(data: ParsedData): Promise<ApiGenerationResult>;

  /**
   * 전체 화면 생성 (컴포넌트 + API)
   * @param data 파싱된 CRUD 데이터
   * @returns 전체 화면 생성 결과
   */
  generateScreen(data: ParsedData): Promise<ScreenGenerationResult>;
}
