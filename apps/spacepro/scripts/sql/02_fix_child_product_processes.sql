-- ============================================
-- 세부공정 데이터 수정 스크립트
-- 자식 제품: pr_seq 6 이상 삭제, 설비 정보 제거
-- 2026-01-25
-- ============================================

-- Step 1: 자식 제품 목록 확인 (wbs_vid에 점이 2개 이상인 경우)
-- SELECT m.macode, m.maname, m.wbs_vid
-- FROM spacepro.sp_macode_info m
-- WHERE m.contno = '23D220097'
--   AND LENGTH(m.wbs_vid) - LENGTH(REPLACE(m.wbs_vid, '.', '')) >= 2;

-- Step 2: 자식 제품의 pr_seq > 5 인 레코드 삭제
DELETE FROM spacepro.sp_prcode_detail_info
WHERE contno = '23D220097'
  AND macode IN (
      SELECT macode
      FROM spacepro.sp_macode_info
      WHERE contno = '23D220097'
        AND LENGTH(wbs_vid) - LENGTH(REPLACE(wbs_vid, '.', '')) >= 2
  )
  AND pr_seq > 5;

-- Step 3: 자식 제품의 설비 정보 제거
UPDATE spacepro.sp_prcode_detail_info
SET eqp_type_id = NULL,
    eqp_id = NULL,
    eqp_name = NULL
WHERE contno = '23D220097'
  AND macode IN (
      SELECT macode
      FROM spacepro.sp_macode_info
      WHERE contno = '23D220097'
        AND LENGTH(wbs_vid) - LENGTH(REPLACE(wbs_vid, '.', '')) >= 2
  );

-- Step 4: 결과 확인
-- SELECT m.macode, m.wbs_vid,
--        CASE WHEN LENGTH(m.wbs_vid) - LENGTH(REPLACE(m.wbs_vid, '.', '')) = 1 THEN 'PARENT' ELSE 'CHILD' END as type,
--        COUNT(DISTINCT d.pr_seq) as process_count,
--        STRING_AGG(DISTINCT COALESCE(d.eqp_id, 'N/A'), ', ') as equipment
-- FROM spacepro.sp_macode_info m
-- LEFT JOIN spacepro.sp_prcode_detail_info d ON m.macode = d.macode AND m.contno = d.contno
-- WHERE m.contno = '23D220097'
-- GROUP BY m.macode, m.wbs_vid
-- ORDER BY m.wbs_vid;
