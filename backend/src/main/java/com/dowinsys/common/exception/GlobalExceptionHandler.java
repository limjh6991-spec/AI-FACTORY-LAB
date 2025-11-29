package com.dowinsys.common.exception;

import com.dowinsys.common.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 전역 예외 처리기
 * 모든 컨트롤러에서 발생하는 예외를 여기서 처리
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    /**
     * 일반 예외 처리
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResponse<Void> handleException(Exception e) {
        log.error("예외 발생: ", e);
        return ApiResponse.error("INTERNAL_ERROR", e.getMessage());
    }
    
    /**
     * IllegalArgumentException 처리
     */
    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse<Void> handleIllegalArgumentException(IllegalArgumentException e) {
        log.warn("잘못된 요청: {}", e.getMessage());
        return ApiResponse.error("INVALID_ARGUMENT", e.getMessage());
    }
    
    /**
     * NullPointerException 처리
     */
    @ExceptionHandler(NullPointerException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResponse<Void> handleNullPointerException(NullPointerException e) {
        log.error("Null 예외 발생: ", e);
        return ApiResponse.error("NULL_POINTER", "필수 데이터가 누락되었습니다.");
    }
}
