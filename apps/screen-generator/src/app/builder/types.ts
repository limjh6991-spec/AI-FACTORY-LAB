/**
 * 레이아웃 빌더 타입 정의 (멀티 슬롯 지원)
 */

// 레이아웃 타입 (영역)
export type LayoutType = 'ToolbarRow' | 'Row2' | 'Row3' | 'FullWidth';

// 컴포넌트 타입
export type ComponentType = 'Option' | 'Button' | 'Tab' | 'Grid' | 'Chart';

// 단일 컴포넌트
export interface ComponentItem {
    type: ComponentType;
    templateId?: string;
    label?: string;
}

// 슬롯 (영역 내 개별 공간)
export interface Slot {
    id: string;
    components: ComponentItem[];  // 옵션/버튼은 여러개, 그리드/차트는 1개
}

export interface LayoutItem {
    i: string;            // 고유 ID
    type: LayoutType;     // 레이아웃 타입
    x: number;            // 그리드 X 위치
    y: number;            // 그리드 Y 위치
    w: number;            // 너비 (그리드 단위)
    h: number;            // 높이 (그리드 단위)
    minW?: number;        // 최소 너비
    minH?: number;        // 최소 높이
    slots: Slot[];        // 슬롯 배열 (2열=2개, 3열=3개)
}

// 레이아웃 정의 (영역)
export interface LayoutDefinition {
    type: LayoutType;
    label: string;
    icon: string;
    slotCount: number;    // 슬롯 개수
    defaultSize: { w: number; h: number };
    minSize: { w: number; h: number };
}

// 컴포넌트 정의
export interface ComponentDefinition {
    type: ComponentType;
    label: string;
    icon: string;
    multiSelect: boolean;  // 여러개 추가 가능 여부
}

// 레이아웃 목록
export const LAYOUT_DEFINITIONS: LayoutDefinition[] = [
    {
        type: 'ToolbarRow',
        label: '툴바 영역',
        icon: 'PanelTop',
        slotCount: 1,
        defaultSize: { w: 12, h: 1 },
        minSize: { w: 6, h: 1 }
    },
    {
        type: 'FullWidth',
        label: '전체 너비',
        icon: 'Square',
        slotCount: 1,
        defaultSize: { w: 12, h: 4 },
        minSize: { w: 6, h: 2 }
    },
    {
        type: 'Row2',
        label: '2열 영역',
        icon: 'Columns2',
        slotCount: 2,
        defaultSize: { w: 12, h: 4 },
        minSize: { w: 8, h: 2 }
    },
    {
        type: 'Row3',
        label: '3열 영역',
        icon: 'Columns3',
        slotCount: 3,
        defaultSize: { w: 12, h: 4 },
        minSize: { w: 9, h: 2 }
    },
];

// 컴포넌트 목록
export const COMPONENT_DEFINITIONS: ComponentDefinition[] = [
    { type: 'Option', label: '옵션', icon: 'Settings', multiSelect: true },
    { type: 'Button', label: '버튼', icon: 'MousePointer', multiSelect: true },
    { type: 'Tab', label: '탭', icon: 'Layers', multiSelect: false },
    { type: 'Grid', label: '그리드', icon: 'Table', multiSelect: false },
    { type: 'Chart', label: '차트', icon: 'BarChart2', multiSelect: false },
];

// 컴포넌트별 템플릿 (공통 컴포넌트 목록)
export const COMPONENT_TEMPLATES: Record<ComponentType, { id: string; label: string }[]> = {
    Option: [
        // 기본 옵션
        { id: 'SiteSelect', label: '사업장 선택' },
        { id: 'YearMonthPicker', label: '기준월 선택' },
        { id: 'YearPicker', label: '기준년도 선택' },
        // 마스터 데이터 옵션
        { id: 'CustomerSelect', label: '거래처 선택' },
        { id: 'MaterialSelect', label: '자재 선택' },
        { id: 'ProductSelect', label: '제품 선택' },
        { id: 'ModelSelect', label: '모델 선택' },
        { id: 'EquipmentSelect', label: '설비 선택' },
        { id: 'AccountSelect', label: '계정 선택' },
        { id: 'ExpenSelSelect', label: '경비구분 선택' },
        { id: 'DepartmentSelect', label: '부서 선택' },
        { id: 'CostCenterSelect', label: '코스트센터 선택' },
        { id: 'UserSelect', label: '사용자 선택' },
        { id: 'SelCodeSelect', label: '공통코드 선택' },
    ],
    Button: [
        { id: 'btn_search', label: '조회' },
        { id: 'btn_save', label: '저장' },
        { id: 'btn_add', label: '추가' },
        { id: 'btn_delete', label: '삭제' },
        { id: 'btn_excel', label: '엑셀' },
        { id: 'btn_reset', label: '초기화' },
        { id: 'btn_print', label: '인쇄' },
        { id: 'btn_refresh', label: '새로고침' },
        { id: 'btn_copy', label: '복사' },
        { id: 'btn_edit', label: '수정' },
        { id: 'btn_confirm', label: '확인' },
        { id: 'btn_cancel', label: '취소' },
        { id: 'btn_upload', label: '업로드' },
        { id: 'btn_filter', label: '필터' },
    ],
    Tab: [
        { id: 'tab_basic', label: '기본 탭' },
        { id: 'tab_vertical', label: '세로 탭' },
    ],
    Grid: [
        { id: 'grid_basic', label: '기본 그리드' },
        { id: 'grid_editable', label: '편집 그리드' },
        { id: 'grid_tree', label: '트리 그리드' },
        { id: 'grid_pivot', label: '피벗 그리드' },
        { id: 'grid_master_detail', label: '마스터-디테일' },
        { id: 'grid_grouped', label: '그룹 그리드' },
    ],
    Chart: [
        { id: 'chart_bar', label: '막대 차트' },
        { id: 'chart_line', label: '라인 차트' },
        { id: 'chart_pie', label: '파이 차트' },
        { id: 'chart_area', label: '영역 차트' },
        { id: 'chart_combo', label: '콤보 차트' },
        { id: 'chart_gauge', label: '게이지' },
        { id: 'chart_sparkline', label: '스파크라인' },
    ],
};

