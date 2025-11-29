package com.dowinsys.cost.monthly;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * COST001 Service Implementation
 * 부서별 월별 원가 조회
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class COST001ServiceImpl implements COST001Service {
    
    private final COST001Mapper mapper;
    
    @Override
    public List<Map<String, Object>> search(Map<String, Object> params) {
        log.info("COST001 조회 서비스 실행: {}", params);
        return mapper.search(params);
    }
    
    @Override
    public Map<String, Object> create(Map<String, Object> data) {
        log.info("COST001 생성 서비스 실행: {}", data);
        int result = mapper.create(data);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", result > 0);
        response.put("message", result > 0 ? "생성 성공" : "생성 실패");
        return response;
    }
    
    @Override
    public Map<String, Object> update(Map<String, Object> data) {
        log.info("COST001 수정 서비스 실행: {}", data);
        int result = mapper.update(data);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", result > 0);
        response.put("message", result > 0 ? "수정 성공" : "수정 실패");
        return response;
    }
    
    @Override
    public Map<String, Object> delete(String id) {
        log.info("COST001 삭제 서비스 실행: {}", id);
        int result = mapper.delete(id);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", result > 0);
        response.put("message", result > 0 ? "삭제 성공" : "삭제 실패");
        return response;
    }
}
