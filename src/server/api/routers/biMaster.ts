/**
 * 기준정보 마스터 API 라우터
 * binary 스키마의 마스터 테이블 CRUD 및 조회
 */

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// 옵션 아이템 타입
interface OptionItem {
  code: string;
  name: string;
}

// 공통 입력 스키마
const masterQueryInput = z.object({
  search: z.string().optional(),
  site: z.string().optional(),
  yyyymm: z.string().optional(),
  scenario: z.string().optional(),
  limit: z.number().optional().default(100),
});

export const biMasterRouter = createTRPCRouter({
  /**
   * 부서 목록 조회 (bi_dept_mst)
   */
  getDepartments: publicProcedure
    .input(masterQueryInput)
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
   */
  getCostCenters: publicProcedure
    .input(masterQueryInput)
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
   * 사원 목록 조회 (bi_user_mst)
   */
  getUsers: publicProcedure
    .input(masterQueryInput)
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
   * 계정 목록 조회 (bi_acct_mst)
   */
  getAccounts: publicProcedure
    .input(masterQueryInput)
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
   * 경비항목 목록 조회 (bi_expen_sel_mst)
   */
  getExpenseItems: publicProcedure
    .input(masterQueryInput)
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
   * 거래처 목록 조회 (bi_cust_mst)
   */
  getCustomers: publicProcedure
    .input(masterQueryInput)
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
   * 설비 목록 조회 (bi_eqp_mst)
   */
  getEquipments: publicProcedure
    .input(masterQueryInput)
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
   * 제품 목록 조회 (bi_prod_mst)
   */
  getProducts: publicProcedure
    .input(masterQueryInput)
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

  // ==========================================
  // CRUD 프로시저
  // ==========================================

  /**
   * 부서 목록 조회 (전체 필드)
   */
  listDepartments: publicProcedure
    .input(z.object({
      site: z.string(),
      yyyymm: z.string(),
      scenario: z.string().default('ACTUAL'),
    }))
    .query(async ({ ctx, input }) => {
      const { site, yyyymm, scenario } = input;
      
      const query = `
        SELECT 
          plant_site_code,
          yyyymm,
          scenario_code,
          department_code,
          department_name,
          parent_department_code,
          cost_center_mapping_code,
          is_production_dept,
          use_yn
        FROM "binary".bi_dept_mst
        WHERE plant_site_code = $1
          AND yyyymm = $2
          AND scenario_code = $3
        ORDER BY department_code
      `;
      
      return await ctx.db.$queryRawUnsafe(query, site, yyyymm, scenario);
    }),

  /**
   * 부서 저장 (Insert/Update)
   */
  saveDepartment: publicProcedure
    .input(z.object({
      plant_site_code: z.string(),
      yyyymm: z.string(),
      scenario_code: z.string(),
      department_code: z.string(),
      department_name: z.string().optional(),
      parent_department_code: z.string().optional(),
      cost_center_mapping_code: z.string().optional(),
      is_production_dept: z.boolean().optional(),
      use_yn: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const query = `
        INSERT INTO "binary".bi_dept_mst (
          plant_site_code, yyyymm, scenario_code, department_code,
          department_name, parent_department_code, cost_center_mapping_code,
          is_production_dept, use_yn
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (plant_site_code, yyyymm, scenario_code, department_code)
        DO UPDATE SET
          department_name = EXCLUDED.department_name,
          parent_department_code = EXCLUDED.parent_department_code,
          cost_center_mapping_code = EXCLUDED.cost_center_mapping_code,
          is_production_dept = EXCLUDED.is_production_dept,
          use_yn = EXCLUDED.use_yn
        RETURNING *
      `;
      
      return await ctx.db.$queryRawUnsafe(
        query,
        input.plant_site_code,
        input.yyyymm,
        input.scenario_code,
        input.department_code,
        input.department_name ?? null,
        input.parent_department_code ?? null,
        input.cost_center_mapping_code ?? null,
        input.is_production_dept ?? null,
        input.use_yn ?? 'Y'
      );
    }),

  /**
   * 부서 삭제
   */
  deleteDepartment: publicProcedure
    .input(z.object({
      plant_site_code: z.string(),
      yyyymm: z.string(),
      scenario_code: z.string(),
      department_code: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const query = `
        DELETE FROM "binary".bi_dept_mst
        WHERE plant_site_code = $1
          AND yyyymm = $2
          AND scenario_code = $3
          AND department_code = $4
      `;
      
      return await ctx.db.$queryRawUnsafe(
        query,
        input.plant_site_code,
        input.yyyymm,
        input.scenario_code,
        input.department_code
      );
    }),

  /**
   * 코스트센터 목록 조회 (전체 필드)
   */
  listCostCenters: publicProcedure
    .input(z.object({
      site: z.string(),
      yyyymm: z.string(),
      scenario: z.string().default('ACTUAL'),
    }))
    .query(async ({ ctx, input }) => {
      const { site, yyyymm, scenario } = input;
      
      const query = `
        SELECT 
          plant_site_code,
          yyyymm,
          scenario_code,
          cost_center_code,
          cost_center_name,
          managing_dept_code,
          cost_center_type,
          production_line_code,
          use_yn
        FROM "binary".bi_cost_center
        WHERE plant_site_code = $1
          AND yyyymm = $2
          AND scenario_code = $3
        ORDER BY cost_center_code
      `;
      
      return await ctx.db.$queryRawUnsafe(query, site, yyyymm, scenario);
    }),

  /**
   * 제품 목록 조회 (전체 필드)
   */
  listProducts: publicProcedure
    .input(z.object({
      site: z.string(),
      yyyymm: z.string(),
      scenario: z.string().default('ACTUAL'),
    }))
    .query(async ({ ctx, input }) => {
      const { site, yyyymm, scenario } = input;
      
      const query = `
        SELECT 
          plant_site_code,
          yyyymm,
          scenario_code,
          product_item_code,
          product_item_name,
          product_group_code,
          material_type,
          base_unit_of_measure,
          unit_weight_kg,
          procurement_type
        FROM "binary".bi_prod_mst
        WHERE plant_site_code = $1
          AND yyyymm = $2
          AND scenario_code = $3
        ORDER BY product_item_code
      `;
      
      return await ctx.db.$queryRawUnsafe(query, site, yyyymm, scenario);
    }),

  /**
   * 거래처 목록 조회 (전체 필드)
   */
  listCustomers: publicProcedure
    .input(z.object({
      site: z.string(),
      yyyymm: z.string(),
      scenario: z.string().default('ACTUAL'),
    }))
    .query(async ({ ctx, input }) => {
      const { site, yyyymm, scenario } = input;
      
      const query = `
        SELECT 
          plant_site_code,
          yyyymm,
          scenario_code,
          partner_code,
          partner_name,
          business_reg_number,
          partner_type,
          delivery_region_name,
          credit_rating_score
        FROM "binary".bi_cust_mst
        WHERE plant_site_code = $1
          AND yyyymm = $2
          AND scenario_code = $3
        ORDER BY partner_code
      `;
      
      return await ctx.db.$queryRawUnsafe(query, site, yyyymm, scenario);
    }),
});
