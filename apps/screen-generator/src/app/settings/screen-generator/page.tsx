"use client";

import { useState } from "react";
import { cn } from "~/lib/utils";
import SimpleMode from "./_components/SimpleMode";
import ExcelMode from "./_components/ExcelMode";

type GeneratorMode = "simple" | "excel";

export default function ScreenGeneratorPage() {
  const [mode, setMode] = useState<GeneratorMode>("simple");

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-4 overflow-hidden p-4">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-semibold text-[#161616]">화면 생성기</h1>
          <p className="text-sm text-[#525252]">
            {mode === "simple"
              ? "테이블 정보로 기준정보 관리 화면을 생성합니다"
              : "Excel 파일을 업로드하여 화면을 자동으로 생성합니다"}
          </p>
        </div>
      </div>

      {/* 모드 선택 탭 */}
      <div className="flex gap-1 p-1 bg-[#e0e0e0] rounded-lg w-fit shrink-0">
        <button
          onClick={() => setMode("simple")}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md transition-all",
            mode === "simple"
              ? "bg-white text-[#0f62fe] shadow-sm"
              : "text-[#525252] hover:text-[#161616]"
          )}
        >
          🗂️ 간편 모드
        </button>
        <button
          onClick={() => setMode("excel")}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md transition-all",
            mode === "excel"
              ? "bg-white text-[#0f62fe] shadow-sm"
              : "text-[#525252] hover:text-[#161616]"
          )}
        >
          📊 Excel 모드
        </button>
      </div>

      {/* 모드별 컴포넌트 */}
      {mode === "simple" ? <SimpleMode /> : <ExcelMode />}
    </div>
  );
}
