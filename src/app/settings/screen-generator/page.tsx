"use client";

import { useState, useCallback } from "react";
import { api } from "~/trpc/react";
import {
  Upload,
  FolderTree,
  Eye,
  Terminal,
  ChevronDown,
  ChevronRight,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
  Play,
  Copy,
  Download,
  Trash2,
  Plus,
  Search,
  Monitor,
  Tablet,
  Smartphone,
  Code,
  FolderPlus,
  RefreshCw,
  FileDown,
} from "lucide-react";
import { cn } from "~/lib/utils";

// ============================================================
// Types
// ============================================================
interface MenuNode {
  menuId: string;
  parentId: string | null;
  menuName: string;
  menuPath: string | null;
  menuIcon: string | null;
  sortOrder: number;
  children: MenuNode[];
}

interface LogEntry {
  id: string;
  timestamp: Date;
  level: "info" | "success" | "warning" | "error";
  step: string;
  message: string;
  details?: string;
}

interface ValidationResult {
  isValid: boolean;
  screenName?: string;
  screenNameEn?: string;
  tableName?: string;
  columns?: number;
  searchConditions?: number;
  filters?: number;
  formulas?: number;
  summaryRows?: string[];
  warnings?: string[];
  errors?: string[];
  parsedData?: any;
}

