SELECT *
FROM bi_dept_mst
WHERE (:searchYearMonth1 IS NULL OR :searchYearMonth1 = '' OR yyyymm = :searchYearMonth1)
  AND (:dept1 IS NULL OR :dept1 = '' OR department_code = :dept1)
LIMIT 500;