import { env } from "~/env";
import { PrismaClient } from "../../generated/prisma";
import { logQuery, logMessage } from "./utils/queryLogger";

const createPrismaClient = () => {
  const prisma = new PrismaClient({
    log: [
      { level: 'query', emit: 'event' },
      { level: 'error', emit: 'event' },
      { level: 'warn', emit: 'event' },
      { level: 'info', emit: 'event' },
    ],
  });

  // 쿼리 이벤트 로깅
  prisma.$on('query', (e) => {
    logQuery(
      e.query,
      e.params,
      Number(e.duration),
    );
  });

  // 에러 이벤트 로깅
  prisma.$on('error', (e) => {
    logMessage('ERROR', e.message);
  });

  // 경고 이벤트 로깅
  prisma.$on('warn', (e) => {
    logMessage('WARN', e.message);
  });

  // 정보 이벤트 로깅
  prisma.$on('info', (e) => {
    logMessage('INFO', e.message);
  });

  logMessage('INFO', 'Prisma client initialized with query logging');

  return prisma;
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
  searchPathSet: boolean | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

// search_path 설정 (binary 스키마 포함)
export async function ensureSearchPath() {
  if (!globalForPrisma.searchPathSet) {
    try {
      await db.$executeRawUnsafe("SET search_path TO public, binary");
      globalForPrisma.searchPathSet = true;
      logMessage('INFO', 'search_path set to: public, binary');
    } catch (error) {
      logMessage('ERROR', `Failed to set search_path: ${error}`);
    }
  }
}

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
