package com.dowinsys.demo.service.impl;

import com.dowinsys.demo.mapper.DemoMapper;
import com.dowinsys.demo.service.DemoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * RealGrid Demo Service Implementation
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class DemoServiceImpl implements DemoService {
    
    private final DemoMapper demoMapper;
    
    @Override
    public List<Map<String, Object>> selectGrid1List() {
        log.debug("Grid1 주문 데이터 조회 (DB)");
        return demoMapper.selectGrid1List();
    }
    
    @Override
    public List<Map<String, Object>> selectGrid2List() {
        log.debug("Grid2 직원 데이터 조회 (DB)");
        return demoMapper.selectGrid2List();
    }
    
    @Override
    public List<Map<String, Object>> selectGrid3List() {
        log.debug("Grid3 판매 실적 데이터 조회 (DB)");
        return demoMapper.selectGrid3List();
    }
}
