/**
 * DB 메타데이터 로드 및 관리 모듈
 * - DB 테이블/컬럼 메타정보 로드
 * - 테이블 검색 기능
 */

import * as fs from "fs";
import * as path from "path";
import type { TableMeta } from "./types";

// DB 메타데이터 캐시
let dbMetadataCache: TableMeta[] | null = null;

/**
 * DB 메타데이터 파일에서 테이블 정보 로드
 * 캐싱을 통해 반복 로드 방지
 */
export function loadDbMetadata(): TableMeta[] {
  if (dbMetadataCache) return dbMetadataCache;
  
  const metadataPath = path.join(process.cwd(), 'data', 'db_metadata_enhanced.json');
  if (!fs.existsSync(metadataPath)) {
    console.log('[DB-META] 메타데이터 파일 없음:', metadataPath);
    return [];
  }
  
  try {
    const content = fs.readFileSync(metadataPath, 'utf-8');
    dbMetadataCache = JSON.parse(content) as TableMeta[];
    console.log(`[DB-META] 메타데이터 로드 완료: ${dbMetadataCache.length}개 테이블`);
    return dbMetadataCache;
  } catch (error) {
    console.error('[DB-META] 메타데이터 파싱 오류:', error);
    return [];
  }
}

/**
 * 테이블명으로 메타데이터 검색
 * @param tableName 검색할 테이블명 (대소문자 무관)
 */
export function findTableMeta(tableName: string): TableMeta | undefined {
  const metadata = loadDbMetadata();
  return metadata.find(t => t.name.toLowerCase() === tableName.toLowerCase());
}

/**
 * 캐시 초기화 (테스트용 또는 메타데이터 갱신 시)
 */
export function clearDbMetadataCache(): void {
  dbMetadataCache = null;
}

/**
 * 테이블명 검색 (부분 일치)
 * @param keyword 검색 키워드
 * @param limit 최대 결과 수
 */
export function searchTables(keyword: string, limit: number = 10): TableMeta[] {
  const metadata = loadDbMetadata();
  const keywordLower = keyword.toLowerCase();
  
  return metadata
    .filter(t => 
      t.name.toLowerCase().includes(keywordLower) ||
      t.korean_name.toLowerCase().includes(keywordLower)
    )
    .slice(0, limit);
}

/**
 * 특정 테이블의 컬럼 정보 조회
 * @param tableName 테이블명
 */
export function getTableColumns(tableName: string): string[] {
  const tableMeta = findTableMeta(tableName);
  if (!tableMeta) return [];
  
  return tableMeta.columns.map(col => col.name);
}

/**
 * 한글 컬럼명으로 DB 컬럼 검색
 * @param tableName 테이블명
 * @param koreanName 한글 컬럼명
 */
export function findColumnByKoreanName(tableName: string, koreanName: string): string | null {
  const tableMeta = findTableMeta(tableName);
  if (!tableMeta) return null;
  
  const column = tableMeta.columns.find(col => 
    col.korean_name.toLowerCase().includes(koreanName.toLowerCase())
  );
  
  return column?.name || null;
}
