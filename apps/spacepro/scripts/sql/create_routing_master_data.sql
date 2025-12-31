-- ============================================
-- SpacePro: Process Routing Master Data (Updated)
-- 제품별 공정 라우팅 마스터 (1,10번 필수 + 2~9번 랜덤)
-- Date: 2025-12-31
-- ============================================

-- 기존 데이터 정리
DELETE FROM spacepro.tb_bom_process WHERE parent_item LIKE 'PROD-%';
DELETE FROM spacepro.tb_routing_mst WHERE item_code LIKE 'PROD-%';

-- ============================================
-- 테이블 주석 추가
-- ============================================
COMMENT ON TABLE spacepro.tb_routing_mst IS '제품별 공정 라우팅 마스터 - 제품이 거치는 공정 순서 및 설비 정보';
COMMENT ON COLUMN spacepro.tb_routing_mst.item_code IS '제품코드 (PROD-001 ~ PROD-100)';
COMMENT ON COLUMN spacepro.tb_routing_mst.revision IS '라우팅 리비전 (설계 변경 이력 관리)';
COMMENT ON COLUMN spacepro.tb_routing_mst.op_seq IS '공정순서 (10,20,30... 형태)';
COMMENT ON COLUMN spacepro.tb_routing_mst.op_name IS '공정명 (area_1 ~ area_10)';
COMMENT ON COLUMN spacepro.tb_routing_mst.workcenter_code IS '작업장코드';
COMMENT ON COLUMN spacepro.tb_routing_mst.machine_code IS '설비코드 (EQ-공정-설비번호)';
COMMENT ON COLUMN spacepro.tb_routing_mst.setup_time IS '셋업시간 (분) - 제품 변경 시 준비 시간';
COMMENT ON COLUMN spacepro.tb_routing_mst.cycle_time IS '사이클타임 (분/EA) - 1개당 가공시간';
COMMENT ON COLUMN spacepro.tb_routing_mst.process_yield IS '공정수율 (%) - 양품률';
COMMENT ON COLUMN spacepro.tb_routing_mst.status IS '상태 (ACTIVE/OBSOLETE)';

-- ============================================
-- 제품 100개 라우팅 생성
-- 규칙:
--   1번(area_1), 10번(area_10) 공정: 모든 제품 필수
--   2~9번 공정: 랜덤 선택 (0~8개)
--   일부 제품은 1~10 전체 공정 사용
-- ============================================
DO $$
DECLARE
    prod_num INT;
    mid_proc_count INT;
    mid_procs INT[];
    proc INT;
    seq INT;
    eq_num INT;
    ct DECIMAL;
    st DECIMAL;
    yld DECIMAL;
BEGIN
    FOR prod_num IN 1..100 LOOP
        seq := 10;
        
        -- === 1번 공정 (필수) ===
        eq_num := 1 + floor(random() * 5)::int;
        ct := 0.5 + (random() * 3);  -- C/T: 0.5~3.5분
        st := 5 + (random() * 20);   -- Setup: 5~25분
        yld := 92 + (random() * 8);  -- Yield: 92~100%
        
        INSERT INTO spacepro.tb_routing_mst (
            item_code, revision, op_seq, op_name, 
            workcenter_code, machine_code,
            setup_time, cycle_time, process_yield, status
        ) VALUES (
            'PROD-' || LPAD(prod_num::text, 3, '0'),
            '1.0', seq, 'area_1',
            'WC-AREA-1', 'EQ-1-' || LPAD(eq_num::text, 2, '0'),
            st, ct, yld, 'ACTIVE'
        );
        seq := seq + 10;
        
        -- === 2~9번 공정 (랜덤 선택) ===
        -- 10%는 전체 공정 사용, 나머지는 0~6개 랜덤
        IF random() < 0.1 THEN
            mid_proc_count := 8;  -- 전체 사용
        ELSE
            mid_proc_count := floor(random() * 7)::int;  -- 0~6개
        END IF;
        
        -- 2~9 중 랜덤 선택
        IF mid_proc_count > 0 THEN
            mid_procs := ARRAY(
                SELECT * FROM (SELECT generate_series(2, 9) ORDER BY random() LIMIT mid_proc_count) sub
                ORDER BY 1  -- 순서대로 정렬
            );
            
            FOREACH proc IN ARRAY mid_procs LOOP
                eq_num := 1 + floor(random() * 5)::int;
                ct := 0.3 + (random() * 4.7);  -- C/T: 0.3~5분
                st := 3 + (random() * 27);     -- Setup: 3~30분
                yld := 88 + (random() * 12);   -- Yield: 88~100%
                
                INSERT INTO spacepro.tb_routing_mst (
                    item_code, revision, op_seq, op_name, 
                    workcenter_code, machine_code,
                    setup_time, cycle_time, process_yield, status
                ) VALUES (
                    'PROD-' || LPAD(prod_num::text, 3, '0'),
                    '1.0', seq, 'area_' || proc,
                    'WC-AREA-' || proc, 'EQ-' || proc || '-' || LPAD(eq_num::text, 2, '0'),
                    st, ct, yld, 'ACTIVE'
                );
                seq := seq + 10;
            END LOOP;
        END IF;
        
        -- === 10번 공정 (필수) ===
        eq_num := 1 + floor(random() * 5)::int;
        ct := 0.5 + (random() * 2.5);  -- C/T: 0.5~3분
        st := 5 + (random() * 15);     -- Setup: 5~20분
        yld := 95 + (random() * 5);    -- Yield: 95~100%
        
        INSERT INTO spacepro.tb_routing_mst (
            item_code, revision, op_seq, op_name, 
            workcenter_code, machine_code,
            setup_time, cycle_time, process_yield, status
        ) VALUES (
            'PROD-' || LPAD(prod_num::text, 3, '0'),
            '1.0', seq, 'area_10',
            'WC-AREA-10', 'EQ-10-' || LPAD(eq_num::text, 2, '0'),
            st, ct, yld, 'ACTIVE'
        );
        
    END LOOP;
END $$;

-- ============================================
-- 검증 쿼리
-- ============================================
SELECT 
    '제품 수' as metric, 
    COUNT(DISTINCT item_code)::text as value 
FROM spacepro.tb_routing_mst WHERE item_code LIKE 'PROD-%'
UNION ALL
SELECT 
    '총 라우팅 수', 
    COUNT(*)::text 
FROM spacepro.tb_routing_mst WHERE item_code LIKE 'PROD-%'
UNION ALL
SELECT 
    '공정 1,10 필수 확인 (100개)', 
    COUNT(DISTINCT item_code)::text 
FROM spacepro.tb_routing_mst 
WHERE item_code LIKE 'PROD-%' 
  AND op_name IN ('area_1', 'area_10')
GROUP BY op_name
HAVING COUNT(*) = 100
UNION ALL
SELECT
    '전체공정(10개) 사용 제품 수',
    COUNT(*)::text
FROM (
    SELECT item_code, COUNT(DISTINCT op_name) as proc_cnt
    FROM spacepro.tb_routing_mst 
    WHERE item_code LIKE 'PROD-%'
    GROUP BY item_code
    HAVING COUNT(DISTINCT op_name) = 10
) sub;
