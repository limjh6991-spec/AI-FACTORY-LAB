# 🤖 JARVIS 재연결 프롬프트

> **최종 업데이트**: 2024년 12월 21일  
> **목적**: 새로운 세션에서 프로젝트 현황을 빠르게 파악

---

## 📚 필수 읽기 파일

1. `README.md` - 전체 프로젝트 개요
2. `apps/README.md` - 애플리케이션 목록 및 관계

### 상황별 추가 파일

| 작업 대상 | 파일 |
|----------|------|
| 화면 생성기 | `apps/screen-generator/README.md` |
| Binary Soft | `apps/binary/README.md` |
| SpacePro | `apps/spacepro/README.md` |
| AI Factory | `apps/vertical-ai-factory/.ai-context.md` |

---

## 📋 재연결 프롬프트 (복사용)

```
안녕하세요, 자비스! 👋

AI Factory Lab 프로젝트를 계속 진행합니다.
아래 파일들을 읽고 현황을 파악해주세요:

1. README.md
2. apps/README.md

요약에 포함할 내용:
- 프로젝트 목표 및 현재 단계
- 완료된 주요 작업 (최대 3개)
- 다음 할 작업
```

---

## 📁 프로젝트 구조

```
ai-factory-lab/
├── README.md                    # 전체 개요
├── docs/                        # 공통 문서
├── resources/                   # 공통 리소스
│
└── apps/                        # 애플리케이션
    ├── screen-generator/        # RealGrid 화면 생성기
    ├── binary/                  # 프로젝트 관리 시스템
    ├── spacepro/                # MES/MRP 대시보드
    └── vertical-ai-factory/     # 다중 에이전트 SQL
```

---

## 🚀 빠른 시작

```bash
# screen-generator
cd apps/screen-generator && npm run dev

# binary
cd apps/binary && npm run dev

# spacepro  
cd apps/spacepro && npm run dev

# vertical-ai-factory
cd apps/vertical-ai-factory && source venv/bin/activate && python src/main.py
```

---

**작성일**: 2024년 12월 21일
