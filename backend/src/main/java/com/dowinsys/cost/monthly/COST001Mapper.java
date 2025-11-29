package com.dowinsys.cost.monthly;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;
import java.util.Map;

/**
 * COST001 Mapper Interface
 * 부서별 월별 원가 조회
 */
@Mapper
public interface COST001Mapper {
    
    /**
     * 원가 데이터 조회
     */
    List<Map<String, Object>> search(Map<String, Object> params);
    
    /**
     * 원가 데이터 생성
     */
    int create(Map<String, Object> data);
    
    /**
     * 원가 데이터 수정
     */
    int update(Map<String, Object> data);
    
    /**
     * 원가 데이터 삭제
     */
    int delete(String id);
}
