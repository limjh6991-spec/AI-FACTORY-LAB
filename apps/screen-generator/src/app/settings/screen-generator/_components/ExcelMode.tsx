"use client";

import { useState, useCallback, lazy, Suspense } from "react";
import { api } from "~/trpc/react";
import {
  Upload,
  FolderTree,
  Eye,
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
import LogPanel from "./LogPanel";
import type { LogEntry, ValidationResult } from "./types";

// Sandpack은 클라이언트에서만 로드
const SandpackPreview = lazy(() => import("~/components/preview/SandpackPreview"));

export default function ExcelMode() {
  // State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [activeTab, setActiveTab] = useState<"upload" | "template">("upload");
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [generatedQuery, setGeneratedQuery] = useState("");
  const [previewHtml, setPreviewHtml] = useState("");
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewTab, setPreviewTab] = useState<"grid" | "sql">("grid");
  const [generatedReact, setGeneratedReact] = useState<string | null>(null);
  const [tempScreenId, setTempScreenId] = useState<string | null>(null);

  // API
  const validateMutation = api.screenGenerator.validateTemplate.useMutation();
  const previewMutation = api.screenGenerator.generatePreview.useMutation();
  const queryMutation = api.screenGenerator.generateQuery.useMutation();
  const saveTempMutation = api.screenGenerator.saveTempScreen.useMutation();

  // Handlers
  const addLog = useCallback((level: LogEntry["level"], step: string, message: string) => {
    const newLog: LogEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      level,
      step,
      message,
    };
    setLogs((prev) => [...prev, newLog]);
  }, []);

  const clearLogs = useCallback(() => setLogs([]), []);

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
    addLog("info", "검증", "Excel 파일 검증 시작...");
    
    try {
      const buffer = await uploadedFile.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      
      const result = await validateMutation.mutateAsync({
        fileBase64: base64,
        fileName: uploadedFile.name,
      });
      
      setValidation({
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
      });
      
      if (result.isValid) {
        addLog("success", "검증", `검증 완료: ${result.columns}개 컬럼`);
      } else {
        addLog("error", "검증", "검증 실패");
      }
    } catch (error) {
      addLog("error", "검증", `오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
    } finally {
      setIsValidating(false);
    }
  }, [uploadedFile, addLog, validateMutation]);

  const handleGeneratePreview = useCallback(async () => {
    if (!validation?.parsedData) return;
    
    setIsGeneratingPreview(true);
    addLog("info", "미리보기", "AG Grid 컴포넌트 생성 중...");
    
    try {
      const result = await previewMutation.mutateAsync({
        parsedData: validation.parsedData,
        previewType: "react",
      });
      
      if (result.success && (result.componentCode || result.preview)) {
        setGeneratedReact(result.componentCode || result.preview || "");
        addLog("success", "미리보기", "컴포넌트 생성 완료");
      } else {
        addLog("error", "미리보기", result.error || "생성 실패");
      }
    } catch (error) {
      addLog("error", "미리보기", `오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
    } finally {
      setIsGeneratingPreview(false);
    }
  }, [validation, addLog, previewMutation]);

  const handleGenerateQuery = useCallback(async () => {
    if (!validation?.parsedData || !validation?.tableName) {
      addLog("error", "쿼리", "테이블명이 없습니다.");
      return;
    }
    
    addLog("info", "쿼리", `SQL 쿼리 생성 중... (테이블: ${validation.tableName})`);
    
    try {
      const result = await queryMutation.mutateAsync({
        parsedData: validation.parsedData,
        tableName: validation.tableName,
      }) as any;
      
      if (result.success && result.sql) {
        setGeneratedQuery(result.sql);
        addLog("success", "쿼리", "쿼리 생성 완료");
      } else {
        addLog("error", "쿼리", result.error || "쿼리 생성 실패");
      }
    } catch (error) {
      addLog("error", "쿼리", `오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
    }
  }, [validation, addLog, queryMutation]);

  const handleSave = useCallback(async () => {
    if (!validation?.screenName) return;
    
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
        setTempScreenId(result.screenId || null);
        addLog("success", "저장", `저장 완료: ${result.screenId}`);
      } else {
        addLog("error", "저장", result.error || "저장 실패");
      }
    } catch (error) {
      addLog("error", "저장", `오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
    } finally {
      setIsSaving(false);
    }
  }, [validation, previewHtml, generatedQuery, generatedReact, addLog, saveTempMutation]);

  const copyQuery = useCallback(() => {
    if (generatedQuery) {
      navigator.clipboard.writeText(generatedQuery);
      addLog("info", "복사", "쿼리가 클립보드에 복사되었습니다.");
    }
  }, [generatedQuery, addLog]);

  return (
    <div className="flex-1 flex flex-col gap-4 min-h-0 overflow-hidden">
      <div className="flex-1 flex gap-4 min-h-0">
        {/* 좌측: Excel 파일 업로드 */}
        <div className="w-[400px] shrink-0 flex flex-col min-h-0">
          <div className="bg-white border border-[#e0e0e0] flex flex-col flex-1">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#e0e0e0] bg-[#f4f4f4]">
              <FileSpreadsheet className="h-4 w-4 text-[#24a148]" />
              <span className="font-medium text-sm text-[#161616]">Excel 파일</span>
            </div>

            {/* 탭 */}
            <div className="flex border-b border-[#e0e0e0]">
              {[
                { id: "upload" as const, label: "업로드" },
                { id: "template" as const, label: "템플릿" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex-1 py-2 text-sm font-medium border-b-2 transition-colors",
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
                      "flex-1 border-2 border-dashed rounded flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors",
                      uploadedFile
                        ? "border-[#24a148] bg-[#defbe6]"
                        : "border-[#8d8d8d] hover:border-[#0f62fe] hover:bg-[#e8f1ff]"
                    )}
                    onClick={() => document.getElementById("excel-file-input")?.click()}
                  >
                    <input
                      id="excel-file-input"
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    {uploadedFile ? (
                      <>
                        <CheckCircle2 className="h-8 w-8 text-[#24a148]" />
                        <span className="text-sm font-medium">{uploadedFile.name}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setUploadedFile(null);
                            setValidation(null);
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
                        </div>
                      )}
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
                    download
                    className="mt-2 px-4 py-2 bg-[#0f62fe] text-white text-sm hover:bg-[#0043ce] inline-flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    템플릿 다운로드
                  </a>
                </div>
              )}
            </div>

            {/* 버튼 */}
            <div className="flex gap-2 px-3 py-2 border-t border-[#e0e0e0] bg-[#f4f4f4]">
              <button
                onClick={handleValidate}
                disabled={!uploadedFile || isValidating}
                className={cn(
                  "h-8 px-4 text-sm font-medium flex items-center gap-2 transition-colors",
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
                  "h-8 px-4 text-sm font-medium flex items-center gap-2 transition-colors",
                  validation?.isValid
                    ? "bg-[#0f62fe] text-white hover:bg-[#0043ce]"
                    : "bg-[#c6c6c6] text-[#8d8d8d] cursor-not-allowed"
                )}
              >
                {isGeneratingPreview && <Loader2 className="h-4 w-4 animate-spin" />}
                미리보기
              </button>
              <button
                onClick={handleGenerateQuery}
                disabled={!validation?.isValid || !validation?.tableName}
                className={cn(
                  "h-8 px-4 text-sm font-medium flex items-center gap-2 transition-colors",
                  validation?.isValid && validation?.tableName
                    ? "bg-[#24a148] text-white hover:bg-[#198038]"
                    : "bg-[#c6c6c6] text-[#8d8d8d] cursor-not-allowed"
                )}
              >
                쿼리
              </button>
            </div>
            {/* 저장 버튼 */}
            <div className="flex gap-2 px-3 py-2 border-t border-[#e0e0e0]">
              <button
                onClick={handleSave}
                disabled={!validation?.isValid || isSaving}
                className={cn(
                  "flex-1 h-8 px-3 text-sm font-medium flex items-center justify-center gap-1 transition-colors",
                  validation?.isValid
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
                  { id: "sql" as const, label: "SQL" },
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
                    SQL 쿼리가 생성되면 여기에 표시됩니다
                  </div>
                )}
              </div>
            )}

            {previewTab === "grid" && (
              <div className="bg-white border border-[#e0e0e0] h-full flex flex-col overflow-auto min-h-[400px]">
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
                    <p className="text-sm mt-4">Excel 파일을 업로드하고 검증하면</p>
                    <p className="text-sm">AG Grid 미리보기가 표시됩니다</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
