"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2, Construction, FileText, ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

// Sandpack 동적 로드 (SSR 비활성화)
const SandpackPreview = dynamic(
  () => import("@/components/preview/SandpackPreview"),
  { ssr: false }
);

interface ScreenMetadata {
  screenId: string;
  screenName: string;
  tableName?: string;
  status: string;
  createdAt: string;
  publishedAt?: string;
}

export default function DynamicScreenPage() {
  const params = useParams();
  const router = useRouter();
  const screenId = params.screenId as string;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<ScreenMetadata | null>(null);
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [reactContent, setReactContent] = useState<string | null>(null);

  useEffect(() => {
    async function loadScreen() {
      // SC로 시작하는 정식 화면은 소문자 경로로 리다이렉트
      if (screenId.startsWith('SC') && screenId !== screenId.toLowerCase()) {
        router.replace(`/screens/${screenId.toLowerCase()}`);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        // 서버에서 화면 데이터 로드 (대문자 ID로 요청)
        const upperScreenId = screenId.toUpperCase();
        const response = await fetch(`/api/screens/${upperScreenId}`);
        
        if (!response.ok) {
          throw new Error(`화면을 찾을 수 없습니다: ${screenId}`);
        }
        
        const data = await response.json();
        setMetadata(data.metadata);
        setHtmlContent(data.htmlContent);
        setReactContent(data.reactContent);
      } catch (err) {
        setError(err instanceof Error ? err.message : "화면 로드 실패");
      } finally {
        setLoading(false);
      }
    }
    
    if (screenId) {
      loadScreen();
    }
  }, [screenId, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-slate-600">화면 로딩 중...</span>
      </div>
    );
  }

  if (error) {
    // 화면을 찾을 수 없으면 "화면이 추가될 예정입니다" 표시
    return (
      <div className="h-[calc(100vh-56px)] flex items-center justify-center bg-[#f4f4f4]">
        <div className="text-center">
          {/* 아이콘 */}
          <div className="mb-6 inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100">
            <Construction className="w-12 h-12 text-blue-500" />
          </div>
          
          {/* 메시지 */}
          <h1 className="text-2xl font-semibold text-[#161616] mb-2">
            {screenId.toUpperCase()}
          </h1>
          <p className="text-lg text-[#525252] mb-8">
            화면이 추가될 예정입니다
          </p>
          
          {/* 추가 안내 */}
          <div className="bg-white border border-[#e0e0e0] rounded-lg p-6 max-w-md mx-auto mb-6">
            <p className="text-sm text-[#525252] leading-relaxed">
              이 화면은 현재 개발 중입니다.<br />
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

  return (
    <div className="h-full bg-white">
      {/* React 컴포넌트가 있으면 Sandpack으로 렌더링 */}
      {reactContent ? (
        <div className="h-[calc(100vh-120px)]">
          <SandpackPreview code={reactContent} showEditor={false} />
        </div>
      ) : htmlContent ? (
        <iframe
          srcDoc={`
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'IBM Plex Sans', -apple-system, sans-serif; font-size: 14px; padding: 16px; }
              </style>
            </head>
            <body>${htmlContent}</body>
            </html>
          `}
          className="w-full h-[calc(100vh-120px)] border-0"
          title={metadata?.screenName || "화면 미리보기"}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-[400px] text-slate-500">
          <FileText className="h-12 w-12 mb-4 text-slate-300" />
          <p>화면 콘텐츠가 없습니다</p>
        </div>
      )}
    </div>
  );
}
