/**
 * 옵션 컴포넌트 데모 페이지
 * SC000006 스타일 적용 (라벨 인라인, 라운드 셀렉트)
 */

"use client";

import { useState } from "react";
import { Search, RotateCcw } from "lucide-react";
import {
  CustomerSelect,
  MaterialSelect,
  ModelSelect,
  AccountSelect,
  ExpenSelSelect,
  DepartmentSelect,
  SiteSelect,
  SelCodeSelect,
  YearMonthPicker,
  YearPicker,
} from "~/components/options";

export default function OptionsTestPage() {
  // 상태 관리
  const [customer, setCustomer] = useState("");
  const [material, setMaterial] = useState("");
  const [model, setModel] = useState("");
  const [account, setAccount] = useState("");
  const [expenSel, setExpenSel] = useState("");
  const [department, setDepartment] = useState("");
  const [site, setSite] = useState("HQ");
  const [selCode, setSelCode] = useState("ACTUAL");
  const [yearMonth, setYearMonth] = useState("");
  const [year, setYear] = useState("");

  const handleReset = () => {
    setCustomer("");
    setMaterial("");
    setModel("");
    setAccount("");
    setExpenSel("");
    setDepartment("");
    setSite("HQ");
    setSelCode("ACTUAL");
    setYearMonth("");
    setYear("");
  };

  return (
    <div className="flex flex-col h-full p-4 bg-white">
      {/* 제목 */}
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        옵션 컴포넌트 테스트
      </h1>

      {/* 조회조건 - SC000006 스타일 */}
      <div className="flex flex-wrap items-center gap-4 mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        {/* 기본 옵션 */}
        <SiteSelect
          value={site}
          onChange={setSite}
          label="Site"
        />

        <SelCodeSelect
          value={selCode}
          onChange={setSelCode}
          label="SEL_CODE"
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

      {/* 마스터 데이터 옵션 */}
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

        <ModelSelect
          value={model}
          onChange={setModel}
          site={site}
          label="모델"
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
      </div>

      {/* 선택된 값 표시 */}
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-sm font-semibold text-gray-800 mb-3">
          선택된 값 (코드)
        </h2>
        
        <div className="grid grid-cols-5 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Site:</span>
            <span className="ml-2 font-medium text-gray-800">{site || "-"}</span>
          </div>
          <div>
            <span className="text-gray-500">SEL_CODE:</span>
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
            <span className="text-gray-500">모델:</span>
            <span className="ml-2 font-medium text-gray-800">{model || "-"}</span>
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
        </div>
      </div>

      {/* 사용 안내 */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h2 className="text-sm font-semibold text-gray-800 mb-3">
          사용 방법
        </h2>
        
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <strong>검색</strong>: 드롭다운 내 검색창에서 코드 또는 명칭으로 검색</li>
          <li>• <strong>선택</strong>: 클릭 또는 키보드 (↑↓ Enter) 사용</li>
          <li>• <strong>초기화</strong>: X 버튼으로 개별 초기화</li>
          <li>• <strong>Site 연동</strong>: Site 선택 시 다른 옵션들이 해당 Site 기준으로 필터링</li>
        </ul>

        <div className="mt-4 p-3 bg-white border border-gray-200 rounded">
          <h3 className="text-xs font-semibold text-gray-700 mb-2">Import 예시</h3>
          <pre className="text-xs text-gray-600 overflow-x-auto">
{`import { CustomerSelect, YearMonthPicker } from "~/components/options";

<CustomerSelect value={customer} onChange={setCustomer} site={site} label="거래처" />
<YearMonthPicker value={yearMonth} onChange={setYearMonth} label="년월" />`}
          </pre>
        </div>
      </div>
    </div>
  );
}
