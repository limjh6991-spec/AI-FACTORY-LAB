/**
 * 옵션 공통 API 라우터
 * binary 스키마의 마스터 테이블에서 코드/명칭 데이터를 조회
 * 
 * 컬럼 규칙:
 * - 표시: _name (예: department_name)
 * - 값: _code (예: department_code)
 */

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// 옵션 아이템 타입
interface OptionItem {
  code: string;
  name: string;
}

// 공통 입력 스키마
const optionQueryInput = z.object({
  search: z.string().optional(),
  site: z.string().optional(),      // plant_site_code
  yyyymm: z.string().optional(),    // 년월
  scenario: z.string().optional(),   // scenario_code
  limit: z.number().optional().default(100),
});

export const optionsRouter = createTRPCRouter({
  /**
   * 거래처 목록 조회 (bi_cust_mst)
   * code: partner_code, name: partner_name
   */
  getCustomers: publicProcedure
    .input(optionQueryInput)
    .query(async ({ ctx, input }) => {
      const { search, site, yyyymm, scenario, limit } = input;

      const conditions: string[] = ["1=1"];
      const params: (string | number)[] = [];
      let paramIndex = 1;

      if (site) {
        conditions.push(`plant_site_code = $${paramIndex}`);
        params.push(site);
        paramIndex++;
      }
      if (yyyymm) {
        conditions.push(`yyyymm = $${paramIndex}`);
        params.push(yyyymm);
        paramIndex++;
      }
      if (scenario) {
        conditions.push(`scenario_code = $${paramIndex}`);
        params.push(scenario);
        paramIndex++;
      }
      if (search) {
        conditions.push(`(partner_code ILIKE $${paramIndex} OR partner_name ILIKE $${paramIndex})`);
        params.push(`%${search}%`);
        paramIndex++;
      }
      params.push(limit);

      const query = `
        SELECT DISTINCT 
          partner_code as code, 
          COALESCE(partner_name, partner_code) as name
        FROM "binary".bi_cust_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY partner_code
        LIMIT $${paramIndex}
      `;

      const results = await ctx.db.$queryRawUnsafe<OptionItem[]>(query, ...params);
      return results;
    }),

  /**
   * 제품/자재 목록 조회 (bi_prod_mst)
   * code: product_item_code, name: product_item_name
   */
  getMaterials: publicProcedure
    .input(optionQueryInput)
    .query(async ({ ctx, input }) => {
      const { search, site, yyyymm, scenario, limit } = input;

      const conditions: string[] = ["1=1"];
      const params: (string | number)[] = [];
      let paramIndex = 1;

      if (site) {
        conditions.push(`plant_site_code = $${paramIndex}`);
        params.push(site);
        paramIndex++;
      }
      if (yyyymm) {
        conditions.push(`yyyymm = $${paramIndex}`);
        params.push(yyyymm);
        paramIndex++;
      }
      if (scenario) {
        conditions.push(`scenario_code = $${paramIndex}`);
        params.push(scenario);
        paramIndex++;
      }
      if (search) {
        conditions.push(`(product_item_code ILIKE $${paramIndex} OR product_item_name ILIKE $${paramIndex})`);
        params.push(`%${search}%`);
        paramIndex++;
      }
      params.push(limit);

      const query = `
        SELECT DISTINCT 
          product_item_code as code, 
          COALESCE(product_item_name, product_item_code) as name
        FROM "binary".bi_prod_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY product_item_code
        LIMIT $${paramIndex}
      `;

      const results = await ctx.db.$queryRawUnsafe<OptionItem[]>(query, ...params);
      return results;
    }),

  /**
   * 설비 목록 조회 (bi_eqp_mst)
   * code: equipment_code, name: equipment_name
   */
  getModels: publicProcedure
    .input(optionQueryInput)
    .query(async ({ ctx, input }) => {
      const { search, site, yyyymm, scenario, limit } = input;

      const conditions: string[] = ["1=1"];
      const params: (string | number)[] = [];
      let paramIndex = 1;

      if (site) {
        conditions.push(`plant_site_code = $${paramIndex}`);
        params.push(site);
        paramIndex++;
      }
      if (yyyymm) {
        conditions.push(`yyyymm = $${paramIndex}`);
        params.push(yyyymm);
        paramIndex++;
      }
      if (scenario) {
        conditions.push(`scenario_code = $${paramIndex}`);
        params.push(scenario);
        paramIndex++;
      }
      if (search) {
        conditions.push(`(equipment_code ILIKE $${paramIndex} OR equipment_name ILIKE $${paramIndex})`);
        params.push(`%${search}%`);
        paramIndex++;
      }
      params.push(limit);

      const query = `
        SELECT DISTINCT 
          equipment_code as code, 
          COALESCE(equipment_name, equipment_code) as name
        FROM "binary".bi_eqp_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY equipment_code
        LIMIT $${paramIndex}
      `;

      const results = await ctx.db.$queryRawUnsafe<OptionItem[]>(query, ...params);
      return results;
    }),

  /**
   * 계정 목록 조회 (bi_acct_mst)
   * code: account_code, name: account_name
   */
  getAccounts: publicProcedure
    .input(optionQueryInput)
    .query(async ({ ctx, input }) => {
      const { search, site, yyyymm, scenario, limit } = input;

      const conditions: string[] = ["1=1"];
      const params: (string | number)[] = [];
      let paramIndex = 1;

      if (site) {
        conditions.push(`plant_site_code = $${paramIndex}`);
        params.push(site);
        paramIndex++;
      }
      if (yyyymm) {
        conditions.push(`yyyymm = $${paramIndex}`);
        params.push(yyyymm);
        paramIndex++;
      }
      if (scenario) {
        conditions.push(`scenario_code = $${paramIndex}`);
        params.push(scenario);
        paramIndex++;
      }
      if (search) {
        conditions.push(`(account_code ILIKE $${paramIndex} OR account_name ILIKE $${paramIndex})`);
        params.push(`%${search}%`);
        paramIndex++;
      }
      params.push(limit);

      const query = `
        SELECT DISTINCT 
          account_code as code, 
          COALESCE(account_name, account_code) as name
        FROM "binary".bi_acct_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY account_code
        LIMIT $${paramIndex}
      `;

      const results = await ctx.db.$queryRawUnsafe<OptionItem[]>(query, ...params);
      return results;
    }),

  /**
   * 비용구분 목록 조회 (bi_expen_sel_mst)
   * code: expense_item_code, name: expense_item_name
   */
  getExpenSels: publicProcedure
    .input(optionQueryInput)
    .query(async ({ ctx, input }) => {
      const { search, site, yyyymm, scenario, limit } = input;

      const conditions: string[] = ["1=1"];
      const params: (string | number)[] = [];
      let paramIndex = 1;

      if (site) {
        conditions.push(`plant_site_code = $${paramIndex}`);
        params.push(site);
        paramIndex++;
      }
      if (yyyymm) {
        conditions.push(`yyyymm = $${paramIndex}`);
        params.push(yyyymm);
        paramIndex++;
      }
      if (scenario) {
        conditions.push(`scenario_code = $${paramIndex}`);
        params.push(scenario);
        paramIndex++;
      }
      if (search) {
        conditions.push(`(expense_item_code ILIKE $${paramIndex} OR expense_item_name ILIKE $${paramIndex})`);
        params.push(`%${search}%`);
        paramIndex++;
      }
      params.push(limit);

      const query = `
        SELECT DISTINCT 
          expense_item_code as code, 
          COALESCE(expense_item_name, expense_item_code) as name
        FROM "binary".bi_expen_sel_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY expense_item_code
        LIMIT $${paramIndex}
      `;

      const results = await ctx.db.$queryRawUnsafe<OptionItem[]>(query, ...params);
      return results;
    }),

  /**
   * 부서 목록 조회 (bi_dept_mst)
   * code: department_code, name: department_name
   */
  getDepartments: publicProcedure
    .input(optionQueryInput)
    .query(async ({ ctx, input }) => {
      const { search, site, yyyymm, scenario, limit } = input;

      const conditions: string[] = ["1=1"];
      const params: (string | number)[] = [];
      let paramIndex = 1;

      if (site) {
        conditions.push(`plant_site_code = $${paramIndex}`);
        params.push(site);
        paramIndex++;
      }
      if (yyyymm) {
        conditions.push(`yyyymm = $${paramIndex}`);
        params.push(yyyymm);
        paramIndex++;
      }
      if (scenario) {
        conditions.push(`scenario_code = $${paramIndex}`);
        params.push(scenario);
        paramIndex++;
      }
      if (search) {
        conditions.push(`(department_code ILIKE $${paramIndex} OR department_name ILIKE $${paramIndex})`);
        params.push(`%${search}%`);
        paramIndex++;
      }
      params.push(limit);

      const query = `
        SELECT DISTINCT 
          department_code as code, 
          COALESCE(department_name, department_code) as name
        FROM "binary".bi_dept_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY department_code
        LIMIT $${paramIndex}
      `;

      const results = await ctx.db.$queryRawUnsafe<OptionItem[]>(query, ...params);
      return results;
    }),

  /**
   * 코스트센터 목록 조회 (bi_cost_center)
   * code: cost_center_code, name: cost_center_name
   */
  getCostCenters: publicProcedure
    .input(optionQueryInput)
    .query(async ({ ctx, input }) => {
      const { search, site, yyyymm, scenario, limit } = input;

      const conditions: string[] = ["1=1"];
      const params: (string | number)[] = [];
      let paramIndex = 1;

      if (site) {
        conditions.push(`plant_site_code = $${paramIndex}`);
        params.push(site);
        paramIndex++;
      }
      if (yyyymm) {
        conditions.push(`yyyymm = $${paramIndex}`);
        params.push(yyyymm);
        paramIndex++;
      }
      if (scenario) {
        conditions.push(`scenario_code = $${paramIndex}`);
        params.push(scenario);
        paramIndex++;
      }
      if (search) {
        conditions.push(`(cost_center_code ILIKE $${paramIndex} OR cost_center_name ILIKE $${paramIndex})`);
        params.push(`%${search}%`);
        paramIndex++;
      }
      params.push(limit);

      const query = `
        SELECT DISTINCT 
          cost_center_code as code, 
          COALESCE(cost_center_name, cost_center_code) as name
        FROM "binary".bi_cost_center
        WHERE ${conditions.join(" AND ")}
        ORDER BY cost_center_code
        LIMIT $${paramIndex}
      `;

      const results = await ctx.db.$queryRawUnsafe<OptionItem[]>(query, ...params);
      return results;
    }),

  /**
   * 사용자 목록 조회 (bi_user_mst)
   * code: employee_id, name: employee_name
   */
  getUsers: publicProcedure
    .input(optionQueryInput)
    .query(async ({ ctx, input }) => {
      const { search, site, yyyymm, scenario, limit } = input;

      const conditions: string[] = ["1=1"];
      const params: (string | number)[] = [];
      let paramIndex = 1;

      if (site) {
        conditions.push(`plant_site_code = $${paramIndex}`);
        params.push(site);
        paramIndex++;
      }
      if (yyyymm) {
        conditions.push(`yyyymm = $${paramIndex}`);
        params.push(yyyymm);
        paramIndex++;
      }
      if (scenario) {
        conditions.push(`scenario_code = $${paramIndex}`);
        params.push(scenario);
        paramIndex++;
      }
      if (search) {
        conditions.push(`(employee_id ILIKE $${paramIndex} OR employee_name ILIKE $${paramIndex})`);
        params.push(`%${search}%`);
        paramIndex++;
      }
      params.push(limit);

      const query = `
        SELECT DISTINCT 
          employee_id as code, 
          COALESCE(employee_name, employee_id) as name
        FROM "binary".bi_user_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY employee_id
        LIMIT $${paramIndex}
      `;

      const results = await ctx.db.$queryRawUnsafe<OptionItem[]>(query, ...params);
      return results;
    }),

  /**
   * Site(사업장) 목록 조회 - bi_dept_mst에서 DISTINCT
   */
  getSites: publicProcedure
    .input(z.object({
      search: z.string().optional(),
      limit: z.number().optional().default(100),
    }))
    .query(async ({ ctx, input }) => {
      const { search, limit } = input;

      const conditions: string[] = ["plant_site_code IS NOT NULL"];
      const params: (string | number)[] = [];
      let paramIndex = 1;

      if (search) {
        conditions.push(`plant_site_code ILIKE $${paramIndex}`);
        params.push(`%${search}%`);
        paramIndex++;
      }
      params.push(limit);

      const query = `
        SELECT DISTINCT 
          plant_site_code as code, 
          plant_site_code as name
        FROM "binary".bi_dept_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY plant_site_code
        LIMIT $${paramIndex}
      `;

      const results = await ctx.db.$queryRawUnsafe<OptionItem[]>(query, ...params);
      return results;
    }),

  /**
   * SEL_CODE/시나리오 목록 - bi_dept_mst에서 DISTINCT scenario_code
   */
  getSelCodes: publicProcedure
    .input(z.object({
      search: z.string().optional(),
      limit: z.number().optional().default(100),
    }))
    .query(async ({ ctx, input }) => {
      const { search, limit } = input;

      const conditions: string[] = ["scenario_code IS NOT NULL"];
      const params: (string | number)[] = [];
      let paramIndex = 1;

      if (search) {
        conditions.push(`scenario_code ILIKE $${paramIndex}`);
        params.push(`%${search}%`);
        paramIndex++;
      }
      params.push(limit);

      const query = `
        SELECT DISTINCT 
          scenario_code as code, 
          scenario_code as name
        FROM "binary".bi_dept_mst
        WHERE ${conditions.join(" AND ")}
        ORDER BY scenario_code
        LIMIT $${paramIndex}
      `;

      const results = await ctx.db.$queryRawUnsafe<OptionItem[]>(query, ...params);
      return results;
    }),

  /**
   * 회사별 UI 라벨 조회 (bi_common_code - code_type='LABEL')
   */
  getLabels: publicProcedure
    .input(z.object({
      companyCode: z.string().optional().default("BINARY"),
    }))
    .query(async ({ ctx, input }) => {
      const { companyCode } = input;

      const results = await ctx.db.$queryRaw<
        Array<{ category: string; ui_label: string }>
      >`
        SELECT category, ui_label 
        FROM "binary".bi_common_code 
        WHERE code_type = 'LABEL' 
          AND company_code = ${companyCode}
          AND use_yn = 'Y'
          AND ui_label IS NOT NULL
      `;

      // 기본 라벨
      const defaultLabels: Record<string, string> = {
        CUSTOMER: "거래처",
        DEPT: "부서",
        ACCOUNT: "계정",
        PRODUCT: "제품",
        MATERIAL: "부품",
        EQUIPMENT: "설비",
        MODEL: "모델",
        USER: "사용자",
        SITE: "사업장",
        SCENARIO: "시나리오",
        COST_CENTER: "코스트센터",
        EXPENSE: "비용구분",
      };

      // DB 결과로 덮어쓰기
      for (const row of results) {
        defaultLabels[row.category] = row.ui_label;
      }

      return defaultLabels;
    }),
});
