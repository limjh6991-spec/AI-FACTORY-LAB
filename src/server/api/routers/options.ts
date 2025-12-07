/**
 * 옵션 공통 API 라우터
 * 각종 마스터 테이블에서 코드/명칭 데이터를 조회
 */

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// 옵션 아이템 타입
interface OptionItem {
  code: string;
  name: string;
}

// 동적 WHERE 절 생성 헬퍼
function buildWhereClause(
  conditions: { field: string; value: string | undefined; isLike?: boolean }[]
): { where: string; params: string[] } {
  const clauses: string[] = ["1=1"];
  const params: string[] = [];
  let paramIndex = 1;

  for (const cond of conditions) {
    if (cond.value) {
      if (cond.isLike) {
        clauses.push(`(${cond.field} ILIKE $${paramIndex})`);
        params.push(`%${cond.value}%`);
      } else {
        clauses.push(`${cond.field} = $${paramIndex}`);
        params.push(cond.value);
      }
      paramIndex++;
    }
  }

  return { where: clauses.join(" AND "), params };
}

export const optionsRouter = createTRPCRouter({
  /**
   * 거래처 목록 조회 (doi_cust_mast)
   * code: cust_code, name: cust_desc
   */
  getCustomers: publicProcedure
    .input(z.object({
      search: z.string().optional(),
      site: z.string().optional(),
      limit: z.number().optional().default(100),
    }))
    .query(async ({ ctx, input }) => {
      const { search, site, limit } = input;
      
      const conditions: string[] = ["1=1"];
      const params: (string | number)[] = [];
      let paramIndex = 1;
      
      if (site) {
        conditions.push(`site = $${paramIndex}`);
        params.push(site);
        paramIndex++;
      }
      if (search) {
        conditions.push(`(cust_code ILIKE $${paramIndex} OR cust_desc ILIKE $${paramIndex})`);
        params.push(`%${search}%`);
        paramIndex++;
      }
      params.push(limit);
      
      const query = `
        SELECT DISTINCT 
          cust_code as code, 
          COALESCE(cust_desc, cust_code) as name
        FROM doi_cust_mast
        WHERE ${conditions.join(" AND ")}
        ORDER BY cust_code
        LIMIT $${paramIndex}
      `;
      
      const customers = await ctx.db.$queryRawUnsafe<OptionItem[]>(query, ...params);
      return customers;
    }),

  /**
   * 부품/자재 목록 조회 (doi_material_mast)
   * code: mat_code, name: mat_desc
   */
  getMaterials: publicProcedure
    .input(z.object({
      search: z.string().optional(),
      site: z.string().optional(),
      limit: z.number().optional().default(100),
    }))
    .query(async ({ ctx, input }) => {
      const { search, site, limit } = input;
      
      const conditions: string[] = ["1=1"];
      const params: (string | number)[] = [];
      let paramIndex = 1;
      
      if (site) {
        conditions.push(`site = $${paramIndex}`);
        params.push(site);
        paramIndex++;
      }
      if (search) {
        conditions.push(`(mat_code ILIKE $${paramIndex} OR mat_desc ILIKE $${paramIndex})`);
        params.push(`%${search}%`);
        paramIndex++;
      }
      params.push(limit);
      
      const query = `
        SELECT DISTINCT 
          mat_code as code, 
          COALESCE(mat_desc, mat_code) as name
        FROM doi_material_mast
        WHERE ${conditions.join(" AND ")}
        ORDER BY mat_code
        LIMIT $${paramIndex}
      `;
      
      const materials = await ctx.db.$queryRawUnsafe<OptionItem[]>(query, ...params);
      return materials;
    }),

  /**
   * 모델 목록 조회 (doi_model_mast)
   * code: model, name: spec
   */
  getModels: publicProcedure
    .input(z.object({
      search: z.string().optional(),
      site: z.string().optional(),
      limit: z.number().optional().default(100),
    }))
    .query(async ({ ctx, input }) => {
      const { search, site, limit } = input;
      
      const conditions: string[] = ["1=1"];
      const params: (string | number)[] = [];
      let paramIndex = 1;
      
      if (site) {
        conditions.push(`site = $${paramIndex}`);
        params.push(site);
        paramIndex++;
      }
      if (search) {
        conditions.push(`(model ILIKE $${paramIndex} OR spec ILIKE $${paramIndex})`);
        params.push(`%${search}%`);
        paramIndex++;
      }
      params.push(limit);
      
      const query = `
        SELECT DISTINCT 
          model as code, 
          spec as name
        FROM doi_model_mast
        WHERE ${conditions.join(" AND ")}
        ORDER BY model
        LIMIT $${paramIndex}
      `;
      
      const models = await ctx.db.$queryRawUnsafe<OptionItem[]>(query, ...params);
      return models;
    }),

  /**
   * 계정 목록 조회 (doi_acct)
   * code: acct, name: acct_name
   */
  getAccounts: publicProcedure
    .input(z.object({
      search: z.string().optional(),
      site: z.string().optional(),
      limit: z.number().optional().default(100),
    }))
    .query(async ({ ctx, input }) => {
      const { search, site, limit } = input;
      
      const conditions: string[] = ["1=1"];
      const params: (string | number)[] = [];
      let paramIndex = 1;
      
      if (site) {
        conditions.push(`site = $${paramIndex}`);
        params.push(site);
        paramIndex++;
      }
      if (search) {
        conditions.push(`(acct ILIKE $${paramIndex} OR acct_name ILIKE $${paramIndex})`);
        params.push(`%${search}%`);
        paramIndex++;
      }
      params.push(limit);
      
      const query = `
        SELECT DISTINCT 
          acct as code, 
          COALESCE(acct_name, acct) as name
        FROM doi_acct
        WHERE ${conditions.join(" AND ")}
        ORDER BY acct
        LIMIT $${paramIndex}
      `;
      
      const accounts = await ctx.db.$queryRawUnsafe<OptionItem[]>(query, ...params);
      return accounts;
    }),

  /**
   * 비용구분 목록 조회 (doi_expen_sel)
   * code: expen_sel, name: expen_sel명
   */
  getExpenSels: publicProcedure
    .input(z.object({
      search: z.string().optional(),
      site: z.string().optional(),
      limit: z.number().optional().default(100),
    }))
    .query(async ({ ctx, input }) => {
      const { search, site, limit } = input;
      
      const conditions: string[] = ["1=1"];
      const params: (string | number)[] = [];
      let paramIndex = 1;
      
      if (site) {
        conditions.push(`site = $${paramIndex}`);
        params.push(site);
        paramIndex++;
      }
      if (search) {
        conditions.push(`(expen_sel ILIKE $${paramIndex} OR "expen_sel명" ILIKE $${paramIndex})`);
        params.push(`%${search}%`);
        paramIndex++;
      }
      params.push(limit);
      
      const query = `
        SELECT DISTINCT 
          expen_sel as code, 
          COALESCE("expen_sel명", expen_sel) as name
        FROM doi_expen_sel
        WHERE ${conditions.join(" AND ")}
        ORDER BY expen_sel
        LIMIT $${paramIndex}
      `;
      
      const expenSels = await ctx.db.$queryRawUnsafe<OptionItem[]>(query, ...params);
      return expenSels;
    }),

  /**
   * 부서 목록 조회 (doi_dept)
   * code: dept, name: dept_name
   */
  getDepartments: publicProcedure
    .input(z.object({
      search: z.string().optional(),
      site: z.string().optional(),
      limit: z.number().optional().default(100),
    }))
    .query(async ({ ctx, input }) => {
      const { search, site, limit } = input;
      
      const conditions: string[] = ["1=1"];
      const params: (string | number)[] = [];
      let paramIndex = 1;
      
      if (site) {
        conditions.push(`site = $${paramIndex}`);
        params.push(site);
        paramIndex++;
      }
      if (search) {
        conditions.push(`(dept ILIKE $${paramIndex} OR dept_name ILIKE $${paramIndex})`);
        params.push(`%${search}%`);
        paramIndex++;
      }
      params.push(limit);
      
      const query = `
        SELECT DISTINCT 
          dept as code, 
          COALESCE(dept_name, dept) as name
        FROM doi_dept
        WHERE ${conditions.join(" AND ")}
        ORDER BY dept
        LIMIT $${paramIndex}
      `;
      
      const departments = await ctx.db.$queryRawUnsafe<OptionItem[]>(query, ...params);
      return departments;
    }),

  /**
   * Site 목록 (고정값)
   */
  getSites: publicProcedure.query(async () => {
    return [
      { code: 'HQ', name: 'HQ (본사)' },
      { code: 'VN', name: 'VN (베트남)' },
    ];
  }),

  /**
   * SEL_CODE 목록 (기본값 + 추후 확장)
   */
  getSelCodes: publicProcedure.query(async () => {
    return [
      { code: 'ACTUAL', name: 'ACTUAL (실적)' },
    ];
  }),
});
