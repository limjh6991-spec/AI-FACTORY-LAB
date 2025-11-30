package com.dowinsys.cost.monthly;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

/**
 * 부서별 월별 원가 조회 Controller
 * 생성일: 2025-11-29
 */
@Slf4j
@RestController
@RequestMapping("/api/v1/cost")
@RequiredArgsConstructor
public class COST001Controller {

    private final COST001Service service;

    /**
     * 부서별 월별 원가 조회 조회
     */
    @PostMapping("/COST001/search")
    public List<Map<String, Object>> search(@RequestBody Map<String, Object> params) {
        log.info("부서별 월별 원가 조회 조회 요청: {}", params);
        return service.search(params);
    }

    /**
     * 부서별 월별 원가 조회 생성
     */
    @PostMapping("/COST001/create")
    public Map<String, Object> create(@RequestBody Map<String, Object> data) {
        log.info("부서별 월별 원가 조회 생성 요청: {}", data);
        return service.create(data);
    }

    /**
     * 부서별 월별 원가 조회 수정
     */
    @PutMapping("/COST001/update")
    public Map<String, Object> update(@RequestBody Map<String, Object> data) {
        log.info("부서별 월별 원가 조회 수정 요청: {}", data);
        return service.update(data);
    }

    /**
     * 부서별 월별 원가 조회 삭제
     */
    @DeleteMapping("/COST001/delete/{id}")
    public Map<String, Object> delete(@PathVariable String id) {
        log.info("부서별 월별 원가 조회 삭제 요청: {}", id);
        return service.delete(id);
    }
}
