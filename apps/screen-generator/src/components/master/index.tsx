/**
 * 기준정보 마스터 공통 컴포넌트
 * IBM Carbon Design System 기반
 * binary 스키마 테이블 참조
 * 
 * 10가지 마스터 옵션 타입:
 * 1. BiSiteSelect - 사업장 (plant_site_code)
 * 2. BiScenarioSelect - 시나리오 (scenario_code: ACTUAL, PLAN, FORECAST)
 * 3. BiDeptSelect - 부서 (bi_dept_mst)
 * 4. BiCostCenterSelect - 코스트센터 (bi_cost_center)
 * 5. BiUserSelect - 사원 (bi_user_mst)
 * 6. BiAccountSelect - 계정 (bi_acct_mst)
 * 7. BiExpenseSelect - 경비항목 (bi_expen_sel_mst)
 * 8. BiCustomerSelect - 거래처 (bi_cust_mst)
 * 9. BiEquipmentSelect - 설비 (bi_eqp_mst)
 * 10. BiProductSelect - 제품 (bi_prod_mst)
 * 
 * 공통 Picker:
 * - BiYearMonthPicker - 년월 선택
 * - BiYearPicker - 년도 선택
 */

"use client";

import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Search, ChevronDown, X, Calendar, Check } from "lucide-react";
import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";

// ==========================================
// 공통 타입 정의
// ==========================================

interface OptionItem {
  code: string;
  name: string;
}

interface BaseSelectProps {
  value?: string;
  onChange?: (value: string, item?: OptionItem) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  required?: boolean;
  error?: string;
  /** 라벨을 왼쪽에 인라인으로 표시 (기본: true) */
  inline?: boolean;
  /** 사업장 필터 */
  site?: string;
  /** 년월 필터 */
  yyyymm?: string;
  /** 시나리오 필터 */
  scenario?: string;
}

// ==========================================
// 공통 검색 가능 셀렉트 컴포넌트
// ==========================================

interface SearchableSelectProps extends BaseSelectProps {
  options: OptionItem[];
  isLoading?: boolean;
  onSearch?: (search: string) => void;
  /** 상단에 '전체' 옵션 표시 여부 (기본: true) */
  showAllOption?: boolean;
}

// '전체' 옵션 상수
const ALL_OPTION: OptionItem = { code: '', name: '전체' };

