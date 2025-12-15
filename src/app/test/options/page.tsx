/**
 * 옵션 컴포넌트 데모 페이지
 * binary 스키마 마스터 테이블 기반 (총 14개 컴포넌트)
 */

"use client";

import { useState } from "react";
import { Search, RotateCcw } from "lucide-react";
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

export default function OptionsTestPage() {
  // 상태 관리
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

  const handleReset = () => {
    setCustomer("");
    setMaterial("");
    setProduct("");
    setModel("");
    setEquipment("");
    setAccount("");
    setExpenSel("");
    setDepartment("");
    setCostCenter("");
    setUser("");
    setSite("");
    setSelCode("");
    setYearMonth("");
    setYear("");
  };

  return (
    <div className="flex flex-col h-full p-4 bg-white">
      {/* 제목 */}
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        옵션 컴포넌트 테스트 (총 14개)
      </h1>

      {/* 공통 옵션 (Site, 시나리오, 날짜) */}
      <div className="flex flex-wrap items-center gap-4 mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <SiteSelect
          value={site}
          onChange={setSite}
          label="사업장"
        />

        <SelCodeSelect
          value={selCode}
          onChange={setSelCode}
          label="시나리오"
        />

        <YearPicker
          value={year}
          onChange={setYear}
          label="년도"
        />

        <YearMonthPicker
          value={yearMonth}
          onChange={setYearMonth}
          label="년월"
        />

        {/* 버튼들 */}
        <div className="flex gap-2 ml-auto">
          <button
            className="inline-flex items-center h-9 px-4 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Search className="w-4 h-4 mr-2" />
            조회
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center h-9 px-4 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            초기화
          </button>
        </div>
      </div>

      {/* 마스터 데이터 옵션 (10개) */}
      <div className="flex flex-wrap items-center gap-4 mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <CustomerSelect
          value={customer}
          onChange={setCustomer}
          site={site}
          label="거래처"
        />

        <MaterialSelect
          value={material}
          onChange={setMaterial}
          site={site}
          label="부품"
        />

        <ProductSelect
          value={product}
          onChange={setProduct}
          site={site}
          label="제품"
        />

        <ModelSelect
          value={model}
          onChange={setModel}
          site={site}
          label="모델"
        />

        <EquipmentSelect
          value={equipment}
          onChange={setEquipment}
          site={site}
          label="설비"
        />

        <AccountSelect
          value={account}
          onChange={setAccount}
          site={site}
          label="계정"
        />

        <ExpenSelSelect
          value={expenSel}
          onChange={setExpenSel}
          site={site}
          label="비용구분"
        />

        <DepartmentSelect
          value={department}
          onChange={setDepartment}
          site={site}
          label="부서"
        />

        <CostCenterSelect
          value={costCenter}
          onChange={setCostCenter}
          site={site}
          label="코스트센터"
        />

        <UserSelect
          value={user}
          onChange={setUser}
          site={site}
          label="사용자"
        />
      </div>

      {/* 선택된 값 표시 */}
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-sm font-semibold text-gray-800 mb-3">
          선택된 값 (코드) - 실제 쿼리에 사용됨
        </h2>

        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 text-sm">
          <div>
            <span className="text-gray-500">사업장:</span>
            <span className="ml-2 font-medium text-gray-800">{site || "-"}</span>
          </div>
          <div>
            <span className="text-gray-500">시나리오:</span>
            <span className="ml-2 font-medium text-gray-800">{selCode || "-"}</span>
          </div>
          <div>
            <span className="text-gray-500">년도:</span>
            <span className="ml-2 font-medium text-gray-800">{year || "-"}</span>
          </div>
          <div>
            <span className="text-gray-500">년월:</span>
            <span className="ml-2 font-medium text-gray-800">{yearMonth || "-"}</span>
          </div>
          <div>
            <span className="text-gray-500">거래처:</span>
            <span className="ml-2 font-medium text-gray-800">{customer || "-"}</span>
          </div>
          <div>
            <span className="text-gray-500">부품:</span>
            <span className="ml-2 font-medium text-gray-800">{material || "-"}</span>
          </div>
          <div>
            <span className="text-gray-500">제품:</span>
            <span className="ml-2 font-medium text-gray-800">{product || "-"}</span>
          </div>
          <div>
            <span className="text-gray-500">모델:</span>
            <span className="ml-2 font-medium text-gray-800">{model || "-"}</span>
          </div>
          <div>
            <span className="text-gray-500">설비:</span>
            <span className="ml-2 font-medium text-gray-800">{equipment || "-"}</span>
          </div>
          <div>
            <span className="text-gray-500">계정:</span>
            <span className="ml-2 font-medium text-gray-800">{account || "-"}</span>
          </div>
          <div>
            <span className="text-gray-500">비용구분:</span>
            <span className="ml-2 font-medium text-gray-800">{expenSel || "-"}</span>
          </div>
          <div>
            <span className="text-gray-500">부서:</span>
            <span className="ml-2 font-medium text-gray-800">{department || "-"}</span>
          </div>
          <div>
            <span className="text-gray-500">코스트센터:</span>
            <span className="ml-2 font-medium text-gray-800">{costCenter || "-"}</span>
          </div>
          <div>
            <span className="text-gray-500">사용자:</span>
            <span className="ml-2 font-medium text-gray-800">{user || "-"}</span>
          </div>
        </div>
      </div>

      {/* 사용 안내 */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h2 className="text-sm font-semibold text-gray-800 mb-3">
          컴포넌트 목록 (14개)
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-600 mb-4">
          <div>• CustomerSelect (거래처)</div>
          <div>• MaterialSelect (부품)</div>
          <div>• ProductSelect (제품)</div>
          <div>• ModelSelect (모델)</div>
          <div>• EquipmentSelect (설비)</div>
          <div>• AccountSelect (계정)</div>
          <div>• ExpenSelSelect (비용구분)</div>
          <div>• DepartmentSelect (부서)</div>
          <div>• CostCenterSelect (코스트센터)</div>
          <div>• UserSelect (사용자)</div>
          <div>• SiteSelect (사업장)</div>
          <div>• SelCodeSelect (시나리오)</div>
          <div>• YearMonthPicker (년월)</div>
          <div>• YearPicker (년도)</div>
        </div>

        <div className="p-3 bg-white border border-gray-200 rounded">
          <h3 className="text-xs font-semibold text-gray-700 mb-2">Import 예시</h3>
          <pre className="text-xs text-gray-600 overflow-x-auto">
            {`import { CustomerSelect, DepartmentSelect, YearMonthPicker } from "~/components/options";

<CustomerSelect value={customer} onChange={setCustomer} site={site} label="거래처" />
<DepartmentSelect value={department} onChange={setDepartment} site={site} label="부서" />
<YearMonthPicker value={yearMonth} onChange={setYearMonth} label="년월" />`}
          </pre>
        </div>
      </div>
    </div>
  );
}
