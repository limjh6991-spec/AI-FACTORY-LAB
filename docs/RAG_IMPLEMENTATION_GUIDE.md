# RAG 기반 DB 매핑 시스템 구현 가이드

## 📋 개요

**목적**: Vector Database와 강화 학습을 활용한 Excel → DB 자동 매핑 시스템  
**작성일**: 2025년 12월 2일  
**기술 스택**: Pinecone + LangChain + Gemini 2.0 Flash

---

## 🏗️ 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│                    Excel 업로드                          │
│              ["공정명", "부서", "금액"]                    │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│              Step 1: Vector Search                      │
│   Pinecone에서 유사한 컬럼 검색 (Semantic Search)         │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│         Step 2: Reinforcement Learning                  │
│   과거 사용자 피드백 기반으로 재정렬 (Scoring)             │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│            Step 3: LLM Validation                       │
│   Gemini가 컨텍스트 기반 최종 매핑 추천                   │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│          Step 4: User Review                            │
│   사용자 확인/수정 → 피드백 저장 → 학습 데이터 축적       │
└─────────────────────────────────────────────────────────┘
```

---

## 📦 설치 및 설정

### 1. 패키지 설치

```bash
npm install @pinecone-database/pinecone
npm install @langchain/pinecone
npm install @langchain/openai
npm install @langchain/community
npm install langchain
npm install @google/generative-ai
```

### 2. 환경 변수 설정

```bash
# .env
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=us-east1-gcp
PINECONE_INDEX=db-mapping

OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key

DATABASE_URL=postgresql://user:password@localhost:5432/ai_factory_db
```

### 3. Pinecone 인덱스 생성

```typescript
// scripts/setup-pinecone.ts
import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

// 인덱스 생성
await pinecone.createIndex({
  name: 'db-mapping',
  dimension: 1536, // OpenAI text-embedding-3-small
  metric: 'cosine',
  spec: {
    serverless: {
      cloud: 'aws',
      region: 'us-east-1'
    }
  }
});
```

---

## 🗄️ DB 메타데이터 수집

### 1. Prisma를 활용한 스키마 분석

```typescript
// src/lib/db-analyzer.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface TableMetadata {
  tableName: string;
  koreanName: string;
  columns: ColumnMetadata[];
}

interface ColumnMetadata {
  columnName: string;
  koreanName: string;
  dataType: string;
  isNullable: boolean;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  description?: string;
}

export async function analyzeDatabase(): Promise<TableMetadata[]> {
  // PostgreSQL information_schema 쿼리
  const tables = await prisma.$queryRaw<any[]>`
    SELECT 
      t.table_name,
      c.column_name,
      c.data_type,
      c.is_nullable,
      tc.constraint_type,
      pgd.description
    FROM information_schema.tables t
    LEFT JOIN information_schema.columns c 
      ON t.table_name = c.table_name
    LEFT JOIN information_schema.key_column_usage kcu 
      ON c.table_name = kcu.table_name 
      AND c.column_name = kcu.column_name
    LEFT JOIN information_schema.table_constraints tc 
      ON kcu.constraint_name = tc.constraint_name
    LEFT JOIN pg_catalog.pg_statio_all_tables st 
      ON t.table_name = st.relname
    LEFT JOIN pg_catalog.pg_description pgd 
      ON pgd.objoid = st.relid
    WHERE t.table_schema = 'public'
      AND t.table_type = 'BASE TABLE'
    ORDER BY t.table_name, c.ordinal_position
  `;

  // 테이블별로 그룹화
  const metadata = groupByTable(tables);
  
  // 한글명 매핑 (수동 또는 AI 생성)
  const withKoreanNames = await enrichWithKoreanNames(metadata);
  
  return withKoreanNames;
}

