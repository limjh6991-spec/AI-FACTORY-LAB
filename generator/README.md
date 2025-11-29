# AI Factory Generator

Gemini API를 사용하여 PI 문서에서 화면 스키마와 코드를 자동 생성하는 도구입니다.

## 설치

### 1. 가상환경 생성 및 활성화
```bash
cd generator
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

### 2. 의존성 설치
```bash
pip install -r requirements.txt
```

## 환경변수 설정

### 방법 1: .env 파일 사용 (권장)
```bash
# .env.example을 복사하여 .env 파일 생성
cp .env.example .env

# .env 파일을 열어서 실제 API 키 입력
# GEMINI_API_KEY=your_actual_api_key_here
```

### 방법 2: 환경변수 직접 설정
```bash
export GEMINI_API_KEY="your-gemini-api-key"
```

## 사용법

### 1. Python 스크립트에서 사용

```python
from generator import generate_code

pi_text = """
화면명: 제품별 원가 조회
화면ID: COST001

[검색조건]
- 제품코드 (필수)
- 사업부 (선택, 드롭다운)

[조회 결과]
- 제품코드
- 제품명
- 단위원가
"""

files = generate_code(pi_text)

for file_info in files:
    print(f"파일: {file_info['filename']}")
    print(file_info['code'])
```

### 2. 직접 실행 (테스트)

```bash
# 가상환경 활성화
source venv/bin/activate

# 테스트 실행
python generator.py
```

## 출력 형식

```python
[
    {
        "filename": "COST001.json",
        "code": "{ ... JSON 스키마 ... }",
        "path": "frontend/src/schemas/COST001.json"
    },
    {
        "filename": "COST001.vue",
        "code": "<template>...</template>",
        "path": "frontend/src/views/generated/COST001.vue"
    },
    {
        "filename": "router_config.js",
        "code": "// 라우터 설정...",
        "path": "reference/router_config.js"
    }
]
```

## 디렉토리 구조

```
generator/
├── generator.py              # 메인 생성기
├── prompts/
│   └── system_instruction.md # Gemini 시스템 프롬프트
├── templates/                # 템플릿 파일 (추후 확장)
└── README.md
```

## 다음 단계

- [ ] Jinja2 템플릿 엔진 도입
- [ ] Backend 코드 생성 (Controller, Service, Mapper)
- [ ] 웹 UI 개발 (관리자 화면)
- [ ] 파일 저장 기능 추가
