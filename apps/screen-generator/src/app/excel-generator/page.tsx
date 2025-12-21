'use client';

import { useState } from 'react';
import { api } from '~/trpc/react';

export default function ExcelGeneratorPage() {
  const [reportName, setReportName] = useState('');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateReport = api.excel.generateReport.useMutation({
    onSuccess: (data) => {
      console.log('✅ 보고서 생성 성공!', data);
      
      // Excel 파일 다운로드
      const link = document.createElement('a');
      link.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${data.data}`;
      link.download = data.fileName;
      link.click();
      
      alert(`보고서 생성 완료!\n파일명: ${data.fileName}\n행 수: ${data.rowCount}`);
      setIsGenerating(false);
    },
    onError: (error) => {
      console.error('❌ 보고서 생성 실패:', error);
      alert(`보고서 생성 실패: ${error.message}`);
      setIsGenerating(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reportName.trim()) {
      alert('보고서명을 입력하세요.');
      return;
    }

    setIsGenerating(true);
    generateReport.mutate({
      reportName: reportName.trim(),
      description: description.trim() || undefined,
    });
  };

  const exampleReports = [
    {
      name: '모델별 생산 수불 레포트',
      description: '각 제품 모델별로 입고, 출고, 재고 수량을 집계한 보고서',
    },
    {
      name: '부서별 원가 분석',
      description: '부서별 단위원가와 총원가를 분석한 보고서',
    },
    {
      name: '작업 일정 현황',
      description: '작업별 시작일자, 종료일자, 진행상태를 보여주는 보고서',
    },
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🤖 Agent 기반 Excel 보고서 자동 생성</h1>
        <p className="text-gray-600">
          원하는 보고서를 자연어로 요청하면 Agent(Gemini)가 DB 스키마를 분석하여 자동으로 Excel을 생성합니다.
        </p>
      </div>

      {/* 보고서 생성 폼 */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4 rounded-lg border p-6 shadow-sm">
        <div>
          <label className="mb-2 block font-medium">
            보고서명 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
            placeholder="예: 모델별 생산 수불 레포트"
            className="w-full rounded border px-3 py-2 focus:border-blue-500 focus:outline-none"
            disabled={isGenerating}
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            설명 (선택사항)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="예: 각 제품 모델별로 입고, 출고, 재고 수량을 집계한 보고서"
            rows={3}
            className="w-full rounded border px-3 py-2 focus:border-blue-500 focus:outline-none"
            disabled={isGenerating}
          />
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isGenerating ? '🤖 Agent가 보고서 생성 중...' : '📊 보고서 생성'}
        </button>
      </form>

      {/* Agent 설계 결과 표시 */}
      {generateReport.data && (
        <div className="mb-8 rounded-lg border border-green-200 bg-green-50 p-6">
          <h2 className="mb-4 text-xl font-bold text-green-800">✅ Agent 설계 결과</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-green-700">보고서명</h3>
              <p className="text-gray-800">{generateReport.data.reportDesign.reportName}</p>
            </div>

            <div>
              <h3 className="font-medium text-green-700">컬럼 목록 ({generateReport.data.reportDesign.columns.length}개)</h3>
              <ul className="ml-4 list-disc space-y-1 text-gray-800">
                {generateReport.data.reportDesign.columns.map((col, idx) => (
                  <li key={idx}>
                    <strong>{col.columnName}</strong> ({col.dataType}) - {col.description}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-green-700">사용 테이블</h3>
              <p className="text-gray-800">{generateReport.data.reportDesign.tables.join(', ')}</p>
            </div>

            <div>
              <h3 className="font-medium text-green-700">설계 근거</h3>
              <p className="text-gray-800">{generateReport.data.reportDesign.reasoning}</p>
            </div>

            {generateReport.data.reportDesign.agentThinking && (
              <div>
                <h3 className="font-medium text-green-700">Agent 사고 과정</h3>
                <p className="text-gray-600 italic">{generateReport.data.reportDesign.agentThinking}</p>
              </div>
            )}

            <div>
              <h3 className="font-medium text-green-700">데이터</h3>
              <p className="text-gray-800">{generateReport.data.rowCount}행 조회 완료</p>
            </div>
          </div>
        </div>
      )}

      {/* 예시 보고서 */}
      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-bold">💡 예시 보고서</h2>
        <p className="mb-4 text-sm text-gray-600">
          클릭하면 자동으로 입력됩니다.
        </p>
        
        <div className="space-y-3">
          {exampleReports.map((report, idx) => (
            <button
              key={idx}
              onClick={() => {
                setReportName(report.name);
                setDescription(report.description);
              }}
              disabled={isGenerating}
              className="w-full rounded border border-gray-300 p-3 text-left hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50"
            >
              <div className="font-medium">{report.name}</div>
              <div className="text-sm text-gray-600">{report.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 시스템 정보 */}
      <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm">
        <h3 className="mb-2 font-medium text-blue-800">🤖 Agent 시스템 정보</h3>
        <ul className="ml-4 list-disc space-y-1 text-blue-700">
          <li>RAG 기반: Vector DB에서 관련 테이블/컬럼 자동 검색</li>
          <li>Agent 추론: Gemini 2.0 Flash가 보고서 설계 및 SQL 생성</li>
          <li>자동 실행: SQL 실행 → 데이터 조회 → Excel 파일 생성</li>
          <li>학습 가능: 사용자 피드백으로 점진적 정확도 향상</li>
        </ul>
      </div>
    </div>
  );
}
