"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * SC930 - 메뉴 관리
 * /settings/menu로 리다이렉트
 */
export default function SC930Page() {
  const router = useRouter();

  useEffect(() => {
    // 임시화면관리 페이지로 리다이렉트
    router.replace("/settings/menu");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-[#f4f4f4]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0f62fe] mx-auto mb-4"></div>
        <p className="text-[#525252]">메뉴 관리 페이지로 이동 중...</p>
      </div>
    </div>
  );
}
