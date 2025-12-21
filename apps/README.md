# Apps

AI Factory Lab 애플리케이션 모음

---

## 📁 애플리케이션 목록

| 앱 | 설명 | 기술 스택 | 포트 |
|----|------|-----------|------|
| **screen-generator** | RealGrid 화면 자동 생성 | Next.js, Prisma, Gemini | 3000 |
| **binary** | 프로젝트 관리 시스템 | Next.js, TypeScript | 3000 |
| **spacepro** | MES/MRP 대시보드 | Next.js, Prisma, OR-Tools | 3001 |
| **vertical-ai-factory** | 다중 에이전트 SQL 생성기 | Python, LangGraph | 8000 |

---

## 🔗 앱 간 관계

```
┌─────────────────────────────────────────────────────────────────┐
│                        screen-generator                          │
│              (RealGrid 화면 자동 생성 시스템)                     │
│                                                                   │
│    공통 디자인: resources/design-system/ (루트)                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                          spacepro                                 │
│                   (MES/MRP 대시보드)                              │
│                                                                   │
│    ┌───────────────┐          ┌────────────────────────────┐    │
│    │ /ai-demo      │ ──API───→│ vertical-ai-factory        │    │
│    │               │←─JSON────│ (LangGraph 에이전트)        │    │
│    └───────────────┘          └────────────────────────────┘    │
│                                                                   │
│    ┌───────────────┐                                             │
│    │ /plan/monthly │ ──API───→ scheduling-service (OR-Tools)     │
│    └───────────────┘                                             │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                           binary                                  │
│               (프로젝트 관리 시스템 - 독립 운영)                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 일괄 실행

```bash
# screen-generator
cd screen-generator && npm run dev &

# spacepro
cd ../spacepro && npm run dev -- -p 3001 &

# binary
cd ../binary && npm run dev -- -p 3002 &

# vertical-ai-factory API
cd ../vertical-ai-factory && source venv/bin/activate && python src/api_server.py &
```

---

## 📂 공유 리소스 (루트)

각 앱에서 필요시 상위 폴더 참조:
- `../docs/` - 공통 문서
- `../resources/design-system/` - IBM Carbon Design System
