-- bi_common_code 테이블에 UI 라벨 컬럼 추가 및 초기 데이터 설정
-- 회사별 옵션 컴포넌트 라벨 지원

-- 1. ui_label 컬럼 추가
ALTER TABLE "binary".bi_common_code 
ADD COLUMN IF NOT EXISTS ui_label VARCHAR(100);

COMMENT ON COLUMN "binary".bi_common_code.ui_label IS '회사별 UI 표시 라벨';

-- 2. 인덱스 추가 (라벨 조회 최적화)
CREATE INDEX IF NOT EXISTS idx_bi_common_code_ui_label 
ON "binary".bi_common_code(code_type, category, company_code) 
WHERE ui_label IS NOT NULL;

-- 3. UI 라벨 데이터 INSERT (code_type = 'LABEL' 사용)
-- BINARY (기본)
INSERT INTO "binary".bi_common_code 
(code_type, category, standard_name, company_code, ui_label, use_yn)
VALUES 
('LABEL', 'CUSTOMER', 'customer_label', 'BINARY', '거래처', 'Y'),
('LABEL', 'DEPT', 'department_label', 'BINARY', '부서', 'Y'),
('LABEL', 'ACCOUNT', 'account_label', 'BINARY', '계정', 'Y'),
('LABEL', 'PRODUCT', 'product_label', 'BINARY', '제품', 'Y'),
('LABEL', 'MATERIAL', 'material_label', 'BINARY', '부품', 'Y'),
('LABEL', 'EQUIPMENT', 'equipment_label', 'BINARY', '설비', 'Y'),
('LABEL', 'MODEL', 'model_label', 'BINARY', '모델', 'Y'),
('LABEL', 'USER', 'user_label', 'BINARY', '사용자', 'Y'),
('LABEL', 'SITE', 'site_label', 'BINARY', '사업장', 'Y'),
('LABEL', 'SCENARIO', 'scenario_label', 'BINARY', '시나리오', 'Y'),
('LABEL', 'COST_CENTER', 'cost_center_label', 'BINARY', '코스트센터', 'Y'),
('LABEL', 'EXPENSE', 'expense_label', 'BINARY', '비용구분', 'Y')
ON CONFLICT (code_type, category, standard_name, company_code) DO UPDATE 
SET ui_label = EXCLUDED.ui_label;

-- DOU
INSERT INTO "binary".bi_common_code 
(code_type, category, standard_name, company_code, ui_label, use_yn)
VALUES 
('LABEL', 'CUSTOMER', 'customer_label', 'DOU', '거래처', 'Y'),
('LABEL', 'DEPT', 'department_label', 'DOU', '부서', 'Y'),
('LABEL', 'ACCOUNT', 'account_label', 'DOU', '계정과목', 'Y'),
('LABEL', 'PRODUCT', 'product_label', 'DOU', '자재', 'Y'),
('LABEL', 'MATERIAL', 'material_label', 'DOU', '자재', 'Y'),
('LABEL', 'EQUIPMENT', 'equipment_label', 'DOU', '장비', 'Y'),
('LABEL', 'MODEL', 'model_label', 'DOU', '장비', 'Y'),
('LABEL', 'USER', 'user_label', 'DOU', '사원', 'Y'),
('LABEL', 'SITE', 'site_label', 'DOU', '공장', 'Y'),
('LABEL', 'SCENARIO', 'scenario_label', 'DOU', '시나리오', 'Y'),
('LABEL', 'COST_CENTER', 'cost_center_label', 'DOU', '원가센터', 'Y'),
('LABEL', 'EXPENSE', 'expense_label', 'DOU', '비용항목', 'Y')
ON CONFLICT (code_type, category, standard_name, company_code) DO UPDATE 
SET ui_label = EXCLUDED.ui_label;

-- DOU_MES
INSERT INTO "binary".bi_common_code 
(code_type, category, standard_name, company_code, ui_label, use_yn)
VALUES 
('LABEL', 'CUSTOMER', 'customer_label', 'DOU_MES', '거래처', 'Y'),
('LABEL', 'DEPT', 'department_label', 'DOU_MES', '부서', 'Y'),
('LABEL', 'ACCOUNT', 'account_label', 'DOU_MES', '계정', 'Y'),
('LABEL', 'PRODUCT', 'product_label', 'DOU_MES', '품목', 'Y'),
('LABEL', 'MATERIAL', 'material_label', 'DOU_MES', '자재', 'Y'),
('LABEL', 'EQUIPMENT', 'equipment_label', 'DOU_MES', '설비', 'Y'),
('LABEL', 'MODEL', 'model_label', 'DOU_MES', '설비', 'Y'),
('LABEL', 'USER', 'user_label', 'DOU_MES', '사용자', 'Y'),
('LABEL', 'SITE', 'site_label', 'DOU_MES', '라인', 'Y'),
('LABEL', 'SCENARIO', 'scenario_label', 'DOU_MES', '시나리오', 'Y'),
('LABEL', 'COST_CENTER', 'cost_center_label', 'DOU_MES', '원가센터', 'Y'),
('LABEL', 'EXPENSE', 'expense_label', 'DOU_MES', '경비항목', 'Y')
ON CONFLICT (code_type, category, standard_name, company_code) DO UPDATE 
SET ui_label = EXCLUDED.ui_label;

-- 확인
SELECT code_type, category, company_code, ui_label 
FROM "binary".bi_common_code 
WHERE code_type = 'LABEL' 
ORDER BY category, company_code;
