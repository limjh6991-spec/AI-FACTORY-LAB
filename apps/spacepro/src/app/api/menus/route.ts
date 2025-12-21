/**
 * Menu API Route - Clean Architecture 적용
 * Presentation Layer → Use Case → Domain
 */

import { NextResponse } from 'next/server';

// Direct imports to avoid path resolution issues
import prisma from '../../../lib/prisma';
import { PrismaMenuRepository } from '../../../infrastructure/persistence/prisma/PrismaMenuRepository';
import { GetMenuHierarchyUseCase } from '../../../application/use-cases/menu/GetMenuHierarchyUseCase';

export async function GET() {
    try {
        // 의존성 생성 (Simple DI)
        const menuRepository = new PrismaMenuRepository(prisma);
        const getMenuHierarchyUseCase = new GetMenuHierarchyUseCase(menuRepository);

        // Use Case 호출
        const result = await getMenuHierarchyUseCase.execute();

        return NextResponse.json(result.menus);
    } catch (error) {
        console.error('Failed to fetch menus:', error);
        return NextResponse.json({ error: 'Failed to fetch menus' }, { status: 500 });
    }
}
