# 생산수불 표준 (Production Inventory Standard)

> Vertical AI Factory 생산수불 표준 정의서
> 작성일: 2025-12-27
> 버전: v1.0

---

## 1. 개요

### 1.1 목적
공정간 수량 흐름을 표준화하여 회사별 로직 차이를 Knowledge Graph에서 관리할 수 있도록 함

### 1.2 적용 범위
- 공정간 수량 이동 (In/Out)
- 재고 밸런스 (BOH/EOH)
- 손실/보너스 처리
- 품질 구분 (양품/불량/보류)

---

## 2. 공정간 흐름 (Process Flow)

### 2.1 기본 흐름

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           정상 공정 흐름                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  원재료    공정1      공정2      공정3      완제품                        │
│    ◯  ──→  ◯  ───→  ◯  ───→  ◯  ───→  ◯                               │
│           INPUT    P_IN     P_IN     P_OUT                              │
│                    P_OUT    P_OUT    GOODS                              │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Rework 흐름 (재작업)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           Rework 공정 흐름                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  정상 공정                      Rework 창고 (논리적)                      │
│     ◯  ─────────────────┐                                               │
│     │                    ↓                                               │
│     │               ┌─────────┐                                         │
│     │   DEFECT_OUT  │ REWORK  │  REWORK_IN (재투입)                      │
│     └─────────────→ │  창고   │ ────────────→ 이전공정 or 동일공정        │
│                     │ (가상)  │                                          │
│                     └────┬────┘                                         │
│                          │ SCRAP_OUT (폐기)                              │
│                          ↓                                               │
│                       [폐기]                                             │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

**Rework 창고 특징:**
- 물리적 이동 없음 (상태 변경)
- 논리적(가상) 재고 위치
- Rework 후 재투입 or 폐기 결정

---

## 3. 트랜잭션 코드 표준

### 3.1 Input 유형

| 코드 | 유형 | 설명 |
|------|------|------|
| `NEW_INPUT` | 신규 투입 | 원재료 → 첫 공정 투입 |
| `PROCESS_IN` | 전공정 수령 | 이전 공정에서 수령 (= 이전공정 PROCESS_OUT) |
| `REWORK_IN` | 재투입 | Rework 창고에서 재투입 |
| `RETURN_IN` | 반품 재투입 | 고객 반품 → 공정 재투입 |

### 3.2 Output 유형

| 코드 | 유형 | 설명 |
|------|------|------|
| `PROCESS_OUT` | 다음공정 출고 | 다음 공정으로 양품 이동 |
| `GOODS_OUT` | 완제품 출고 | 최종 공정 → 완제품 창고 |
| `DEFECT_OUT` | 불량 출고 | Rework 창고로 이동 |
| `SCRAP_OUT` | 스크랩 출고 | 폐기 처리 |
| `SAMPLE_OUT` | 샘플 출고 | 품질검사용 샘플 |

### 3.3 손실/보너스

| 코드 | 유형 | 설명 |
|------|------|------|
| `NORMAL_LOSS` | 정상 손실 | 공정 특성상 발생 (허용 범위 내) |
| `ABNORMAL_LOSS` | 비정상 손실 | 관리 문제, 사고 등 |
| `NORMAL_BONUS` | 정상 보너스 | 공정 특성 (화학 반응 등) |
| `RECOVERY` | 회수 | 스크랩에서 회수 |

### 3.4 품질 구분

| 코드 | 유형 | 설명 |
|------|------|------|
| `GOOD` | 양품 | 품질 기준 충족 |
| `DEFECT` | 불량 | 품질 미달 → Rework or 폐기 |
| `HOLD` | 보류 | 검사 대기, 판정 보류 |

---

## 4. 수량 밸런스 공식

