"use client";

import { cn } from "~/lib/utils";
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react";

// ===== 기본 Carbon 카드 =====
interface CarbonCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function CarbonCard({ children, className, onClick }: CarbonCardProps) {
  return (
    <div
      className={cn(
        "bg-white border-t-[3px] border-t-[#0f62fe]",
        "shadow-sm hover:shadow-md transition-shadow duration-200",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// ===== 통계 카드 (대시보드용) =====
interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: LucideIcon;
  accentColor?: "blue" | "green" | "red" | "purple" | "gray";
  className?: string;
}

const accentColors = {
  blue: "border-t-[#0f62fe]",
  green: "border-t-[#24a148]",
  red: "border-t-[#da1e28]",
  purple: "border-t-[#8a3ffc]",
  gray: "border-t-[#8d8d8d]",
};

const iconBgColors = {
  blue: "bg-[#0f62fe]/10 text-[#0f62fe]",
  green: "bg-[#24a148]/10 text-[#24a148]",
  red: "bg-[#da1e28]/10 text-[#da1e28]",
  purple: "bg-[#8a3ffc]/10 text-[#8a3ffc]",
  gray: "bg-[#8d8d8d]/10 text-[#8d8d8d]",
};

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  accentColor = "blue",
  className,
}: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div
      className={cn(
        "bg-white border-t-[3px] p-5",
        "shadow-sm hover:shadow-md transition-shadow duration-200",
        accentColors[accentColor],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* 제목 */}
          <p className="text-xs font-medium text-[#525252] uppercase tracking-wide mb-2">
            {title}
          </p>
          
          {/* 값 */}
          <p className="text-3xl font-light text-[#161616] mb-3">
            {value}
          </p>

          {/* 변화량 */}
          {change !== undefined && (
            <div className="flex items-center gap-1.5">
              {isPositive && <TrendingUp className="h-4 w-4 text-[#24a148]" />}
              {isNegative && <TrendingDown className="h-4 w-4 text-[#da1e28]" />}
              {!isPositive && !isNegative && <Minus className="h-4 w-4 text-[#8d8d8d]" />}
              <span
                className={cn(
                  "text-sm font-medium",
                  isPositive && "text-[#24a148]",
                  isNegative && "text-[#da1e28]",
                  !isPositive && !isNegative && "text-[#8d8d8d]"
                )}
              >
                {isPositive && "+"}
                {change}%
              </span>
              {changeLabel && (
                <span className="text-sm text-[#8d8d8d]">{changeLabel}</span>
              )}
            </div>
          )}
        </div>

        {/* 아이콘 */}
        {Icon && (
          <div className={cn("p-3 rounded", iconBgColors[accentColor])}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  );
}

// ===== 리스트 카드 =====
interface ListCardProps {
  title: string;
  items: Array<{
    label: string;
    value: string | number;
    subLabel?: string;
  }>;
  accentColor?: "blue" | "green" | "red" | "purple" | "gray";
  className?: string;
}

export function ListCard({
  title,
  items,
  accentColor = "blue",
  className,
}: ListCardProps) {
  return (
    <div
      className={cn(
        "bg-white border-t-[3px]",
        "shadow-sm",
        accentColors[accentColor],
        className
      )}
    >
      {/* 헤더 */}
      <div className="px-5 py-4 border-b border-[#e0e0e0]">
        <h3 className="text-sm font-semibold text-[#161616]">{title}</h3>
      </div>

      {/* 리스트 */}
      <div className="divide-y divide-[#e0e0e0]">
        {items.map((item, index) => (
          <div
            key={index}
            className="px-5 py-3 flex items-center justify-between hover:bg-[#f4f4f4] transition-colors"
          >
            <div>
              <p className="text-sm text-[#161616]">{item.label}</p>
              {item.subLabel && (
                <p className="text-xs text-[#8d8d8d]">{item.subLabel}</p>
              )}
            </div>
            <p className="text-sm font-medium text-[#161616]">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== 타일 카드 (네비게이션용) =====
interface TileCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
}

export function TileCard({
  title,
  description,
  icon: Icon,
  onClick,
  className,
}: TileCardProps) {
  return (
    <button
      className={cn(
        "w-full text-left bg-white p-5",
        "border border-[#e0e0e0] hover:border-[#0f62fe]",
        "shadow-sm hover:shadow-md transition-all duration-200",
        "group",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="p-2 bg-[#f4f4f4] group-hover:bg-[#0f62fe]/10 transition-colors">
            <Icon className="h-5 w-5 text-[#525252] group-hover:text-[#0f62fe] transition-colors" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-[#161616] group-hover:text-[#0f62fe] transition-colors">
            {title}
          </h3>
          {description && (
            <p className="mt-1 text-xs text-[#8d8d8d] line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

export default CarbonCard;
