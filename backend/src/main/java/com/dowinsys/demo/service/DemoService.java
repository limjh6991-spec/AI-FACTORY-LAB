package com.dowinsys.demo.service;

import java.util.List;
import java.util.Map;

/**
 * RealGrid Demo Service Interface
 */
public interface DemoService {
    
    /**
     * Grid1: 주문 데이터 조회
     */
    List<Map<String, Object>> selectGrid1List();
    
    /**
     * Grid2: 직원 데이터 조회
     */
    List<Map<String, Object>> selectGrid2List();
    
    /**
     * Grid3: 판매 실적 데이터 조회
     */
    List<Map<String, Object>> selectGrid3List();
}
