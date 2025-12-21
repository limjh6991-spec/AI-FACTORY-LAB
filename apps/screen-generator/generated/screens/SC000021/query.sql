-- 자재수불부 조회 쿼리
-- 생성일시: 2025-12-09T10:58:50.916Z
-- 테이블: doi_material_resc

-- ⚠️ 미매핑 컬럼 20개 (빈값으로 처리됨):
-- 품번, 품명, 대분류, 중분류, 규격, 기초수량, 기초금액, 기초단가, 기타입고수량, 기타입고금액, 기타입고단가, 출고수량, 출고금액, 출고단가, 기타출고수량, 기타출고금액, 기타출고단가, 재고수량, 재고금액, 재고단가

SELECT
  mat_class AS "자재구분",
  '' AS "품번",  -- TODO: 미매핑
  '' AS "품명",  -- TODO: 미매핑
  '' AS "대분류",  -- TODO: 미매핑
  '' AS "중분류",  -- TODO: 미매핑
  '' AS "규격",  -- TODO: 미매핑
  '' AS "기초수량",  -- TODO: 미매핑
  '' AS "기초금액",  -- TODO: 미매핑
  '' AS "기초단가",  -- TODO: 미매핑
  in_qty AS "입고수량",
  in_amt AS "입고금액",
  unit_cost AS "입고단가",
  '' AS "기타입고수량",  -- TODO: 미매핑
  '' AS "기타입고금액",  -- TODO: 미매핑
  '' AS "기타입고단가",  -- TODO: 미매핑
  '' AS "출고수량",  -- TODO: 미매핑
  '' AS "출고금액",  -- TODO: 미매핑
  '' AS "출고단가",  -- TODO: 미매핑
  '' AS "기타출고수량",  -- TODO: 미매핑
  '' AS "기타출고금액",  -- TODO: 미매핑
  '' AS "기타출고단가",  -- TODO: 미매핑
  '' AS "재고수량",  -- TODO: 미매핑
  '' AS "재고금액",  -- TODO: 미매핑
  '' AS "재고단가"  -- TODO: 미매핑
FROM doi_material_resc
WHERE 1=1
  AND yyyymm = :yyyymm
  AND yyyymm = :yyyymm
ORDER BY yyyymm DESC
;