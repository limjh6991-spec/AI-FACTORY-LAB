/**
 * 공통 컴포넌트 페이지
 * 옵션, 버튼, 그리드, 차트 컴포넌트 쇼케이스
 */

"use client";

import { useState } from "react";
import {
  Search,
  RotateCcw,
  Save,
  Plus,
  Trash2,
  Download,
  Printer,
  RefreshCw,
  Copy,
  Edit,
  Check,
  X,
  Upload,
  Filter,
  Settings,
  // 그리드 아이콘
  Table,
  TableProperties,
  TreePine,
  LayoutGrid,
  Kanban,
  // 차트 아이콘
  BarChart2,
  LineChart,
  PieChart,
  AreaChart,
  TrendingUp,
  Gauge,
  Activity,
} from "lucide-react";
import {
  CustomerSelect,
  MaterialSelect,
  ProductSelect,
  ModelSelect,
  EquipmentSelect,
  AccountSelect,
  ExpenSelSelect,
  DepartmentSelect,
  CostCenterSelect,
  UserSelect,
  SiteSelect,
  SelCodeSelect,
  YearMonthPicker,
  YearPicker,
} from "~/components/options";

// 버튼 정의
const BUTTON_COMPONENTS = [
  { id: "search", label: "조회", icon: Search, variant: "primary" },
  { id: "save", label: "저장", icon: Save, variant: "success" },
  { id: "add", label: "추가", icon: Plus, variant: "primary" },
  { id: "delete", label: "삭제", icon: Trash2, variant: "danger" },
  { id: "excel", label: "엑셀", icon: Download, variant: "secondary" },
  { id: "reset", label: "초기화", icon: RotateCcw, variant: "secondary" },
  { id: "print", label: "인쇄", icon: Printer, variant: "secondary" },
  { id: "refresh", label: "새로고침", icon: RefreshCw, variant: "secondary" },
  { id: "copy", label: "복사", icon: Copy, variant: "secondary" },
  { id: "edit", label: "수정", icon: Edit, variant: "warning" },
  { id: "confirm", label: "확인", icon: Check, variant: "success" },
  { id: "cancel", label: "취소", icon: X, variant: "danger" },
  { id: "upload", label: "업로드", icon: Upload, variant: "secondary" },
  { id: "filter", label: "필터", icon: Filter, variant: "secondary" },
];

// 그리드 정의
const GRID_COMPONENTS = [
  { id: "basic", label: "기본 그리드", icon: Table, desc: "일반 데이터 표시" },
  { id: "editable", label: "편집 그리드", icon: TableProperties, desc: "인라인 편집" },
  { id: "tree", label: "트리 그리드", icon: TreePine, desc: "계층 구조" },
  { id: "pivot", label: "피벗 그리드", icon: LayoutGrid, desc: "크로스탭 분석" },
  { id: "master-detail", label: "마스터-디테일", icon: Kanban, desc: "1:N 관계" },
  { id: "grouped", label: "그룹 그리드", icon: Settings, desc: "그룹핑 지원" },
];

// 차트 정의
const CHART_COMPONENTS = [
  { id: "bar", label: "막대 차트", icon: BarChart2, desc: "비교 분석" },
  { id: "line", label: "라인 차트", icon: LineChart, desc: "추세 분석" },
  { id: "pie", label: "파이 차트", icon: PieChart, desc: "구성비 분석" },
  { id: "area", label: "영역 차트", icon: AreaChart, desc: "누적 추세" },
  { id: "combo", label: "콤보 차트", icon: TrendingUp, desc: "복합 차트" },
  { id: "gauge", label: "게이지", icon: Gauge, desc: "KPI 표시" },
  { id: "sparkline", label: "스파크라인", icon: Activity, desc: "미니 차트" },
];

