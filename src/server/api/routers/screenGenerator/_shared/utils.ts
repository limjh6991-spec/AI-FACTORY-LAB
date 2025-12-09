/**
 * 화면 생성기 공통 유틸리티
 * @module screenGenerator/_shared/utils
 */

import * as fs from "fs";
import * as path from "path";

// ============================================================
// 파일 시스템 유틸리티
// ============================================================

/**
 * 폴더 존재 확인 및 생성
 */
export function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * JSON 파일 읽기
 */
export function readJsonFile<T>(filePath: string): T | null {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
}

/**
 * JSON 파일 쓰기
 */
export function writeJsonFile(filePath: string, data: any): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

/**
 * 텍스트 파일 읽기
 */
export function readTextFile(filePath: string): string | null {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * 텍스트 파일 쓰기
 */
export function writeTextFile(filePath: string, content: string): void {
  fs.writeFileSync(filePath, content);
}

// ============================================================
// 경로 유틸리티
// ============================================================

/**
 * generated/screens 기본 경로
 */
export function getScreensBasePath(): string {
  return path.join(process.cwd(), 'generated', 'screens');
}

/**
 * 임시화면 경로
 */
export function getTempScreenPath(screenId?: string): string {
  const base = path.join(getScreensBasePath(), 'temp');
  return screenId ? path.join(base, screenId) : base;
}

/**
 * 발행된 화면 경로
 */
export function getPublishedScreenPath(screenId: string): string {
  return path.join(getScreensBasePath(), screenId);
}

/**
 * src/app/screens 경로
 */
export function getAppScreenPath(screenId: string): string {
  return path.join(process.cwd(), 'src', 'app', 'screens', screenId.toLowerCase());
}

// ============================================================
// 문자열 유틸리티
// ============================================================

/**
 * 첫 글자 대문자
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * camelCase 변환
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9가-힣]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((word, index) => 
      index === 0 ? word.toLowerCase() : capitalize(word.toLowerCase())
    )
    .join('');
}

/**
 * PascalCase 변환
 */
export function toPascalCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9가-힣]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(word => capitalize(word.toLowerCase()))
    .join('');
}

/**
 * 안전한 컴포넌트 이름 생성
 */
export function toSafeComponentName(screenName: string): string {
  // 한글도 허용하되, 특수문자 제거
  const name = screenName.replace(/[^a-zA-Z0-9가-힣]/g, '') || 'GeneratedScreen';
  return name;
}

// ============================================================
// 타임스탬프 유틸리티
// ============================================================

/**
 * ISO 타임스탬프 생성
 */
export function getISOTimestamp(): string {
  return new Date().toISOString();
}

/**
 * 밀리초 타임스탬프 생성
 */
export function getTimestamp(): number {
  return Date.now();
}

// ============================================================
// ID 생성 유틸리티
// ============================================================

/**
 * 임시 화면 ID 생성
 */
export function generateTempScreenId(): string {
  return `TEMP_${getTimestamp()}`;
}

// ============================================================
// 공통 export
// ============================================================

export * from './types';
export * from './validation';
