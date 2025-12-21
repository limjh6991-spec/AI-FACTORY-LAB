'use client';

import { useState } from 'react';
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, Loader2, Edit2, Save, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { api } from '~/trpc/react';

interface ColumnMapping {
  excelColumn: string;
  suggestedTable: string;
  suggestedColumn: string;
  confidence: number;
  reasoning: string;
}

interface DBTable {
  tableName: string;
  columns: Array<{
    columnName: string;
    dataType: string;
    comment: string | null;
  }>;
}

export default function ExcelMappingPage() {
  const [file, setFile] = useState<File | null>(null);
  const [excelColumns, setExcelColumns] = useState<string[]>([]);
  const [mappings, setMappings] = useState<ColumnMapping[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editTable, setEditTable] = useState('');
  const [editColumn, setEditColumn] = useState('');

  // DB 테이블/컬럼 정보 가져오기
  const { data: dbMetadata } = api.excel.getAllTablesAndColumns.useQuery();

  const analyzeExcel = api.excel.analyzeColumns.useMutation({
    onSuccess: (data) => {
      setExcelColumns(data.columns);
      setIsAnalyzing(false);
    },
    onError: (error) => {
      console.error('Excel 분석 실패:', error);
      setIsAnalyzing(false);
    }
  });

  const suggestMappings = api.excel.suggestMappings.useMutation({
    onSuccess: (data) => {
      setMappings(data.mappings);
    },
    onError: (error) => {
      console.error('매핑 추천 실패:', error);
    }
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setIsAnalyzing(true);

    // Excel 파일을 base64로 인코딩하여 전송
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      analyzeExcel.mutate({ 
        fileData: base64.split(',')[1] || '',
        fileName: uploadedFile.name 
      });
    };
    reader.readAsDataURL(uploadedFile);
  };

  const handleMapColumns = () => {
    if (excelColumns.length === 0) return;
    
    suggestMappings.mutate({
      columns: excelColumns,
      context: file?.name.replace('.xlsx', '').replace('.xls', '') || ''
    });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600 bg-green-50';
    if (confidence >= 50) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 80) return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    if (confidence >= 50) return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    return <AlertCircle className="h-5 w-5 text-red-600" />;
  };

  const handleStartEdit = (index: number) => {
    const mapping = mappings[index];
    if (!mapping) return;
    
    setEditingIndex(index);
    setEditTable(mapping.suggestedTable);
    setEditColumn(mapping.suggestedColumn);
  };

  const handleSaveEdit = (index: number) => {
    if (!editTable || !editColumn) return;

    const updatedMappings = [...mappings];
    const mapping = updatedMappings[index];
    if (!mapping) return;

    mapping.suggestedTable = editTable;
    mapping.suggestedColumn = editColumn;
    mapping.confidence = 100; // 수동 수정은 100% 신뢰도
    mapping.reasoning = '사용자가 수동으로 수정함';

    setMappings(updatedMappings);
    setEditingIndex(null);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditTable('');
    setEditColumn('');
  };

  const getColumnsForTable = (tableName: string) => {
    const table = dbMetadata?.tables.find(t => t.tableName === tableName);
    return table?.columns || [];
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">📊 Excel → DB 자동 매핑</h1>
        <p className="text-gray-600">
          Excel 파일을 업로드하면 AI가 데이터베이스 테이블과 컬럼을 자동으로 매핑해드립니다.
        </p>
      </div>

      {/* 파일 업로드 */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Excel 파일 업로드
          </CardTitle>
          <CardDescription>
            .xlsx 또는 .xls 파일을 선택하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <FileSpreadsheet className="h-5 w-5" />
                파일 선택
              </div>
            </label>
            {file && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FileSpreadsheet className="h-4 w-4" />
                {file.name}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Excel 컬럼 목록 */}
      {excelColumns.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>감지된 Excel 컬럼</CardTitle>
            <CardDescription>
              총 {excelColumns.length}개의 컬럼이 발견되었습니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {excelColumns.map((col, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {col}
                </span>
              ))}
            </div>
            <Button 
              onClick={handleMapColumns}
              disabled={suggestMappings.isPending}
              className="w-full"
            >
              {suggestMappings.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  AI 매핑 중...
                </>
              ) : (
                '🤖 AI로 자동 매핑하기'
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* 매핑 결과 */}
      {mappings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>매핑 결과</CardTitle>
            <CardDescription>
              AI가 추천한 데이터베이스 컬럼 매핑입니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mappings.map((mapping, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  {editingIndex === idx ? (
                    // 수정 모드
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-lg">
                          {mapping.excelColumn}
                        </span>
                        <span className="text-gray-400">→</span>
                      </div>

                      {/* 테이블 선택 */}
                      <div>
                        <label className="block text-sm font-medium mb-1">테이블</label>
                        <select
                          value={editTable}
                          onChange={(e) => {
                            setEditTable(e.target.value);
                            setEditColumn(''); // 테이블 변경 시 컬럼 초기화
                          }}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">테이블 선택...</option>
                          {dbMetadata?.tables.map((table) => (
                            <option key={table.tableName} value={table.tableName}>
                              {table.tableName} ({table.columns.length} 컬럼)
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* 컬럼 선택 */}
                      <div>
                        <label className="block text-sm font-medium mb-1">컬럼</label>
                        <select
                          value={editColumn}
                          onChange={(e) => setEditColumn(e.target.value)}
                          disabled={!editTable}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        >
                          <option value="">컬럼 선택...</option>
                          {getColumnsForTable(editTable).map((col) => (
                            <option key={col.columnName} value={col.columnName}>
                              {col.columnName} ({col.dataType})
                              {col.comment && ` - ${col.comment}`}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* 저장/취소 버튼 */}
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleSaveEdit(idx)}
                          disabled={!editTable || !editColumn}
                          size="sm"
                          className="flex-1"
                        >
                          <Save className="h-4 w-4 mr-1" />
                          저장
                        </Button>
                        <Button
                          onClick={handleCancelEdit}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          <X className="h-4 w-4 mr-1" />
                          취소
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // 보기 모드
                    <>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-lg">
                              {mapping.excelColumn}
                            </span>
                            <span className="text-gray-400">→</span>
                            <span className="text-blue-600 font-mono">
                              {mapping.suggestedTable}.{mapping.suggestedColumn}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {mapping.reasoning}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {getConfidenceIcon(mapping.confidence)}
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getConfidenceColor(mapping.confidence)}`}
                          >
                            {mapping.confidence}%
                          </span>
                          <Button
                            onClick={() => handleStartEdit(idx)}
                            variant="ghost"
                            size="sm"
                            className="ml-2"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* 통계 */}
            <div className="mt-6 pt-6 border-t">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600">
                    {mappings.filter(m => m.confidence >= 80).length}
                  </div>
                  <div className="text-sm text-gray-600">높은 신뢰도</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-600">
                    {mappings.filter(m => m.confidence >= 50 && m.confidence < 80).length}
                  </div>
                  <div className="text-sm text-gray-600">중간 신뢰도</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600">
                    {mappings.filter(m => m.confidence < 50).length}
                  </div>
                  <div className="text-sm text-gray-600">낮은 신뢰도</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 로딩 상태 */}
      {isAnalyzing && (
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
              <p className="text-gray-600">Excel 파일 분석 중...</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
