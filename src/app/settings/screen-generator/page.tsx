"use client";

import { useState, useCallback, lazy, Suspense } from "react";
import { api } from "~/trpc/react";
import {
  Upload,
  FolderTree,
  Eye,
  Terminal,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
  Copy,
  Download,
  Trash2,
  Monitor,
  Tablet,
  Smartphone,
  FileDown,
} from "lucide-react";
import { cn } from "~/lib/utils";

// Sandpack은 클라이언트에서만 로드
const SandpackPreview = lazy(() => import("~/components/preview/SandpackPreview"));

// ============================================================
// Types
// ============================================================
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
// Main Component
// ============================================================
export default function ScreenGeneratorPage() {
  // State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [activeTab, setActiveTab] = useState<"upload" | "template">("upload");
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [generatedQuery, setGeneratedQuery] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [previewHtml, setPreviewHtml] = useState<string>("");
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewTab, setPreviewTab] = useState<"grid" | "sql">("grid");

  // API
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
    addLog("info", "Step 2/4", "Claude API로 AG Grid 미리보기 생성 중...");
    
    try {
      // AG Grid React 컴포넌트 생성 요청
      const result = await previewMutation.mutateAsync({
        parsedData: validation.parsedData,
        previewType: "react",
      });
      
      console.log("[Frontend] API 응답:", result);
      console.log("[Frontend] componentCode 길이:", result.componentCode?.length);
      
      if (result.success) {
        // React 코드가 있으면 저장
        if (result.componentCode) {
          console.log("[Frontend] setGeneratedReact 호출");
          setGeneratedReact(result.componentCode);
          setProgress(50);
          addLog("success", "Step 2/4", `AG Grid 컴포넌트 생성 완료 (${result.componentCode.length}자)`);
        } else if (result.html) {
          // 구버전 호환: HTML도 지원
          setPreviewHtml(result.html);
          setProgress(50);
          addLog("success", "Step 2/4", "미리보기 생성 완료 (HTML)");
        } else if (result.preview) {
          // preview 필드도 확인
          console.log("[Frontend] preview 필드 사용");
          setGeneratedReact(result.preview);
          setProgress(50);
          addLog("success", "Step 2/4", `AG Grid 컴포넌트 생성 완료 (preview: ${result.preview.length}자)`);
        } else {
          addLog("error", "Step 2/4", "응답에 코드가 없습니다");
        }
      } else {
        addLog("error", "Step 2/4", result.error || "미리보기 생성 실패");
      }
    } catch (error) {
      console.error("[Frontend] 에러:", error);
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

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
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

      {/* Main Content - 2열 레이아웃: 좌측 Excel | 우측 미리보기 */}
      <div className="flex-1 flex gap-4 min-h-0 overflow-hidden">
        {/* 좌측: Excel 파일 처리 */}
        <div className="w-[400px] shrink-0 flex flex-col min-h-0">
          <div className="bg-white border border-[#e0e0e0] rounded-none flex flex-col flex-1 min-h-0">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#e0e0e0] bg-[#f4f4f4]">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4 text-[#24a148]" />
              <span className="font-medium text-sm text-[#161616]">Excel 파일</span>
            </div>
          </div>

          {/* 탭 - 업로드와 템플릿만 */}
          <div className="flex border-b border-[#e0e0e0]">
            {[
              { id: "upload", label: "업로드" },
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

            {activeTab === "template" && (
              <div className="h-full flex flex-col items-center justify-center gap-2">
                <FileDown className="h-8 w-8 text-[#8d8d8d]" />
                <p className="text-sm text-[#525252]">표준 템플릿 다운로드</p>
                <a
                  href="/templates/screen_template.xlsx"
                  download="screen_template.xlsx"
                  className="mt-2 px-4 py-2 bg-[#0f62fe] text-white text-sm hover:bg-[#0043ce] transition-colors inline-flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  템플릿 다운로드
                </a>
                <p className="text-xs text-[#8d8d8d] mt-2">메타정보 시트와 데이터 시트 포함</p>
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
        </div>

          {/* 우측: 미리보기 */}
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
              {/* 탭 전환: AG Grid / SQL */}
              <div className="flex bg-[#e0e0e0] rounded p-0.5 mr-2">
                {[
                  { id: "grid" as const, label: "AG Grid" },
                  { id: "sql" as const, label: "SQL" },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setPreviewTab(id as any)}
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
              {/* 반응형 전환 (Grid 탭에서만) */}
              {previewTab === "grid" && [
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
          {/* flex flex-col 추가: 자식에게 flex-1 높이를 정확히 전달하기 위함 */}
          <div className="flex-1 flex flex-col overflow-auto p-4 bg-[#f4f4f4] min-h-0">
            {/* SQL 탭 */}
            {previewTab === "sql" && (
              <div className="bg-[#161616] flex-1 rounded overflow-auto">
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

            {/* AG Grid 미리보기 탭 - Sandpack 실시간 실행 */}
            {previewTab === "grid" && (
              <div className="bg-white border border-[#e0e0e0] flex-1 flex flex-col overflow-auto min-h-[400px]">
                {/* flex-1 사용 (부모가 flex-col이므로) */}
                {generatedReact ? (
                  <Suspense fallback={
                    <div className="flex-1 flex items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-[#0f62fe]" />
                      <span className="ml-2 text-[#525252]">Sandpack 로딩 중...</span>
                    </div>
                  }>
                    <SandpackPreview 
                      code={generatedReact} 
                      className="flex-1"
                      showEditor={false}
                    />
                  </Suspense>
                ) : validation?.isValid ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-4 text-[#525252]">
                    <CheckCircle2 className="h-12 w-12 text-[#24a148]" />
                    <div className="text-center">
                      <p className="text-sm font-medium mb-1">검증 완료: {validation.columns}개 컬럼</p>
                      <p className="text-xs text-[#8d8d8d]">"미리보기 생성" 버튼을 클릭하면</p>
                      <p className="text-xs text-[#8d8d8d]">Claude AI가 AG Grid 화면을 생성합니다</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center gap-4 text-[#8d8d8d]">
                    <Eye className="h-16 w-16 opacity-30" />
                    <p className="text-sm">Excel 파일을 업로드하고 검증하면</p>
                    <p className="text-sm">AG Grid 미리보기가 표시됩니다</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>{/* Main Content 끝 */}

      {/* 하단: 로그 & 결과 */}
      <div className="bg-white border border-[#e0e0e0] rounded-none flex flex-col h-[180px] shrink-0">
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
              {[1, 2, 3].map((step) => (
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
                {currentStep === 3 && "저장 완료"}
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
              <a
                href="/settings/menu"
                className={cn(
                  "h-8 px-4 text-sm font-medium transition-colors flex items-center gap-2",
                  tempScreenId
                    ? "bg-[#0f62fe] text-white hover:bg-[#0043ce]"
                    : "bg-[#e0e0e0] text-[#8d8d8d] cursor-not-allowed pointer-events-none"
                )}
              >
                <FolderTree className="h-4 w-4" />
                메뉴 관리로 이동
              </a>
            </div>
          </div>
        </div>
    </div>
  );
}
