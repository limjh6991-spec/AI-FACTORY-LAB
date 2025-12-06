"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import {
  Eye,
  Trash2,
  FolderTree,
  FileCode,
  Database,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Play,
  RefreshCw,
  X,
  ChevronRight,
  ChevronDown,
  Folder,
} from "lucide-react";
import { cn } from "~/lib/utils";
import Link from "next/link";

// 메뉴 타입
interface MenuItem {
  menuId: string;
  menuName: string;
  menuLevel: number;
  parentMenuId: string | null;
  children?: MenuItem[];
}

export default function TempScreensPage() {
  const [selectedScreen, setSelectedScreen] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<"preview" | "sql" | "react">("preview");
  
  // API
  const { data: screenList, isLoading, refetch } = api.screenGenerator.getTempScreenList.useQuery();
  const { data: menuTree } = api.menu.getMenuTree.useQuery();
  const { data: screenDetail } = api.screenGenerator.getTempScreen.useQuery(
    { screenId: selectedScreen || "" },
    { enabled: !!selectedScreen }
  );
  const deleteMutation = api.screenGenerator.deleteTempScreen.useMutation();
  const publishMutation = api.screenGenerator.publishScreen.useMutation();

  // 메뉴 토글
  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => {
      const next = new Set(prev);
      if (next.has(menuId)) {
        next.delete(menuId);
      } else {
        next.add(menuId);
      }
      return next;
    });
  };
  
  const handleDelete = async (screenId: string) => {
    if (!confirm(`'${screenId}' 화면을 삭제하시겠습니까?`)) return;
    
    try {
      await deleteMutation.mutateAsync({ screenId });
      if (selectedScreen === screenId) {
        setSelectedScreen(null);
      }
      refetch();
    } catch (error) {
      alert("삭제 실패: " + (error instanceof Error ? error.message : "알 수 없는 오류"));
    }
  };

  // 메뉴 등록 핸들러
  const handlePublish = async () => {
    if (!selectedScreen || !selectedMenuId) {
      alert("메뉴 위치를 선택해주세요.");
      return;
    }
    
    setIsPublishing(true);
    try {
      const result = await publishMutation.mutateAsync({
        screenId: selectedScreen,
        parentMenuId: selectedMenuId,
        menuName: screenDetail?.metadata?.screenName || selectedScreen,
      });
      
      if (result.success) {
        alert(`화면이 메뉴에 등록되었습니다!\n화면 ID: ${result.screenId}`);
        setShowPublishModal(false);
        setSelectedMenuId(null);
        refetch();
      } else {
        alert("등록 실패: " + result.error);
      }
    } catch (error) {
      alert("등록 실패: " + (error instanceof Error ? error.message : "알 수 없는 오류"));
    } finally {
      setIsPublishing(false);
    }
  };

  // 재귀적으로 메뉴 트리 렌더링
  const renderMenuTree = (menus: typeof menuTree, level = 0) => {
    if (!menus) return null;
    
    return menus.map((menu) => {
      const hasChildren = menu.children && menu.children.length > 0;
      const isExpanded = expandedMenus.has(menu.menuId);
      const isSelected = selectedMenuId === menu.menuId;
      
      return (
        <div key={menu.menuId}>
          <div
            className={cn(
              "flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#e8e8e8] transition-colors",
              isSelected && "bg-[#d0e2ff] hover:bg-[#d0e2ff]"
            )}
            style={{ paddingLeft: `${12 + level * 16}px` }}
            onClick={() => {
              if (hasChildren) {
                toggleMenu(menu.menuId);
              }
              setSelectedMenuId(menu.menuId);
            }}
          >
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown className="h-4 w-4 text-[#525252]" />
              ) : (
                <ChevronRight className="h-4 w-4 text-[#525252]" />
              )
            ) : (
              <span className="w-4" />
            )}
            <Folder className="h-4 w-4 text-[#525252]" />
            <span className="text-sm text-[#161616]">{menu.menuName}</span>
          </div>
          {hasChildren && isExpanded && renderMenuTree(menu.children, level + 1)}
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] p-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold text-[#161616]">임시화면 관리</h1>
          <p className="text-sm text-[#525252]">
            생성된 임시화면을 확인하고 메뉴에 등록합니다
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => refetch()}
            className="h-8 px-3 bg-[#393939] text-white text-sm flex items-center gap-2 hover:bg-[#525252]"
          >
            <RefreshCw className="h-4 w-4" />
            새로고침
          </button>
          <Link
            href="/settings/screen-generator"
            className="h-8 px-3 bg-[#0f62fe] text-white text-sm flex items-center gap-2 hover:bg-[#0043ce]"
          >
            <Play className="h-4 w-4" />
            화면 생성기
          </Link>
        </div>
      </div>

      <div className="flex gap-4 h-[calc(100vh-140px)]">
        {/* 좌측: 목록 */}
        <div className="w-80 bg-white border border-[#e0e0e0] flex flex-col">
          <div className="px-4 py-3 border-b border-[#e0e0e0] bg-[#f4f4f4]">
            <span className="font-medium text-sm text-[#161616]">
              임시화면 목록 ({screenList?.screens?.length || 0})
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-32 text-[#525252]">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                로딩 중...
              </div>
            ) : screenList?.screens?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-[#525252]">
                <AlertTriangle className="h-8 w-8 mb-2 text-[#8d8d8d]" />
                <p className="text-sm">임시화면이 없습니다</p>
                <Link
                  href="/settings/screen-generator"
                  className="text-sm text-[#0f62fe] hover:underline mt-2"
                >
                  화면 생성하기 →
                </Link>
              </div>
            ) : (
              screenList?.screens?.map((screen) => (
                <div
                  key={screen.screenId}
                  className={cn(
                    "px-4 py-3 border-b border-[#e0e0e0] cursor-pointer transition-colors",
                    selectedScreen === screen.screenId
                      ? "bg-[#e8e8e8]"
                      : "hover:bg-[#f4f4f4]"
                  )}
                  onClick={() => setSelectedScreen(screen.screenId)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm text-[#161616]">
                      {screen.screenName}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(screen.screenId);
                      }}
                      className="p-1 hover:bg-[#da1e28] hover:text-white rounded transition-colors text-[#525252]"
                      title="삭제"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-[#525252]">
                    <Clock className="h-3 w-3" />
                    {new Date(screen.createdAt).toLocaleString("ko-KR")}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {screen.hasHtml && (
                      <span className="text-xs px-1.5 py-0.5 bg-[#d0e2ff] text-[#0043ce] rounded">
                        HTML
                      </span>
                    )}
                    {screen.hasReact && (
                      <span className="text-xs px-1.5 py-0.5 bg-[#a7f0ba] text-[#0e6027] rounded">
                        React
                      </span>
                    )}
                    {screen.hasSql && (
                      <span className="text-xs px-1.5 py-0.5 bg-[#ffd6e8] text-[#9f1853] rounded">
                        SQL
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 우측: 상세/미리보기 */}
        <div className="flex-1 bg-white border border-[#e0e0e0] flex flex-col">
          {!selectedScreen ? (
            <div className="flex-1 flex items-center justify-center text-[#525252]">
              <div className="text-center">
                <Eye className="h-12 w-12 mx-auto mb-2 text-[#8d8d8d]" />
                <p>좌측에서 화면을 선택하세요</p>
              </div>
            </div>
          ) : !screenDetail?.success ? (
            <div className="flex-1 flex items-center justify-center text-[#525252]">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              로딩 중...
            </div>
          ) : (
            <>
              {/* 상세 헤더 */}
              <div className="px-4 py-3 border-b border-[#e0e0e0] bg-[#f4f4f4]">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-medium text-sm text-[#161616]">
                      {screenDetail.metadata?.screenName}
                    </h2>
                    <p className="text-xs text-[#525252]">
                      테이블: {screenDetail.metadata?.tableName || '-'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowPublishModal(true)}
                      disabled={isPublishing}
                      className="h-8 px-3 bg-[#24a148] text-white text-sm flex items-center gap-2 hover:bg-[#198038]"
                    >
                      {isPublishing ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4" />
                      )}
                      메뉴에 등록
                    </button>
                  </div>
                </div>
              </div>

              {/* 탭 */}
              <div className="flex border-b border-[#e0e0e0]">
                {[
                  { id: "preview" as const, label: "미리보기", icon: Eye, disabled: !screenDetail.htmlContent },
                  { id: "sql" as const, label: "SQL 쿼리", icon: Database, disabled: !screenDetail.sqlQuery },
                  { id: "react" as const, label: "React 코드", icon: FileCode, disabled: !screenDetail.reactContent },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    disabled={tab.disabled}
                    onClick={() => !tab.disabled && setActiveTab(tab.id)}
                    className={cn(
                      "px-4 py-2 text-sm flex items-center gap-2 border-b-2 transition-colors",
                      tab.disabled
                        ? "text-[#c6c6c6] cursor-not-allowed border-transparent"
                        : activeTab === tab.id
                          ? "text-[#161616] border-[#0f62fe] bg-[#e8e8e8]"
                          : "text-[#525252] border-transparent hover:bg-[#f4f4f4]"
                    )}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* 콘텐츠 */}
              <div className="flex-1 overflow-hidden p-4 bg-[#f4f4f4]">
                {activeTab === "preview" && screenDetail.htmlContent && (
                  <iframe
                    srcDoc={`
                      <!DOCTYPE html>
                      <html>
                      <head>
                        <meta charset="utf-8">
                        <style>
                          * { margin: 0; padding: 0; box-sizing: border-box; }
                          body { font-family: 'IBM Plex Sans', sans-serif; font-size: 14px; padding: 16px; }
                        </style>
                      </head>
                      <body>${screenDetail.htmlContent}</body>
                      </html>
                    `}
                    className="w-full h-full border border-[#e0e0e0] bg-white"
                    title="미리보기"
                  />
                )}
                {activeTab === "sql" && screenDetail.sqlQuery && (
                  <div className="bg-white p-4 border border-[#e0e0e0] h-full overflow-auto">
                    <pre className="text-sm text-[#161616] whitespace-pre-wrap font-mono">
                      {screenDetail.sqlQuery}
                    </pre>
                  </div>
                )}
                {activeTab === "react" && screenDetail.reactContent && (
                  <div className="bg-white p-4 border border-[#e0e0e0] h-full overflow-auto">
                    <pre className="text-sm text-[#161616] whitespace-pre-wrap font-mono">
                      {screenDetail.reactContent}
                    </pre>
                  </div>
                )}
                {activeTab === "preview" && !screenDetail.htmlContent && (
                  <div className="flex items-center justify-center h-full text-[#8d8d8d]">
                    HTML 미리보기가 없습니다
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* 메뉴 등록 모달 */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[500px] max-h-[80vh] flex flex-col shadow-xl">
            {/* 모달 헤더 */}
            <div className="px-4 py-3 border-b border-[#e0e0e0] flex items-center justify-between">
              <h3 className="font-semibold text-[#161616]">메뉴에 등록</h3>
              <button
                onClick={() => {
                  setShowPublishModal(false);
                  setSelectedMenuId(null);
                }}
                className="p-1 hover:bg-[#e8e8e8] rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* 모달 본문 */}
            <div className="flex-1 overflow-auto p-4">
              <p className="text-sm text-[#525252] mb-3">
                화면을 등록할 상위 메뉴를 선택하세요:
              </p>
              <div className="border border-[#e0e0e0] max-h-[300px] overflow-y-auto">
                {menuTree && renderMenuTree(menuTree)}
                {!menuTree && (
                  <div className="p-4 text-center text-[#8d8d8d]">
                    <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2" />
                    메뉴 로딩 중...
                  </div>
                )}
              </div>
              {selectedMenuId && (
                <p className="mt-3 text-sm text-[#0f62fe]">
                  선택된 메뉴: {selectedMenuId}
                </p>
              )}
            </div>
            
            {/* 모달 푸터 */}
            <div className="px-4 py-3 border-t border-[#e0e0e0] flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowPublishModal(false);
                  setSelectedMenuId(null);
                }}
                className="h-8 px-4 border border-[#e0e0e0] text-sm hover:bg-[#f4f4f4]"
              >
                취소
              </button>
              <button
                onClick={handlePublish}
                disabled={!selectedMenuId || isPublishing}
                className={cn(
                  "h-8 px-4 text-white text-sm flex items-center gap-2",
                  selectedMenuId && !isPublishing
                    ? "bg-[#24a148] hover:bg-[#198038]"
                    : "bg-[#c6c6c6] cursor-not-allowed"
                )}
              >
                {isPublishing && <Loader2 className="h-4 w-4 animate-spin" />}
                등록
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
