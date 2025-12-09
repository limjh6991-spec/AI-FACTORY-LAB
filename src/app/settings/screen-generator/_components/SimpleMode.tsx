"use client";

import { useState, useCallback, lazy, Suspense } from "react";
import { api } from "~/trpc/react";
import {
  Eye,
  Loader2,
  Monitor,
  Tablet,
  Smartphone,
  FileDown,
  FolderTree,
  Database,
  Search,
  Plus,
  X,
} from "lucide-react";
import { cn } from "~/lib/utils";

// Sandpack 지연 로드
const SandpackPreview = lazy(() => import("~/components/preview/SandpackPreview"));

// 검색 조건 타입
const SEARCH_TYPES = [
  { id: "yearMonth", label: "년월", component: "YearMonthPicker" },
  { id: "date", label: "일자", component: "DatePicker" },
  { id: "dateRange", label: "기간", component: "DateRangePicker" },
  { id: "text", label: "텍스트", component: "TextInput" },
  { id: "select", label: "선택", component: "Select" },
  { id: "model", label: "모델", component: "ModelSelect" },
  { id: "dept", label: "부서", component: "DeptSelect" },
  { id: "customer", label: "거래처", component: "CustomerSelect" },
];

interface SearchCondition {
  id: string;
  type: string;
  label: string;
}

