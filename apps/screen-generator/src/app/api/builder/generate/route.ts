/**
 * 화면 생성 API
 * Layout JSON → React 코드 → 파일 저장
 */

import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const { screenId, screenName, code, layout } = await request.json();

        if (!screenId || !code) {
            return NextResponse.json(
                { message: '화면 ID와 코드가 필요합니다.' },
                { status: 400 }
            );
        }

        // 화면 디렉토리 경로
        const screenDir = path.join(
            process.cwd(),
            'src/app/screens',
            screenId.toLowerCase()
        );

        // 디렉토리 생성
        if (!existsSync(screenDir)) {
            await mkdir(screenDir, { recursive: true });
        }

        // page.tsx 파일 저장
        const pagePath = path.join(screenDir, 'page.tsx');
        await writeFile(pagePath, code, 'utf-8');

        // layout.json 저장 (백업용)
        const layoutPath = path.join(screenDir, 'layout.json');
        await writeFile(
            layoutPath,
            JSON.stringify({ screenId, screenName, layout, createdAt: new Date().toISOString() }, null, 2),
            'utf-8'
        );

        return NextResponse.json({
            success: true,
            path: `/screens/${screenId.toLowerCase()}`,
            files: ['page.tsx', 'layout.json'],
        });
    } catch (error) {
        console.error('Screen generation error:', error);
        return NextResponse.json(
            { message: '화면 생성 중 오류가 발생했습니다.', error: String(error) },
            { status: 500 }
        );
    }
}