// 한글명 자동 생성 (Gemini 활용)
async function enrichWithKoreanNames(
  metadata: TableMetadata[]
): Promise<TableMetadata[]> {
  const prompt = `
다음 데이터베이스 테이블/컬럼의 적절한 한글명을 생성해주세요.

테이블:
${metadata.map(t => `- ${t.tableName}: ${t.columns.map(c => c.columnName).join(', ')}`).join('\n')}

출력 형식 (JSON):
{
  "tables": [
    {
      "tableName": "process_master",
      "koreanName": "공정마스터",
      "columns": [
        { "columnName": "process_id", "koreanName": "공정ID" },
        { "columnName": "process_name", "koreanName": "공정명" }
      ]
    }
  ]
}
  `;

  const result = await gemini.generateContent(prompt);
  const parsed = JSON.parse(result.response.text());
  
  return parsed.tables;
}
```

### 2. 네이밍 규칙 학습

```typescript
// src/lib/naming-patterns.ts
export const namingPatterns = {
  // 약어 사전
  abbreviations: {
    'proc': 'process',
    'nm': 'name',
    'cd': 'code',
    'amt': 'amount',
    'qty': 'quantity',
    'dept': 'department',
    'prod': 'product',
    'mst': 'master',
    'dtl': 'detail',
    'seq': 'sequence'
  },

  // 한글-영문 매핑
  koreanToEnglish: {
    '공정': ['process', 'proc'],
    '부서': ['department', 'dept'],
    '금액': ['amount', 'amt', 'price'],
    '수량': ['quantity', 'qty'],
    '코드': ['code', 'cd'],
    '명칭': ['name', 'nm', 'title'],
    '일자': ['date', 'dt'],
    '번호': ['number', 'no', 'num'],
    '순번': ['sequence', 'seq'],
    '상태': ['status', 'stat'],
    '비고': ['remark', 'rmk', 'note']
  },

  // 접두사/접미사 규칙
  prefixRules: {
    'new_': '신규 시스템',
    'old_': '레거시 시스템',
    'tmp_': '임시 테이블'
  },
  
  suffixRules: {
    '_mst': 'master',
    '_dtl': 'detail',
    '_hist': 'history',
    '_log': 'log'
  }
};

// 유사도 계산
export function calculateSimilarity(
  korean: string, 
  english: string
): number {
  const patterns = namingPatterns.koreanToEnglish[korean] || [];
  
  // 정확히 일치
  if (patterns.includes(english)) return 1.0;
  
  // 약어 확장 후 비교
  const expanded = expandAbbreviation(english);
  if (patterns.includes(expanded)) return 0.9;
  
  // 부분 일치
  const partialMatch = patterns.some(p => english.includes(p) || p.includes(english));
  if (partialMatch) return 0.7;
  
  return 0.0;
}

function expandAbbreviation(text: string): string {
  const parts = text.split('_');
  return parts.map(part => 
    namingPatterns.abbreviations[part] || part
  ).join('_');
}
```

---

## 🧠 Vector Store 구축

### 1. Embeddings 생성 및 저장

```typescript
// src/lib/vector-store.ts
import { PineconeStore } from '@langchain/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';
import { Pinecone } from '@pinecone-database/pinecone';
import { Document } from 'langchain/document';

