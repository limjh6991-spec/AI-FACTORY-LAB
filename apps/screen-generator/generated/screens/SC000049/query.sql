SELECT *
FROM bi_acct_mst
WHERE (:searchYearMonth1 IS NULL OR :searchYearMonth1 = '' OR yyyymm = :searchYearMonth1)
  AND (:account1 IS NULL OR :account1 = '' OR account_code = :account1)
LIMIT 500;