export default function CommonComponentsPage() {
  // 옵션 상태
  const [customer, setCustomer] = useState("");
  const [material, setMaterial] = useState("");
  const [product, setProduct] = useState("");
  const [model, setModel] = useState("");
  const [equipment, setEquipment] = useState("");
  const [account, setAccount] = useState("");
  const [expenSel, setExpenSel] = useState("");
  const [department, setDepartment] = useState("");
  const [costCenter, setCostCenter] = useState("");
  const [user, setUser] = useState("");
  const [site, setSite] = useState("");
  const [selCode, setSelCode] = useState("");
  const [yearMonth, setYearMonth] = useState("");
  const [year, setYear] = useState("");

  // 선택된 컴포넌트
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [selectedGrid, setSelectedGrid] = useState<string | null>(null);
  const [selectedChart, setSelectedChart] = useState<string | null>(null);

  const handleReset = () => {
    setCustomer(""); setMaterial(""); setProduct(""); setModel("");
    setEquipment(""); setAccount(""); setExpenSel(""); setDepartment("");
    setCostCenter(""); setUser(""); setSite(""); setSelCode("");
    setYearMonth(""); setYear("");
  };

  const getButtonStyle = (variant: string) => {
    const base = "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all";
    switch (variant) {
      case "primary": return `${base} bg-blue-500 text-white hover:bg-blue-600`;
      case "success": return `${base} bg-green-500 text-white hover:bg-green-600`;
      case "danger": return `${base} bg-red-500 text-white hover:bg-red-600`;
      case "warning": return `${base} bg-amber-500 text-white hover:bg-amber-600`;
      case "secondary": return `${base} bg-slate-500 text-white hover:bg-slate-600`;
      default: return `${base} bg-slate-100 text-slate-700 hover:bg-slate-200`;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div>
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">📦 공통 컴포넌트</h1>
          <p className="text-slate-500">화면 생성기에서 사용 가능한 공통 컴포넌트 목록</p>
        </div>

        {/* 1. 옵션 컴포넌트 */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">🔧 옵션 컴포넌트</h2>
              <p className="text-sm text-slate-500">조회 조건용 Select, DatePicker 등 (14개)</p>
            </div>
            <button onClick={handleReset} className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">
              <RotateCcw className="h-4 w-4" /> 초기화
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <SiteSelect value={site} onChange={setSite} label="사업장" />
            <YearMonthPicker value={yearMonth} onChange={setYearMonth} label="기준월" />
            <YearPicker value={year} onChange={setYear} label="기준년도" />
            <CustomerSelect value={customer} onChange={setCustomer} label="거래처" />
            <MaterialSelect value={material} onChange={setMaterial} label="자재" />
            <ProductSelect value={product} onChange={setProduct} label="제품" />
            <ModelSelect value={model} onChange={setModel} label="모델" />
            <EquipmentSelect value={equipment} onChange={setEquipment} label="설비" />
            <AccountSelect value={account} onChange={setAccount} label="계정" />
            <ExpenSelSelect value={expenSel} onChange={setExpenSel} label="경비구분" />
            <DepartmentSelect value={department} onChange={setDepartment} label="부서" />
            <CostCenterSelect value={costCenter} onChange={setCostCenter} label="코스트센터" />
            <UserSelect value={user} onChange={setUser} label="사용자" />
            <SelCodeSelect value={selCode} onChange={setSelCode} label="공통코드" />
          </div>
        </section>

        {/* 2. 버튼 컴포넌트 */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-800">🖱️ 버튼 컴포넌트</h2>
            <p className="text-sm text-slate-500">액션 버튼 (14개)</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {BUTTON_COMPONENTS.map((btn) => {
              const Icon = btn.icon;
              return (
                <button
                  key={btn.id}
                  onClick={() => setSelectedButton(btn.id)}
                  className={`${getButtonStyle(btn.variant)} ${selectedButton === btn.id ? 'ring-2 ring-offset-2 ring-blue-400' : ''}`}
                >
                  <Icon className="h-4 w-4" />
                  {btn.label}
                </button>
              );
            })}
          </div>
          {selectedButton && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
              선택됨: <strong>{BUTTON_COMPONENTS.find(b => b.id === selectedButton)?.label}</strong>
            </div>
          )}
        </section>

        {/* 3. 그리드 컴포넌트 */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-800">📊 그리드 컴포넌트</h2>
            <p className="text-sm text-slate-500">RealGrid 기반 데이터 테이블 (6개)</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {GRID_COMPONENTS.map((grid) => {
              const Icon = grid.icon;
              const isSelected = selectedGrid === grid.id;
              return (
                <button
                  key={grid.id}
                  onClick={() => setSelectedGrid(grid.id)}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                    }`}
                >
                  <Icon className={`h-8 w-8 mx-auto mb-2 ${isSelected ? 'text-blue-500' : 'text-slate-400'}`} />
                  <div className="font-medium text-slate-700 text-sm">{grid.label}</div>
                  <div className="text-xs text-slate-400 mt-1">{grid.desc}</div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 4. 차트 컴포넌트 */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-800">📈 차트 컴포넌트</h2>
            <p className="text-sm text-slate-500">데이터 시각화 차트 (7개)</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {CHART_COMPONENTS.map((chart) => {
              const Icon = chart.icon;
              const isSelected = selectedChart === chart.id;
              return (
                <button
                  key={chart.id}
                  onClick={() => setSelectedChart(chart.id)}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${isSelected
                    ? 'border-green-500 bg-green-50'
                    : 'border-slate-200 hover:border-green-300 hover:bg-slate-50'
                    }`}
                >
                  <Icon className={`h-8 w-8 mx-auto mb-2 ${isSelected ? 'text-green-500' : 'text-slate-400'}`} />
                  <div className="font-medium text-slate-700 text-sm">{chart.label}</div>
                  <div className="text-xs text-slate-400 mt-1">{chart.desc}</div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 선택 요약 */}
        <div className="mt-6 p-4 bg-slate-800 rounded-xl text-white">
          <h3 className="font-semibold mb-2">📋 선택된 컴포넌트</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-slate-400">버튼:</span>{" "}
              <span className="text-blue-400">{selectedButton || "없음"}</span>
            </div>
            <div>
              <span className="text-slate-400">그리드:</span>{" "}
              <span className="text-blue-400">{selectedGrid || "없음"}</span>
            </div>
            <div>
              <span className="text-slate-400">차트:</span>{" "}
              <span className="text-green-400">{selectedChart || "없음"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