// ============================================
// 템플릿 프리셋 (미리 정의된 화면 레이아웃)
// ============================================

export interface TemplatePreset {
    id: string;
    name: string;
    description: string;
    icon: string;
    layout: LayoutItem[];
}

export const TEMPLATE_PRESETS: TemplatePreset[] = [
    {
        id: 'basic-crud',
        name: '기본 CRUD',
        description: '옵션 + 버튼 + 그리드',
        icon: 'TableProperties',
        layout: [
            {
                i: 'layout_1',
                type: 'ToolbarRow',
                x: 0, y: 0, w: 12, h: 1,
                minW: 6, minH: 1,
                slots: [{
                    id: 'layout_1_slot_1',
                    components: [
                        { type: 'Option', templateId: 'opt_search', label: '검색 옵션' },
                        { type: 'Option', templateId: 'opt_date', label: '기간 옵션' },
                        { type: 'Button', templateId: 'btn_search', label: '조회' },
                        { type: 'Button', templateId: 'btn_save', label: '저장' },
                        { type: 'Button', templateId: 'btn_export', label: '엑셀' },
                    ]
                }]
            },
            {
                i: 'layout_2',
                type: 'FullWidth',
                x: 0, y: 1, w: 12, h: 6,
                minW: 6, minH: 2,
                slots: [{
                    id: 'layout_2_slot_1',
                    components: [{ type: 'Grid', templateId: 'grid_basic', label: '기본 그리드' }]
                }]
            }
        ]
    },
    {
        id: 'master-detail',
        name: '마스터-디테일',
        description: '2열 그리드 (1:N 관계)',
        icon: 'Columns2',
        layout: [
            {
                i: 'layout_1',
                type: 'ToolbarRow',
                x: 0, y: 0, w: 12, h: 1,
                minW: 6, minH: 1,
                slots: [{
                    id: 'layout_1_slot_1',
                    components: [
                        { type: 'Option', templateId: 'opt_search', label: '검색 옵션' },
                        { type: 'Button', templateId: 'btn_search', label: '조회' },
                    ]
                }]
            },
            {
                i: 'layout_2',
                type: 'Row2',
                x: 0, y: 1, w: 12, h: 6,
                minW: 8, minH: 2,
                slots: [
                    { id: 'layout_2_slot_1', components: [{ type: 'Grid', templateId: 'grid_basic', label: '마스터 그리드' }] },
                    { id: 'layout_2_slot_2', components: [{ type: 'Grid', templateId: 'grid_basic', label: '디테일 그리드' }] }
                ]
            }
        ]
    },
    {
        id: 'dashboard',
        name: '대시보드',
        description: '차트 3개 + 그리드',
        icon: 'BarChart2',
        layout: [
            {
                i: 'layout_1',
                type: 'Row3',
                x: 0, y: 0, w: 12, h: 3,
                minW: 9, minH: 2,
                slots: [
                    { id: 'layout_1_slot_1', components: [{ type: 'Chart', templateId: 'chart_bar', label: '막대 차트' }] },
                    { id: 'layout_1_slot_2', components: [{ type: 'Chart', templateId: 'chart_line', label: '라인 차트' }] },
                    { id: 'layout_1_slot_3', components: [{ type: 'Chart', templateId: 'chart_pie', label: '파이 차트' }] }
                ]
            },
            {
                i: 'layout_2',
                type: 'FullWidth',
                x: 0, y: 3, w: 12, h: 4,
                minW: 6, minH: 2,
                slots: [{
                    id: 'layout_2_slot_1',
                    components: [{ type: 'Grid', templateId: 'grid_basic', label: '기본 그리드' }]
                }]
            }
        ]
    },
    {
        id: 'report',
        name: '리포트',
        description: '옵션 + 차트 + 그리드',
        icon: 'FileText',
        layout: [
            {
                i: 'layout_1',
                type: 'ToolbarRow',
                x: 0, y: 0, w: 12, h: 1,
                minW: 6, minH: 1,
                slots: [{
                    id: 'layout_1_slot_1',
                    components: [
                        { type: 'Option', templateId: 'opt_date', label: '기간 옵션' },
                        { type: 'Option', templateId: 'opt_combo', label: '콤보박스' },
                        { type: 'Button', templateId: 'btn_search', label: '조회' },
                        { type: 'Button', templateId: 'btn_export', label: '엑셀' },
                        { type: 'Button', templateId: 'btn_print', label: '인쇄' },
                    ]
                }]
            },
            {
                i: 'layout_2',
                type: 'Row2',
                x: 0, y: 1, w: 12, h: 4,
                minW: 8, minH: 2,
                slots: [
                    { id: 'layout_2_slot_1', components: [{ type: 'Chart', templateId: 'chart_bar', label: '막대 차트' }] },
                    { id: 'layout_2_slot_2', components: [{ type: 'Chart', templateId: 'chart_line', label: '라인 차트' }] }
                ]
            },
            {
                i: 'layout_3',
                type: 'FullWidth',
                x: 0, y: 5, w: 12, h: 4,
                minW: 6, minH: 2,
                slots: [{
                    id: 'layout_3_slot_1',
                    components: [{ type: 'Grid', templateId: 'grid_basic', label: '기본 그리드' }]
                }]
            }
        ]
    }
];

