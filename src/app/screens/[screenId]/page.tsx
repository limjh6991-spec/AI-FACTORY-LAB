"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2, AlertTriangle, FileText } from "lucide-react";
import dynamic from "next/dynamic";

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
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
        <h2 className="text-lg font-semibold text-slate-800 mb-2">화면을 찾을 수 없습니다</h2>
        <p className="text-slate-500">{error}</p>
        <p className="text-sm text-slate-400 mt-2">화면 ID: {screenId}</p>
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