### 4.1 공정별 밸런스

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        공정별 수량 밸런스                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  EOH = BOH                                                               │
│        + NEW_INPUT + PROCESS_IN + REWORK_IN + RETURN_IN + BONUS         │
│        - PROCESS_OUT - GOODS_OUT - DEFECT_OUT - SCRAP_OUT - SAMPLE_OUT  │
│        - LOSS                                                            │
│                                                                          │
├─────────────────────────────────────────────────────────────────────────┤
│  간략화:                                                                 │
│  EOH = BOH + Σ(IN) + BONUS - Σ(OUT) - LOSS                              │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.2 검증 규칙

```python
# 수량 밸런스 검증
def validate_balance(process_data):
    total_in = (
        process_data['NEW_INPUT'] +
        process_data['PROCESS_IN'] +
        process_data['REWORK_IN'] +
        process_data['RETURN_IN'] +
        process_data['BONUS']
    )
    
    total_out = (
        process_data['PROCESS_OUT'] +
        process_data['GOODS_OUT'] +
        process_data['DEFECT_OUT'] +
        process_data['SCRAP_OUT'] +
        process_data['SAMPLE_OUT'] +
        process_data['LOSS']
    )
    
    expected_eoh = process_data['BOH'] + total_in - total_out
    
    return expected_eoh == process_data['EOH']
```

---

## 5. 조정 처리 (Adjustment)

### 5.1 조정 발생 상황

```
전산 재고 ≠ 실물 재고 (재고 실사 후 차이 발견)
```

### 5.2 처리 프로세스

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        조정 처리 프로세스                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  1. 차이 발생 감지                                                       │
│     │                                                                    │
│     ▼                                                                    │
│  2. 사용자에게 내용 설명                                                 │
│     - 차이 수량                                                          │
│     - 발생 원인 추정                                                     │
│     │                                                                    │
│     ▼                                                                    │
│  3. 사용자 컨펌 요청 ⚠️ (핵심 포인트)                                    │
│     │                                                                    │
│     ├─→ 승인 → Loss 또는 Bonus로 처리                                   │
│     │         - 차이 > 0: BONUS 처리                                     │
│     │         - 차이 < 0: LOSS 처리                                      │
│     │                                                                    │
│     └─→ 거부 → 원인 재조사                                              │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

> **💡 제안 포인트**: 반도체 업계 경험 기반
> - 자동 조정 금지, 반드시 사용자 컨펌 필요
> - 조정 이력 로깅 (감사 추적)
> - 허용 오차 범위 설정 가능 (예: ±0.1%)

---

## 6. 분할/합병 (Lot Split/Merge)

> **현재 상태**: 문서화만, 적용은 추후 검토

### 6.1 Lot 분할 (Split)

```
Lot A (100개) → Lot A-1 (60개) + Lot A-2 (40개)
```

**사용 시나리오:**
- 일부 수량만 먼저 출하
- 여러 설비에서 동시 처리
- 고객별 분리 납품

### 6.2 Lot 합병 (Merge)

```
Lot A (50개) + Lot B (50개) → Lot C (100개)
```

**사용 시나리오:**
- 동일 품목 소량 Lot 통합
- 재고 정리

### 6.3 적용 고려사항

| 항목 | 고려 사항 |
|------|----------|
| 추적성 | 합병 시 원 Lot 이력 유지 필요 |
| 품질 | 동일 품질 등급만 합병 가능 |
| 시스템 | Lot 관리 시스템 전제 필요 |

---

## 7. 샘플/반품 처리

### 7.1 샘플 처리 (Sample)

| 코드 | 트랜잭션 | 설명 |
|------|----------|------|
| `SAMPLE_OUT` | 샘플 출고 | 품질 검사용 샘플 |
| `SAMPLE_RETURN` | 샘플 반환 | 검사 후 반환 (선택적) |

**샘플 처리 규칙:**
- 샘플은 생산 수량에서 차감
- 파괴 검사: 반환 없음 (LOSS 처리)
- 비파괴 검사: 반환 가능 (SAMPLE_RETURN)

### 7.2 반품 재투입 (Return)

```
고객 반품 → 품질 검사 → 재투입 or 폐기
```

