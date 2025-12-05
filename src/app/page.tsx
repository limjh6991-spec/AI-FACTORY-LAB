"use client";

import Link from "next/link";
import {
  Factory,
  Package,
  ShoppingCart,
  BarChart3,
  DollarSign,
  Boxes,
  ArrowRight,
} from "lucide-react";
import { StatCard, ListCard, TileCard } from "~/components/ui/carbon-card";

// 통계 데이터
const stats = [
  {
    title: "총 매출",
    value: "₩45,231,000",
    change: 20.1,
    changeLabel: "전월 대비",
    icon: DollarSign,
    accentColor: "blue" as const,
  },
  {
    title: "생산 실적",
    value: "1,248",
    change: 12.5,
    changeLabel: "전월 대비",
    icon: Factory,
    accentColor: "green" as const,
  },
  {
    title: "재고 현황",
    value: "892",
    change: -3.1,
    changeLabel: "전월 대비",
    icon: Boxes,
    accentColor: "purple" as const,
  },
  {
    title: "신규 주문",
    value: "235",
    change: 8.2,
    changeLabel: "전월 대비",
    icon: ShoppingCart,
    accentColor: "gray" as const,
  },
];

// 알림 리스트
const alerts = [
  { label: "안전재고 미달 품목", value: "12건", subLabel: "즉시 확인 필요" },
  { label: "미처리 작업지시", value: "8건", subLabel: "오늘 마감" },
  { label: "승인 대기 문서", value: "5건", subLabel: "3건 긴급" },
  { label: "시스템 알림", value: "3건", subLabel: "2건 미확인" },
];

// 빠른 액션
const quickActions = [
  {
    title: "생산계획 등록",
    description: "신규 생산계획 수립 및 등록",
    icon: Factory,
    href: "/production/plan",
  },
  {
    title: "재고 현황 조회",
    description: "품목별 재고 및 LOT 정보 확인",
    icon: Package,
    href: "/inventory/status",
  },
  {
    title: "수주 등록",
    description: "신규 수주 등록 및 관리",
    icon: ShoppingCart,
    href: "/sales/order",
  },
  {
    title: "매출 리포트",
    description: "일별/월별 매출 통계 분석",
    icon: BarChart3,
    href: "/report/sales",
  },
];

// 최근 활동
const recentActivities = [
  { label: "생산완료: PRD-2024-001", value: "완료", subLabel: "김철수 5분 전" },
  { label: "수주등록: ORD-2024-235", value: "승인대기", subLabel: "이영희 15분 전" },
  { label: "재고조정: INV-2024-089", value: "처리완료", subLabel: "박민수 1시간 전" },
  { label: "출하완료: SHP-2024-156", value: "완료", subLabel: "최지원 2시간 전" },
];

export default function Home() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#161616]">대시보드</h1>
          <p className="mt-1 text-sm text-[#525252]">
            AI Factory Lab 현황을 한눈에 확인하세요
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#8d8d8d]">
            마지막 업데이트: 오늘 14:32
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeLabel={stat.changeLabel}
            icon={stat.icon}
            accentColor={stat.accentColor}
          />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ListCard title="알림 및 할 일" items={alerts} accentColor="red" />
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white border-t-[3px] border-t-[#0f62fe] shadow-sm">
            <div className="px-5 py-4 border-b border-[#e0e0e0]">
              <h3 className="text-sm font-semibold text-[#161616]">빠른 실행</h3>
            </div>
            <div className="p-4 grid gap-3 sm:grid-cols-2">
              {quickActions.map((action) => (
                <Link key={action.title} href={action.href}>
                  <TileCard
                    title={action.title}
                    description={action.description}
                    icon={action.icon}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ListCard
          title="최근 활동"
          items={recentActivities}
          accentColor="blue"
        />

        <div className="bg-white border-t-[3px] border-t-[#24a148] shadow-sm">
          <div className="px-5 py-4 border-b border-[#e0e0e0] flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#161616]">주간 생산 현황</h3>
            <Link
              href="/report/production"
              className="text-xs text-[#0f62fe] hover:underline flex items-center gap-1"
            >
              상세보기 <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="p-5 h-64 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-[#c6c6c6] mx-auto mb-3" />
              <p className="text-sm text-[#8d8d8d]">차트 컴포넌트 영역</p>
              <p className="text-xs text-[#c6c6c6] mt-1">
                recharts 또는 chart.js로 구현 예정
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
