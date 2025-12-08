/* ========================================================
 * Vertical AI Factory Sample Data Generator
 * Period: 202510 ~ 202512 (3 Months)
 * Volume: Approx. 105 rows per table
 * ======================================================== */

-- Transaction Start
BEGIN;

-- 스키마 설정
SET search_path TO binary, public;

-- 1. 부서 마스터 (bi_dept_mst)
-- Logic: 1~5(임원/관리), 6~20(생산), 21~35(지원)
INSERT INTO bi_dept_mst (
    plant_site_code, yyyymm, scenario_code, 
    department_code, department_name, parent_department_code, 
    is_production_dept
)
SELECT 
    'SITE_01', 
    m.yyyymm, 
    'ACTUAL',
    'DEPT_' || LPAD(i::text, 3, '0'), 
    CASE 
        WHEN i <= 5 THEN 'HQ Management Team ' || i 
        WHEN i <= 20 THEN 'Production Team ' || i 
        ELSE 'Business Support Team ' || i 
    END,
    CASE WHEN i <= 5 THEN 'HQ_DIV' ELSE 'MFG_DIV' END,
    CASE WHEN i BETWEEN 6 AND 20 THEN TRUE ELSE FALSE END
FROM generate_series(1, 35) i
CROSS JOIN (VALUES ('202510'), ('202511'), ('202512')) m(yyyymm);


-- 2. 코스트 센터 마스터 (bi_cost_center)
-- Logic: 부서와 매핑, 1~20은 직접제조(Direct), 나머지는 간접(Indirect)
INSERT INTO bi_cost_center (
    plant_site_code, yyyymm, scenario_code,
    cost_center_code, cost_center_name, managing_dept_code,
    cost_center_type, production_line_code
)
SELECT 
    'SITE_01',
    m.yyyymm,
    'ACTUAL',
    'CC_' || LPAD(i::text, 3, '0'),
    'Cost Center ' || LPAD(i::text, 3, '0'),
    'DEPT_' || LPAD(((i - 1) % 35 + 1)::text, 3, '0'), -- 1~35 부서 순환 매핑
    CASE WHEN i <= 20 THEN 'Direct_Mfg' ELSE 'Indirect_Mfg' END,
    CASE WHEN i <= 20 THEN 'LINE_' || LPAD(((i - 1) % 5 + 1)::text, 2, '0') ELSE NULL END
FROM generate_series(1, 35) i
CROSS JOIN (VALUES ('202510'), ('202511'), ('202512')) m(yyyymm);


-- 3. 사용자/사원 마스터 (bi_user_mst)
-- Logic: 35명의 사원을 월별로 생성
INSERT INTO bi_user_mst (
    plant_site_code, yyyymm, scenario_code,
    employee_id, employee_name, belonging_dept_code,
    cost_attribution_cc_code, job_position_name, skill_efficiency_rate
)
SELECT 
    'SITE_01',
    m.yyyymm,
    'ACTUAL',
    'EMP_' || LPAD(i::text, 3, '0'),
    'Employee_' || i,
    'DEPT_' || LPAD(((i - 1) % 35 + 1)::text, 3, '0'),
    'CC_' || LPAD(((i - 1) % 35 + 1)::text, 3, '0'),
    CASE (i % 3) WHEN 0 THEN 'Manager' WHEN 1 THEN 'Senior Eng' ELSE 'Operator' END,
    (1.0 + (random() * 0.3 - 0.15))::numeric(5,2) -- 0.85 ~ 1.15 사이 숙련도
FROM generate_series(1, 35) i
CROSS JOIN (VALUES ('202510'), ('202511'), ('202512')) m(yyyymm);