| 코드 | 트랜잭션 | 설명 |
|------|----------|------|
| `RETURN_RECEIVE` | 반품 수령 | 고객으로부터 반품 수령 |
| `RETURN_IN` | 반품 재투입 | 품질 OK → 공정 재투입 |
| `RETURN_SCRAP` | 반품 폐기 | 품질 NG → 폐기 처리 |

---

## 8. 테이블 설계 (예시)

### 8.1 공정 정의 테이블

```sql
CREATE TABLE bi_process_master (
    process_id VARCHAR(20) PRIMARY KEY,
    process_name VARCHAR(100) NOT NULL,
    process_seq INT NOT NULL,           -- 공정 순서
    is_rework BOOLEAN DEFAULT FALSE,    -- Rework 공정 여부
    prev_process_id VARCHAR(20),        -- 이전 공정
    next_process_id VARCHAR(20),        -- 다음 공정
    company_code VARCHAR(20) NOT NULL
);
```

### 8.2 생산수불 트랜잭션 테이블

```sql
CREATE TABLE bi_prod_transaction (
    trans_id SERIAL PRIMARY KEY,
    trans_date DATE NOT NULL,
    trans_type VARCHAR(20) NOT NULL,    -- NEW_INPUT, PROCESS_IN, LOSS, etc.
    process_id VARCHAR(20) NOT NULL,
    product_id VARCHAR(50) NOT NULL,
    qty DECIMAL(15,4) NOT NULL,
    quality_status VARCHAR(10),          -- GOOD, DEFECT, HOLD
    lot_no VARCHAR(50),
    remark TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    created_by VARCHAR(50),
    
    FOREIGN KEY (process_id) REFERENCES bi_process_master(process_id)
);
```

### 8.3 공정별 재고 테이블

```sql
CREATE TABLE bi_process_inventory (
    process_id VARCHAR(20) NOT NULL,
    product_id VARCHAR(50) NOT NULL,
    inv_date DATE NOT NULL,
    boh DECIMAL(15,4) DEFAULT 0,        -- 기초
    eoh DECIMAL(15,4) DEFAULT 0,        -- 기말
    total_in DECIMAL(15,4) DEFAULT 0,   -- 총 입고
    total_out DECIMAL(15,4) DEFAULT 0,  -- 총 출고
    loss DECIMAL(15,4) DEFAULT 0,
    bonus DECIMAL(15,4) DEFAULT 0,
    
    PRIMARY KEY (process_id, product_id, inv_date)
);
```

---

## 9. 회사별 로직 차이 (bi_logic_rules)

```sql
-- 생산수불 관련 로직 규칙
INSERT INTO bi_logic_rules (category, logic_name, logic_type, company_code, formula, description) VALUES
-- 손실 허용 범위
('PRODUCTION', 'loss_tolerance', 'THRESHOLD', 'BINARY', '0.02', '손실 허용 범위 2%'),
('PRODUCTION', 'loss_tolerance', 'THRESHOLD', 'DOU', '0.01', '손실 허용 범위 1%'),

-- Rework 허용 횟수
('PRODUCTION', 'max_rework_count', 'THRESHOLD', NULL, '3', '최대 재작업 횟수'),

-- 샘플 비율
('PRODUCTION', 'sample_rate', 'PERCENTAGE', NULL, '0.005', '샘플링 비율 0.5%'),

-- 조정 처리 방식
('PRODUCTION', 'adjustment_method', 'METHOD', NULL, 'USER_CONFIRM', '사용자 컨펌 후 처리'),
('PRODUCTION', 'adjustment_tolerance', 'THRESHOLD', NULL, '0.001', '자동 허용 오차 0.1%');
```

---

## 10. 다음 단계

1. ✅ 생산수불 표준 문서 작성 완료
2. ⬜ 재고수불 표준 문서 작성
3. ⬜ 공정-재고 연계 흐름 정의
4. ⬜ Knowledge Graph에 로직 규칙 등록
5. ⬜ 시각화 페이지 업데이트

---

**참고 자료:**
- 반도체 MES 생산수불 경험
- SAP PP/MM 모듈 표준
- K-MES 표준 가이드