export async function initializeVectorStore(
  metadata: TableMetadata[]
) {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  const index = pinecone.Index('db-mapping');

  // 각 컬럼을 Document로 변환
  const documents: Document[] = [];

  for (const table of metadata) {
    for (const column of table.columns) {
      // 다양한 형태로 문서 생성 (검색 정확도 향상)
      const variants = [
        // 기본 형태
        `테이블: ${table.koreanName}(${table.tableName}), 컬럼: ${column.koreanName}(${column.columnName})`,
        
        // 컬럼명만
        `${column.koreanName}: ${column.columnName}`,
        
        // 컨텍스트 포함
        `${table.koreanName} 테이블의 ${column.koreanName} 컬럼, 영문명: ${column.columnName}, 타입: ${column.dataType}`,
        
        // 약어 확장
        `${expandAbbreviation(column.columnName)} = ${column.koreanName}`
      ];

      for (const content of variants) {
        documents.push(
          new Document({
            pageContent: content,
            metadata: {
              tableName: table.tableName,
              tableKoreanName: table.koreanName,
              columnName: column.columnName,
              columnKoreanName: column.koreanName,
              dataType: column.dataType,
              isPrimaryKey: column.isPrimaryKey,
              isForeignKey: column.isForeignKey,
              description: column.description
            }
          })
        );
      }
    }
  }

  // Vector Store에 저장
  await PineconeStore.fromDocuments(
    documents,
    new OpenAIEmbeddings({
      modelName: 'text-embedding-3-small', // 저렴하고 빠름
    }),
    {
      pineconeIndex: index,
      namespace: 'db-metadata',
    }
  );

  console.log(`✅ ${documents.length}개 문서 임베딩 완료`);
}
```

### 2. 유사도 검색

```typescript
// src/lib/similarity-search.ts
import { PineconeStore } from '@langchain/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';

export async function searchSimilarColumns(
  excelColumn: string,
  context?: string,
  k: number = 5
) {
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings({
      modelName: 'text-embedding-3-small',
    }),
    {
      pineconeIndex: pinecone.Index('db-mapping'),
      namespace: 'db-metadata',
    }
  );

  // 검색 쿼리 구성
  const query = context 
    ? `${excelColumn} ${context}` 
    : excelColumn;

  // 유사도 검색 (점수 포함)
  const results = await vectorStore.similaritySearchWithScore(query, k);

  return results.map(([doc, score]) => ({
    tableName: doc.metadata.tableName,
    tableKoreanName: doc.metadata.tableKoreanName,
    columnName: doc.metadata.columnName,
    columnKoreanName: doc.metadata.columnKoreanName,
    dataType: doc.metadata.dataType,
    similarityScore: score,
    metadata: doc.metadata
  }));
}
```

---

## 📚 강화 학습 시스템

### 1. 피드백 데이터 모델

```typescript
// prisma/schema.prisma
model MappingFeedback {
  id                Int      @id @default(autoincrement())
  excelColumn       String
  screenContext     String?
  suggestedTable    String
  suggestedColumn   String
  selectedTable     String   // 사용자가 최종 선택한 테이블
  selectedColumn    String   // 사용자가 최종 선택한 컬럼
  confidenceScore   Float
  isCorrect         Boolean  @default(false)
  isCorrected       Boolean  @default(false)
  userId            String?
  createdAt         DateTime @default(now())

  @@index([excelColumn, screenContext])
  @@index([selectedTable, selectedColumn])
}
```

### 2. 피드백 수집 및 저장

```typescript
// src/lib/feedback-collector.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function saveFeedback(feedback: {
  excelColumn: string;
  screenContext?: string;
  suggested: { table: string; column: string };
  selected: { table: string; column: string };
  confidenceScore: number;
  userId?: string;
}) {
  const isCorrect = 
    feedback.suggested.table === feedback.selected.table &&
    feedback.suggested.column === feedback.selected.column;

  const isCorrected = !isCorrect;

  await prisma.mappingFeedback.create({
    data: {
      excelColumn: feedback.excelColumn,
      screenContext: feedback.screenContext,
      suggestedTable: feedback.suggested.table,
      suggestedColumn: feedback.suggested.column,
      selectedTable: feedback.selected.table,
      selectedColumn: feedback.selected.column,
      confidenceScore: feedback.confidenceScore,
      isCorrect,
      isCorrected,
      userId: feedback.userId
    }
  });
}
```

### 3. 학습 데이터 조회

```typescript
// src/lib/learning-engine.ts
export async function getRelevantFeedback(
  excelColumn: string,
  context?: string
) {
  // 동일 컬럼명의 과거 피드백 조회
  const feedback = await prisma.mappingFeedback.findMany({
    where: {
      excelColumn: {
        equals: excelColumn,
        mode: 'insensitive' // 대소문자 무시
      },
      screenContext: context ? {
        contains: context
      } : undefined
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 10
  });

  // 통계 계산
  const stats = {
    totalCount: feedback.length,
    correctCount: feedback.filter(f => f.isCorrect).length,
    mostCommonMapping: getMostCommonMapping(feedback),
    contextualMappings: groupByContext(feedback)
  };

  return { feedback, stats };
}

function getMostCommonMapping(feedback: MappingFeedback[]) {
  const counts = new Map<string, number>();
  
  feedback.forEach(f => {
    const key = `${f.selectedTable}.${f.selectedColumn}`;
    counts.set(key, (counts.get(key) || 0) + 1);
  });

  const sorted = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1]);

  if (sorted.length === 0) return null;

  const [mapping, count] = sorted[0];
  const [table, column] = mapping.split('.');

  return { table, column, count };
}
```

### 4. 점수 재계산 (강화 학습)

```typescript
// src/lib/ranking-engine.ts
export function reRankBySimilarity
(
  vectorResults: SearchResult[],
  feedbackStats: FeedbackStats,
  excelColumn: string
): RankedResult[] {
  return vectorResults.map(result => {
    let score = result.similarityScore;

    // 1. 과거 정확도 가중치
    const accuracy = feedbackStats.totalCount > 0
      ? feedbackStats.correctCount / feedbackStats.totalCount
      : 0;
    
    score += accuracy * 0.3;

    // 2. 최다 선택 보너스
    if (feedbackStats.mostCommonMapping) {
      if (
        result.tableName === feedbackStats.mostCommonMapping.table &&
        result.columnName === feedbackStats.mostCommonMapping.column
      ) {
        score += 0.2;
      }
    }

    // 3. 네이밍 규칙 매칭
    const namingSimilarity = calculateSimilarity(
      excelColumn,
      result.columnName
    );
    score += namingSimilarity * 0.2;

    // 4. 데이터 타입 적합성
    const typeScore = getTypeCompatibilityScore(
      excelColumn,
      result.dataType
    );
    score += typeScore * 0.1;

    return {
      ...result,
      finalScore: Math.min(score, 1.0), // 최대 1.0
      breakdown: {
        vectorScore: result.similarityScore,
        accuracyBonus: accuracy * 0.3,
        namingBonus: namingSimilarity * 0.2,
        typeBonus: typeScore * 0.1
      }
    };
  }).sort((a, b) => b.finalScore - a.finalScore);
}