function SearchableSelect({
  value,
  onChange,
  placeholder = "전체",
  disabled = false,
  className,
  label,
  required = false,
  error,
  options,
  isLoading = false,
  onSearch,
  inline = true,
  showAllOption = true,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // '전체' 옵션을 포함한 옵션 목록
  const allOptions = showAllOption ? [ALL_OPTION, ...options] : options;

  // 선택된 아이템 찾기
  const selectedItem = value === '' 
    ? (showAllOption ? ALL_OPTION : undefined)
    : options.find((opt) => opt.code === value);

  // 검색어로 필터링
  const filteredOptions = allOptions.filter(
    (opt) =>
      opt.code.toLowerCase().includes(search.toLowerCase()) ||
      opt.name.toLowerCase().includes(search.toLowerCase())
  );

  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 검색어 변경 시 콜백
  useEffect(() => {
    onSearch?.(search);
  }, [search, onSearch]);

  // 키보드 네비게이션
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          const item = filteredOptions[highlightedIndex];
          onChange?.(item.code, item);
          setIsOpen(false);
          setSearch("");
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSearch("");
        break;
    }
  };

  // 스크롤 위치 조정
  useEffect(() => {
    if (listRef.current && highlightedIndex >= 0) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement;
      if (item) {
        item.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex]);

  return (
    <div 
      className={cn(
        inline ? "flex items-center gap-2" : "flex flex-col",
        className
      )} 
      ref={containerRef}
    >
      {/* 라벨 */}
      {label && (
        <label className={cn(
          "text-sm font-medium text-gray-700 whitespace-nowrap",
          !inline && "mb-1"
        )}>
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      {/* 셀렉트 영역 */}
      <div className="relative">
        {/* 트리거 버튼 */}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={cn(
            "h-9 px-3 text-left text-sm min-w-[140px]",
            "bg-white border border-gray-300 rounded-md",
            "flex items-center justify-between gap-2",
            "transition-all duration-150",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            disabled && "bg-gray-100 text-gray-400 cursor-not-allowed",
            error && "border-red-500 focus:ring-red-500",
            isOpen && "ring-2 ring-blue-500 border-blue-500"
          )}
        >
          <span className={cn("truncate", !selectedItem && "text-gray-400")}>
            {selectedItem 
              ? (selectedItem.code === '' ? selectedItem.name : `${selectedItem.code} - ${selectedItem.name}`)
              : placeholder}
          </span>
          <div className="flex items-center gap-1 flex-shrink-0">
            {value && value !== '' && !disabled && (
              <X
                className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange?.("", undefined);
                }}
              />
            )}
            <ChevronDown
              className={cn(
                "w-4 h-4 text-gray-400 transition-transform duration-200",
                isOpen && "transform rotate-180"
              )}
            />
          </div>
        </button>

        {/* 에러 메시지 */}
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}

        {/* 드롭다운 */}
        {isOpen && (
          <div className="absolute z-50 w-full min-w-[200px] mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
            {/* 검색 입력 */}
            <div className="p-2 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="검색..."
                  className={cn(
                    "w-full h-8 pl-8 pr-3 text-sm",
                    "bg-gray-50 border border-gray-200 rounded-md",
                    "focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  )}
                  autoFocus
                />
              </div>
            </div>

            {/* 옵션 리스트 */}
            <ul
              ref={listRef}
              className="max-h-48 overflow-y-auto"
              role="listbox"
            >
              {isLoading ? (
                <li className="px-3 py-2 text-sm text-gray-500 text-center">
                  로딩 중...
                </li>
              ) : filteredOptions.length === 0 ? (
                <li className="px-3 py-2 text-sm text-gray-500 text-center">
                  결과가 없습니다
                </li>
              ) : (
                filteredOptions.map((option, index) => (
                  <li
                    key={option.code || '__all__'}
                    role="option"
                    aria-selected={option.code === value}
                    onClick={() => {
                      onChange?.(option.code, option);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={cn(
                      "px-3 py-2 text-sm cursor-pointer flex items-center justify-between",
                      "transition-colors duration-100",
                      option.code === value
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50",
                      highlightedIndex === index && "bg-gray-100",
                      option.code === '' && "font-medium border-b border-gray-100"
                    )}
                  >
                    <span>
                      {option.code === '' ? (
                        <span className="font-medium">{option.name}</span>
                      ) : (
                        <>
                          <span className="font-medium">{option.code}</span>
                          <span className="text-gray-500 ml-1.5">- {option.name}</span>
                        </>
                      )}
                    </span>
                    {option.code === value && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 1. 사업장 선택 (BiSiteSelect)
// ==========================================

export function BiSiteSelect(props: Omit<BaseSelectProps, "site">) {
  // 고정 옵션 (binary 스키마에서는 SITE_01 사용)
  const options: OptionItem[] = [
    { code: 'SITE_01', name: '본사' },
    { code: 'SITE_02', name: '베트남' },
  ];

  return (
    <SearchableSelect
      {...props}
      options={options}
      placeholder={props.placeholder ?? "사업장 선택"}
      label={props.label ?? "사업장"}
      showAllOption={false}
    />
  );
}

// ==========================================
// 2. 시나리오 선택 (BiScenarioSelect)
// ==========================================

export function BiScenarioSelect(props: Omit<BaseSelectProps, "scenario">) {
  // 고정 옵션
  const options: OptionItem[] = [
    { code: 'ACTUAL', name: '실적' },
    { code: 'PLAN', name: '계획' },
    { code: 'FORECAST', name: '예측' },
  ];

  return (
    <SearchableSelect
      {...props}
      options={options}
      placeholder={props.placeholder ?? "시나리오 선택"}
      label={props.label ?? "시나리오"}
      showAllOption={false}
    />
  );
}

// ==========================================
// 3. 부서 선택 (BiDeptSelect)
// ==========================================

export function BiDeptSelect(props: BaseSelectProps) {
  const [search, setSearch] = useState("");
  const { data: options = [], isLoading } = api.biMaster.getDepartments.useQuery({
    search,
    site: props.site,
    yyyymm: props.yyyymm,
    scenario: props.scenario,
    limit: 100,
  });

  return (
    <SearchableSelect
      {...props}
      options={options}
      isLoading={isLoading}
      onSearch={setSearch}
      placeholder={props.placeholder ?? "부서 선택"}
      label={props.label ?? "부서"}
    />
  );
}

// ==========================================
// 4. 코스트센터 선택 (BiCostCenterSelect)
// ==========================================

export function BiCostCenterSelect(props: BaseSelectProps) {
  const [search, setSearch] = useState("");
  const { data: options = [], isLoading } = api.biMaster.getCostCenters.useQuery({
    search,
    site: props.site,
    yyyymm: props.yyyymm,
    scenario: props.scenario,
    limit: 100,
  });

  return (
    <SearchableSelect
      {...props}
      options={options}
      isLoading={isLoading}
      onSearch={setSearch}
      placeholder={props.placeholder ?? "코스트센터 선택"}
      label={props.label ?? "코스트센터"}
    />
  );
}

// ==========================================
// 5. 사원 선택 (BiUserSelect)
// ==========================================

export function BiUserSelect(props: BaseSelectProps) {
  const [search, setSearch] = useState("");
  const { data: options = [], isLoading } = api.biMaster.getUsers.useQuery({
    search,
    site: props.site,
    yyyymm: props.yyyymm,
    scenario: props.scenario,
    limit: 100,
  });

  return (
    <SearchableSelect
      {...props}
      options={options}
      isLoading={isLoading}
      onSearch={setSearch}
      placeholder={props.placeholder ?? "사원 선택"}
      label={props.label ?? "사원"}
    />
  );
}

// ==========================================
// 6. 계정 선택 (BiAccountSelect)
// ==========================================

export function BiAccountSelect(props: BaseSelectProps) {
  const [search, setSearch] = useState("");
  const { data: options = [], isLoading } = api.biMaster.getAccounts.useQuery({
    search,
    site: props.site,
    yyyymm: props.yyyymm,
    scenario: props.scenario,
    limit: 100,
  });

  return (
    <SearchableSelect
      {...props}
      options={options}
      isLoading={isLoading}
      onSearch={setSearch}
      placeholder={props.placeholder ?? "계정 선택"}
      label={props.label ?? "계정"}
    />
  );
}

// ==========================================
// 7. 경비항목 선택 (BiExpenseSelect)
// ==========================================

export function BiExpenseSelect(props: BaseSelectProps) {
  const [search, setSearch] = useState("");
  const { data: options = [], isLoading } = api.biMaster.getExpenseItems.useQuery({
    search,
    site: props.site,
    yyyymm: props.yyyymm,
    scenario: props.scenario,
    limit: 100,
  });

  return (
    <SearchableSelect
      {...props}
      options={options}
      isLoading={isLoading}
      onSearch={setSearch}
      placeholder={props.placeholder ?? "경비항목 선택"}
      label={props.label ?? "경비항목"}
    />
  );
}

// ==========================================
// 8. 거래처 선택 (BiCustomerSelect)
// ==========================================

export function BiCustomerSelect(props: BaseSelectProps) {
  const [search, setSearch] = useState("");
  const { data: options = [], isLoading } = api.biMaster.getCustomers.useQuery({
    search,
    site: props.site,
    yyyymm: props.yyyymm,
    scenario: props.scenario,
    limit: 100,
  });

  return (
    <SearchableSelect
      {...props}
      options={options}
      isLoading={isLoading}
      onSearch={setSearch}
      placeholder={props.placeholder ?? "거래처 선택"}
      label={props.label ?? "거래처"}
    />
  );
}

// ==========================================
// 9. 설비 선택 (BiEquipmentSelect)
// ==========================================

export function BiEquipmentSelect(props: BaseSelectProps) {
  const [search, setSearch] = useState("");
  const { data: options = [], isLoading } = api.biMaster.getEquipments.useQuery({
    search,
    site: props.site,
    yyyymm: props.yyyymm,
    scenario: props.scenario,
    limit: 100,
  });

  return (
    <SearchableSelect
      {...props}
      options={options}
      isLoading={isLoading}
      onSearch={setSearch}
      placeholder={props.placeholder ?? "설비 선택"}
      label={props.label ?? "설비"}
    />
  );
}

// ==========================================
// 10. 제품 선택 (BiProductSelect)
// ==========================================

export function BiProductSelect(props: BaseSelectProps) {
  const [search, setSearch] = useState("");
  const { data: options = [], isLoading } = api.biMaster.getProducts.useQuery({
    search,
    site: props.site,
    yyyymm: props.yyyymm,
    scenario: props.scenario,
    limit: 100,
  });

  return (
    <SearchableSelect
      {...props}
      options={options}
      isLoading={isLoading}
      onSearch={setSearch}
      placeholder={props.placeholder ?? "제품 선택"}
      label={props.label ?? "제품"}
    />
  );
}

// ==========================================
// 년월 선택 (BiYearMonthPicker) - yyyymm 형식
// ==========================================

interface DatePickerProps extends Omit<BaseSelectProps, "onChange" | "site" | "yyyymm" | "scenario"> {
  onChange?: (value: string) => void;
  /** 기본값 자동 설정 (기본: true - 현재 년월) */
  autoDefault?: boolean;
}

// 현재 년월 가져오기 (yyyymm 형식)
function getCurrentYearMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
}

export function BiYearMonthPicker({
  value,
  onChange,
  placeholder = "년월 선택",
  disabled = false,
  className,
  label = "년월",
  required = false,
  error,
  inline = true,
  autoDefault = true,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 현재 날짜 기준
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  // 기본값 자동 설정 (value가 없고 autoDefault가 true일 때)
  useEffect(() => {
    if (autoDefault && !value && onChange) {
      const defaultValue = getCurrentYearMonth();
      onChange(defaultValue);
    }
  }, [autoDefault, value, onChange]);

  // 선택된 값 파싱 (yyyymm) - 기본값 현재 년월
  const effectiveValue = value || getCurrentYearMonth();
  const selectedYear = parseInt(effectiveValue.substring(0, 4));
  const selectedMonth = parseInt(effectiveValue.substring(4, 6));

  const [viewYear, setViewYear] = useState(selectedYear);

  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const months = [
    "1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월",
  ];

  const handleMonthClick = (month: number) => {
    const yyyymm = `${viewYear}${String(month).padStart(2, "0")}`;
    onChange?.(yyyymm);
    setIsOpen(false);
  };

  // 표시 값 (기본값이 있으면 표시)
  const displayValue = effectiveValue
    ? `${effectiveValue.substring(0, 4)}-${effectiveValue.substring(4, 6)}`
    : "";

  return (
    <div 
      className={cn(
        inline ? "flex items-center gap-2" : "flex flex-col",
        className
      )} 
      ref={containerRef}
    >
      {/* 라벨 */}
      {label && (
        <label className={cn(
          "text-sm font-medium text-gray-700 whitespace-nowrap",
          !inline && "mb-1"
        )}>
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      {/* 셀렉트 영역 */}
      <div className="relative">
        {/* 트리거 버튼 */}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "h-9 px-3 text-left text-sm min-w-[120px]",
            "bg-white border border-gray-300 rounded-md",
            "flex items-center justify-between gap-2",
            "transition-all duration-150",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            disabled && "bg-gray-100 text-gray-400 cursor-not-allowed",
            error && "border-red-500 focus:ring-red-500",
            isOpen && "ring-2 ring-blue-500 border-blue-500"
          )}
        >
          <span className={cn(!displayValue && "text-gray-400")}>
            {displayValue || placeholder}
          </span>
          <div className="flex items-center gap-1 flex-shrink-0">
            {value && !disabled && (
              <X
                className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange?.("");
                }}
              />
            )}
            <Calendar className="w-4 h-4 text-gray-400" />
          </div>
        </button>

        {/* 에러 메시지 */}
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}

        {/* 캘린더 드롭다운 */}
        {isOpen && (
          <div className="absolute z-50 min-w-[220px] mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-3">
            {/* 년도 네비게이션 */}
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={() => setViewYear(viewYear - 1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronDown className="w-4 h-4 rotate-90 text-gray-600" />
              </button>
              <span className="text-sm font-semibold text-gray-800">
                {viewYear}년
              </span>
              <button
                type="button"
                onClick={() => setViewYear(viewYear + 1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronDown className="w-4 h-4 -rotate-90 text-gray-600" />
              </button>
            </div>

            {/* 월 그리드 */}
            <div className="grid grid-cols-4 gap-1">
              {months.map((monthName, index) => {
                const month = index + 1;
                const isSelected = selectedYear === viewYear && selectedMonth === month;
                const isCurrent = currentYear === viewYear && currentMonth === month;

                return (
                  <button
                    key={month}
                    type="button"
                    onClick={() => handleMonthClick(month)}
                    className={cn(
                      "h-8 text-xs rounded transition-colors duration-100",
                      isSelected
                        ? "bg-blue-600 text-white"
                        : isCurrent
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {monthName}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 년 선택 (BiYearPicker) - yyyy 형식
// ==========================================

export function BiYearPicker({
  value,
  onChange,
  placeholder = "년도 선택",
  disabled = false,
  className,
  label = "년도",
  required = false,
  error,
  inline = true,
  autoDefault = true,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 현재 날짜 기준
  const currentYear = new Date().getFullYear();

  // 기본값 자동 설정
  useEffect(() => {
    if (autoDefault && !value && onChange) {
      onChange(String(currentYear));
    }
  }, [autoDefault, value, onChange, currentYear]);

  // 선택된 값 파싱
  const effectiveValue = value || String(currentYear);
  const selectedYear = parseInt(effectiveValue);

  // 년도 범위 (현재 년도 기준 ±10년)
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleYearClick = (year: number) => {
    onChange?.(String(year));
    setIsOpen(false);
  };

  return (
    <div 
      className={cn(
        inline ? "flex items-center gap-2" : "flex flex-col",
        className
      )} 
      ref={containerRef}
    >
      {/* 라벨 */}
      {label && (
        <label className={cn(
          "text-sm font-medium text-gray-700 whitespace-nowrap",
          !inline && "mb-1"
        )}>
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      {/* 셀렉트 영역 */}
      <div className="relative">
        {/* 트리거 버튼 */}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "h-9 px-3 text-left text-sm min-w-[100px]",
            "bg-white border border-gray-300 rounded-md",
            "flex items-center justify-between gap-2",
            "transition-all duration-150",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            disabled && "bg-gray-100 text-gray-400 cursor-not-allowed",
            error && "border-red-500 focus:ring-red-500",
            isOpen && "ring-2 ring-blue-500 border-blue-500"
          )}
        >
          <span className={cn(!effectiveValue && "text-gray-400")}>
            {effectiveValue ? `${effectiveValue}년` : placeholder}
          </span>
          <div className="flex items-center gap-1 flex-shrink-0">
            {value && !disabled && (
              <X
                className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange?.("");
                }}
              />
            )}
            <Calendar className="w-4 h-4 text-gray-400" />
          </div>
        </button>

        {/* 에러 메시지 */}
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}

        {/* 년도 드롭다운 */}
        {isOpen && (
          <div className="absolute z-50 min-w-[180px] mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-2">
            <div className="grid grid-cols-3 gap-1 max-h-48 overflow-y-auto">
              {years.map((year) => {
                const isSelected = selectedYear === year;
                const isCurrent = currentYear === year;

                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() => handleYearClick(year)}
                    className={cn(
                      "h-8 text-xs rounded transition-colors duration-100",
                      isSelected
                        ? "bg-blue-600 text-white"
                        : isCurrent
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {year}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