export default function SimpleMode() {
  // 입력 State
  const [screenName, setScreenName] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [searchConditions, setSearchConditions] = useState<SearchCondition[]>([]);

  // 출력 State
  const [generatedReact, setGeneratedReact] = useState<string | null>(null);
  const [generatedQuery, setGeneratedQuery] = useState("");
  const [previewTab, setPreviewTab] = useState<"grid" | "sql">("grid");
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [tempScreenId, setTempScreenId] = useState<string | null>(null);

  // 상태 플래그
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // API
  const previewMutation = api.screenGenerator.generateCrudPreview.useMutation();
  const saveTempMutation = api.screenGenerator.saveTempScreen.useMutation();

  // 검색 조건 추가
  const addSearchCondition = useCallback((type: string) => {
    const searchType = SEARCH_TYPES.find(t => t.id === type);
    if (!searchType) return;
    
    setSearchConditions(prev => [
      ...prev,
      {
        id: `${type}_${Date.now()}`,
        type,
        label: searchType.label,
      }
    ]);
  }, []);

  // 검색 조건 삭제
  const removeSearchCondition = useCallback((id: string) => {
    setSearchConditions(prev => prev.filter(c => c.id !== id));
  }, []);

  // 미리보기 생성
  const handleGenerate = useCallback(async () => {
    if (!screenName.trim() || !selectedTable.trim()) {
      return;
    }

    setIsGenerating(true);

    try {
      // screenId는 테이블명 기반으로 자동 생성
      const autoScreenId = `SC_${selectedTable.trim().toUpperCase()}`;
      
      const result = await previewMutation.mutateAsync({
        screenId: autoScreenId,
        screenName: screenName.trim(),
        tableName: selectedTable.trim(),
      });

      if (result.success && result.component) {
        setGeneratedReact(result.component.code || null);
        if (result.api?.routerCode) {
          setGeneratedQuery(result.api.routerCode);
        }
      }
    } catch (error) {
      console.error("생성 오류:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [screenName, selectedTable, previewMutation]);

  // 임시 저장
  const handleSave = useCallback(async () => {
    if (!screenName.trim()) return;

    setIsSaving(true);

    try {
      const result = await saveTempMutation.mutateAsync({
        screenName: screenName.trim(),
        screenNameEn: selectedTable.trim(),
        tableName: selectedTable.trim(),
        reactContent: generatedReact || undefined,
        sqlQuery: generatedQuery || undefined,
      });

      if (result.success) {
        setTempScreenId(result.screenId || null);
      }
    } catch (error) {
      console.error("저장 오류:", error);
    } finally {
      setIsSaving(false);
    }
  }, [screenName, selectedTable, generatedReact, generatedQuery, saveTempMutation]);

  const isFormValid = screenName.trim() && selectedTable.trim();

  return (
    <div className="flex-1 flex gap-4 min-h-0 overflow-hidden">
      {/* 좌측: 입력 폼 */}
      <div className="w-[320px] shrink-0 flex flex-col min-h-0">
        <div className="bg-white border border-[#e0e0e0] flex flex-col flex-1">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#e0e0e0] bg-[#f4f4f4]">
            <Database className="h-4 w-4 text-[#0f62fe]" />
            <span className="font-medium text-sm text-[#161616]">CRUD 화면 설정</span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {/* 화면명 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#161616] mb-1">
                화면명 <span className="text-[#da1e28]">*</span>
              </label>
              <input
                type="text"
                value={screenName}
                onChange={(e) => setScreenName(e.target.value)}
                placeholder="예: 부서 관리"
                className="w-full h-10 px-3 border border-[#8d8d8d] focus:outline-none focus:border-[#0f62fe] focus:ring-1 focus:ring-[#0f62fe]"
              />
            </div>

            {/* 테이블명 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#161616] mb-1">
                테이블명 <span className="text-[#da1e28]">*</span>
              </label>
              <input
                type="text"
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                placeholder="예: mst_dept"
                className="w-full h-10 px-3 border border-[#8d8d8d] focus:outline-none focus:border-[#0f62fe] focus:ring-1 focus:ring-[#0f62fe]"
              />
            </div>

            {/* 검색 조건 */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Search className="h-4 w-4 text-[#525252]" />
                <label className="text-sm font-medium text-[#161616]">검색 조건</label>
                <span className="text-xs text-[#8d8d8d]">(선택 - 미지정시 테이블 키값)</span>
              </div>
              
              {/* 추가된 검색 조건 */}
              {searchConditions.length > 0 && (
                <div className="space-y-1 mb-2">
                  {searchConditions.map((condition) => (
                    <div key={condition.id} className="flex items-center justify-between bg-[#e8f1ff] px-2 py-1 rounded text-sm">
                      <span className="text-[#0f62fe]">{condition.label}</span>
                      <button
                        onClick={() => removeSearchCondition(condition.id)}
                        className="text-[#da1e28] hover:bg-[#fff1f1] p-0.5 rounded"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* 검색 조건 타입 선택 */}
              <div className="flex flex-wrap gap-1">
                {SEARCH_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => addSearchCondition(type.id)}
                    className="px-2 py-1 text-xs bg-[#f4f4f4] hover:bg-[#e0e0e0] text-[#525252] rounded flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" />
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex flex-col gap-2 px-3 py-3 border-t border-[#e0e0e0] bg-[#f4f4f4]">
            <button
              onClick={handleGenerate}
              disabled={!isFormValid || isGenerating}
              className={cn(
                "h-10 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors",
                isFormValid && !isGenerating
                  ? "bg-[#0f62fe] text-white hover:bg-[#0043ce]"
                  : "bg-[#c6c6c6] text-[#8d8d8d] cursor-not-allowed"
              )}
            >
              {isGenerating && <Loader2 className="h-4 w-4 animate-spin" />}
              미리보기 생성
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={!generatedReact || isSaving}
                className={cn(
                  "flex-1 h-8 px-3 text-sm font-medium flex items-center justify-center gap-1 transition-colors",
                  generatedReact
                    ? "bg-[#6929c4] text-white hover:bg-[#491d8b]"
                    : "bg-[#e0e0e0] text-[#8d8d8d] cursor-not-allowed"
                )}
              >
                {isSaving && <Loader2 className="h-3 w-3 animate-spin" />}
                <FileDown className="h-3 w-3" />
                저장
              </button>
              <a
                href="/settings/menu"
                className={cn(
                  "flex-1 h-8 px-3 text-sm font-medium flex items-center justify-center gap-1 transition-colors",
                  tempScreenId
                    ? "bg-[#0f62fe] text-white hover:bg-[#0043ce]"
                    : "bg-[#e0e0e0] text-[#8d8d8d] cursor-not-allowed pointer-events-none"
                )}
              >
                <FolderTree className="h-3 w-3" />
                메뉴
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 우측: 미리보기 */}
      <div className="flex-1 bg-white border border-[#e0e0e0] flex flex-col min-h-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#e0e0e0] bg-[#f4f4f4]">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-[#8a3ffc]" />
            <span className="font-medium text-sm text-[#161616]">미리보기</span>
          </div>
          <div className="flex items-center gap-1">
            {/* 탭 전환 */}
            <div className="flex bg-[#e0e0e0] rounded p-0.5 mr-2">
              {[
                { id: "grid" as const, label: "AG Grid" },
                { id: "sql" as const, label: "API" },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setPreviewTab(id)}
                  className={cn(
                    "px-2 py-1 text-xs font-medium rounded transition-colors",
                    previewTab === id
                      ? "bg-white text-[#161616] shadow-sm"
                      : "text-[#525252] hover:text-[#161616]"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            {/* 반응형 */}
            {previewTab === "grid" && [
              { id: "desktop" as const, icon: Monitor },
              { id: "tablet" as const, icon: Tablet },
              { id: "mobile" as const, icon: Smartphone },
            ].map(({ id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setPreviewMode(id)}
                className={cn(
                  "p-1.5 rounded transition-colors",
                  previewMode === id
                    ? "bg-[#0f62fe] text-white"
                    : "hover:bg-[#e0e0e0] text-[#525252]"
                )}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 bg-[#f4f4f4]">
          {previewTab === "sql" && (
            <div className="bg-[#161616] h-full rounded overflow-auto">
              {generatedQuery ? (
                <pre className="p-4 text-sm text-[#f4f4f4] font-mono whitespace-pre-wrap">
                  {generatedQuery}
                </pre>
              ) : (
                <div className="h-full flex items-center justify-center text-[#8d8d8d] text-sm">
                  API 코드가 생성되면 여기에 표시됩니다
                </div>
              )}
            </div>
          )}

          {previewTab === "grid" && (
            <div className="bg-white border border-[#e0e0e0] h-full flex flex-col overflow-auto">
              {generatedReact ? (
                <Suspense fallback={
                  <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-[#0f62fe]" />
                  </div>
                }>
                  <SandpackPreview code={generatedReact} className="flex-1" showEditor={false} />
                </Suspense>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-[#8d8d8d]">
                  <Eye className="h-16 w-16 opacity-30" />
                  <p className="text-sm mt-4">화면 정보를 입력하고</p>
                  <p className="text-sm">[미리보기 생성]을 클릭하세요</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