function getTypeCompatibilityScore(
  excelColumn: string,
  dbType: string
): number {
  // 엑셀 컬럼명에서 타입 추론
  const hints = {
    numeric: ['금액', '수량', 'qty', 'amt', 'price', 'count'],
    date: ['일자', 'date', 'dt', 'day'],
    text: ['명', 'name', 'nm', 'title', '코드', 'code']
  };

  const lowerColumn = excelColumn.toLowerCase();

  if (hints.numeric.some(h => lowerColumn.includes(h))) {
    return ['integer', 'numeric', 'decimal', 'float'].includes(dbType.toLowerCase()) 
      ? 1.0 : 0.3;
  }

  if (hints.date.some(h => lowerColumn.includes(h))) {
    return ['date', 'timestamp', 'datetime'].includes(dbType.toLowerCase()) 
      ? 1.0 : 0.3;
  }

  if (hints.text.some(h => lowerColumn.includes(h))) {
    return ['varchar', 'text', 'character'].includes(dbType.toLowerCase()) 
      ? 1.0 : 0.5;
  }

  return 0.5; // 기본값
}
```

---

## 🤖 LLM 최종 검증

```typescript
// src/lib/llm-validator.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function validateWithLLM(
  excelColumn: string,
  context: string,
  rankedResults: RankedResult[],
  feedbackStats: FeedbackStats
) {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash-exp" 
  });

  const prompt = `
당신은 데이터베이스 매핑 전문가입니다.

Excel 컬럼: "${excelColumn}"
화면 컨텍스트: "${context}"

후보 DB 컬럼 (신뢰도 순):
${rankedResults.slice(0, 5).map((r, i) => 
  `${i+1}. ${r.tableName}.${r.columnName} (${r.columnKoreanName})
     - 테이블: ${r.tableKoreanName}
     - 타입: ${r.dataType}
     - 신뢰도: ${(r.finalScore * 100).toFixed(1)}%`
).join('\n')}

과거 학습 데이터:
- 총 매핑 횟수: ${feedbackStats.totalCount}
- 정확도: ${feedbackStats.totalCount > 0 ? 
    ((feedbackStats.correctCount / feedbackStats.totalCount) * 100).toFixed(1) : 0}%
${feedbackStats.mostCommonMapping ? 
  `- 최다 선택: ${feedbackStats.mostCommonMapping.table}.${feedbackStats.mostCommonMapping.column} (${feedbackStats.mostCommonMapping.count}회)` 
  : ''}

질문:
1. 가장 적합한 매핑은 무엇인가요?
2. 신뢰도는 얼마나 되나요? (0.0-1.0)
3. 선택 이유를 간단히 설명해주세요.

출력 형식 (JSON만):
{
  "recommendation": {
    "table": "테이블명",
    "column": "컬럼명"
  },
  "confidence": 0.95,
  "reason": "선택 이유"
}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  
  // JSON 추출 (```json ... ``` 제거)
  const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || 
                    text.match(/\{[\s\S]*\}/);
  
  if (!jsonMatch) {
    throw new Error('LLM 응답에서 JSON을 찾을 수 없습니다.');
  }

  return JSON.parse(jsonMatch[1] || jsonMatch[0]);
}
```

