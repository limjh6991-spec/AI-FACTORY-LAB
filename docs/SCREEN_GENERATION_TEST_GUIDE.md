# 🎉 화면 자동 생성 테스트 가이드

**작성일**: 2025-11-30  
**작성자**: AI Factory Lab Team

---

## 📋 생성된 화면 목록

### 1. **생산 실적 관리** (ProductionResult) ✅
- **경로**: http://localhost:8081/production/ProductionResult
- **카테고리**: production
- **기능**:
  - 33개 컬럼 그리드
  - 10개 검색 조건 (날짜, 공장, 라인, 근무조 등)
  - 8개 버튼 (조회, 저장, 삭제, 확정, Excel 업로드/다운로드)
  - 샘플 데이터: 30건

### 2. **원가 관리** (CostManagement) ✅
- **경로**: http://localhost:8081/cost/CostManagement
- **카테고리**: cost
- **기능**:
  - 31개 컬럼 그리드
  - 12개 검색 조건 (기준년월, 공장, 품목, 원가유형 등)
  - 9개 버튼 (조회, 저장, 삭제, 일괄승인, Excel 업로드/다운로드, 복사)

---

## 🧪 테스트 시나리오

### 시나리오 1: 생산 실적 관리 테스트

#### 1.1 화면 접속
```
URL: http://localhost:8081/production/ProductionResult
기대 결과: 화면 정상 로딩, 검색 조건 및 그리드 표시
```

#### 1.2 검색 기능 테스트
**검색 조건**:
- 생산일자(시작): 2025-11-25
- 생산일자(종료): 2025-11-30
- 공장: F001 (본사공장)
- 라인: L01 (1호기)

**실행 순서**:
1. 검색 조건 입력
2. "조회" 버튼 클릭
3. 그리드에 데이터 표시 확인

**기대 결과**:
- API 호출: `GET /api/production/result/list?prdDateFrom=2025-11-25&prdDateTo=2025-11-30&factoryCd=F001&lineCd=L01`
- 그리드에 필터링된 데이터 표시
- 총 건수 표시

#### 1.3 행 추가 테스트
1. "행 추가" 버튼 클릭
2. 그리드에 빈 행 추가 확인
3. 데이터 입력:
   - 생산일자: 2025-11-30
   - 공장코드: F001
   - 라인코드: L01
   - 근무조: A
   - 품목코드: I001
4. "저장" 버튼 클릭

**기대 결과**:
- API 호출: `POST /api/production/result/save`
- 성공 메시지 표시
- 그리드 자동 갱신

#### 1.4 Excel 다운로드 테스트
1. 검색 조건 설정
2. "Excel 다운로드" 버튼 클릭

**기대 결과**:
- API 호출: `GET /api/production/result/excel/download`
- Excel 파일 다운로드 (ProductionResult_yyyyMMddHHmmss.xlsx)
- 파일에 검색된 데이터 포함

---

### 시나리오 2: 원가 관리 테스트

#### 2.1 화면 접속
```
URL: http://localhost:8081/cost/CostManagement
기대 결과: 화면 정상 로딩, 검색 조건 및 그리드 표시
```

#### 2.2 검색 기능 테스트
**검색 조건**:
- 기준년도(시작): 2025
- 기준년도(종료): 2025
- 기준월: 11 (11월)
- 공장: F001
- 원가유형: STD (표준원가)

**실행 순서**:
1. 검색 조건 입력
2. "조회" 버튼 클릭
3. 그리드에 데이터 표시 확인

**기대 결과**:
- API 호출: `GET /api/cost/management/list?baseYearFrom=2025&baseYearTo=2025&baseMonth=11&factoryCd=F001&costType=STD`
- 그리드에 필터링된 데이터 표시

#### 2.3 행 추가 및 저장 테스트
1. "행 추가" 버튼 클릭
2. 데이터 입력:
   - 공장코드: F001
   - 품목코드: I001
   - 품목명: 알루미늄 프로파일
   - 원가유형: STD
   - 기준년도: 2025
   - 기준월: 11
   - 재료비: 10000
   - 노무비: 5000
   - 경비: 3000
   - 이익률: 20
   - 판매가: 21600
3. "저장" 버튼 클릭

**기대 결과**:
- 총원가 자동 계산: 18,000 (10000 + 5000 + 3000)
- 판매가 검증 (총원가 + 이익률)
- API 호출: `POST /api/cost/management/save`
- 성공 메시지 표시

#### 2.4 복사 기능 테스트
1. 그리드에서 행 선택
2. "복사" 버튼 클릭
3. 확인 메시지 표시
4. 복사된 행 확인 (원가ID는 새로 생성)

**기대 결과**:
- API 호출: `POST /api/cost/management/copy`
- 새 행 추가됨
- 원가ID 제외한 모든 값 복사됨

#### 2.5 일괄 승인 테스트
1. 그리드에서 여러 행 선택 (Shift + Click)
2. "일괄 승인" 버튼 클릭
3. 확인 메시지 "선택한 항목을 승인하시겠습니까?"
4. "확인" 클릭

**기대 결과**:
- API 호출: `POST /api/cost/management/approve`
- 선택된 행의 승인상태 변경: APPROVED
- 승인일자 및 승인자 업데이트

---

## 🔧 서버 상태 확인

