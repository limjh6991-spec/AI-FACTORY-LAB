# Google OR-Tools 소개

> **OR-Tools**는 Google에서 개발한 오픈소스 최적화 도구 모음입니다.  
> 조합 최적화, 스케줄링, 라우팅 문제 해결에 특화되어 있습니다.

---

## 📌 주요 특징

| 특징 | 설명 |
|------|------|
| **오픈소스** | Apache 2.0 라이선스, 무료 사용 |
| **다양한 솔버** | CP-SAT, Linear Programming, VRP 등 |
| **언어 지원** | Python, C++, Java, C# |
| **확장성** | 대규모 문제도 처리 가능 |

---

## 🔧 주요 솔버

### 1. CP-SAT (Constraint Programming - SAT)
- 제약 조건 프로그래밍 + SAT 솔버 결합
- **스케줄링, 리소스 할당 문제**에 최적
- 정수 변수 기반 최적화

### 2. Linear Programming (LP) / Mixed Integer Programming (MIP)
- 선형/혼합 정수 프로그래밍
- 생산량 최적화, 비용 최소화

### 3. Vehicle Routing Problem (VRP)
- 차량 경로 최적화
- 배송 스케줄링, 물류 최적화

---

## 📊 지원 문제 유형

```
┌─────────────────────────────────────────────────────────┐
│ Job Shop Scheduling    │ 다중 작업 → 다중 기계 스케줄링  │
├─────────────────────────────────────────────────────────┤
│ Employee Scheduling    │ 근무 시프트 스케줄링           │
├─────────────────────────────────────────────────────────┤
│ Resource Allocation    │ 리소스 할당 최적화             │
├─────────────────────────────────────────────────────────┤
│ Production Planning    │ 생산 계획 최적화               │
├─────────────────────────────────────────────────────────┤
│ Vehicle Routing        │ 배송 경로 최적화               │
└─────────────────────────────────────────────────────────┘
```

---

## 🔗 공식 리소스

| 리소스 | URL |
|--------|-----|
| **공식 사이트** | https://developers.google.com/optimization |
| **GitHub** | https://github.com/google/or-tools |
| **PyPI** | https://pypi.org/project/ortools/ |
| **문서** | https://or-tools.github.io/docs/pdoc/ortools.html |

---

## 📦 설치 방법

### Python
```bash
pip install ortools
```

### C++ / Java / C#
GitHub 릴리스 페이지에서 바이너리 다운로드

---

## 🎯 MES/MRP에서의 활용

1. **생산 스케줄링**: Job Shop Problem 솔버 활용
2. **설비 배분**: Resource Allocation 모델
3. **작업 순서 최적화**: CP-SAT 제약 조건 설정
4. **납기 준수 최적화**: 목표 함수로 납기 지연 최소화

---

**작성일**: 2024-12-18
