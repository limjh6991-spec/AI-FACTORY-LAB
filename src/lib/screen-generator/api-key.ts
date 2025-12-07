/**
 * Anthropic API 키 관리 모듈
 * - 환경 변수 및 .env 파일에서 API 키 로드
 */

import * as fs from "fs";
import * as path from "path";

/**
 * Anthropic API 키 가져오기
 * 우선순위: .env.local > .env > 환경 변수
 * @returns API 키 또는 null
 */
export function getAnthropicApiKey(): string | null {
  // 1. .env.local 파일에서 직접 읽기 시도
  const envLocalPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envLocalPath)) {
    const content = fs.readFileSync(envLocalPath, 'utf-8');
    const match = content.match(/^ANTHROPIC_API_KEY=(.+)$/m);
    if (match && match[1]) {
      const key = match[1].trim();
      if (key.length >= 100) {
        console.log(`[API-KEY] .env.local에서 API 키 로드 (${key.length}자)`);
        return key;
      }
    }
  }
  
  // 2. .env 파일에서 직접 읽기 시도
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    const match = content.match(/^ANTHROPIC_API_KEY=(.+)$/m);
    if (match && match[1]) {
      const key = match[1].trim();
      if (key.length >= 100) {
        console.log(`[API-KEY] .env에서 API 키 로드 (${key.length}자)`);
        return key;
      }
    }
  }
  
  // 3. 환경 변수에서 가져오기 (폴백)
  const envKey = (process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY)?.trim();
  if (envKey && envKey.length >= 100) {
    console.log(`[API-KEY] 환경 변수에서 API 키 로드 (${envKey.length}자)`);
    return envKey;
  }
  
  console.log(`[API-KEY] API 키를 찾을 수 없거나 잘려있음`);
  return null;
}

/**
 * API 키 유효성 검증
 * @param apiKey 검증할 API 키
 * @returns 유효 여부
 */
export function isValidApiKey(apiKey: string | null): boolean {
  if (!apiKey) return false;
  
  // Anthropic API 키 형식: sk-ant- 로 시작
  if (!apiKey.startsWith('sk-ant-')) {
    console.warn('[API-KEY] 키가 sk-ant-로 시작하지 않음');
  }
  
  // 최소 길이 검증 (일반적으로 100자 이상)
  return apiKey.length >= 100;
}