### Frontend (Vue)
```bash
# 프로세스 확인
ps aux | grep "npm run serve" | grep -v grep

# 포트 확인
netstat -tuln | grep 8081

# 로그 확인
tail -f /home/roarm_m3/ai-factory-lab/frontend/nohup.out
```

### Backend (Spring Boot)
```bash
# 프로세스 확인
ps aux | grep "spring-boot:run" | grep -v grep

# 포트 확인
netstat -tuln | grep 8080

# 로그 확인
tail -f /home/roarm_m3/ai-factory-lab/backend/spring-boot.log
```

### FastAPI Engine
```bash
# 프로세스 확인
ps aux | grep "uvicorn" | grep -v grep

# 포트 확인
netstat -tuln | grep 8000

# 로그 확인
tail -f /home/roarm_m3/ai-factory-lab/logs/fastapi.log
```

---

## 📊 API 엔드포인트 목록

### ProductionResult APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/production/result/list | 생산 실적 목록 조회 |
| POST | /api/production/result/save | 생산 실적 저장 |
| DELETE | /api/production/result/delete | 생산 실적 삭제 |
| POST | /api/production/result/confirm | 생산 실적 확정 |
| POST | /api/production/result/excel/upload | Excel 업로드 |
| GET | /api/production/result/excel/download | Excel 다운로드 |

### CostManagement APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/cost/management/list | 원가 목록 조회 |
| POST | /api/cost/management/save | 원가 저장 |
| DELETE | /api/cost/management/delete | 원가 삭제 |
| POST | /api/cost/management/approve | 원가 일괄 승인 |
| POST | /api/cost/management/copy | 원가 복사 |
| POST | /api/cost/management/excel/upload | Excel 업로드 |
| GET | /api/cost/management/excel/download | Excel 다운로드 |

---

## 🐛 문제 해결

### 문제 1: 화면이 로딩되지 않음
**증상**: 빈 화면 또는 404 오류  
**해결책**:
1. 라우터 설정 확인: `frontend/src/router/index.js`
2. Vue 파일 존재 확인: `frontend/src/views/{category}/{ScreenId}.vue`
3. Frontend 재시작

### 문제 2: API 호출 실패 (CORS 오류)
**증상**: Console에 CORS 오류 메시지  
**해결책**:
1. Backend CORS 설정 확인: `backend/src/main/java/com/dowinsys/common/config/CorsConfig.java`
2. Backend 재시작

### 문제 3: 데이터가 조회되지 않음
**증상**: 그리드가 비어있음  
**해결책**:
1. DB 테이블 존재 확인
2. 샘플 데이터 확인
3. API 응답 확인 (Network 탭)
4. Mapper XML SQL 확인

### 문제 4: 저장 실패
**증상**: 저장 버튼 클릭 후 오류 메시지  
**해결책**:
1. 필수 필드 입력 확인
2. Backend 로그 확인: `backend/spring-boot.log`
3. DB 권한 확인
4. SQL 오류 확인 (Mapper XML)

---

## 📈 성능 지표

| 항목 | 시간/크기 |
|------|----------|
| Excel PI 생성 | ~5초 |
| JSON 파싱 | <1초 |
| Vue 컴포넌트 생성 | <1초 |
| Java Backend 생성 | <1초 |
| 파일 배포 | <1초 |
| Backend 재시작 | ~15초 |
| **총 소요 시간** | **~23초** |

**파일 크기**:
- ProductionResult.vue: 18KB (769 lines)
- CostManagement.vue: ~20KB (예상)
- Controller.java: ~8KB
- Mapper.xml: ~5KB

---

## 🎯 체크리스트

### 생산 실적 관리
- [ ] 화면 접속 확인
- [ ] 검색 기능 (10개 조건)
- [ ] 행 추가/삭제
- [ ] 저장 기능
- [ ] 확정 기능
- [ ] Excel 업로드
- [ ] Excel 다운로드
- [ ] 페이징 (30건 이상 데이터)

### 원가 관리
- [ ] 화면 접속 확인
- [ ] 검색 기능 (12개 조건)
- [ ] 행 추가/삭제
- [ ] 저장 기능
- [ ] 복사 기능
- [ ] 일괄 승인 기능
- [ ] Excel 업로드
- [ ] Excel 다운로드

---

## 🚀 다음 단계

1. **DB 테이블 생성** (CostManagement용)
   ```sql
   CREATE TABLE new_doi_cost_master (
       cost_id VARCHAR(50) PRIMARY KEY,
       factory_cd VARCHAR(10),
       factory_nm VARCHAR(100),
       item_cd VARCHAR(50),
       item_nm VARCHAR(200),
       -- ... 나머지 컬럼
   );
   ```

2. **샘플 데이터 삽입**
   - 원가 관리: 20~30건
   - 다양한 공장, 품목, 원가유형

3. **메뉴 등록**
   ```sql
   INSERT INTO new_doi_sys_menu (menu_id, menu_nm, url, parent_id, ...)
   VALUES 
   ('M005', '원가 관리', '', 'ROOT', ...),
   ('M005-01', '원가 관리', '/cost/CostManagement', 'M005', ...);
   ```

4. **통합 테스트**
   - 모든 시나리오 실행
   - 성능 측정
   - 버그 수정

---

**작성일**: 2025-11-30  
**최종 업데이트**: 2025-11-30 13:45

