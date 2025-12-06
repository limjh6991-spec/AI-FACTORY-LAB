"use client";

import { useState, useCallback, lazy, Suspense } from "react";
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
  Plus,
  Settings,
  Search,
  FileSpreadsheet,
} from "lucide-react";
import { cn } from "~/lib/utils";
import Link from "next/link";

// Sandpack은 클라이언트에서만 로드
const SandpackPreview = lazy(() => import("~/components/preview/SandpackPreview"));

// 메뉴 타입
interface MenuItem {
  menuId: string;
  menuName: string;
  menuLevel?: number;
  parentMenuId?: string | null;
  parentId?: string | null;
  menuPath?: string | null;
  menuIcon?: string | null;
  sortOrder?: number;
  children?: MenuItem[];
}

// 화면생성기의 메뉴 트리 아이템 컴포넌트
function MenuTreeItem({
  item,
  depth = 0,
  selectedId,
  onSelect,
}: {
  item: MenuItem & { children?: MenuItem[] };
  depth?: number;
  selectedId: string | null;
  onSelect: (item: MenuItem) => void;
}) {
  const [isOpen, setIsOpen] = useState(depth < 2);
  const hasChildren = item.children && item.children.length > 0;
  const isSelected = selectedId === item.menuId;

  return (
    <div className="w-full">
      <div
        className={cn(
          "flex items-center gap-2 py-1.5 px-2 rounded cursor-pointer text-sm transition-colors",
          isSelected
            ? "bg-[#0f62fe] text-white"
            : "hover:bg-[#e0e0e0] text-[#161616]"
        )}
        style={{ paddingLeft: `${8 + depth * 16}px` }}
        onClick={() => {
          if (hasChildren) setIsOpen(!isOpen);
          onSelect(item);
        }}
      >
        {hasChildren ? (
          isOpen ? (
            <ChevronDown className="h-4 w-4 shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 shrink-0" />
          )
        ) : (
          <span className="w-4" />
        )}
        <Folder className="h-4 w-4 shrink-0 opacity-60" />
        <span className="truncate flex-1">{item.menuName}</span>
      </div>
      {hasChildren && isOpen && (
        <div>
          {item.children!.map((child) => (
            <MenuTreeItem
              key={child.menuId}
              item={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MenuManagementPage() {
  // 탭 상태
  const [activeTab, setActiveTab] = useState<"menu" | "temp">("temp");
  
  // 임시화면 관리 상태
  const [selectedScreen, setSelectedScreen] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
  const [previewActiveTab, setPreviewActiveTab] = useState<"preview" | "sql" | "react">("preview");
  
  // 메뉴 위치 선택 상태
  const [menuSearch, setMenuSearch] = useState("");
  
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

  // 재귀적으로 메뉴 트리 렌더링 (모달용)
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

  // Filter menu by search
  const filterMenu = (items: MenuItem[], search: string): MenuItem[] => {
    if (!search) return items;
    return items
      .map((item) => ({
        ...item,
        children: item.children ? filterMenu(item.children, search) : [],
      }))
      .filter(
        (item) =>
          item.menuName.toLowerCase().includes(search.toLowerCase()) ||
          (item.children && item.children.length > 0)
      );
  };

  const filteredMenu = menuTree ? filterMenu(menuTree as MenuItem[], menuSearch) : [];

  return (
    <div className="min-h-screen bg-[#f4f4f4] p-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold text-[#161616]">메뉴 관리</h1>
          <p className="text-sm text-[#525252]">
            메뉴 구조 관리 및 임시화면을 메뉴에 등록합니다
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

      {/* 탭 */}
      <div className="flex border-b border-[#e0e0e0] bg-white mb-4">
        {[
          { id: "temp" as const, label: "임시화면 관리", icon: FileSpreadsheet },
          { id: "menu" as const, label: "메뉴 구조", icon: FolderTree },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-3 text-sm flex items-center gap-2 border-b-2 transition-colors",
              activeTab === tab.id
                ? "text-[#161616] border-[#0f62fe] bg-[#e8e8e8]"
                : "text-[#525252] border-transparent hover:bg-[#f4f4f4]"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* 임시화면 관리 탭 */}
      {activeTab === "temp" && (
        <div className="flex gap-4 h-[calc(100vh-200px)]">
          {/* 좌측: 메뉴 위치 선택 */}
          <div className="w-64 bg-white border border-[#e0e0e0] flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#e0e0e0] bg-[#f4f4f4]">
              <div className="flex items-center gap-2">
                <FolderTree className="h-4 w-4 text-[#0f62fe]" />
                <span className="font-medium text-sm text-[#161616]">메뉴 위치</span>
              </div>
            </div>
            
            {/* 검색 */}
            <div className="px-3 py-2 border-b border-[#e0e0e0]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8d8d8d]" />
                <input
                  type="text"
                  placeholder="메뉴 검색..."
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  className="w-full h-8 pl-9 pr-3 text-sm bg-[#f4f4f4] border-0 border-b border-[#8d8d8d] focus:border-b-2 focus:border-[#0f62fe] outline-none"
                />
              </div>
            </div>

            {/* 메뉴 트리 */}
            <div className="flex-1 overflow-y-auto p-2">
              {menuTree ? (
                filteredMenu.map((item) => (
                  <MenuTreeItem
                    key={item.menuId}
                    item={item}
                    selectedId={selectedMenuId}
                    onSelect={(menu) => setSelectedMenuId(menu.menuId)}
                  />
                ))
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-5 w-5 animate-spin text-[#0f62fe]" />
                </div>
              )}
            </div>

            {/* 선택된 메뉴 */}
            {selectedMenuId && (
              <div className="px-3 py-2 border-t border-[#e0e0e0] bg-[#e8f1ff]">
                <p className="text-xs text-[#525252]">선택된 메뉴:</p>
                <p className="text-sm font-medium text-[#0f62fe] truncate">{selectedMenuId}</p>
              </div>
            )}
          </div>

          {/* 중앙: 임시화면 목록 */}
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

            {/* 메뉴 등록 버튼 */}
            {selectedScreen && selectedMenuId && (
              <div className="px-4 py-3 border-t border-[#e0e0e0] bg-[#f4f4f4]">
                <button
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="w-full h-8 px-3 bg-[#24a148] text-white text-sm flex items-center justify-center gap-2 hover:bg-[#198038]"
                >
                  {isPublishing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  선택한 메뉴에 등록
                </button>
              </div>
            )}
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
                  </div>
                </div>

                {/* 탭 */}
                <div className="flex border-b border-[#e0e0e0]">
                  {[
                    { id: "preview" as const, label: "AG Grid 미리보기", icon: Eye, disabled: !screenDetail.reactContent },
                    { id: "sql" as const, label: "SQL 쿼리", icon: Database, disabled: !screenDetail.sqlQuery },
                    { id: "react" as const, label: "React 코드", icon: FileCode, disabled: !screenDetail.reactContent },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      disabled={tab.disabled}
                      onClick={() => !tab.disabled && setPreviewActiveTab(tab.id)}
                      className={cn(
                        "px-4 py-2 text-sm flex items-center gap-2 border-b-2 transition-colors",
                        tab.disabled
                          ? "text-[#c6c6c6] cursor-not-allowed border-transparent"
                          : previewActiveTab === tab.id
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
                <div className="flex-1 overflow-hidden bg-[#f4f4f4]">
                  {/* AG Grid 실시간 미리보기 (Sandpack) */}
                  {previewActiveTab === "preview" && screenDetail.reactContent && (
                    <Suspense fallback={
                      <div className="h-full flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-[#0f62fe]" />
                        <span className="ml-2 text-[#525252]">Sandpack 로딩 중...</span>
                      </div>
                    }>
                      <SandpackPreview 
                        code={screenDetail.reactContent} 
                        className="h-full"
                        showEditor={false}
                      />
                    </Suspense>
                  )}
                  {previewActiveTab === "preview" && !screenDetail.reactContent && (
                    <div className="flex items-center justify-center h-full text-[#8d8d8d]">
                      <div className="text-center">
                        <Eye className="h-12 w-12 mx-auto mb-2 opacity-30" />
                        <p>React 코드가 없습니다</p>
                        <p className="text-xs mt-1">화면 생성기에서 미리보기를 생성해주세요</p>
                      </div>
                    </div>
                  )}
                  {previewActiveTab === "sql" && screenDetail.sqlQuery && (
                    <div className="bg-white p-4 border border-[#e0e0e0] h-full overflow-auto m-4">
                      <pre className="text-sm text-[#161616] whitespace-pre-wrap font-mono">
                        {screenDetail.sqlQuery}
                      </pre>
                    </div>
                  )}
                  {previewActiveTab === "react" && screenDetail.reactContent && (
                    <div className="bg-white p-4 border border-[#e0e0e0] h-full overflow-auto m-4">
                      <pre className="text-sm text-[#161616] whitespace-pre-wrap font-mono">
                        {screenDetail.reactContent}
                      </pre>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 메뉴 구조 탭 */}
      {activeTab === "menu" && (
        <div className="bg-white border border-[#e0e0e0] p-8 h-[calc(100vh-200px)] flex items-center justify-center">
          <div className="text-center text-[#525252]">
            <Settings className="h-16 w-16 mx-auto mb-4 text-[#8d8d8d]" />
            <h3 className="text-lg font-medium text-[#161616] mb-2">메뉴 구조 관리</h3>
            <p className="text-sm">메뉴 추가, 수정, 삭제 기능이 추가될 예정입니다</p>
          </div>
        </div>
      )}
    </div>
  );
}
