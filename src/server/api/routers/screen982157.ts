import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const screen982157Router = createTRPCRouter({
  getData: publicProcedure
    .input(
      z.object({
        yearMonth: z.string().min(6, "기준년월을 입력해주세요 (YYYYMM)"),
        site: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const sql = `
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
        WHERE ae.yyyymm = $1
            AND ($2::text IS NULL OR ae.site = $2)
            AND a.계정대분류 = '판매관리비'
        GROUP BY ROLLUP(a.acct_name)
        ORDER BY CASE WHEN a.acct_name IS NULL THEN 1 ELSE 0 END, a.acct_name
      `;

      const result = await ctx.db.$queryRawUnsafe(
        sql,
        input.yearMonth,
        input.site || null
      );

      // 컬럼명을 그리드 필드명으로 매핑
      const mappedData = (result as any[]).map((row) => ({
        col_0: row['구분_부서별'],
        col_1: Number(row['계획'] || 0),
        col_2: Number(row['합계'] || 0),
        col_3: Number(row['전사'] || 0),
        col_4: Number(row['장애인운동선수'] || 0),
        col_5: Number(row['판매공통'] || 0),
        col_6: Number(row['경영지원실'] || 0),
        col_7: Number(row['지원팀'] || 0),
        col_8: Number(row['자금그룹'] || 0),
        col_9: Number(row['회계그룹'] || 0),
        col_10: Number(row['인사총무그룹'] || 0),
        col_11: Number(row['시스템지원그룹'] || 0),
        col_12: Number(row['구매그룹'] || 0),
        col_13: Number(row['전략팀'] || 0),
        col_14: Number(row['도우VINA'] || 0),
        col_15: Number(row['개발실'] || 0),
        col_16: Number(row['연구팀'] || 0),
        col_17: Number(row['HTG개발그룹'] || 0),
        col_18: Number(row['선행연구그룹'] || 0),
        col_19: Number(row['개발팀'] || 0),
        col_20: Number(row['공정개발그룹'] || 0),
        col_21: Number(row['제품개발그룹'] || 0),
        col_22: Number(row['설비개발팀'] || 0),
        col_23: Number(row['설계그룹'] || 0),
        col_24: Number(row['제어그룹'] || 0),
        col_25: Number(row['사업기획그룹'] || 0),
        col_26: Number(row['마케팅그룹'] || 0),
        col_27: Number(row['기술기획그룹'] || 0),
        col_28: Number(row['지원그룹'] || 0),
      }));

      return {
        data: mappedData,
        total: mappedData.length,
      };
    }),
});