/**
 * Sandpack Preview용 Mock 코드
 * RealGrid, Options, JSZip 등의 Mock 구현체를 문자열로 제공
 */

/**
 * RealGrid Mock 코드 (Sandpack용)
 * 실제 RealGrid 대신 HTML Table로 데이터를 표시합니다.
 */
export const REALGRID_MOCK_CODE = `
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

/**
 * Options Mock 코드 (Sandpack용)
 * 공통 옵션 컴포넌트 Mock 구현
 */
export const OPTIONS_MOCK_CODE = `
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
export const ProductSelect = ({ value, onChange, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label style={{ fontSize: 12, color: '#525252' }}>{label || '제품'}</label>
    <input type="text" value={value} onChange={(e) => onChange?.(e.target.value)} placeholder="제품 검색" style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0' }} />
  </div>
);
export const ModelSelect = ({ value, onChange, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label style={{ fontSize: 12, color: '#525252' }}>{label || '모델'}</label>
    <input type="text" value={value} onChange={(e) => onChange?.(e.target.value)} placeholder="모델 검색" style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0' }} />
  </div>
);
export const EquipmentSelect = ({ value, onChange, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label style={{ fontSize: 12, color: '#525252' }}>{label || '설비'}</label>
    <input type="text" value={value} onChange={(e) => onChange?.(e.target.value)} placeholder="설비 검색" style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0' }} />
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
export const CostCenterSelect = ({ value, onChange, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label style={{ fontSize: 12, color: '#525252' }}>{label || '코스트센터'}</label>
    <input type="text" value={value} onChange={(e) => onChange?.(e.target.value)} placeholder="코스트센터 검색" style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0' }} />
  </div>
);
export const UserSelect = ({ value, onChange, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label style={{ fontSize: 12, color: '#525252' }}>{label || '사용자'}</label>
    <input type="text" value={value} onChange={(e) => onChange?.(e.target.value)} placeholder="사용자 검색" style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0' }} />
  </div>
);
export const SelCodeSelect = ({ value, onChange, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label style={{ fontSize: 12, color: '#525252' }}>{label || '시나리오'}</label>
    <input type="text" value={value} onChange={(e) => onChange?.(e.target.value)} placeholder="시나리오 검색" style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0' }} />
  </div>
);
`;

/**
 * JSZip Mock 코드 (Sandpack용)
 */
export const JSZIP_MOCK_CODE = `// JSZip Mock for Sandpack Preview
const JSZip = function() {
  this.files = {};
};
JSZip.prototype.file = function(name, content) { this.files[name] = content; return this; };
JSZip.prototype.generateAsync = function() { return Promise.resolve(new Blob()); };
export default JSZip;
`;

/**
 * RealGrid 스타일 Mock
 */
export const REALGRID_STYLE_MOCK = `/* RealGrid Style Mock - Sandpack Preview */`;

/**
 * Sandpack additionalFiles 생성
 */
export function getSandpackAdditionalFiles() {
    return {
        "/realgrid.js": REALGRID_MOCK_CODE,
        "/components/options.js": OPTIONS_MOCK_CODE,
        "/realgrid-style.css": REALGRID_STYLE_MOCK,
        "/jszip.js": JSZIP_MOCK_CODE,
    };
}

/**
 * Sandpack import 대체 매핑
 */
export const SANDPACK_IMPORT_REPLACEMENTS = {
    "realgrid": "./realgrid",
    "realgrid/dist/realgrid-style.css": "./realgrid-style.css",
    "~/components/options": "./components/options",
    "jszip": "./jszip",
};
