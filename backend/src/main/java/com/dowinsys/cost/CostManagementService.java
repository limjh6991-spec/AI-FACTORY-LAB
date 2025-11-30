package com.dowinsys.cost;

import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;

/**
 * 원가 관리 Service Interface
 * 자동 생성일: 2025-11-30 13:34:00
 */
public interface CostManagementService {

    /**
     * 목록 조회
     */
    List<Map<String, Object>> getList(Map<String, Object> params);
    
    /**
     * 전체 건수 조회
     */
    int getCount(Map<String, Object> params);
    
    /**
     * 저장 (등록/수정)
     */
    void save(Map<String, Object> data);
    
    /**
     * 삭제
     */
    void delete(Map<String, Object> data);
    
    /**
     * 확정
     */
    void confirm(Map<String, Object> data);
    
    /**
     * Excel 업로드
     */
    int uploadExcel(MultipartFile file) throws Exception;
    
    /**
     * Excel 다운로드
     */
    byte[] downloadExcel(Map<String, Object> params) throws Exception;
}
