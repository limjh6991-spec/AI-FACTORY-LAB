-- 제조원가(제품) 조회 쿼리
-- 생성일시: 2025-12-13T05:31:20.566Z
-- 테이블: doi_stco

-- ⚠️ 미매핑 컬럼 19개 (빈값으로 처리됨):
-- 코드, Inch, SITE, plan_qty, plan_amt, actual_qty, actual_amt, achv_qty, achv_amt, 생산입고수량, 생산입고금액, 타계정입고수량, 타계정입고금액, 출고수량, 타계정출고수량, 타계정출고금액, LOSS수량, LOSS금액, 불량률

SELECT
  구분 AS "구분",
  '' AS "코드",  -- TODO: 미매핑
  '' AS "Inch",  -- TODO: 미매핑
  '' AS "SITE",  -- TODO: 미매핑
  '' AS "plan_qty",  -- TODO: 미매핑
  '' AS "plan_amt",  -- TODO: 미매핑
  '' AS "actual_qty",  -- TODO: 미매핑
  '' AS "actual_amt",  -- TODO: 미매핑
  '' AS "achv_qty",  -- TODO: 미매핑
  '' AS "achv_amt",  -- TODO: 미매핑
  boh AS "boh_qty",
  boh_amt AS "boh_amt",
  '' AS "생산입고수량",  -- TODO: 미매핑
  '' AS "생산입고금액",  -- TODO: 미매핑
  '' AS "타계정입고수량",  -- TODO: 미매핑
  '' AS "타계정입고금액",  -- TODO: 미매핑
  '' AS "출고수량",  -- TODO: 미매핑
  out_amt AS "출고금액",
  '' AS "타계정출고수량",  -- TODO: 미매핑
  '' AS "타계정출고금액",  -- TODO: 미매핑
  '' AS "LOSS수량",  -- TODO: 미매핑
  '' AS "LOSS금액",  -- TODO: 미매핑
  '' AS "불량률",  -- TODO: 미매핑
  eoh AS "eoh_qty",
  eoh_amt AS "eoh_amt"
FROM doi_stco
WHERE 1=1
  AND yyyymm = :yyyymm
ORDER BY yyyymm DESC
;