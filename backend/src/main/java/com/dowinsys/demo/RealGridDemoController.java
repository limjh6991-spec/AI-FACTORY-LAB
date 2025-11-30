package com.dowinsys.demo;

import com.dowinsys.demo.service.DemoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * RealGrid Demo용 DB 연동 Controller
 */
@Slf4j
@RestController
@RequestMapping("/api/demo")
@RequiredArgsConstructor
public class RealGridDemoController {

    private final DemoService demoService;

    /**
     * Grid 1: Column Layout - DB 조회
     */
    @GetMapping("/grid1/list")
    public ResponseEntity<?> getGrid1Data() {
        log.info("Grid1 데이터 조회 (DB)");
        
        List<Map<String, Object>> data = demoService.selectGrid1List();
        
        log.info("Grid1 조회 완료: {} 건", data.size());
        
        return ResponseEntity.ok(Map.of(
            "list", data,
            "total", data.size()
        ));
    }

    /**
     * Grid 2: Cell Merging - DB 조회
     */
    @GetMapping("/grid2/list")
    public ResponseEntity<?> getGrid2Data() {
        log.info("Grid2 데이터 조회 (DB)");
        
        List<Map<String, Object>> data = demoService.selectGrid2List();
        
        log.info("Grid2 조회 완료: {} 건", data.size());
        
        return ResponseEntity.ok(Map.of(
            "list", data,
            "total", data.size()
        ));
    }

    /**
     * Grid 3: Combined Example - DB 조회
     */
    @GetMapping("/grid3/list")
    public ResponseEntity<?> getGrid3Data() {
        log.info("Grid3 데이터 조회 (DB)");
        
        List<Map<String, Object>> data = demoService.selectGrid3List();
        
        log.info("Grid3 조회 완료: {} 건", data.size());
        
        return ResponseEntity.ok(Map.of(
            "list", data,
            "total", data.size()
        ));
    }
}
