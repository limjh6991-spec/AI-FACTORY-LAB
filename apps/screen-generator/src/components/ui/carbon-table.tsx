"use client";

import { useState } from "react";
import { cn } from "~/lib/utils";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ===== 타입 정의 =====
type SortDirection = "asc" | "desc" | null;

interface Column<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: unknown, row: T) => React.ReactNode;
}

interface CarbonTableProps<T> {
  columns: Column<T>[];
  data: T[];
  title?: string;
  description?: string;
  searchable?: boolean;
  filterable?: boolean;
  exportable?: boolean;
  selectable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  className?: string;
  onRowClick?: (row: T) => void;
}

// ===== Carbon 테이블 컴포넌트 =====
export function CarbonTable<T extends Record<string, unknown>>({
  columns,
  data,
  title,
  description,
  searchable = false,
  filterable = false,
  exportable = false,
  selectable = false,
  pagination = true,
  pageSize = 10,
  className,
  onRowClick,
}: CarbonTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  // 검색 필터링
  const filteredData = data.filter((row) => {
    if (!searchQuery) return true;
    return Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // 정렬
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey || !sortDir) return 0;
    const aVal = String(a[sortKey] ?? "");
    const bVal = String(b[sortKey] ?? "");
    if (aVal === bVal) return 0;
    if (sortDir === "asc") {
      return aVal < bVal ? -1 : 1;
    }
    return aVal < bVal ? 1 : -1;
  });

  // 페이지네이션
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = pagination
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData;

  // 정렬 핸들러
  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDir === "asc") {
        setSortDir("desc");
      } else if (sortDir === "desc") {
        setSortKey(null);
        setSortDir(null);
      }
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  // 전체 선택 핸들러
  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map((_, i) => i)));
    }
  };

  // 행 선택 핸들러
  const handleSelectRow = (index: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);
  };

  return (
    <div className={cn("bg-white shadow-sm", className)}>
      {/* 헤더 영역 */}
      {(title || searchable || filterable || exportable) && (
        <div className="px-4 py-3 border-b border-[#e0e0e0]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* 제목 */}
            {title && (
              <div>
                <h3 className="text-sm font-semibold text-[#161616]">{title}</h3>
                {description && (
                  <p className="text-xs text-[#8d8d8d] mt-0.5">{description}</p>
                )}
              </div>
            )}

            {/* 액션 버튼들 */}
            <div className="flex items-center gap-2">
              {/* 검색 */}
              {searchable && (
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8d8d8d]" />
                  <input
                    type="text"
                    placeholder="검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                      "h-8 pl-8 pr-3 text-sm w-48",
                      "bg-[#f4f4f4] border border-transparent",
                      "text-[#161616] placeholder-[#8d8d8d]",
                      "focus:outline-none focus:border-[#0f62fe] focus:bg-white",
                      "transition-colors"
                    )}
                  />
                </div>
              )}

              {/* 필터 */}
              {filterable && (
                <button className="h-8 px-3 flex items-center gap-1.5 text-sm text-[#525252] bg-[#f4f4f4] hover:bg-[#e0e0e0] transition-colors">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">필터</span>
                </button>
              )}

              {/* 내보내기 */}
              {exportable && (
                <button className="h-8 px-3 flex items-center gap-1.5 text-sm text-[#525252] bg-[#f4f4f4] hover:bg-[#e0e0e0] transition-colors">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">내보내기</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#e0e0e0]">
              {/* 체크박스 열 */}
              {selectable && (
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 rounded border-[#8d8d8d] text-[#0f62fe] focus:ring-[#0f62fe]"
                  />
                </th>
              )}

              {/* 컬럼 헤더 */}
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn(
                    "px-4 py-3 text-xs font-semibold text-[#161616] uppercase tracking-wide",
                    column.align === "center" && "text-center",
                    column.align === "right" && "text-right",
                    column.sortable && "cursor-pointer select-none hover:bg-[#c6c6c6] transition-colors"
                  )}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(String(column.key))}
                >
                  <div className={cn(
                    "flex items-center gap-1",
                    column.align === "center" && "justify-center",
                    column.align === "right" && "justify-end"
                  )}>
                    <span>{column.header}</span>
                    {column.sortable && (
                      <span className="text-[#8d8d8d]">
                        {sortKey === column.key ? (
                          sortDir === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )
                        ) : (
                          <ChevronsUpDown className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}

              {/* 액션 열 */}
              <th className="w-12 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e0e0e0]">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 2 : 1)}
                  className="px-4 py-8 text-center text-sm text-[#8d8d8d]"
                >
                  데이터가 없습니다.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={cn(
                    "hover:bg-[#f4f4f4] transition-colors",
                    selectedRows.has(rowIndex) && "bg-[#e0e0e0]",
                    onRowClick && "cursor-pointer"
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {/* 체크박스 */}
                  {selectable && (
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedRows.has(rowIndex)}
                        onChange={() => handleSelectRow(rowIndex)}
                        className="h-4 w-4 rounded border-[#8d8d8d] text-[#0f62fe] focus:ring-[#0f62fe]"
                      />
                    </td>
                  )}

                  {/* 데이터 셀 */}
                  {columns.map((column) => {
                    const value = row[column.key as keyof T];
                    return (
                      <td
                        key={String(column.key)}
                        className={cn(
                          "px-4 py-3 text-sm text-[#161616]",
                          column.align === "center" && "text-center",
                          column.align === "right" && "text-right"
                        )}
                      >
                        {column.render ? column.render(value, row) : String(value ?? "")}
                      </td>
                    );
                  })}

                  {/* 액션 버튼 */}
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <button className="p-1 text-[#8d8d8d] hover:text-[#161616] hover:bg-[#e0e0e0] rounded transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {pagination && totalPages > 1 && (
        <div className="px-4 py-3 border-t border-[#e0e0e0] flex items-center justify-between">
          <p className="text-sm text-[#8d8d8d]">
            총 {filteredData.length}개 중 {(currentPage - 1) * pageSize + 1}-
            {Math.min(currentPage * pageSize, filteredData.length)}개 표시
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={cn(
                "p-1.5 rounded transition-colors",
                currentPage === 1
                  ? "text-[#c6c6c6] cursor-not-allowed"
                  : "text-[#525252] hover:bg-[#e0e0e0]"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={cn(
                    "min-w-[32px] h-8 px-2 text-sm rounded transition-colors",
                    currentPage === pageNum
                      ? "bg-[#0f62fe] text-white"
                      : "text-[#525252] hover:bg-[#e0e0e0]"
                  )}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={cn(
                "p-1.5 rounded transition-colors",
                currentPage === totalPages
                  ? "text-[#c6c6c6] cursor-not-allowed"
                  : "text-[#525252] hover:bg-[#e0e0e0]"
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CarbonTable;
