package com.dowinsys.cost;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;
import java.util.Map;

/**
 * 원가 관리 Mapper Interface
 * 자동 생성일: 2025-11-30 13:34:00
 */
@Mapper
public interface CostManagementMapper {

    /**
     * 목록 조회
     */
    List<Map<String, Object>> selectList(Map<String, Object> params);
    
    /**
     * 전체 건수 조회
     */
    int selectCount(Map<String, Object> params);
    
    /**
     * 등록
     */
    void insert(Map<String, Object> data);
    
    /**
     * 수정
     */
    void update(Map<String, Object> data);
    
    /**
     * 삭제
     */
    void delete(Map<String, Object> data);
    
    /**
     * 확정
     */
    void confirm(Map<String, Object> data);
}
