"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Construction, ArrowLeft } from "lucide-react";
import Link from "next/link";

function PlaceholderContent() {
  const searchParams = useSearchParams();
  const menuName = searchParams.get("menu") || "화면";

  return (
    <div className="h-[calc(100vh-56px)] flex items-center justify-center bg-[#f4f4f4]">
      <div className="text-center">
        {/* 아이콘 */}
        <div className="mb-6 inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100">
          <Construction className="w-12 h-12 text-blue-500" />
        </div>
        
        {/* 메시지 */}
        <h1 className="text-2xl font-semibold text-[#161616] mb-2">
          {menuName}
        </h1>
        <p className="text-lg text-[#525252] mb-8">
          화면이 추가될 예정입니다
        </p>
        
        {/* 추가 안내 */}
        <div className="bg-white border border-[#e0e0e0] rounded-lg p-6 max-w-md mx-auto mb-6">
          <p className="text-sm text-[#525252] leading-relaxed">
            이 메뉴는 현재 개발 중입니다.<br />
            빠른 시일 내에 화면이 추가될 예정입니다.
          </p>
        </div>
        
        {/* 뒤로가기 버튼 */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 h-10 px-4 bg-[#0f62fe] text-white text-sm font-medium rounded hover:bg-[#0043ce] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          대시보드로 이동
        </Link>
      </div>
    </div>
  );
}

export default function PlaceholderPage() {
  return (
    <Suspense fallback={
      <div className="h-[calc(100vh-56px)] flex items-center justify-center bg-[#f4f4f4]">
        <div className="text-[#525252]">로딩 중...</div>
      </div>
    }>
      <PlaceholderContent />
    </Suspense>
  );
}
