/**
 * SpacePro - MES/MRP 생산계획 관리 시스템
 * 메인 대시보드 (Metronic 스타일)
 */

'use client';

import React from 'react';
import {
  Settings,
  Bell,
  User,
  Search,
  MoreVertical,
  TrendingUp,
  Factory,
  Package,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Wrench,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from 'recharts';

// Metronic 색상 팔레트
const colors = {
  primary: '#3699FF',
  success: '#1BC5BD',
  warning: '#FFA800',
  danger: '#F64E60',
  info: '#8950FC',
  dark: '#181C32',
  secondary: '#E4E6EF',
  light: '#F5F8FA',
  white: '#FFFFFF',
  gray100: '#F5F8FA',
  gray200: '#EFF2F5',
  gray300: '#E4E6EF',
  gray400: '#B5B5C3',
  gray500: '#A1A5B7',
  gray600: '#7E8299',
  gray700: '#5E6278',
  gray800: '#3F4254',
  gray900: '#181C32',
};

// 샘플 데이터
const dailyOutputData = [
  { name: '1월', value: 180 },
  { name: '2월', value: 220 },
  { name: '3월', value: 190 },
  { name: '4월', value: 250 },
  { name: '5월', value: 210 },
  { name: '6월', value: 180 },
  { name: '7월', value: 230 },
  { name: '8월', value: 200 },
  { name: '9월', value: 190 },
  { name: '10월', value: 220 },
  { name: '11월', value: 210 },
  { name: '12월', value: 240 },
];

const bottleneckData = [
  { name: '1월', value: 38 },
  { name: '2월', value: 42 },
  { name: '3월', value: 35 },
  { name: '4월', value: 58 },
  { name: '5월', value: 52 },
  { name: '6월', value: 48 },
];

const inventoryTurnoverData = [
  { name: '1월', value: 60 },
  { name: '2월', value: 45 },
  { name: '3월', value: 55 },
  { name: '4월', value: 70 },
  { name: '5월', value: 65 },
  { name: '6월', value: 50 },
];

const workOrderData = [
  { name: '월', value: 35 },
  { name: '화', value: 42 },
  { name: '수', value: 38 },
  { name: '목', value: 55 },
  { name: '금', value: 48 },
  { name: '토', value: 32 },
  { name: '일', value: 28 },
];

const mtbfData = [
  { name: '1월', value: 280 },
  { name: '2월', value: 320 },
  { name: '3월', value: 350 },
  { name: '4월', value: 310 },
  { name: '5월', value: 340 },
  { name: '6월', value: 380 },
];

const donutData = [
  { name: '가동중', value: 78, color: colors.success },
  { name: '대기', value: 15, color: colors.warning },
  { name: '정지', value: 7, color: colors.danger },
];

export default function Dashboard() {
  const today = new Date();
  const dateString = `${today.getFullYear()}년 ${today.getMonth() + 1}월`;

  return (
    <div className="min-h-screen" style={{ background: colors.gray100 }}>
      {/* Main Content */}
      <div>
        {/* Header */}
        <header className="h-[65px] bg-white border-b flex items-center justify-between px-8" style={{ borderColor: colors.gray200 }}>
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold" style={{ color: colors.gray900 }}>생산 현황 종합</h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: colors.gray400 }} />
              <input
                type="text"
                placeholder="검색..."
                className="pl-10 pr-4 py-2 rounded-lg text-sm border-0"
                style={{ background: colors.gray100, color: colors.gray700 }}
              />
            </div>

            {/* Notifications */}
            <button className="w-10 h-10 rounded-lg flex items-center justify-center relative" style={{ background: colors.gray100 }}>
              <Bell className="w-5 h-5" style={{ color: colors.gray600 }} />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] text-white flex items-center justify-center" style={{ background: colors.danger }}>5</span>
            </button>

            {/* User */}
            <div className="flex items-center gap-2 ml-2">
              <div className="text-right">
                <p className="text-sm font-medium" style={{ color: colors.gray800 }}>김철수</p>
                <p className="text-xs" style={{ color: colors.gray500 }}>{dateString}</p>
              </div>
              <div className="w-10 h-10 rounded-lg overflow-hidden" style={{ background: colors.gray200 }}>
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-5 h-5" style={{ color: colors.gray500 }} />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            {[
              { label: '금일 생산실적', value: '1,248', unit: 'EA', change: '+12.5%', color: colors.primary, icon: Factory },
              { label: '전체 진척률', value: '67.8', unit: '%', change: '+5.2%', color: colors.success, icon: TrendingUp },
              { label: '지연 건수', value: '6', unit: '건', change: '-2.0%', color: colors.danger, icon: Clock },
              { label: '자재 소요 대기', value: '15', unit: '건', change: '+3.5%', color: colors.warning, icon: Package },
            ].map((kpi, i) => {
              const Icon = kpi.icon;
              return (
                <div key={i} className="bg-white rounded-xl p-5" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: kpi.color + '15' }}>
                      <Icon className="w-6 h-6" style={{ color: kpi.color }} />
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${kpi.change.startsWith('+') ? '' : ''}`} style={{
                      background: kpi.change.startsWith('+') ? colors.success + '15' : colors.danger + '15',
                      color: kpi.change.startsWith('+') ? colors.success : colors.danger
                    }}>
                      {kpi.change}
                    </span>
                  </div>
                  <p className="text-sm mb-1" style={{ color: colors.gray500 }}>{kpi.label}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold" style={{ color: colors.gray900 }}>{kpi.value}</span>
                    <span className="text-sm" style={{ color: colors.gray500 }}>{kpi.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-12 gap-6 mb-6">
            {/* 전체 생산 현황 */}
            <div className="col-span-8 bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
              <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: colors.gray200 }}>
                <h3 className="text-base font-semibold" style={{ color: colors.gray900 }}>전체 생산 현황</h3>
                <button>
                  <MoreVertical className="w-4 h-4" style={{ color: colors.gray400 }} />
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="rounded-lg p-4" style={{ background: colors.primary + '10' }}>
                    <p className="text-sm" style={{ color: colors.gray600 }}>총 생산량</p>
                    <p className="text-xl font-bold mt-1" style={{ color: colors.gray900 }}>50,000 <span className="text-sm font-normal" style={{ color: colors.gray500 }}>개</span></p>
                  </div>
                  <div className="rounded-lg p-4" style={{ background: colors.gray100 }}>
                    <p className="text-sm" style={{ color: colors.gray600 }}>에너지 사용량</p>
                    <p className="text-xl font-bold mt-1" style={{ color: colors.gray900 }}>1,200 <span className="text-sm font-normal" style={{ color: colors.gray500 }}>kWh</span></p>
                  </div>
                  <div className="rounded-lg p-4" style={{ background: colors.success + '10' }}>
                    <p className="text-sm" style={{ color: colors.gray600 }}>품질 점수</p>
                    <p className="text-xl font-bold mt-1" style={{ color: colors.gray900 }}>98%</p>
                  </div>
                </div>

                <h4 className="text-sm font-medium mb-4" style={{ color: colors.gray700 }}>일별 생산 추이</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={dailyOutputData}>
                    <defs>
                      <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.primary} stopOpacity={0.1} />
                        <stop offset="95%" stopColor={colors.primary} stopOpacity={0.01} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: colors.gray500 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: colors.gray500 }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke={colors.primary} fill="url(#colorPrimary)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 설비 가동 현황 */}
            <div className="col-span-4 bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
              <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: colors.gray200 }}>
                <h3 className="text-base font-semibold" style={{ color: colors.gray900 }}>설비 가동 현황</h3>
                <button>
                  <MoreVertical className="w-4 h-4" style={{ color: colors.gray400 }} />
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <ResponsiveContainer width={160} height={160}>
                      <PieChart>
                        <Pie
                          data={donutData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          dataKey="value"
                        >
                          {donutData.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold" style={{ color: colors.gray900 }}>78%</p>
                        <p className="text-xs" style={{ color: colors.gray500 }}>가동률</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {donutData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                        <span className="text-sm" style={{ color: colors.gray600 }}>{item.name}</span>
                      </div>
                      <span className="text-sm font-medium" style={{ color: colors.gray800 }}>{item.value}%</span>
                    </div>
                  ))}
                </div>

                {/* 알림 */}
                <div className="mt-6 pt-6 border-t" style={{ borderColor: colors.gray200 }}>
                  <h4 className="text-sm font-medium mb-3" style={{ color: colors.gray700 }}>최근 알림</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-2 h-2 rounded-full" style={{ background: colors.warning }} />
                      <span style={{ color: colors.gray600 }}>설비 MC-02 점검 예정</span>
                      <span className="ml-auto" style={{ color: colors.gray400 }}>23분 전</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-2 h-2 rounded-full" style={{ background: colors.danger }} />
                      <span style={{ color: colors.gray600 }}>프레스 라인 이상 감지</span>
                      <span className="ml-auto" style={{ color: colors.gray400 }}>13분 전</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-12 gap-6">
            {/* 재고 및 물류 관리 */}
            <div className="col-span-6 bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
              <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: colors.gray200 }}>
                <h3 className="text-base font-semibold" style={{ color: colors.gray900 }}>재고 및 물류 관리</h3>
                <button>
                  <MoreVertical className="w-4 h-4" style={{ color: colors.gray400 }} />
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="rounded-lg p-4" style={{ background: colors.success + '10' }}>
                    <p className="text-sm" style={{ color: colors.gray600 }}>원자재 수준</p>
                    <p className="text-xl font-bold mt-1" style={{ color: colors.success }}>정상</p>
                  </div>
                  <div className="rounded-lg p-4" style={{ background: colors.gray100 }}>
                    <p className="text-sm" style={{ color: colors.gray600 }}>완제품 재고</p>
                    <p className="text-xl font-bold mt-1" style={{ color: colors.gray900 }}>5,000</p>
                  </div>
                  <div>
                    <p className="text-sm mb-2" style={{ color: colors.gray600 }}>재고 회전율</p>
                    <ResponsiveContainer width="100%" height={60}>
                      <BarChart data={inventoryTurnoverData}>
                        <Bar dataKey="value" fill={colors.primary} radius={[3, 3, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs mb-4">
                  <span style={{ color: colors.gray600 }}>창고 용량</span>
                  <span className="font-bold" style={{ color: colors.success }}>정상</span>
                  <div className="flex-1 h-2 rounded-full ml-2" style={{ background: colors.gray200 }}>
                    <div className="h-full rounded-full" style={{ width: '60%', background: colors.primary }} />
                  </div>
                  <span style={{ color: colors.gray500 }}>60%</span>
                </div>
              </div>
            </div>

            {/* 설비 보전 및 건강성 */}
            <div className="col-span-6 bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
              <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: colors.gray200 }}>
                <h3 className="text-base font-semibold" style={{ color: colors.gray900 }}>설비 보전 및 건강성</h3>
                <button>
                  <MoreVertical className="w-4 h-4" style={{ color: colors.gray400 }} />
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="rounded-lg p-4" style={{ background: colors.warning + '10' }}>
                    <p className="text-sm" style={{ color: colors.gray600 }}>예정된 정비</p>
                    <p className="text-xl font-bold mt-1" style={{ color: colors.warning }}>3건</p>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg p-4" style={{ background: colors.gray100 }}>
                    <p className="text-2xl font-bold" style={{ color: colors.success }}>85%</p>
                    <p className="text-xs mt-1" style={{ color: colors.gray500 }}>설비 건강 점수</p>
                  </div>
                  <div>
                    <p className="text-sm mb-2" style={{ color: colors.gray600 }}>MTBF</p>
                    <ResponsiveContainer width="100%" height={60}>
                      <AreaChart data={mtbfData}>
                        <Area type="monotone" dataKey="value" stroke={colors.success} fill={colors.success + '20'} strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <p className="text-sm mb-2" style={{ color: colors.gray600 }}>작업지시 현황</p>
                  <ResponsiveContainer width="100%" height={80}>
                    <BarChart data={workOrderData}>
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: colors.gray400 }} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                        {workOrderData.map((_, index) => (
                          <Cell key={index} fill={index % 2 === 0 ? colors.primary : colors.info} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
