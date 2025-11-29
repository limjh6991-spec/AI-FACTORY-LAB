# AI Factory Engine

FastAPI 기반 코드 생성 API 서버

## 설치

```bash
cd generator
source venv/bin/activate
pip install -r requirements.txt
```

## 실행

```bash
cd engine
python server.py
```

서버가 시작되면:
- API 서버: http://localhost:8000
- API 문서: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API 엔드포인트

### POST /generate

PI 문서를 받아서 화면 코드를 생성합니다.

**Request Body:**
```json
{
  "piText": "화면명: 제품별 원가 조회\n화면ID: COST001\n..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "3개 파일이 성공적으로 생성되었습니다.",
  "files": [
    {
      "filename": "COST001.json",
      "code": "{ ... }",
      "path": "frontend/src/schemas/COST001.json"
    }
  ]
}
```

## 테스트

```bash
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -d '{"piText": "화면명: 테스트\n화면ID: TEST001"}'
```
