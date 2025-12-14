import { postRouter } from "~/server/api/routers/post";
import { productRouter } from "~/server/api/routers/product";
import { excelRouter } from "~/server/api/routers/excel";
import { screen982157Router } from "~/server/api/routers/screen982157";
import { menuRouter } from "~/server/api/routers/menu";
import { screenGeneratorRouter } from "~/server/api/routers/screen-generator";
import { optionsRouter } from "~/server/api/routers/options";
import { biMasterRouter } from "~/server/api/routers/biMaster";
import { dbMetaRouter } from "~/server/api/routers/db-meta";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  product: productRouter,
  excel: excelRouter,
  screen982157: screen982157Router,
  menu: menuRouter,
  screenGenerator: screenGeneratorRouter,
  options: optionsRouter,
  biMaster: biMasterRouter,
  dbMeta: dbMetaRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
