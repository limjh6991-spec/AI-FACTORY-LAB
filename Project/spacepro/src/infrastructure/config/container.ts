/**
 * Container - 의존성 주입 컨테이너
 * Clean Architecture: Infrastructure Layer
 * 
 * 모든 의존성을 중앙에서 관리하고 주입
 */

import prisma from '../../lib/prisma';
import { PrismaMenuRepository } from '../persistence/prisma/PrismaMenuRepository';
import { GetMenuHierarchyUseCase } from '../../application/use-cases/menu/GetMenuHierarchyUseCase';

// Repository Instances
const menuRepository = new PrismaMenuRepository(prisma);

// Use Case Instances
const getMenuHierarchyUseCase = new GetMenuHierarchyUseCase(menuRepository);

/**
 * DI Container
 * 모든 의존성에 대한 접근 포인트
 */
export const container = {
    // Repositories
    repositories: {
        menu: menuRepository,
    },

    // Use Cases
    useCases: {
        menu: {
            getHierarchy: getMenuHierarchyUseCase,
        },
    },
};

// Type exports for type safety
export type Container = typeof container;
