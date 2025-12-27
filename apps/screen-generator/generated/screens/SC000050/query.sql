SELECT *
FROM bi_dept_mst
WHERE (:searchDate1 IS NULL OR :searchDate1 = '' OR searchDate1 = :searchDate1)
  AND (:dept1 IS NULL OR :dept1 = '' OR department_code = :dept1)
LIMIT 500;