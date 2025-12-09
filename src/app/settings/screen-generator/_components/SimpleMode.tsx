"use client";

import { useState, useCallback } from "react";
import { api } from "~/trpc/react";
import { FolderTree, Eye, Copy, Loader2, CheckCircle2 } from "lucide-react";
import LogPanel from "./LogPanel";
import type { LogEntry } from "./types";

export default function SimpleMode() {
  // State
  const [crudScreenId, setCrudScreenId] = useState("");
  const [crudScreenName, setCrudScreenName] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewCode, setPreviewCode] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [progress, setProgress] = useState(0);

  // API
  const crudPreviewMutation = api.screenGenerator.generateCrudPreview.useMutation();

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

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!crudScreenId || !crudScreenName || !selectedTable) {
      alert("화면 ID, 화면명, 테이블명을 모두 입력해주세요.");
      return;
    }
    
    setIsGenerating(true);
    setProgress(20);
    addLog("info", "CRUD", `${crudScreenName} 화면 생성 시작...`);
    
    try {
      const result = await crudPreviewMutation.mutateAsync({
        screenId: crudScreenId,
        screenName: crudScreenName,
        tableName: selectedTable,
      });
      
      if (result.success && result.component) {
        setPreviewCode(result.component.code || "");
        setProgress(100);
        addLog("success", "CRUD", `화면 생성 완료!`);
        if (result.component.fileName) {
          addLog("info", "CRUD", `컴포넌트: ${result.component.fileName}`);
        }
        if (result.api?.routerPath) {
          addLog("info", "CRUD", `API: ${result.api.routerPath}`);
        }
      } else {
        addLog("error", "CRUD", result.error || "생성 실패");
      }
    } catch (error) {
      addLog("error", "CRUD", `오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
    } finally {
      setIsGenerating(false);
    }
  }, [crudScreenId, crudScreenName, selectedTable, crudPreviewMutation, addLog]);

  const handleCopyCode = useCallback(() => {
    if (previewCode) {
      navigator.clipboard.writeText(previewCode);
      addLog("info", "복사", "코드가 클립보드에 복사되었습니다.");
    }
  }, [previewCode, addLog]);

  return (
    <div className="flex-1 flex flex-col gap-4 min-h-0 overflow-hidden">
      <div className="flex-1 flex gap-4 min-h-0">
        {/* 좌측: 입력 폼 */}
        <div className="w-[400px] shrink-0 flex flex-col min-h-0">
          <div className="bg-white border border-[#e0e0e0] flex flex-col flex-1">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#e0e0e0] bg-[#f4f4f4]">
              <FolderTree className="h-4 w-4 text-[#0f62fe]" />
              <span className="font-medium text-sm text-[#161616]">기준정보 화면 설정</span>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {/* 화면 ID */}
                <div>
                  <label className="block text-sm font-medium text-[#161616] mb-1">
                    화면 ID <span className="text-[#da1e28]">*</span>
                  </label>
                  <input
                    type="text"
                    value={crudScreenId}
                    onChange={(e) => setCrudScreenId(e.target.value.toUpperCase())}
                    placeholder="예: SC001"
                    className="w-full h-10 px-3 border border-[#8d8d8d] text-sm focus:border-[#0f62fe] focus:outline-none"
                  />
                  <p className="text-xs text-[#525252] mt-1">화면 식별자 (예: SC001, SC002)</p>
                </div>
                
                {/* 화면명 */}
                <div>
                  <label className="block text-sm font-medium text-[#161616] mb-1">
                    화면명 <span className="text-[#da1e28]">*</span>
                  </label>
                  <input
                    type="text"
                    value={crudScreenName}
                    onChange={(e) => setCrudScreenName(e.target.value)}
                    placeholder="예: 거래처관리"
                    className="w-full h-10 px-3 border border-[#8d8d8d] text-sm focus:border-[#0f62fe] focus:outline-none"
                  />
                </div>
                
                {/* 테이블명 */}
                <div>
                  <label className="block text-sm font-medium text-[#161616] mb-1">
                    테이블명 <span className="text-[#da1e28]">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value.toLowerCase())}
                    placeholder="예: tb_customer"
                    className="w-full h-10 px-3 border border-[#8d8d8d] text-sm focus:border-[#0f62fe] focus:outline-none"
                  />
                  <p className="text-xs text-[#525252] mt-1">DB 테이블명 (예: tb_customer, tb_item)</p>
                </div>
                
                {/* 안내 박스 */}
                <div className="p-3 bg-[#e8f1ff] border border-[#0f62fe]/20 rounded">
                  <p className="text-xs text-[#0f62fe]">
                    💡 테이블 컬럼은 자동으로 분석되어 그리드에 표시됩니다.<br/>
                    기본키 컬럼은 신규 행에서만 편집 가능합니다.
                  </p>
                </div>
                
                {/* 진행률 */}
                {progress > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-[#e0e0e0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0f62fe] transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-[#525252]">{progress}%</span>
                  </div>
                )}
                
                {/* 생성 버튼 */}
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !crudScreenId || !crudScreenName || !selectedTable}
                  className="w-full h-10 bg-[#0f62fe] text-white text-sm font-medium hover:bg-[#0353e9] transition-colors disabled:bg-[#c6c6c6] disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      생성 중...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      화면 생성
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* 우측: 코드 미리보기 */}
        <div className="flex-1 bg-white border border-[#e0e0e0] flex flex-col min-h-0">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#e0e0e0] bg-[#f4f4f4]">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-[#0f62fe]" />
              <span className="font-medium text-sm text-[#161616]">생성된 코드</span>
            </div>
            {previewCode && (
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 px-2 py-1 text-xs text-[#0f62fe] hover:bg-[#e8f1ff] rounded"
              >
                <Copy className="h-3 w-3" />
                복사
              </button>
            )}
          </div>
          <div className="flex-1 overflow-auto p-4 bg-[#161616]">
            {previewCode ? (
              <pre className="text-xs text-[#f4f4f4] font-mono whitespace-pre-wrap">
                {previewCode}
              </pre>
            ) : (
              <div className="h-full flex items-center justify-center text-[#525252] text-sm">
                화면을 생성하면 코드가 표시됩니다
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* 하단: 로그 */}
      <LogPanel logs={logs} onClear={clearLogs} />
    </div>
  );
}