-- 4. 계정 마스터 (bi_acct_mst)
-- Logic: 재료비, 노무비, 경비 계정 생성
INSERT INTO bi_acct_mst (
    plant_site_code, yyyymm, scenario_code,
    account_code, account_name, financial_statement_type,
    cost_behavior_type, is_manufacturing_cost
)
SELECT 
    'SITE_01',
    m.yyyymm,
    'ACTUAL',
    'ACCT_' || LPAD(i::text, 3, '0'),
    CASE 
        WHEN i <= 10 THEN 'Raw Material Cost Type ' || i
        WHEN i <= 20 THEN 'Labor Cost Type ' || i
        ELSE 'Mfg Overhead Cost Type ' || i
    END,
    'PL',
    CASE WHEN i % 2 = 0 THEN 'Variable' ELSE 'Fixed' END,
    TRUE
FROM generate_series(1, 35) i
CROSS JOIN (VALUES ('202510'), ('202511'), ('202512')) m(yyyymm);


-- 5. 경비 유형/선택 마스터 (bi_expen_sel_mst)
INSERT INTO bi_expen_sel_mst (
    plant_site_code, yyyymm, scenario_code,
    expense_item_code, expense_item_name, linked_account_code,
    aggregation_method, distribution_driver_id
)
SELECT 
    'SITE_01',
    m.yyyymm,
    'ACTUAL',
    'EXP_' || LPAD(i::text, 3, '0'),
    'Expense Item ' || i,
    'ACCT_' || LPAD(((i - 1) % 35 + 1)::text, 3, '0'), -- 계정과 매핑
    'SUM',
    'DRIVER_' || LPAD(((i % 5) + 1)::text, 2, '0')
FROM generate_series(1, 35) i
CROSS JOIN (VALUES ('202510'), ('202511'), ('202512')) m(yyyymm);


-- 6. 거래처 마스터 (bi_cust_mst)
-- Logic: 1~20 공급사, 21~35 고객사
INSERT INTO bi_cust_mst (
    plant_site_code, yyyymm, scenario_code,
    partner_code, partner_name, business_reg_number,
    partner_type, delivery_region_name, credit_rating_score
)
SELECT 
    'SITE_01',
    m.yyyymm,
    'ACTUAL',
    'BIZ_' || LPAD(i::text, 3, '0'),
    CASE WHEN i <= 20 THEN 'Supplier Co. ' || i ELSE 'Client Co. ' || i END,
    '101-81-' || LPAD(i::text, 5, '0'),
    CASE WHEN i <= 20 THEN 'Vendor' ELSE 'Customer' END,
    CASE (i % 4) WHEN 0 THEN 'Seoul' WHEN 1 THEN 'Gyeonggi' WHEN 2 THEN 'Busan' ELSE 'Overseas' END,
    CASE (i % 3) WHEN 0 THEN 'A+' WHEN 1 THEN 'B0' ELSE 'C-' END
FROM generate_series(1, 35) i
CROSS JOIN (VALUES ('202510'), ('202511'), ('202512')) m(yyyymm);


-- 7. 설비 마스터 (bi_eqp_mst)
-- Logic: 제조 CC(1~20)에 설비 할당
INSERT INTO bi_eqp_mst (
    plant_site_code, yyyymm, scenario_code,
    equipment_code, equipment_name, managed_cost_center_code,
    manufacturer_name, acquisition_date, power_usage_per_hour, depreciation_cost_month
)
SELECT 
    'SITE_01',
    m.yyyymm,
    'ACTUAL',
    'EQP_' || LPAD(i::text, 3, '0'),
    'Machine Unit #' || i,
    'CC_' || LPAD(((i - 1) % 20 + 1)::text, 3, '0'), -- 1~20번 CC에만 배치
    'Global Tech ' || (i % 3 + 1),
    ('2022-01-01'::date + (i * 15)),
    (random() * 50 + 20)::numeric(10,2),
    (random() * 500000 + 100000)::numeric(15,2)
FROM generate_series(1, 35) i
CROSS JOIN (VALUES ('202510'), ('202511'), ('202512')) m(yyyymm);


