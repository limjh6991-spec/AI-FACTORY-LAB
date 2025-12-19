# SpacePro - MES/MRP 생산계획 관리 시스템

> **Next.js 16 + TypeScript + Tailwind CSS + Prisma 7 기반 생산 모니터링 대시보드**

## 🚀 프로젝트 개요

SpacePro는 MES/MRP 기반의 **생산 진척현황 모니터링 대시보드** 시스템입니다.
생산 플로우를 시각화하고, KPI를 모니터링하며, 실시간 알람 시스템을 제공합니다.

## 📋 주요 기능

### 대시보드
- **메인 대시보드** (`/`) - 생산 현황 종합
- **프로젝트 대시보드** (`/projects`) - Metronic 스타일	
- **킥오프 미팅** (`/kickoff`) - 프로젝트 착수 준비 가이드
- **딥 블루 테마** (`/dashboard2`) - Dark 테마 대시보드

### 핵심 컴포넌트
| 컴포넌트 | 설명 |
|---------|------|
| KPI 카드 | 생산실적, 진척률, 지연건수 등 핵심 지표 |
| 도넛 차트 | 설비 가동률 시각화 (OEE) |
| 에어리어 차트 | 일별/월별 생산 추이 |
| 체크리스트 | 토글 가능한 현장 실사 체크리스트 |

## 🛠️ 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Database**: PostgreSQL + Prisma 7
- **OR-Tools**: Python 마이크로서비스 (스케줄링 최적화)

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx          # 메인 대시보드
│   ├── projects/         # 프로젝트 대시보드
│   ├── kickoff/          # 킥오프 미팅 키트
│   ├── dashboard2/       # 딥 블루 테마
│   └── globals.css       # 글로벌 스타일
├── components/
│   ├── dashboard/        # 대시보드 컴포넌트
│   │   ├── KpiCard.tsx
│   │   ├── ProcessCard.tsx
│   │   ├── ProductionFlow.tsx
│   │   ├── AlarmList.tsx
│   │   ├── DashboardPanel.tsx
│   │   ├── StatCard.tsx
│   │   ├── MiniLineChart.tsx
│   │   └── DonutChart.tsx
│   └── layout/           # 레이아웃 컴포넌트
│       ├── Sidebar.tsx
│       ├── DarkSidebar.tsx
│       └── Header.tsx
```

## 🎨 디자인 테마

### Metronic 스타일 (기본)
- Primary: `#3699FF` (파란색)
- Success: `#1BC5BD` (청록색)
- Warning: `#FFA800` (주황색)
- Danger: `#F64E60` (빨간색)
- Dark Sidebar: `#181C32`
- Background: `#F5F8FA`

## 🚀 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (포트 3001)
npm run dev -- -p 3001

# 브라우저 접속
http://localhost:3001
```

## 📅 개발 현황

### ✅ 완료
- [x] Prisma 7 + PostgreSQL 연동
- [x] 동적 사이드바 메뉴 시스템
- [x] 월간 생산계획 (`/plan/monthly`)
- [x] AI Demo 페이지 (`/ai-demo`) - LUI + MCP + Agent Orchestration
- [x] Scheduling Service (Python OR-Tools 마이크로서비스)

### 🔄 진행 중
- [ ] 마스터 데이터 관리 화면 (품목, BOM, 공정)
- [ ] OR-Tools Python 서비스 연동
- [ ] 생산 오더 관리

---

**Created**: 2024년 12월 17일  
**Updated**: 2024년 12월 19일  
**Author**: SpacePro Team
