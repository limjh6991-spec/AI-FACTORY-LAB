import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  // 전체 목록 조회
  list: publicProcedure
    .input(
      z.object({
        page: z.number().default(1),
        pageSize: z.number().default(50),
        searchTerm: z.string().optional(),
        category: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const skip = (input.page - 1) * input.pageSize;

      const where = {
        AND: [
          input.searchTerm
            ? {
                OR: [
                  { productName: { contains: input.searchTerm, mode: "insensitive" as const } },
                  { productCode: { contains: input.searchTerm, mode: "insensitive" as const } },
                ],
              }
            : {},
          input.category ? { category: input.category } : {},
        ],
      };

      const [products, total] = await Promise.all([
        ctx.db.product.findMany({
          where,
          skip,
          take: input.pageSize,
          orderBy: { createdAt: "desc" },
        }),
        ctx.db.product.count({ where }),
      ]);

      return {
        products,
        total,
        page: input.page,
        pageSize: input.pageSize,
        totalPages: Math.ceil(total / input.pageSize),
      };
    }),

  // ID로 단일 조회
  getById: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return await ctx.db.product.findUnique({
        where: { id: input },
      });
    }),

  // 생성
  create: publicProcedure
    .input(
      z.object({
        productCode: z.string().min(1).max(50),
        productName: z.string().min(1).max(200),
        category: z.string().min(1).max(100),
        price: z.number().positive(),
        stock: z.number().int().min(0).default(0),
        description: z.string().optional(),
        isActive: z.boolean().default(true),
        createdBy: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.product.create({
        data: input,
      });
    }),

  // 수정
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        productCode: z.string().min(1).max(50).optional(),
        productName: z.string().min(1).max(200).optional(),
        category: z.string().min(1).max(100).optional(),
        price: z.number().positive().optional(),
        stock: z.number().int().min(0).optional(),
        description: z.string().optional(),
        isActive: z.boolean().optional(),
        updatedBy: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return await ctx.db.product.update({
        where: { id },
        data,
      });
    }),

  // 삭제
  delete: publicProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.product.delete({
        where: { id: input },
      });
    }),

  // 카테고리 목록 조회
  getCategories: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.product.findMany({
      select: { category: true },
      distinct: ["category"],
      orderBy: { category: "asc" },
    });
    return categories.map((c) => c.category);
  }),
});
