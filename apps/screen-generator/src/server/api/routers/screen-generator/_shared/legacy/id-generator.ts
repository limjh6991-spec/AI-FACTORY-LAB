/**
 * 화면 ID 생성 모듈
 * - SC + 6자리 숫자 형식 (예: SC000001)
 */

import * as fs from "fs";
import * as path from "path";

/**
 * 화면 ID 생성
 * - generated/screens 디렉토리의 기존 화면 ID를 확인
 * - 최대값 + 1로 새 ID 생성
 * @returns SC + 6자리 숫자 형식의 화면 ID
 */
export async function generateScreenId(): Promise<string> {
  try {
    const screensDir = path.join(process.cwd(), 'generated', 'screens');
    let maxNum = 0;
    
    if (fs.existsSync(screensDir)) {
      const dirs = fs.readdirSync(screensDir);
      for (const dir of dirs) {
        if (dir.startsWith('SC') && dir.length === 8) {
          const num = parseInt(dir.slice(2), 10);
          if (!isNaN(num) && num > maxNum) {
            maxNum = num;
          }
        }
      }
    }
    
    // 다음 번호로 ID 생성
    const nextNum = maxNum + 1;
    return `SC${nextNum.toString().padStart(6, '0')}`;
  } catch (error) {
    console.error('[ID-GEN] 화면 ID 생성 오류:', error);
    // 실패시 타임스탬프 기반 ID
    return `SC${Date.now().toString().slice(-6)}`;
  }
}

/**
 * 화면 ID 유효성 검증
 * @param screenId 검증할 화면 ID
 * @returns 유효 여부
 */
export function isValidScreenId(screenId: string): boolean {
  const pattern = /^SC\d{6}$/;
  return pattern.test(screenId);
}

/**
 * 화면 ID에서 숫자 추출
 * @param screenId 화면 ID
 * @returns 숫자 부분
 */
export function extractScreenNumber(screenId: string): number {
  if (!isValidScreenId(screenId)) {
    throw new Error(`Invalid screen ID: ${screenId}`);
  }
  return parseInt(screenId.slice(2), 10);
}
