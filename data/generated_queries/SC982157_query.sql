-- 판매관리비 집계표(부서별)
-- Generated: 2025-12-05T08:57:25.958Z

WITH dept_sales_data AS (
    SELECT 
        CASE 
            WHEN ae.acct LIKE '60%' THEN '판매비'
            WHEN ae.acct LIKE '61%' THEN '관리비'
            ELSE '기타'
        END as category,
        d.dept_name,
        SUM(ae.acct_amt) as amount,
        SUM(ae.plan_amt) as plan_amount
    FROM doi_acct_expen ae
    LEFT JOIN doi_dept d ON ae.dept = d.dept
    WHERE ae.acct_ym = :yearMonth
        AND ae.acct BETWEEN '6000' AND '6199'
        AND (:site IS NULL OR ae.site = :site)
    GROUP BY 
        CASE 
            WHEN ae.acct LIKE '60%' THEN '판매비'
            WHEN ae.acct LIKE '61%' THEN '관리비'
            ELSE '기타'
        END,
        d.dept_name
),
category_totals AS (
    SELECT 
        category,
        SUM(plan_amount) as total_plan,
        SUM(amount) as total_amount
    FROM dept_sales_data
    GROUP BY category
)
SELECT 
    ct.category as "구분_부서별",
    ct.total_plan as "계획",
    ct.total_amount as "합계",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '전사' THEN dsd.amount END), 0) as "전사",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '장애인운동선수' THEN dsd.amount END), 0) as "장애인운동선수",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '판매공통' THEN dsd.amount END), 0) as "판매공통",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '경영지원실' THEN dsd.amount END), 0) as "경영지원실",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '지원팀' THEN dsd.amount END), 0) as "지원팀",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '자금그룹' THEN dsd.amount END), 0) as "자금그룹",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '회계그룹' THEN dsd.amount END), 0) as "회계그룹",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '인사총무그룹' THEN dsd.amount END), 0) as "인사총무그룹",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '시스템지원그룹' THEN dsd.amount END), 0) as "시스템지원그룹",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '구매그룹' THEN dsd.amount END), 0) as "구매그룹",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '전략팀' THEN dsd.amount END), 0) as "전략팀",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '도우VINA' THEN dsd.amount END), 0) as "도우VINA",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '개발실' THEN dsd.amount END), 0) as "개발실",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '연구팀' THEN dsd.amount END), 0) as "연구팀",
    COALESCE(SUM(CASE WHEN dsd.dept_name = 'HTG개발그룹' THEN dsd.amount END), 0) as "HTG개발그룹",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '선행연구그룹' THEN dsd.amount END), 0) as "선행연구그룹",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '개발팀' THEN dsd.amount END), 0) as "개발팀",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '공정개발그룹' THEN dsd.amount END), 0) as "공정개발그룹",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '제품개발그룹' THEN dsd.amount END), 0) as "제품개발그룹",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '설비개발팀' THEN dsd.amount END), 0) as "설비개발팀",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '설계그룹' THEN dsd.amount END), 0) as "설계그룹",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '제어그룹' THEN dsd.amount END), 0) as "제어그룹",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '사업기획그룹' THEN dsd.amount END), 0) as "사업기획그룹",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '마케팅그룹' THEN dsd.amount END), 0) as "마케팅그룹",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '기술기획그룹' THEN dsd.amount END), 0) as "기술기획그룹",
    COALESCE(SUM(CASE WHEN dsd.dept_name = '지원그룹' THEN dsd.amount END), 0) as "지원그룹"
FROM category_totals ct
LEFT JOIN dept_sales_data dsd ON ct.category = dsd.category
GROUP BY ct.category, ct.total_plan, ct.total_amount
ORDER BY ct.category