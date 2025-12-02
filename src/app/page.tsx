import Link from "next/link";
import { 
  TrendingUp, 
  Package, 
  Users, 
  ShoppingCart,
  BarChart3,
  Activity,
  DollarSign,
  ArrowUpRight
} from "lucide-react";

const stats = [
  {
    title: "총 매출",
    value: "₩45,231,000",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
    color: "text-success-green bg-success-green/10",
  },
  {
    title: "신규 주문",
    value: "235",
    change: "+12.5%",
    trend: "up",
    icon: ShoppingCart,
    color: "text-primary-blue bg-primary-blue/10",
  },
  {
    title: "활성 사용자",
    value: "1,428",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "text-warning-yellow bg-warning-yellow/10",
  },
  {
    title: "재고 상품",
    value: "892",
    change: "-3.1%",
    trend: "down",
    icon: Package,
    color: "text-neutral-gray-130 bg-neutral-gray-20",
  },
];

const quickActions = [
  {
    title: "상품 관리",
    description: "상품 등록, 수정, 재고 관리",
    href: "/products",
    icon: Package,
    color: "bg-primary-blue",
  },
  {
    title: "주문 처리",
    description: "신규 주문 확인 및 처리",
    href: "/orders",
    icon: ShoppingCart,
    color: "bg-success-green",
  },
  {
    title: "고객 관리",
    description: "고객 정보 및 이력 조회",
    href: "/customers",
    icon: Users,
    color: "bg-warning-yellow",
  },
  {
    title: "판매 리포트",
    description: "매출 통계 및 분석",
    href: "/reports",
    icon: BarChart3,
    color: "bg-error-red",
  },
];

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-gray-90">
          대시보드
        </h1>
        <p className="mt-2 text-neutral-gray-130">
          AI Factory Lab에 오신 것을 환영합니다
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="rounded-lg border border-neutral-gray-30 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-lg p-3 ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  stat.trend === "up" ? "text-success-green" : "text-error-red"
                }`}>
                  {stat.change}
                  <Activity className="ml-1 h-4 w-4" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-neutral-gray-130">{stat.title}</p>
                <p className="mt-1 text-2xl font-bold text-neutral-gray-90">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-neutral-gray-90 mb-4">
          빠른 실행
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="group relative overflow-hidden rounded-lg border border-neutral-gray-30 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-primary-blue"
              >
                <div className={`inline-flex rounded-lg p-3 ${action.color} text-white mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-gray-90 mb-2 group-hover:text-primary-blue transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-neutral-gray-130 mb-4">
                  {action.description}
                </p>
                <div className="flex items-center text-sm font-medium text-primary-blue">
                  바로가기
                  <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border border-neutral-gray-30 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-gray-90">
            최근 활동
          </h2>
          <Link 
            href="/activity" 
            className="text-sm font-medium text-primary-blue hover:underline"
          >
            전체 보기
          </Link>
        </div>
        <div className="space-y-4">
          {[
            { action: "상품 등록", user: "김철수", time: "5분 전", item: "노트북 - MacBook Pro 16\"" },
            { action: "주문 처리", user: "이영희", time: "15분 전", item: "주문번호 #12345" },
            { action: "재고 업데이트", user: "박민수", time: "1시간 전", item: "무선 키보드 x 50개" },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-neutral-gray-20 pb-4 last:border-0 last:pb-0"
            >
              <div>
                <p className="font-medium text-neutral-gray-90">
                  {activity.action}
                </p>
                <p className="text-sm text-neutral-gray-130">
                  {activity.user} · {activity.item}
                </p>
              </div>
              <span className="text-xs text-neutral-gray-130">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