-- 8. 제품/제품군 마스터 (bi_prod_mst)
-- Logic: 1~10:완제품(FERT), 11~20:반제품(HALB), 21~35:원자재(ROH)
INSERT INTO bi_prod_mst (
    plant_site_code, yyyymm, scenario_code,
    product_item_code, product_item_name, product_group_code,
    material_type, base_unit_of_measure, unit_weight_kg, procurement_type
)
SELECT 
    'SITE_01',
    m.yyyymm,
    'ACTUAL',
    'ITEM_' || LPAD(i::text, 3, '0'),
    CASE 
        WHEN i <= 10 THEN 'Finished Good Model-' || i 
        WHEN i <= 20 THEN 'Sub-Assy Module-' || i 
        ELSE 'Raw Material Part-' || i 
    END,
    CASE 
        WHEN i <= 10 THEN 'PG_FERT' 
        WHEN i <= 20 THEN 'PG_HALB' 
        ELSE 'PG_ROH' 
    END,
    CASE 
        WHEN i <= 10 THEN 'FERT' 
        WHEN i <= 20 THEN 'HALB' 
        ELSE 'ROH' 
    END,
    'EA',
    (random() * 5 + 0.5)::numeric(10,3),
    CASE WHEN i > 20 THEN 'Buy' ELSE 'Make' END
FROM generate_series(1, 35) i
CROSS JOIN (VALUES ('202510'), ('202511'), ('202512')) m(yyyymm);


-- 9. BOM 마스터 (bi_bom_mst)
-- Logic: 완제품(1~10)이 원자재(21~35)를 사용하는 구조
-- operation_sequence_no를 고유하게 설정하여 PK 충돌 방지
INSERT INTO bi_bom_mst (
    plant_site_code, yyyymm, scenario_code,
    parent_product_code, child_material_code, operation_sequence_no,
    standard_input_qty, loss_rate_percent, is_alternative_part
)
SELECT 
    'SITE_01',
    m.yyyymm,
    'ACTUAL',
    -- Parent: ITEM_001 ~ ITEM_010 (10개 순환)
    'ITEM_' || LPAD(((i - 1) % 10 + 1)::text, 3, '0'), 
    -- Child: ITEM_021 ~ ITEM_035 (15개 순환)
    'ITEM_' || LPAD(((i - 1) % 15 + 21)::text, 3, '0'),
    i * 10, -- OP Sequence를 고유하게 (10, 20, 30, ...)
    (random() * 2 + 1)::numeric(15,5),
    (random() * 3)::numeric(5,2),
    FALSE
FROM generate_series(1, 35) i
CROSS JOIN (VALUES ('202510'), ('202511'), ('202512')) m(yyyymm);


-- 10. 배부 기준/적수 마스터 (bi_alloc_std)
-- Logic: 간접CC(21~35) 비용을 -> 직접CC(1~20)로 배부
INSERT INTO bi_alloc_std (
    plant_site_code, yyyymm, scenario_code,
    allocation_rule_id, source_cost_center_code, target_cost_center_code,
    target_product_code, allocation_weight_value, allocation_unit_name, driver_description
)
SELECT 
    'SITE_01',
    m.yyyymm,
    'ACTUAL',
    'ALLOC_' || LPAD(i::text, 3, '0'),
    'CC_' || LPAD(((i - 1) % 15 + 21)::text, 3, '0'), -- Source: 21~35 (간접)
    'CC_' || LPAD(((i - 1) % 20 + 1)::text, 3, '0'),  -- Target: 1~20 (직접)
    NULL,
    (random() * 100)::numeric(18,5),
    CASE WHEN i % 2 = 0 THEN 'Labor Hr' ELSE 'Machine Hr' END,
    'Standard Alloc Rule ' || i
FROM generate_series(1, 35) i
CROSS JOIN (VALUES ('202510'), ('202511'), ('202512')) m(yyyymm);

-- Transaction Commit
COMMIT;
