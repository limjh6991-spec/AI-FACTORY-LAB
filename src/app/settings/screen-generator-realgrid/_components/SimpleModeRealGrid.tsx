"use client";

import { useState, useCallback, lazy, Suspense } from "react";
import { api } from "~/trpc/react";
import {
  Eye,
  Loader2,
  Monitor,
  Tablet,
  Smartphone,
  FileDown,
  FolderTree,
  Database,
  Search,
  Plus,
  X,
  Type,
  Hash,
  Calendar,
  CalendarRange,
  CalendarDays,
  ChevronDown,
  ListChecks,
  CheckSquare,
  // BiSelect 시리즈 아이콘
  Building2,
  FileStack,
  Users,
  DollarSign,
  UserCircle,
  Wallet,
  Receipt,
  Store,
  Settings,
  Package,
} from "lucide-react";
import { cn } from "~/lib/utils";
import {
  SearchComponentType,
  SEARCH_COMPONENT_CATALOG,
  generateStateName,
  generatePlaceholder,
  type SearchComponentDef,
} from "~/features/screen-generator/types/search-components";

// Sandpack 지연 로드
const SandpackPreview = lazy(() => import("~/components/preview/SandpackPreview"));
// RealGrid Mock 컴포넌트 코드 (Sandpack용)
const REALGRID_MOCK_CODE = `
// RealGrid Mock for Sandpack Preview
// 실제 RealGrid 대신 HTML Table로 데이터를 표시합니다.

export const ValueType = {
  TEXT: 'text',
  NUMBER: 'number',
  DATE: 'date',
  BOOLEAN: 'boolean',
};

export class LocalDataProvider {
  constructor() {
    this._data = [];
    this._fields = [];
    this._onRowUpdated = null;
    this._onRowInserted = null;
  }
  
  setFields(fields) {
    this._fields = fields;
  }
  
  setRows(rows) {
    this._data = rows || [];
  }
  
  getRows() {
    return this._data;
  }
  
  getFields() {
    return this._fields;
  }
  
  clearRows() {
    this._data = [];
  }
  
  getJsonRow(rowId) {
    return this._data[rowId] || {};
  }
  
  getJsonRows() {
    return this._data;
  }
  
  insertRow(rowId, values) {
    this._data.splice(rowId, 0, values);
  }
  
  updateRow(rowId, values) {
    if (this._data[rowId]) {
      this._data[rowId] = { ...this._data[rowId], ...values };
    }
  }
  
  removeRow(rowId) {
    this._data.splice(rowId, 1);
  }
  
  getRowCount() {
    return this._data.length;
  }
  
  onRowUpdated(fn) { this._onRowUpdated = fn; }
  onRowInserted(fn) { this._onRowInserted = fn; }
  
  dispose() {
    this._data = [];
    this._fields = [];
  }
  
  destroy() {
    this.dispose();
  }
}

export class GridView {
  constructor(container) {
    this._container = container;
    this._columns = [];
    this._dataProvider = null;
    this._options = {};
  }
  
  setDataSource(provider) {
    this._dataProvider = provider;
    this._render();
  }
  
  setColumns(columns) {
    this._columns = columns;
    this._render();
  }
  
  // 옵션 설정 메서드들 (no-op으로 처리)
  setDisplayOptions(options) { this._options.display = options; }
  setEditOptions(options) { this._options.edit = options; }
  setHeader(options) { this._options.header = options; }
  setStateBar(options) { this._options.stateBar = options; }
  setCheckBar(options) { this._options.checkBar = options; }
  setIndicator(options) { this._options.indicator = options; }
  setFooter(options) { this._options.footer = options; }
  setPanel(options) { this._options.panel = options; }
  setRowIndicator(options) { this._options.rowIndicator = options; }
  setSelectOptions(options) { this._options.select = options; }
  setCopyOptions(options) { this._options.copy = options; }
  setPasteOptions(options) { this._options.paste = options; }
  setSortingOptions(options) { this._options.sorting = options; }
  setFilteringOptions(options) { this._options.filtering = options; }
  setGroupingOptions(options) { this._options.grouping = options; }
  setFixedOptions(options) { this._options.fixed = options; }
  
  // 이벤트 핸들러
  onCellClicked(fn) {}
  onDataCellClicked(fn) {}
  onCellDblClicked(fn) {}
  onCurrentChanged(fn) {}
  onSelectionChanged(fn) {}
  onEditCommit(fn) {}
  onEditCanceled(fn) {}
  onValidateCell(fn) {}
  onValidateRow(fn) {}
  onKeyDown(fn) {}
  
  // 유틸리티 메서드
  commit() {}
  cancel() {}
  refresh() { this._render(); }
  resetSize() {}
  layoutByColumn() {}
  setFocus() {}
  getCurrent() { return { dataRow: 0, fieldIndex: 0 }; }
  setCurrent(options) {}
  getSelectedRows() { return []; }
  checkRow(row, checked) {}
  checkRows(rows, checked) {}
  checkAll(checked) {}
  getCheckedRows() { return []; }
  
  _render() {
    if (!this._container || !this._dataProvider) return;
    
    const data = this._dataProvider.getRows();
    const columns = this._columns;
    
    // 테이블 스타일
    const tableStyle = {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '14px',
      fontFamily: 'sans-serif',
    };
    
    const headerStyle = {
      backgroundColor: '#dbeafe',
      color: '#1e3a5f',
      fontWeight: '600',
      padding: '12px 8px',
      textAlign: 'left',
      borderBottom: '2px solid #93c5fd',
    };
    
    const cellStyle = {
      padding: '10px 8px',
      borderBottom: '1px solid #e5e7eb',
    };
    
    // HTML 생성
    let html = '<table style="' + Object.entries(tableStyle).map(([k,v]) => k.replace(/[A-Z]/g, m => '-' + m.toLowerCase()) + ':' + v).join(';') + '">';
    
    // 헤더
    html += '<thead><tr>';
    columns.forEach(col => {
      html += '<th style="' + Object.entries(headerStyle).map(([k,v]) => k.replace(/[A-Z]/g, m => '-' + m.toLowerCase()) + ':' + v).join(';') + '">';
      html += col.header?.text || col.name || col.fieldName;
      html += '</th>';
    });
    html += '</tr></thead>';
    
    // 바디
    html += '<tbody>';
    if (data.length === 0) {
      html += '<tr><td colspan="' + columns.length + '" style="text-align:center;padding:40px;color:#8d8d8d;">데이터가 없습니다</td></tr>';
    } else {
      data.forEach((row, idx) => {
        const rowBg = idx % 2 === 0 ? '#ffffff' : '#f9fafb';
        html += '<tr style="background-color:' + rowBg + '">';
        columns.forEach(col => {
          const value = row[col.fieldName] ?? '';
          html += '<td style="' + Object.entries(cellStyle).map(([k,v]) => k.replace(/[A-Z]/g, m => '-' + m.toLowerCase()) + ':' + v).join(';') + '">';
          html += value;
          html += '</td>';
        });
        html += '</tr>';
      });
    }
    html += '</tbody></table>';
    
    this._container.innerHTML = '<div style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;background:#fff;">' + html + '</div>';
  }
  
  dispose() {
    if (this._container) {
      this._container.innerHTML = '';
    }
  }
  
  destroy() {
    this.dispose();
  }
}

export default { GridView, LocalDataProvider, ValueType };
`;