// ============================================================
// Menu Tree Component
// ============================================================
function MenuTreeItem({
  item,
  depth = 0,
  selectedId,
  onSelect,
  onAddHere,
}: {
  item: MenuNode;
  depth?: number;
  selectedId: string | null;
  onSelect: (item: MenuNode) => void;
  onAddHere: (parentId: string) => void;
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
        <FolderTree className="h-4 w-4 shrink-0 opacity-60" />
        <span className="truncate flex-1">{item.menuName}</span>
        {isSelected && !item.menuPath && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddHere(item.menuId);
            }}
            className="p-0.5 hover:bg-white/20 rounded"
            title="여기에 추가"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      {hasChildren && isOpen && (
        <div>
          {item.children.map((child) => (
            <MenuTreeItem
              key={child.menuId}
              item={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              onAddHere={onAddHere}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Main Component
// ============================================================
export default function ScreenGeneratorPage() {
  // State
  const [selectedMenu, setSelectedMenu] = useState<MenuNode | null>(null);
  const [menuSearch, setMenuSearch] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [activeTab, setActiveTab] = useState<"upload" | "reverse" | "template">("upload");
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [showCode, setShowCode] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [generatedQuery, setGeneratedQuery] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [previewHtml, setPreviewHtml] = useState<string>("");
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewTab, setPreviewTab] = useState<"html" | "sql" | "react">("html");

  // API
  const { data: menuTree, isLoading: isMenuLoading } = api.menu.getMenuTree.useQuery();
  const validateMutation = api.screenGenerator.validateTemplate.useMutation();
  const previewMutation = api.screenGenerator.generatePreview.useMutation();
  const queryMutation = api.screenGenerator.generateQuery.useMutation();
  const saveTempMutation = api.screenGenerator.saveTempScreen.useMutation();
  const reactMutation = api.screenGenerator.generateReactComponent.useMutation();

  // State for React component
  const [generatedReact, setGeneratedReact] = useState<string | null>(null);
  const [isGeneratingReact, setIsGeneratingReact] = useState(false);
  const [tempScreenId, setTempScreenId] = useState<string | null>(null);

  // Handlers
  const addLog = useCallback((level: LogEntry["level"], step: string, message: string, details?: string) => {
    const newLog: LogEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      level,
      step,
      message,
      details,
    };
    setLogs((prev) => [...prev, newLog]);
  }, []);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setValidation(null);
      addLog("info", "업로드", `파일 업로드: ${file.name}`);
    }
  }, [addLog]);

  const handleFileDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.name.endsWith(".xlsx") || file.name.endsWith(".xls"))) {
      setUploadedFile(file);
      setValidation(null);
      addLog("info", "업로드", `파일 드롭: ${file.name}`);
    }
  }, [addLog]);

  const handleValidate = useCallback(async () => {
    if (!uploadedFile) return;
    
    setIsValidating(true);
    setCurrentStep(1);
    setProgress(10);
    addLog("info", "검증", "Excel 파일 검증 시작...");
    
    try {
      // 파일을 Base64로 변환
      const buffer = await uploadedFile.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      
      // API 호출
      const result = await validateMutation.mutateAsync({
        fileBase64: base64,
        fileName: uploadedFile.name,
      });
      
      const validationResult: ValidationResult = {
        isValid: result.isValid,
        screenName: result.screenName,
        screenNameEn: result.screenNameEn,
        tableName: result.tableName,
        columns: result.columns,
        searchConditions: result.searchConditions,
        summaryRows: result.summaryRows,
        warnings: result.warnings,
        errors: result.errors,
        parsedData: result.parsedData,
      };
      
      setValidation(validationResult);
      setProgress(20);
      
      if (result.isValid) {
        addLog("success", "검증", `검증 완료: ${result.columns}개 컬럼, ${result.searchConditions}개 조회조건`);
        if (result.summaryRows?.length) {
          addLog("info", "검증", `합계 행: ${result.summaryRows.join(", ")}`);
        }
      } else {
        addLog("error", "검증", "검증 실패");
        result.errors?.forEach((e) => addLog("error", "검증", e));
      }
      
      result.warnings?.forEach((w) => addLog("warning", "검증", w));
      
    } catch (error) {
      addLog("error", "검증", `오류 발생: ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
      setValidation({
        isValid: false,
        errors: [error instanceof Error ? error.message : "알 수 없는 오류"],
      });
    } finally {
      setIsValidating(false);
    }
  }, [uploadedFile, addLog, validateMutation]);

  const handleGeneratePreview = useCallback(async () => {
    if (!validation?.parsedData) return;
    
    setCurrentStep(2);
    setProgress(30);
    setIsGeneratingPreview(true);
    addLog("info", "Step 2/4", "Claude API로 미리보기 생성 중...");
    
    try {
      const result = await previewMutation.mutateAsync({
        parsedData: validation.parsedData,
        previewType: "html",
      });
      
      if (result.success && result.html) {
        setPreviewHtml(result.html);
        setProgress(50);
        addLog("success", "Step 2/4", "미리보기 생성 완료");
      } else {
        addLog("error", "Step 2/4", result.error || "미리보기 생성 실패");
      }
    } catch (error) {
      addLog("error", "Step 2/4", `오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
    } finally {
      setIsGeneratingPreview(false);
    }
  }, [validation, addLog, previewMutation]);

  const handleGenerateQuery = useCallback(async () => {
    if (!validation?.parsedData || !validation?.tableName) {
      addLog("error", "Step 3/4", "테이블명이 없습니다. 메타정보 시트를 확인하세요.");
      return;
    }
    
    setCurrentStep(3);
    setProgress(60);
    addLog("info", "Step 3/4", `SQL 쿼리 생성 중... (테이블: ${validation.tableName})`);
    
    try {
      const result = await queryMutation.mutateAsync({
        parsedData: validation.parsedData,
        tableName: validation.tableName,
      }) as any; // API 응답 타입
      
      if (result.success && result.sql) {
        setGeneratedQuery(result.sql);
        setProgress(70);
        
        // 통계 정보 표시
        if (result.stats) {
          addLog("success", "Step 3/4", 
            `쿼리 생성 완료: 전체 ${result.stats.totalColumns}개 컬럼 (매핑 ${result.stats.mappedCount}개, 미매핑 ${result.stats.unmappedCount}개)`
          );
        } else {
          addLog("success", "Step 3/4", `쿼리 생성 완료: ${result.selectMappings?.length || 0}개 컬럼 매핑됨`);
        }
        
        // 테이블 메타 정보
        if (result.tableMeta) {
          addLog("info", "테이블", `${result.tableMeta.name} (DB 컬럼 ${result.tableMeta.columnCount}개)`);
        }
        
        // 매핑 정보 로깅
        if (result.columnMappings && result.columnMappings.length > 0) {
          addLog("info", "조회조건", `${result.columnMappings.map((m: any) => `${m.label}→${m.dbColumn}`).join(", ")}`);
        }
        
        // 미매핑 헤더 경고
        if (result.unmatchedHeaders && result.unmatchedHeaders.length > 0) {
          addLog("warning", "미매핑", `${result.unmatchedHeaders.length}개 헤더가 빈값('')으로 처리됨`);
          // 5개까지만 표시
          const displayHeaders = result.unmatchedHeaders.slice(0, 5);
          const remaining = result.unmatchedHeaders.length - 5;
          addLog("warning", "미매핑 목록", 
            displayHeaders.join(", ") + (remaining > 0 ? ` 외 ${remaining}개` : '')
          );
        }
        
        // 제안 메시지
        if (result.suggestion) {
          addLog("info", "요약", result.suggestion);
        }
      } else {
        addLog("error", "Step 3/4", result.error || "쿼리 생성 실패");
        if (result.availableTables) {
          addLog("info", "힌트", `사용 가능한 테이블: ${result.availableTables.slice(0, 10).join(", ")}...`);
        }
      }
    } catch (error) {
      addLog("error", "Step 3/4", `오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
    }
  }, [validation, addLog, queryMutation]);

  const handleGenerateUI = useCallback(async () => {
    setCurrentStep(3);
    setProgress(70);
    addLog("info", "Step 3/4", "UI 컴포넌트 생성 중...");
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setProgress(90);
    addLog("success", "Step 3/4", "UI 컴포넌트 생성 완료");
  }, [addLog]);

  // 임시화면 저장
  const handleSaveTempScreen = useCallback(async () => {
    if (!validation?.screenName) {
      addLog("error", "저장", "화면명이 없습니다. 먼저 Excel 파일을 검증하세요.");
      return;
    }
    
    setIsSaving(true);
    addLog("info", "저장", "임시화면 저장 중...");
    
    try {
      const result = await saveTempMutation.mutateAsync({
        screenName: validation.screenName,
        screenNameEn: validation.screenNameEn,
        tableName: validation.tableName,
        htmlContent: previewHtml || undefined,
        sqlQuery: generatedQuery || undefined,
        reactContent: generatedReact || undefined,
        parsedData: validation.parsedData,
      });
      
      if (result.success) {
        setProgress(80);
        setTempScreenId(result.screenId || null);
        addLog("success", "저장", `임시화면 저장 완료: ${result.screenId}`);
        addLog("info", "저장", `경로: ${result.path}`);
      } else {
        addLog("error", "저장", result.error || "저장 실패");
      }
    } catch (error) {
      addLog("error", "저장", `오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
    } finally {
      setIsSaving(false);
    }
  }, [validation, previewHtml, generatedQuery, generatedReact, addLog, saveTempMutation]);

  // React 컴포넌트 생성
  const handleGenerateReact = useCallback(async () => {
    if (!tempScreenId) {
      addLog("error", "React", "먼저 임시화면을 저장해주세요.");
      return;
    }
    
    setIsGeneratingReact(true);
    addLog("info", "React", "AG Grid React 컴포넌트 생성 중...");
    
    try {
      const result = await reactMutation.mutateAsync({
        screenId: tempScreenId,
      });
      
      if (result.success && result.reactCode) {
        setGeneratedReact(result.reactCode);
        addLog("success", "React", "React 컴포넌트 생성 완료");
      } else {
        addLog("error", "React", result.error || "React 생성 실패");
      }
    } catch (error) {
      addLog("error", "React", `오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
    } finally {
      setIsGeneratingReact(false);
    }
  }, [tempScreenId, addLog, reactMutation]);

  const handleComplete = useCallback(async () => {
    setCurrentStep(4);
    addLog("info", "Step 4/4", "메뉴 등록 및 완료 처리...");
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setProgress(100);
    addLog("success", "완료", "화면 생성이 완료되었습니다!");
  }, [addLog]);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const copyQuery = useCallback(() => {
    if (generatedQuery) {
      navigator.clipboard.writeText(generatedQuery);
      addLog("info", "복사", "쿼리가 클립보드에 복사되었습니다.");
    }
  }, [generatedQuery, addLog]);

  // Filter menu by search
  const filterMenu = (items: MenuNode[], search: string): MenuNode[] => {
    if (!search) return items;
    return items
      .map((item) => ({
        ...item,
        children: filterMenu(item.children, search),
      }))
      .filter(
        (item) =>
          item.menuName.toLowerCase().includes(search.toLowerCase()) ||
          item.children.length > 0
      );
  };

  const filteredMenu = menuTree ? filterMenu(menuTree, menuSearch) : [];

  const getSelectedPath = () => {
    if (!selectedMenu) return "메뉴를 선택하세요";
    
    const findPath = (items: MenuNode[], targetId: string, path: string[] = []): string[] | null => {
      for (const item of items) {
        if (item.menuId === targetId) {
          return [...path, item.menuName];
        }
        if (item.children.length > 0) {
          const found = findPath(item.children, targetId, [...path, item.menuName]);
          if (found) return found;
        }
      }
      return null;
    };
    
    const path = menuTree ? findPath(menuTree, selectedMenu.menuId) : null;
    return path ? path.join(" > ") : selectedMenu.menuName;
  };

  return (
    <div className="min-h-[150vh] flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#161616]">화면 생성기</h1>
          <p className="text-sm text-[#525252]">Excel 파일을 업로드하여 화면을 자동으로 생성합니다</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#525252]">진행률:</span>
          <div className="w-48 h-2 bg-[#e0e0e0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0f62fe] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm font-medium text-[#161616]">{progress}%</span>
        </div>
      </div>

      {/* Main Content - 2열 레이아웃: 좌측 메뉴(좁게) | 우측 Excel+미리보기(넓게) */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* 좌측: 메뉴 위치 선택 (우측 영역과 높이 동일, 내부 스크롤) */}
        <div className="w-[280px] shrink-0 bg-white border border-[#e0e0e0] rounded-none flex flex-col self-stretch">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#e0e0e0] bg-[#f4f4f4]">
            <div className="flex items-center gap-2">
              <FolderTree className="h-4 w-4 text-[#0f62fe]" />
              <span className="font-medium text-sm text-[#161616]">메뉴 위치 선택</span>
            </div>
            <button
              className="p-1.5 hover:bg-[#e0e0e0] rounded transition-colors"
              title="새 폴더 추가"
            >
              <FolderPlus className="h-4 w-4 text-[#525252]" />
            </button>
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

          {/* 트리 */}
          <div className="flex-1 overflow-y-auto p-2">
            {isMenuLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-5 w-5 animate-spin text-[#0f62fe]" />
              </div>
            ) : (
              filteredMenu.map((item) => (
                <MenuTreeItem
                  key={item.menuId}
                  item={item}
                  selectedId={selectedMenu?.menuId ?? null}
                  onSelect={setSelectedMenu}
                  onAddHere={(parentId) => console.log("Add to:", parentId)}
                />
              ))
            )}
          </div>

          {/* 선택된 경로 */}
          <div className="px-3 py-2 border-t border-[#e0e0e0] bg-[#f4f4f4]">
            <p className="text-xs text-[#525252]">선택된 위치:</p>
            <p className="text-sm font-medium text-[#161616] truncate">{getSelectedPath()}</p>
          </div>
        </div>

        {/* 우측: Excel 파일 + 미리보기 (세로 배치) */}
        <div className="flex-1 flex flex-col gap-4 min-h-0">
          {/* Excel 파일 처리 */}
          <div className="bg-white border border-[#e0e0e0] rounded-none flex flex-col h-[360px] shrink-0">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#e0e0e0] bg-[#f4f4f4]">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4 text-[#24a148]" />
              <span className="font-medium text-sm text-[#161616]">Excel 파일</span>
            </div>
          </div>

          {/* 탭 */}
          <div className="flex border-b border-[#e0e0e0]">
            {[
              { id: "upload", label: "업로드" },
              { id: "reverse", label: "역생성" },
              { id: "template", label: "템플릿" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  "flex-1 py-2 text-sm font-medium transition-colors border-b-2",
                  activeTab === tab.id
                    ? "border-[#0f62fe] text-[#0f62fe] bg-[#e8f1ff]"
                    : "border-transparent text-[#525252] hover:bg-[#f4f4f4]"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 컨텐츠 */}
          <div className="flex-1 p-3 overflow-y-auto">
            {activeTab === "upload" && (
              <div className="h-full flex flex-col gap-3">
                {/* 드롭 영역 */}
                <div
                  onDrop={handleFileDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className={cn(
                    "flex-1 border-2 border-dashed rounded flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer",
                    uploadedFile
                      ? "border-[#24a148] bg-[#defbe6]"
                      : "border-[#8d8d8d] hover:border-[#0f62fe] hover:bg-[#e8f1ff]"
                  )}
                  onClick={() => document.getElementById("file-input")?.click()}
                >
                  <input
                    id="file-input"
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {uploadedFile ? (
                    <>
                      <CheckCircle2 className="h-8 w-8 text-[#24a148]" />
                      <span className="text-sm font-medium text-[#161616]">{uploadedFile.name}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadedFile(null);
                          setValidation(null);
                          setPreviewHtml("");
                        }}
                        className="text-xs text-[#da1e28] hover:underline"
                      >
                        파일 제거
                      </button>
                    </>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-[#8d8d8d]" />
                      <span className="text-sm text-[#525252]">파일을 드래그하거나 클릭</span>
                      <span className="text-xs text-[#8d8d8d]">.xlsx, .xls</span>
                    </>
                  )}
                </div>

                {/* 검증 결과 */}
                {validation && (
                  <div className={cn(
                    "p-3 rounded text-sm",
                    validation.isValid ? "bg-[#defbe6]" : "bg-[#fff1f1]"
                  )}>
                    <div className="flex items-center gap-2 mb-2">
                      {validation.isValid ? (
                        <CheckCircle2 className="h-4 w-4 text-[#24a148]" />
                      ) : (
                        <XCircle className="h-4 w-4 text-[#da1e28]" />
                      )}
                      <span className="font-medium">
                        {validation.isValid ? "검증 완료" : "검증 실패"}
                      </span>
                    </div>
                    {validation.isValid && (
                      <div className="grid grid-cols-2 gap-1 text-xs text-[#525252]">
                        <span>화면명: {validation.screenName}</span>
                        <span>컬럼: {validation.columns}개</span>
                        <span>테이블: {validation.tableName || "(미지정)"}</span>
                        <span>조회조건: {validation.searchConditions || 0}개</span>
                      </div>
                    )}
                    {validation.warnings?.map((w, i) => (
                      <div key={i} className="flex items-center gap-1 mt-1 text-xs text-[#f1c21b]">
                        <AlertTriangle className="h-3 w-3" />
                        {w}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "reverse" && (
              <div className="h-full flex flex-col items-center justify-center gap-2 text-center">
                <RefreshCw className="h-8 w-8 text-[#8d8d8d]" />
                <p className="text-sm text-[#525252]">테이블명을 입력하면</p>
                <p className="text-sm text-[#525252]">Excel 템플릿을 자동 생성합니다</p>
                <input
                  type="text"
                  placeholder="테이블명 입력 (예: TB_PROD_BALANCE)"
                  className="w-full h-8 px-3 mt-2 text-sm bg-[#f4f4f4] border-0 border-b border-[#8d8d8d] focus:border-b-2 focus:border-[#0f62fe] outline-none"
                />
              </div>
            )}

            {activeTab === "template" && (
              <div className="h-full flex flex-col items-center justify-center gap-2">
                <FileDown className="h-8 w-8 text-[#8d8d8d]" />
                <p className="text-sm text-[#525252]">표준 템플릿 다운로드</p>
                <button className="mt-2 px-4 py-2 bg-[#0f62fe] text-white text-sm hover:bg-[#0043ce] transition-colors">
                  템플릿 다운로드
                </button>
              </div>
            )}
          </div>

          {/* 버튼 */}
          <div className="flex gap-2 px-3 py-2 border-t border-[#e0e0e0] bg-[#f4f4f4]">
            <button
              onClick={handleValidate}
              disabled={!uploadedFile || isValidating}
              className={cn(
                "h-8 px-4 text-sm font-medium transition-colors flex items-center justify-center gap-2",
                uploadedFile && !isValidating
                  ? "bg-[#393939] text-white hover:bg-[#525252]"
                  : "bg-[#c6c6c6] text-[#8d8d8d] cursor-not-allowed"
              )}
            >
              {isValidating && <Loader2 className="h-4 w-4 animate-spin" />}
              검증
            </button>
            <button
              onClick={handleGeneratePreview}
              disabled={!validation?.isValid || isGeneratingPreview}
              className={cn(
                "h-8 px-4 text-sm font-medium transition-colors flex items-center justify-center gap-2",
                validation?.isValid && !isGeneratingPreview
                  ? "bg-[#0f62fe] text-white hover:bg-[#0043ce]"
                  : "bg-[#c6c6c6] text-[#8d8d8d] cursor-not-allowed"
              )}
            >
              {isGeneratingPreview && <Loader2 className="h-4 w-4 animate-spin" />}
              미리보기
            </button>
            <button
              onClick={handleGenerateQuery}
              disabled={!validation?.isValid || !validation?.tableName || queryMutation.isPending}
              className={cn(
                "h-8 px-4 text-sm font-medium transition-colors flex items-center justify-center gap-2",
                validation?.isValid && validation?.tableName && !queryMutation.isPending
                  ? "bg-[#24a148] text-white hover:bg-[#198038]"
                  : "bg-[#c6c6c6] text-[#8d8d8d] cursor-not-allowed"
              )}
              title={!validation?.tableName ? "메타정보에 테이블명이 필요합니다" : ""}
            >
              {queryMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              쿼리 생성
            </button>
          </div>
        </div>

          {/* 미리보기 */}
          <div className="flex-1 bg-white border border-[#e0e0e0] rounded-none flex flex-col min-h-0">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#e0e0e0] bg-[#f4f4f4]">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-[#8a3ffc]" />
              <span className="font-medium text-sm text-[#161616]">미리보기</span>
              {validation?.screenName && (
                <span className="text-xs text-[#525252]">- {validation.screenName}</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {/* 탭 전환: HTML / SQL / React */}
              <div className="flex bg-[#e0e0e0] rounded p-0.5 mr-2">
                {[
                  { id: "html" as const, label: "HTML" },
                  { id: "sql" as const, label: "SQL" },
                  { id: "react" as const, label: "React" },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setPreviewTab(id)}
                    className={cn(
                      "px-2 py-1 text-xs font-medium transition-colors rounded",
                      previewTab === id
                        ? "bg-white text-[#161616] shadow-sm"
                        : "text-[#525252] hover:text-[#161616]"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {/* 반응형 전환 (HTML 탭에서만) */}
              {previewTab === "html" && [
                { id: "desktop", icon: Monitor },
                { id: "tablet", icon: Tablet },
                { id: "mobile", icon: Smartphone },
              ].map(({ id, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setPreviewMode(id as typeof previewMode)}
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

          {/* 미리보기 내용 */}
          <div className="flex-1 overflow-auto p-4 bg-[#f4f4f4]">
            {/* SQL 탭 */}
            {previewTab === "sql" && (
              <div className="bg-[#161616] h-full rounded overflow-auto">
                {generatedQuery ? (
                  <pre className="p-4 text-sm text-[#f4f4f4] font-mono whitespace-pre-wrap">
                    {generatedQuery}
                  </pre>
                ) : (
                  <div className="h-full flex items-center justify-center text-[#8d8d8d]">
                    <p className="text-sm">SQL 쿼리가 생성되면 여기에 표시됩니다</p>
                  </div>
                )}
              </div>
            )}

            {/* React 탭 */}
            {previewTab === "react" && (
              <div className="bg-[#161616] h-full rounded overflow-auto">
                {generatedReact ? (
                  <pre className="p-4 text-sm text-[#f4f4f4] font-mono whitespace-pre-wrap">
                    {generatedReact}
                  </pre>
                ) : (
                  <div className="h-full flex items-center justify-center text-[#8d8d8d]">
                    <div className="text-center">
                      <Code className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">React 컴포넌트가 생성되면 여기에 표시됩니다</p>
                      <p className="text-xs mt-2">1. 임시 저장 → 2. React 생성 버튼 클릭</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* HTML 탭 */}
            {previewTab === "html" && (
              <div
                className={cn(
                  "bg-white border border-[#e0e0e0] mx-auto transition-all duration-300 h-full overflow-hidden",
                  previewMode === "desktop" && "w-full",
                  previewMode === "tablet" && "max-w-[768px]",
                  previewMode === "mobile" && "max-w-[375px]"
                )}
              >
                {previewHtml ? (
                  <iframe
                    srcDoc={`
                      <!DOCTYPE html>
                      <html>
                      <head>
                        <meta charset="utf-8">
                        <style>
                          * { margin: 0; padding: 0; box-sizing: border-box; }
                          body { font-family: 'IBM Plex Sans', sans-serif; font-size: 14px; }
                        </style>
                      </head>
                      <body>${previewHtml}</body>
                      </html>
                    `}
                    className="w-full h-full border-0"
                    title="미리보기"
                    sandbox="allow-same-origin"
                  />
                ) : validation?.isValid ? (
                  <div className="h-full flex flex-col items-center justify-center gap-4 text-[#525252]">
                    <CheckCircle2 className="h-12 w-12 text-[#24a148]" />
                    <div className="text-center">
                      <p className="text-sm font-medium mb-1">검증 완료: {validation.columns}개 컬럼</p>
                      <p className="text-xs text-[#8d8d8d]">"미리보기 생성" 버튼을 클릭하면</p>
                      <p className="text-xs text-[#8d8d8d]">Claude AI가 화면을 생성합니다</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center gap-4 text-[#8d8d8d]">
                    <Eye className="h-16 w-16 opacity-30" />
                    <p className="text-sm">Excel 파일을 업로드하고 검증하면</p>
                    <p className="text-sm">미리보기가 표시됩니다</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        </div>{/* 우측 영역 끝 */}
      </div>{/* Main Content 끝 */}

      {/* 하단: 로그 & 결과 */}
      <div className="bg-white border border-[#e0e0e0] rounded-none flex flex-col h-[200px] shrink-0">
          <div className="flex items-center justify-between px-4 py-2 border-b border-[#e0e0e0] bg-[#f4f4f4]">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-[#24a148]" />
              <span className="font-medium text-sm text-[#161616]">로그 & 결과</span>
              <span className="text-xs text-[#525252]">({logs.length}건)</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={copyQuery}
                disabled={!generatedQuery}
                className={cn(
                  "p-1.5 rounded transition-colors",
                  generatedQuery
                    ? "hover:bg-[#e0e0e0] text-[#525252]"
                    : "text-[#a8a8a8] cursor-not-allowed"
                )}
                title="쿼리 복사"
              >
                <Copy className="h-4 w-4" />
              </button>
              <button
                className="p-1.5 hover:bg-[#e0e0e0] rounded transition-colors text-[#525252]"
                title="내보내기"
              >
                <Download className="h-4 w-4" />
              </button>
              <button
                onClick={clearLogs}
                className="p-1.5 hover:bg-[#e0e0e0] rounded transition-colors text-[#525252]"
                title="지우기"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* 로그 내용 */}
          <div className="flex-1 overflow-y-auto p-3 font-mono text-xs bg-[#f4f4f4]">
            {logs.length === 0 ? (
              <div className="text-[#8d8d8d]">작업을 시작하면 로그가 표시됩니다...</div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="flex gap-2 mb-1">
                  <span className="text-[#6f6f6f] shrink-0">
                    {log.timestamp.toLocaleTimeString("ko-KR", { hour12: false })}
                  </span>
                  <span
                    className={cn(
                      "shrink-0",
                      log.level === "success" && "text-[#24a148]",
                      log.level === "warning" && "text-[#f1c21b]",
                      log.level === "error" && "text-[#da1e28]",
                      log.level === "info" && "text-[#0f62fe]"
                    )}
                  >
                    {log.level === "success" && "✅"}
                    {log.level === "warning" && "⚠️"}
                    {log.level === "error" && "❌"}
                    {log.level === "info" && "ℹ️"}
                  </span>
                  <span className="text-[#525252] shrink-0">[{log.step}]</span>
                  <span className="text-[#161616]">{log.message}</span>
                </div>
              ))
            )}
            {generatedQuery && (
              <div className="mt-2 p-2 bg-white rounded border border-[#e0e0e0]">
                <pre className="text-[#0f62fe] whitespace-pre-wrap">{generatedQuery}</pre>
              </div>
            )}
          </div>

          {/* 하단 버튼 */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-[#e0e0e0]">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                    currentStep >= step
                      ? "bg-[#0f62fe] text-white"
                      : "bg-[#e0e0e0] text-[#8d8d8d]"
                  )}
                >
                  {step}
                </div>
              ))}
              <span className="text-xs text-[#525252] ml-2">
                {currentStep === 0 && "대기 중"}
                {currentStep === 1 && "검증 완료"}
                {currentStep === 2 && "쿼리 생성"}
                {currentStep === 3 && "UI 생성"}
                {currentStep === 4 && "완료"}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSaveTempScreen}
                disabled={!validation?.isValid || isSaving}
                className={cn(
                  "h-8 px-4 text-sm font-medium transition-colors flex items-center gap-2",
                  validation?.isValid && !isSaving
                    ? "bg-[#6929c4] text-white hover:bg-[#491d8b]"
                    : "bg-[#e0e0e0] text-[#8d8d8d] cursor-not-allowed"
                )}
                title="임시화면으로 저장 (나중에 메뉴 등록)"
              >
                {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                <FileDown className="h-4 w-4" />
                임시 저장
              </button>
              <button
                onClick={handleGenerateReact}
                disabled={!tempScreenId || isGeneratingReact}
                className={cn(
                  "h-8 px-4 text-sm font-medium transition-colors flex items-center gap-2",
                  tempScreenId && !isGeneratingReact
                    ? "bg-[#393939] text-white hover:bg-[#525252]"
                    : "bg-[#e0e0e0] text-[#8d8d8d] cursor-not-allowed"
                )}
                title="AG Grid React 컴포넌트 생성"
              >
                {isGeneratingReact && <Loader2 className="h-4 w-4 animate-spin" />}
                <Code className="h-4 w-4" />
                React 생성
              </button>
              <button
                onClick={handleComplete}
                disabled={currentStep < 3}
                className={cn(
                  "h-8 px-4 text-sm font-medium transition-colors flex items-center gap-2",
                  currentStep >= 3
                    ? "bg-[#0f62fe] text-white hover:bg-[#0043ce]"
                    : "bg-[#e0e0e0] text-[#8d8d8d] cursor-not-allowed"
                )}
              >
                <Play className="h-4 w-4" />
                화면 생성 완료
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}
