package com.dowinsys.cost.monthly;

import java.util.List;
import java.util.Map;

/**
 * COST001 Service Interface
 * 부서별 월별 원가 조회
 */
public interface COST001Service {
    
    /**
     * 원가 데이터 조회
     */
    List<Map<String, Object>> search(Map<String, Object> params);
    
    /**
     * 원가 데이터 생성
     */
    Map<String, Object> create(Map<String, Object> data);
    
    /**
     * 원가 데이터 수정
     */
    Map<String, Object> update(Map<String, Object> data);
    
    /**
     * 원가 데이터 삭제
     */
    Map<String, Object> delete(String id);
}