// 아이콘 매핑
const iconMap: Record<string, any> = {
  Type,
  Hash,
  Calendar,
  CalendarRange,
  CalendarDays,
  ChevronDown,
  ListChecks,
  CheckSquare,
  // BiSelect 시리즈
  Building2,
  FileStack,
  Users,
  DollarSign,
  UserCircle,
  Wallet,
  Receipt,
  Store,
  Settings,
  Package,
};

// 컬럼 정보 타입
interface ColumnInfo {
  field: string;
  type: string;
  isPk: boolean;
  isNullable: boolean;
}

export default function SimpleModeRealGrid() {
  // 입력 State
  const [screenName, setScreenName] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [searchComponents, setSearchComponents] = useState<SearchComponentDef[]>([]);
  const [tableColumns, setTableColumns] = useState<ColumnInfo[]>([]);
  const [showComponentCatalog, setShowComponentCatalog] = useState(false);
  // 옵션 추가 모달 상태
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Set<SearchComponentType>>(new Set());

  // 출력 State
  const [generatedReact, setGeneratedReact] = useState<string | null>(null);
  const [generatedQuery, setGeneratedQuery] = useState("");
  const [previewTab, setPreviewTab] = useState<"grid" | "sql">("grid");
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [tempScreenId, setTempScreenId] = useState<string | null>(null);

  // 상태 플래그
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isFetchingSchema, setIsFetchingSchema] = useState(false);

  // API - RealGrid 전용
  const previewMutation = api.screenGenerator.generateRealGridPreview.useMutation();
  const saveTempMutation = api.screenGenerator.saveTempScreen.useMutation();
  const utils = api.useUtils();

  // 테이블 스키마 조회
  const fetchTableSchema = useCallback(async (tableName: string) => {
    if (!tableName.trim()) {
      setTableColumns([]);
      return;
    }

    setIsFetchingSchema(true);
    try {
      // tRPC utils를 사용하여 직접 호출
      const result = await utils.client.dbMeta.getTableSchema.query({ tableName });

      if (result.success && result.columns) {
        setTableColumns(result.columns);
        console.log('[SimpleMode] 테이블 스키마 조회 성공:', result.columns);
      } else {
        console.error('[SimpleMode] 테이블 스키마 조회 실패:', result.error);
        setTableColumns([]);
      }
    } catch (error) {
      console.error('[SimpleMode] 테이블 스키마 조회 오류:', error);
      setTableColumns([]);
    } finally {
      setIsFetchingSchema(false);
    }
  }, [utils]);

  // 테이블명 변경 핸들러
  const handleTableNameChange = useCallback((value: string) => {
    setSelectedTable(value);
  }, []);

  // 테이블명 입력 완료 (onBlur or Enter)
  const handleTableNameComplete = useCallback(() => {
    if (selectedTable.trim()) {
      fetchTableSchema(selectedTable.trim());
    }
  }, [selectedTable, fetchTableSchema]);

  // 옵션 추가 (복수 선택 적용)
  const applySelectedOptions = useCallback(() => {
    selectedOptions.forEach((type) => {
      const index = searchComponents.filter(c => c.type === type).length + 1;
      const catalog = SEARCH_COMPONENT_CATALOG.find(c => c.type === type);

      const newComponent: SearchComponentDef = {
        id: `${type.toLowerCase()}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        type,
        label: catalog?.example || '검색조건',
        name: generateStateName(type, index),
        placeholder: generatePlaceholder(type, catalog?.example || '검색조건'),
        required: false,
        width: type === SearchComponentType.DATE_RANGE ? 6 : 3,
      };

      setSearchComponents(prev => [...prev, newComponent]);
    });
    setSelectedOptions(new Set());
    setShowOptionsModal(false);
  }, [selectedOptions, searchComponents]);

  // 옵션 선택 토글
  const toggleOptionSelection = useCallback((type: SearchComponentType) => {
    setSelectedOptions(prev => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  }, []);

  // 검색 컴포넌트 삭제
  const removeSearchComponent = useCallback((id: string) => {
    setSearchComponents(prev => prev.filter(c => c.id !== id));
  }, []);

  // 검색 컴포넌트 레이블 수정
  const updateComponentLabel = useCallback((id: string, label: string) => {
    setSearchComponents(prev =>
      prev.map(c => c.id === id ? { ...c, label } : c)
    );
  }, []);

  // 미리보기 생성
  const handleGenerate = useCallback(async () => {
    if (!screenName.trim() || !selectedTable.trim()) {
      return;
    }

    setIsGenerating(true);

    try {
      // screenId는 테이블명 기반으로 자동 생성
      const autoScreenId = `SC_${selectedTable.trim().toUpperCase()}`;

      // searchComponents 변환
      const searchConditionsData = searchComponents.map(comp => ({
        field: comp.name,
        label: comp.label,
        type: comp.type,
        required: comp.required || false,
        placeholder: comp.placeholder,
      }));

      // crudColumns 변환 (tableColumns 사용)
      const crudColumnsData = tableColumns.map(col => ({
        field: col.field,
        headerName: col.field,
        width: 120,
        editorType: col.type === 'integer' || col.type === 'numeric' ? 'number' : 'text',
        editable: !col.isPk,
        required: !col.isNullable,
      }));

      const result = await previewMutation.mutateAsync({
        screenId: autoScreenId,
        screenName: screenName.trim(),
        tableName: selectedTable.trim(),
        searchConditions: searchConditionsData,
        crudColumns: crudColumnsData,
      } as any);

      if (result.success && result.component) {
        // API는 component를 문자열로 반환 (component.code가 아님)
        setGeneratedReact(result.component || null);
        // SQL 쿼리 저장
        if ((result as any).query) {
          setGeneratedQuery((result as any).query);
        }
      }
    } catch (error) {
      console.error("생성 오류:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [screenName, selectedTable, tableColumns, searchComponents, previewMutation]);

  // 임시 저장
  const handleSave = useCallback(async () => {
    if (!screenName.trim()) return;

    setIsSaving(true);

    try {
      const result = await saveTempMutation.mutateAsync({
        screenName: screenName.trim(),
        screenNameEn: selectedTable.trim(),
        tableName: selectedTable.trim(),
        reactContent: generatedReact || undefined,
        sqlQuery: generatedQuery || undefined,
      });

      if (result.success) {
        setTempScreenId(result.screenId || null);
      }
    } catch (error) {
      console.error("저장 오류:", error);
    } finally {
      setIsSaving(false);
    }
  }, [screenName, selectedTable, generatedReact, generatedQuery, saveTempMutation]);

  const isFormValid = screenName.trim() && selectedTable.trim();

  return (
    <div className="flex-1 flex gap-4 min-h-0 overflow-hidden">
      {/* 좌측: 입력 폼 */}
      <div className="w-[320px] shrink-0 flex flex-col min-h-0">
        <div className="bg-white border border-[#e0e0e0] flex flex-col flex-1">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#e0e0e0] bg-[#f4f4f4]">
            <Database className="h-4 w-4 text-[#0f62fe]" />
            <span className="font-medium text-sm text-[#161616]">CRUD 화면 설정</span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {/* 화면명 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#161616] mb-1">
                화면명 <span className="text-[#da1e28]">*</span>
              </label>
              <input
                type="text"
                value={screenName}
                onChange={(e) => setScreenName(e.target.value)}
                placeholder="예: 부서 관리"
                className="w-full h-10 px-3 border border-[#8d8d8d] focus:outline-none focus:border-[#0f62fe] focus:ring-1 focus:ring-[#0f62fe]"
              />
            </div>

            {/* 테이블명 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#161616] mb-1">
                테이블명 <span className="text-[#da1e28]">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={selectedTable}
                  onChange={(e) => handleTableNameChange(e.target.value)}
                  onBlur={handleTableNameComplete}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleTableNameComplete();
                    }
                  }}
                  placeholder="예: mst_dept"
                  className="w-full h-10 px-3 border border-[#8d8d8d] focus:outline-none focus:border-[#0f62fe] focus:ring-1 focus:ring-[#0f62fe]"
                />
                {isFetchingSchema && (
                  <div className="absolute right-2 top-2">
                    <Loader2 className="h-5 w-5 text-[#0f62fe] animate-spin" />
                  </div>
                )}
              </div>
              {tableColumns.length > 0 && (
                <p className="text-xs text-green-600 mt-1">
                  ✓ {tableColumns.length}개 컬럼 로드됨
                </p>
              )}
            </div>

            {/* 검색 조건 */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Search className="h-4 w-4 text-[#525252]" />
                <label className="text-sm font-medium text-[#161616]">검색 조건</label>
                <span className="text-xs text-[#8d8d8d]">(선택)</span>
              </div>

              {/* 추가된 검색 컴포넌트 */}
              {searchComponents.length > 0 && (
                <div className="space-y-2 mb-2">
                  {searchComponents.map((component) => {
                    const catalog = SEARCH_COMPONENT_CATALOG.find(c => c.type === component.type);
                    const Icon = iconMap[catalog?.icon || 'Type'];
                    return (
                      <div key={component.id} className="flex items-center gap-2 bg-[#e8f1ff] px-2 py-2 rounded">
                        <Icon className="h-4 w-4 text-[#0f62fe] shrink-0" />
                        <input
                          type="text"
                          value={component.label}
                          onChange={(e) => updateComponentLabel(component.id, e.target.value)}
                          className="flex-1 bg-transparent border-none outline-none text-sm text-[#0f62fe] font-medium"
                          placeholder="레이블 입력"
                        />
                        <span className="text-xs text-[#525252] shrink-0">{catalog?.displayName}</span>
                        <button
                          onClick={() => removeSearchComponent(component.id)}
                          className="text-[#da1e28] hover:bg-[#fff1f1] p-0.5 rounded shrink-0"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 옵션 추가 버튼 */}
              <button
                onClick={() => setShowOptionsModal(true)}
                className="w-full h-8 px-3 text-sm flex items-center justify-center gap-2 bg-[#f4f4f4] hover:bg-[#e0e0e0] text-[#525252] border border-dashed border-[#8d8d8d] rounded transition-colors"
              >
                <Plus className="h-4 w-4" />
                옵션추가
              </button>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex flex-col gap-2 px-3 py-3 border-t border-[#e0e0e0] bg-[#f4f4f4]">
            <button
              onClick={handleGenerate}
              disabled={!isFormValid || isGenerating}
              className={cn(
                "h-10 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors",
                isFormValid && !isGenerating
                  ? "bg-[#0f62fe] text-white hover:bg-[#0043ce]"
                  : "bg-[#c6c6c6] text-[#8d8d8d] cursor-not-allowed"
              )}
            >
              {isGenerating && <Loader2 className="h-4 w-4 animate-spin" />}
              미리보기 생성
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={!generatedReact || isSaving}
                className={cn(
                  "flex-1 h-8 px-3 text-sm font-medium flex items-center justify-center gap-1 transition-colors",
                  generatedReact
                    ? "bg-[#6929c4] text-white hover:bg-[#491d8b]"
                    : "bg-[#e0e0e0] text-[#8d8d8d] cursor-not-allowed"
                )}
              >
                {isSaving && <Loader2 className="h-3 w-3 animate-spin" />}
                <FileDown className="h-3 w-3" />
                저장
              </button>
              <a
                href="/settings/menu-realgrid"
                className={cn(
                  "flex-1 h-8 px-3 text-sm font-medium flex items-center justify-center gap-1 transition-colors",
                  tempScreenId
                    ? "bg-[#0f62fe] text-white hover:bg-[#0043ce]"
                    : "bg-[#e0e0e0] text-[#8d8d8d] cursor-not-allowed pointer-events-none"
                )}
              >
                <FolderTree className="h-3 w-3" />
                메뉴
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 우측: 미리보기 */}
      <div className="flex-1 bg-white border border-[#e0e0e0] flex flex-col min-h-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#e0e0e0] bg-[#f4f4f4]">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-[#8a3ffc]" />
            <span className="font-medium text-sm text-[#161616]">미리보기</span>
          </div>
          <div className="flex items-center gap-1">
            {/* 탭 전환 */}
            <div className="flex bg-[#e0e0e0] rounded p-0.5 mr-2">
              {[
                { id: "grid" as const, label: "RealGrid" },
                { id: "sql" as const, label: "API" },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setPreviewTab(id)}
                  className={cn(
                    "px-2 py-1 text-xs font-medium rounded transition-colors",
                    previewTab === id
                      ? "bg-white text-[#161616] shadow-sm"
                      : "text-[#525252] hover:text-[#161616]"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            {/* 반응형 */}
            {previewTab === "grid" && [
              { id: "desktop" as const, icon: Monitor },
              { id: "tablet" as const, icon: Tablet },
              { id: "mobile" as const, icon: Smartphone },
            ].map(({ id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setPreviewMode(id)}
                className={cn(
                  "p-1.5 rounded transition-colors",
                  previewMode === id
                    ? "bg-[#0f62fe] text-white"
                    : "hover:bg-[#e0e0e0] text-[#525252]"
                )}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 bg-[#f4f4f4]">
          {previewTab === "sql" && (
            <div className="bg-[#161616] h-full rounded overflow-auto">
              {generatedQuery ? (
                <pre className="p-4 text-sm text-[#f4f4f4] font-mono whitespace-pre-wrap">
                  {generatedQuery}
                </pre>
              ) : (
                <div className="h-full flex items-center justify-center text-[#8d8d8d] text-sm">
                  API 코드가 생성되면 여기에 표시됩니다
                </div>
              )}
            </div>
          )}

          {previewTab === "grid" && (
            <div className="bg-white border border-[#e0e0e0] h-full flex flex-col overflow-auto">
              {generatedReact ? (
                <Suspense fallback={
                  <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-[#0f62fe]" />
                  </div>
                }>
                  <SandpackPreview
                    code={generatedReact}
                    className="flex-1"
                    showEditor={false}
                    additionalFiles={{
                      "/realgrid.js": REALGRID_MOCK_CODE,
                      "/components/options.js": `
// Options Mock for Sandpack Preview
export const SiteSelect = ({ value, onChange, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label style={{ fontSize: 12, color: '#525252' }}>{label || '사업장'}</label>
    <select value={value} onChange={(e) => onChange?.(e.target.value)} style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0' }}>
      <option value="">선택</option>
      <option value="1000">본사</option>
      <option value="2000">공장</option>
    </select>
  </div>
);
export const YearMonthPicker = ({ value, onChange, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label style={{ fontSize: 12, color: '#525252' }}>{label || '년월'}</label>
    <input type="month" value={value} onChange={(e) => onChange?.(e.target.value)} style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0' }} />
  </div>
);
export const YearPicker = ({ value, onChange, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label style={{ fontSize: 12, color: '#525252' }}>{label || '년도'}</label>
    <input type="number" value={value} onChange={(e) => onChange?.(e.target.value)} placeholder="YYYY" style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0' }} />
  </div>
);
export const CustomerSelect = ({ value, onChange, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label style={{ fontSize: 12, color: '#525252' }}>{label || '거래처'}</label>
    <input type="text" value={value} onChange={(e) => onChange?.(e.target.value)} placeholder="거래처 검색" style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0' }} />
  </div>
);
export const MaterialSelect = ({ value, onChange, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label style={{ fontSize: 12, color: '#525252' }}>{label || '자재'}</label>
    <input type="text" value={value} onChange={(e) => onChange?.(e.target.value)} placeholder="자재 검색" style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0' }} />
  </div>
);
export const ModelSelect = ({ value, onChange, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label style={{ fontSize: 12, color: '#525252' }}>{label || '모델'}</label>
    <input type="text" value={value} onChange={(e) => onChange?.(e.target.value)} placeholder="모델 검색" style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0' }} />
  </div>
);
export const AccountSelect = ({ value, onChange, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label style={{ fontSize: 12, color: '#525252' }}>{label || '계정'}</label>
    <input type="text" value={value} onChange={(e) => onChange?.(e.target.value)} placeholder="계정 검색" style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0' }} />
  </div>
);
export const ExpenSelSelect = ({ value, onChange, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label style={{ fontSize: 12, color: '#525252' }}>{label || '경비항목'}</label>
    <input type="text" value={value} onChange={(e) => onChange?.(e.target.value)} placeholder="경비항목 검색" style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0' }} />
  </div>
);
export const DepartmentSelect = ({ value, onChange, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label style={{ fontSize: 12, color: '#525252' }}>{label || '부서'}</label>
    <input type="text" value={value} onChange={(e) => onChange?.(e.target.value)} placeholder="부서 검색" style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0' }} />
  </div>
);
export const SelCodeSelect = ({ value, onChange, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label style={{ fontSize: 12, color: '#525252' }}>{label || '선택코드'}</label>
    <input type="text" value={value} onChange={(e) => onChange?.(e.target.value)} placeholder="코드 검색" style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0' }} />
  </div>
);
`,
                      "/realgrid-style.css": `/* RealGrid Style Mock - Sandpack Preview */`,
                      "/jszip.js": `// JSZip Mock for Sandpack Preview
const JSZip = function() {
  this.files = {};
};
JSZip.prototype.file = function(name, content) { this.files[name] = content; return this; };
JSZip.prototype.generateAsync = function() { return Promise.resolve(new Blob()); };
export default JSZip;
`,
                    }}
                    importReplacements={{
                      "realgrid": "./realgrid",
                      "realgrid/dist/realgrid-style.css": "./realgrid-style.css",
                      "~/components/options": "./components/options",
                      "jszip": "./jszip",
                    }}
                  />
                </Suspense>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-[#8d8d8d]">
                  <Eye className="h-16 w-16 opacity-30" />
                  <p className="text-sm mt-4">화면 정보를 입력하고</p>
                  <p className="text-sm">[미리보기 생성]을 클릭하세요</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 옵션 추가 모달 */}
      {showOptionsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[480px] max-h-[80vh] flex flex-col shadow-xl rounded-lg">
            {/* 헤더 */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#e0e0e0] bg-[#f4f4f4] rounded-t-lg">
              <h3 className="font-medium text-[#161616]">공통 옵션 추가</h3>
              <button
                onClick={() => {
                  setShowOptionsModal(false);
                  setSelectedOptions(new Set());
                }}
                className="p-1 hover:bg-[#e0e0e0] rounded"
              >
                <X className="h-4 w-4 text-[#525252]" />
              </button>
            </div>

            {/* 선택 안내 */}
            <div className="px-4 py-2 bg-[#e8f1ff] border-b border-[#d0e2ff]">
              <p className="text-xs text-[#0043ce]">
                추가할 옵션을 선택하세요 (복수 선택 가능)
              </p>
            </div>

            {/* 옵션 목록 */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-2 gap-2">
                {SEARCH_COMPONENT_CATALOG.map((catalog) => {
                  const Icon = iconMap[catalog.icon];
                  const isSelected = selectedOptions.has(catalog.type);
                  return (
                    <button
                      key={catalog.type}
                      onClick={() => toggleOptionSelection(catalog.type)}
                      className={cn(
                        "flex items-start gap-3 p-3 text-left rounded-lg border transition-colors",
                        isSelected
                          ? "bg-[#e8f1ff] border-[#0f62fe] ring-1 ring-[#0f62fe]"
                          : "bg-white border-[#e0e0e0] hover:bg-[#f4f4f4]"
                      )}
                    >
                      {/* 체크박스 */}
                      <div className={cn(
                        "w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5",
                        isSelected
                          ? "bg-[#0f62fe] border-[#0f62fe]"
                          : "border-[#8d8d8d]"
                      )}>
                        {isSelected && (
                          <CheckSquare className="h-4 w-4 text-white" />
                        )}
                      </div>
                      {/* 아이콘 & 정보 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-[#0f62fe] shrink-0" />
                          <span className="text-sm font-medium text-[#161616]">{catalog.displayName}</span>
                        </div>
                        <p className="text-xs text-[#525252] mt-1 line-clamp-2">{catalog.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 푸터 */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-[#e0e0e0] bg-[#f4f4f4] rounded-b-lg">
              <span className="text-sm text-[#525252]">
                {selectedOptions.size > 0 ? `${selectedOptions.size}개 선택됨` : '선택된 옵션 없음'}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowOptionsModal(false);
                    setSelectedOptions(new Set());
                  }}
                  className="h-8 px-4 text-sm text-[#161616] bg-white border border-[#e0e0e0] hover:bg-[#f4f4f4] rounded"
                >
                  취소
                </button>
                <button
                  onClick={applySelectedOptions}
                  disabled={selectedOptions.size === 0}
                  className={cn(
                    "h-8 px-4 text-sm text-white rounded",
                    selectedOptions.size > 0
                      ? "bg-[#0f62fe] hover:bg-[#0043ce]"
                      : "bg-[#c6c6c6] cursor-not-allowed"
                  )}
                >
                  추가
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

