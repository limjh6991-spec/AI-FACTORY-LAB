import * as fs from 'fs';
import * as path from 'path';

/**
 * DB Query Logger
 * 
 * 일별 쿼리 로그 파일 생성
 * 형식: /logs/query-YYYY-MM-DD.log
 */

const LOG_DIR = path.join(process.cwd(), 'logs');

// 로그 디렉토리 생성
function ensureLogDir() {
    if (!fs.existsSync(LOG_DIR)) {
        fs.mkdirSync(LOG_DIR, { recursive: true });
    }
}

// 오늘 날짜 문자열 (YYYY-MM-DD)
function getDateString(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 현재 시간 문자열 (HH:mm:ss.SSS)
function getTimeString(): string {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ms = String(now.getMilliseconds()).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${ms}`;
}

// 로그 파일 경로
function getLogFilePath(): string {
    return path.join(LOG_DIR, `query-${getDateString()}.log`);
}

// 로그 쓰기
function writeLog(content: string) {
    ensureLogDir();
    const logPath = getLogFilePath();
    fs.appendFileSync(logPath, content + '\n', 'utf-8');
}

// 쿼리 포맷팅 (가독성을 위해)
function formatQuery(query: string): string {
    return query
        .replace(/\s+/g, ' ')
        .trim();
}

// 파라미터 포맷팅
function formatParams(params: unknown): string {
    if (!params) return '';
    try {
        if (Array.isArray(params) && params.length === 0) return '';
        return JSON.stringify(params, null, 2);
    } catch {
        return String(params);
    }
}

/**
 * 쿼리 로그 기록
 * 
 * @param query - SQL 쿼리
 * @param params - 쿼리 파라미터
 * @param durationMs - 실행 시간 (밀리초)
 * @param error - 에러 (있는 경우)
 */
export function logQuery(
    query: string,
    params?: unknown,
    durationMs?: number,
    error?: Error
) {
    const timestamp = `[${getDateString()} ${getTimeString()}]`;
    const duration = durationMs !== undefined ? `[${durationMs}ms]` : '';
    const status = error ? '[ERROR]' : '[OK]';

    let logEntry = `${'='.repeat(80)}\n`;
    logEntry += `${timestamp} ${status} ${duration}\n`;
    logEntry += `${'─'.repeat(80)}\n`;
    logEntry += `QUERY:\n${formatQuery(query)}\n`;

    const formattedParams = formatParams(params);
    if (formattedParams) {
        logEntry += `${'─'.repeat(40)}\n`;
        logEntry += `PARAMS:\n${formattedParams}\n`;
    }

    if (error) {
        logEntry += `${'─'.repeat(40)}\n`;
        logEntry += `ERROR:\n${error.message}\n`;
        if (error.stack) {
            logEntry += `STACK:\n${error.stack}\n`;
        }
    }

    writeLog(logEntry);
}

/**
 * 일반 로그 메시지 기록
 */
export function logMessage(level: 'INFO' | 'WARN' | 'ERROR', message: string) {
    const timestamp = `[${getDateString()} ${getTimeString()}]`;
    const logEntry = `${timestamp} [${level}] ${message}`;
    writeLog(logEntry);
}

/**
 * 쿼리 실행 시간 측정 헬퍼
 */
export function createQueryTimer() {
    const startTime = Date.now();
    return {
        getElapsed: () => Date.now() - startTime,
    };
}

export default {
    logQuery,
    logMessage,
    createQueryTimer,
};
