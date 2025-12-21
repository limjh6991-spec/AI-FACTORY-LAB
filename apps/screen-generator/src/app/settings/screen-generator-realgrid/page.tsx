"use client";

import { useState } from "react";
import { cn } from "~/lib/utils";
import SimpleModeRealGrid from "./_components/SimpleModeRealGrid";

export default function ScreenGeneratorRealGridPage() {
    return (
        <div className="h-[calc(100vh-120px)] flex flex-col gap-4 overflow-hidden p-4">
            {/* Header */}
            <div className="flex items-center justify-between shrink-0">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-semibold text-[#161616]">화면 생성기</h1>
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">RealGrid</span>
                    </div>
                    <p className="text-sm text-[#525252]">
                        테이블 정보로 RealGrid 기반 CRUD 화면을 생성합니다
                    </p>
                </div>
            </div>

            {/* RealGrid 모드 컴포넌트 */}
            <SimpleModeRealGrid />
        </div>
    );
}
