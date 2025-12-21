-- 판매관리비 집계표(부서별)
-- Regenerated: 2025-12-05T09:54:42.516Z
-- 갱신된 메타데이터(소문자 컬럼) 사용

SELECT 
    CASE 
        WHEN a.acct_name IS NOT NULL THEN a.acct_name
        ELSE '합계'
    END AS "구분_부서별",
    COALESCE(SUM(ae.acct_amt), 0) AS "계획",
    COALESCE(SUM(ae.acct_amt), 0) AS "합계",
    COALESCE(SUM(CASE WHEN d.dept_name = '전사' THEN ae.acct_amt ELSE 0 END), 0) AS "전사",
    COALESCE(SUM(CASE WHEN d.dept_name = '장애인운동선수' THEN ae.acct_amt ELSE 0 END), 0) AS "장애인운동선수",
    COALESCE(SUM(CASE WHEN d.dept_name = '판매공통' THEN ae.acct_amt ELSE 0 END), 0) AS "판매공통",
    COALESCE(SUM(CASE WHEN d.dept_name = '경영지원실' THEN ae.acct_amt ELSE 0 END), 0) AS "경영지원실",
    COALESCE(SUM(CASE WHEN d.dept_name = '지원팀' THEN ae.acct_amt ELSE 0 END), 0) AS "지원팀",
    COALESCE(SUM(CASE WHEN d.dept_name = '자금그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "자금그룹",
    COALESCE(SUM(CASE WHEN d.dept_name = '회계그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "회계그룹",
    COALESCE(SUM(CASE WHEN d.dept_name = '인사총무그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "인사총무그룹",
    COALESCE(SUM(CASE WHEN d.dept_name = '시스템지원그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "시스템지원그룹",
    COALESCE(SUM(CASE WHEN d.dept_name = '구매그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "구매그룹",
    COALESCE(SUM(CASE WHEN d.dept_name = '전략팀' THEN ae.acct_amt ELSE 0 END), 0) AS "전략팀",
    COALESCE(SUM(CASE WHEN d.dept_name = '도우VINA' THEN ae.acct_amt ELSE 0 END), 0) AS "도우VINA",
    COALESCE(SUM(CASE WHEN d.dept_name = '개발실' THEN ae.acct_amt ELSE 0 END), 0) AS "개발실",
    COALESCE(SUM(CASE WHEN d.dept_name = '연구팀' THEN ae.acct_amt ELSE 0 END), 0) AS "연구팀",
    COALESCE(SUM(CASE WHEN d.dept_name = 'HTG개발그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "HTG개발그룹",
    COALESCE(SUM(CASE WHEN d.dept_name = '선행연구그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "선행연구그룹",
    COALESCE(SUM(CASE WHEN d.dept_name = '개발팀' THEN ae.acct_amt ELSE 0 END), 0) AS "개발팀",
    COALESCE(SUM(CASE WHEN d.dept_name = '공정개발그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "공정개발그룹",
    COALESCE(SUM(CASE WHEN d.dept_name = '제품개발그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "제품개발그룹",
    COALESCE(SUM(CASE WHEN d.dept_name = '설비개발팀' THEN ae.acct_amt ELSE 0 END), 0) AS "설비개발팀",
    COALESCE(SUM(CASE WHEN d.dept_name = '설계그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "설계그룹",
    COALESCE(SUM(CASE WHEN d.dept_name = '제어그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "제어그룹",
    COALESCE(SUM(CASE WHEN d.dept_name = '사업기획그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "사업기획그룹",
    COALESCE(SUM(CASE WHEN d.dept_name = '마케팅그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "마케팅그룹",
    COALESCE(SUM(CASE WHEN d.dept_name = '기술기획그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "기술기획그룹",
    COALESCE(SUM(CASE WHEN d.dept_name = '지원그룹' THEN ae.acct_amt ELSE 0 END), 0) AS "지원그룹"
FROM doi_acct_expen ae
LEFT JOIN doi_acct a ON ae.yyyymm = a.yyyymm 
    AND ae.acct = a.acct 
    AND ae.site = a.site
    AND a.계정대분류 = '판매관리비'
LEFT JOIN doi_dept d ON ae.yyyymm = d.yyyymm 
    AND ae.dept = d.dept 
    AND ae.site = d.site
WHERE ae.yyyymm = :yearMonth
    AND ae.site = :site
    AND a.계정대분류 = '판매관리비'
GROUP BY ROLLUP(a.acct_name)
ORDER BY CASE WHEN a.acct_name IS NULL THEN 1 ELSE 0 END, a.acct_name;