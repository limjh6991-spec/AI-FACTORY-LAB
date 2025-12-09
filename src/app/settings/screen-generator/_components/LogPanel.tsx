"use client";

import { Terminal, Copy, Download, Trash2 } from "lucide-react";
import { cn } from "~/lib/utils";
import type { LogEntry } from "./types";

interface LogPanelProps {
  logs: LogEntry[];
  onClear: () => void;
  generatedQuery?: string;
  onCopyQuery?: () => void;
}

export default function LogPanel({ logs, onClear, generatedQuery, onCopyQuery }: LogPanelProps) {
  return (
    <div className="bg-white border border-[#e0e0e0] rounded-none flex flex-col h-48 shrink-0">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#e0e0e0] bg-[#f4f4f4]">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-[#525252]" />
          <span className="font-medium text-sm text-[#161616]">로그</span>
          <span className="text-xs text-[#525252]">({logs.length}건)</span>
        </div>
        <div className="flex items-center gap-1">
          {generatedQuery && onCopyQuery && (
            <button
              onClick={onCopyQuery}
              className="p-1.5 rounded transition-colors hover:bg-[#e0e0e0] text-[#525252]"
              title="쿼리 복사"
            >
              <Copy className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClear}
            className="p-1.5 rounded transition-colors hover:bg-[#e0e0e0] text-[#525252]"
            title="로그 삭제"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2 font-mono text-xs bg-[#f4f4f4]">
        {logs.length === 0 ? (
          <span className="text-[#8d8d8d]">로그가 여기에 표시됩니다...</span>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex gap-2">
              <span className="text-[#8d8d8d]">{log.timestamp.toLocaleTimeString()}</span>
              <span className={cn(
                log.level === "success" && "text-[#24a148]",
                log.level === "error" && "text-[#da1e28]",
                log.level === "warning" && "text-[#f1c21b]",
                log.level === "info" && "text-[#0f62fe]"
              )}>
                [{log.step}]
              </span>
              <span className="text-[#161616]">{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
