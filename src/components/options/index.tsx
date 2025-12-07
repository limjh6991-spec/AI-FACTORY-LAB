/**
 * 옵션 공통 컴포넌트
 * IBM Carbon Design System 기반 + SC000006 스타일 적용
 * 
 * 10가지 옵션 타입:
 * 1. CustomerSelect - 거래처 (doi_cust_mast)
 * 2. MaterialSelect - 부품/자재 (doi_material_mast)
 * 3. ModelSelect - 모델 (doi_model_mast)
 * 4. AccountSelect - 계정 (doi_acct)
 * 5. ExpenSelSelect - 비용구분 (doi_expen_sel)
 * 6. DepartmentSelect - 부서 (doi_dept)
 * 7. SiteSelect - Site (HQ, VN)
 * 8. SelCodeSelect - SEL_CODE (ACTUAL)
 * 9. YearMonthPicker - 년월 (yyyymm)
 * 10. YearPicker - 년 (yyyy)
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
  site?: string;
  label?: string;
  required?: boolean;
  error?: string;
  /** 라벨을 왼쪽에 인라인으로 표시 (기본: true) */
  inline?: boolean;
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
// 1. 거래처 선택 (CustomerSelect)
// ==========================================

export function CustomerSelect(props: BaseSelectProps) {
  const [search, setSearch] = useState("");
  const { data: options = [], isLoading } = api.options.getCustomers.useQuery({
    search,
    site: props.site,
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
// 2. 부품/자재 선택 (MaterialSelect)
// ==========================================

export function MaterialSelect(props: BaseSelectProps) {
  const [search, setSearch] = useState("");
  const { data: options = [], isLoading } = api.options.getMaterials.useQuery({
    search,
    site: props.site,
    limit: 100,
  });

  return (
    <SearchableSelect
      {...props}
      options={options}
      isLoading={isLoading}
      onSearch={setSearch}
      placeholder={props.placeholder ?? "부품 선택"}
      label={props.label ?? "부품"}
    />
  );
}

// ==========================================
// 3. 모델 선택 (ModelSelect)
// ==========================================

export function ModelSelect(props: BaseSelectProps) {
  const [search, setSearch] = useState("");
  const { data: options = [], isLoading } = api.options.getModels.useQuery({
    search,
    site: props.site,
    limit: 100,
  });

  return (
    <SearchableSelect
      {...props}
      options={options}
      isLoading={isLoading}
      onSearch={setSearch}
      placeholder={props.placeholder ?? "모델 선택"}
      label={props.label ?? "모델"}
    />
  );
}

// ==========================================
// 4. 계정 선택 (AccountSelect)
// ==========================================

export function AccountSelect(props: BaseSelectProps) {
  const [search, setSearch] = useState("");
  const { data: options = [], isLoading } = api.options.getAccounts.useQuery({
    search,
    site: props.site,
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
// 5. 비용구분 선택 (ExpenSelSelect)
// ==========================================

export function ExpenSelSelect(props: BaseSelectProps) {
  const [search, setSearch] = useState("");
  const { data: options = [], isLoading } = api.options.getExpenSels.useQuery({
    search,
    site: props.site,
    limit: 100,
  });

  return (
    <SearchableSelect
      {...props}
      options={options}
      isLoading={isLoading}
      onSearch={setSearch}
      placeholder={props.placeholder ?? "비용구분 선택"}
      label={props.label ?? "비용구분"}
    />
  );
}

// ==========================================
// 6. 부서 선택 (DepartmentSelect)
// ==========================================

export function DepartmentSelect(props: BaseSelectProps) {
  const [search, setSearch] = useState("");
  const { data: options = [], isLoading } = api.options.getDepartments.useQuery({
    search,
    site: props.site,
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
// 7. Site 선택 (SiteSelect)
// ==========================================

export function SiteSelect(props: Omit<BaseSelectProps, "site">) {
  const { data: options = [] } = api.options.getSites.useQuery();

  return (
    <SearchableSelect
      {...props}
      options={options}
      placeholder={props.placeholder ?? "Site 선택"}
      label={props.label ?? "Site"}
    />
  );
}

// ==========================================
// 8. SEL_CODE 선택 (SelCodeSelect)
// ==========================================

export function SelCodeSelect(props: BaseSelectProps) {
  const { data: options = [] } = api.options.getSelCodes.useQuery();

  return (
    <SearchableSelect
      {...props}
      options={options}
      placeholder={props.placeholder ?? "SEL_CODE 선택"}
      label={props.label ?? "SEL_CODE"}
    />
  );
}

// ==========================================
// 9. 년월 선택 (YearMonthPicker) - yyyymm 형식
// ==========================================

interface DatePickerProps extends Omit<BaseSelectProps, "onChange"> {
  onChange?: (value: string) => void;
  /** 라벨을 왼쪽에 인라인으로 표시 (기본: true) */
  inline?: boolean;
  /** 기본값 자동 설정 (기본: true - 현재 년월) */
  autoDefault?: boolean;
}

// 현재 년월 가져오기 (yyyymm 형식)
function getCurrentYearMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
}

// 현재 년도 가져오기 (yyyy 형식)
function getCurrentYear(): string {
  return String(new Date().getFullYear());
}

export function YearMonthPicker({
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
// 10. 년 선택 (YearPicker) - yyyy 형식
// ==========================================

export function YearPicker({
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
  const today = new Date();
  const currentYear = today.getFullYear();

  // 기본값 자동 설정 (value가 없고 autoDefault가 true일 때)
  useEffect(() => {
    if (autoDefault && !value && onChange) {
      const defaultValue = getCurrentYear();
      onChange(defaultValue);
    }
  }, [autoDefault, value, onChange]);

  // 선택된 값 파싱 (yyyy) - 기본값 현재 년도
  const effectiveValue = value || getCurrentYear();
  const selectedYear = parseInt(effectiveValue);

  // 표시할 년도 범위 (현재 기준 ±5년)
  const startYear = currentYear - 5;
  const years = Array.from({ length: 11 }, (_, i) => startYear + i);

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

  // 표시 값 (기본값이 있으면 표시)
  const displayValue = effectiveValue ? `${effectiveValue}년` : "";

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

        {/* 년도 드롭다운 */}
        {isOpen && (
          <div className="absolute z-50 min-w-[160px] mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-3">
            {/* 년도 그리드 */}
            <div className="grid grid-cols-3 gap-1">
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

// ==========================================
// 데모/테스트용 컴포넌트
// ==========================================

export function OptionsDemo() {
  const [customer, setCustomer] = useState("");
  const [material, setMaterial] = useState("");
  const [model, setModel] = useState("");
  const [account, setAccount] = useState("");
  const [expenSel, setExpenSel] = useState("");
  const [department, setDepartment] = useState("");
  const [site, setSite] = useState("");
  const [selCode, setSelCode] = useState("ACTUAL");
  const [yearMonth, setYearMonth] = useState("");
  const [year, setYear] = useState("");

  return (
    <div className="p-6 bg-white">
      <h2 className="text-lg font-semibold text-[#161616] mb-6">
        옵션 컴포넌트 데모
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <CustomerSelect value={customer} onChange={setCustomer} site={site} />
        <MaterialSelect value={material} onChange={setMaterial} site={site} />
        <ModelSelect value={model} onChange={setModel} site={site} />
        <AccountSelect value={account} onChange={setAccount} site={site} />
        <ExpenSelSelect value={expenSel} onChange={setExpenSel} site={site} />
        <DepartmentSelect value={department} onChange={setDepartment} site={site} />
        <SiteSelect value={site} onChange={setSite} />
        <SelCodeSelect value={selCode} onChange={setSelCode} />
        <YearMonthPicker value={yearMonth} onChange={setYearMonth} />
        <YearPicker value={year} onChange={setYear} />
      </div>

      <div className="mt-6 p-4 bg-[#f4f4f4] rounded">
        <h3 className="text-sm font-semibold text-[#161616] mb-2">선택된 값:</h3>
        <pre className="text-xs text-[#525252]">
          {JSON.stringify({
            customer,
            material,
            model,
            account,
            expenSel,
            department,
            site,
            selCode,
            yearMonth,
            year,
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