---

## 🎯 통합 매핑 API

```typescript
// src/server/api/routers/mapping.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const mappingRouter = createTRPCRouter({
  suggestMapping: publicProcedure
    .input(z.object({
      excelColumns: z.array(z.string()),
      screenContext: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const suggestions = [];

      for (const excelColumn of input.excelColumns) {
        // Step 1: Vector Search
        const vectorResults = await searchSimilarColumns(
          excelColumn,
          input.screenContext,
          10
        );

        // Step 2: 과거 피드백 조회
        const { feedback, stats } = await getRelevantFeedback(
          excelColumn,
          input.screenContext
        );

        // Step 3: 점수 재계산 (강화 학습)
        const rankedResults = reRankByLearning(
          vectorResults,
          stats,
          excelColumn
        );

        // Step 4: LLM 검증
        const llmValidation = await validateWithLLM(
          excelColumn,
          input.screenContext || '',
          rankedResults,
          stats
        );

        suggestions.push({
          excelColumn,
          candidates: rankedResults.slice(0, 5),
          recommendation: llmValidation.recommendation,
          confidence: llmValidation.confidence,
          reason: llmValidation.reason
        });
      }

      return { suggestions };
    }),

  saveFeedback: publicProcedure
    .input(z.object({
      excelColumn: z.string(),
      screenContext: z.string().optional(),
      suggested: z.object({
        table: z.string(),
        column: z.string()
      }),
      selected: z.object({
        table: z.string(),
        column: z.string()
      }),
      confidenceScore: z.number()
    }))
    .mutation(async ({ input }) => {
      await saveFeedback(input);
      return { success: true };
    }),
});
```

---

## 🎨 사용자 인터페이스

```typescript
// src/app/mapping-review/page.tsx
"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export default function MappingReviewPage() {
  const [suggestions, setSuggestions] = useState([]);
  
  const suggestMutation = api.mapping.suggestMapping.useMutation();
  const feedbackMutation = api.mapping.saveFeedback.useMutation();

  const handleSuggest = async () => {
    const result = await suggestMutation.mutateAsync({
      excelColumns: ["공정명", "부서", "금액"],
      screenContext: "원가 조회 화면"
    });
    setSuggestions(result.suggestions);
  };

  const handleConfirm = async (suggestion, selectedMapping) => {
    await feedbackMutation.mutateAsync({
      excelColumn: suggestion.excelColumn,
      screenContext: "원가 조회 화면",
      suggested: suggestion.recommendation,
      selected: selectedMapping,
      confidenceScore: suggestion.confidence
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">DB 매핑 검토</h1>

      {suggestions.map((suggestion, idx) => (
        <div key={idx} className="mb-8 p-4 border rounded">
          <h3 className="font-bold text-lg mb-2">
            Excel: "{suggestion.excelColumn}"
          </h3>

          {/* AI 추천 */}
          <div className="bg-blue-50 p-3 rounded mb-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold">🤖 AI 추천:</span>
                <span className="ml-2">
                  {suggestion.recommendation.table}.
                  {suggestion.recommendation.column}
                </span>
              </div>
              <div className="text-sm">
                신뢰도: {(suggestion.confidence * 100).toFixed(0)}%
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {suggestion.reason}
            </p>
          </div>

          {/* 후보 목록 */}
          <div className="space-y-2">
            <p className="text-sm font-semibold">기타 후보:</p>
            {suggestion.candidates.map((candidate, i) => (
              <button
                key={i}
                onClick={() => handleConfirm(suggestion, {
                  table: candidate.tableName,
                  column: candidate.columnName
                })}
                className="block w-full text-left p-2 border rounded hover:bg-gray-50"
              >
                <div className="flex justify-between">
                  <span>
                    {candidate.tableName}.{candidate.columnName}
                    <span className="text-gray-500 ml-2">
                      ({candidate.columnKoreanName})
                    </span>
                  </span>
                  <span className="text-sm text-gray-500">
                    {(candidate.finalScore * 100).toFixed(0)}%
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## 📊 성능 모니터링

```typescript
// src/lib/monitoring.ts
export async function trackMappingAccuracy() {
  const recentFeedback = await prisma.mappingFeedback.findMany({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 최근 30일
      }
    }
  });

  const total = recentFeedback.length;
  const correct = recentFeedback.filter(f => f.isCorrect).length;
  const corrected = recentFeedback.filter(f => f.isCorrected).length;

  console.log(`
📊 매핑 정확도 (최근 30일)
- 총 매핑: ${total}개
- 정확: ${correct}개 (${(correct/total*100).toFixed(1)}%)
- 수정: ${corrected}개 (${(corrected/total*100).toFixed(1)}%)
- 평균 신뢰도: ${(recentFeedback.reduce((sum, f) => sum + f.confidenceScore, 0) / total).toFixed(2)}
  `);

  return {
    total,
    accuracy: correct / total,
    correctionRate: corrected / total,
    avgConfidence: recentFeedback.reduce((sum, f) => sum + f.confidenceScore, 0) / total
  };
}
```

---

## 🚀 배포 체크리스트

### Phase 0: 초기 셋업
- [ ] Pinecone 계정 생성
- [ ] OpenAI API 키 발급
- [ ] Gemini API 키 발급
- [ ] DB 메타데이터 수집
- [ ] Vector Store 초기화
- [ ] 네이밍 규칙 정의

### Phase 1: 테스트
- [ ] 샘플 데이터로 매핑 테스트
- [ ] 정확도 측정
- [ ] 사용자 피드백 UI 테스트

### Phase 2: 프로덕션
- [ ] 모니터링 대시보드
- [ ] 에러 핸들링
- [ ] 성능 최적화
- [ ] 문서화

---

**작성자:** GitHub Copilot (JARVIS)  
**버전:** 1.0  
**업데이트:** 2025-12-02
