package com.dowinsys.production;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ByteArrayResource;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

/**
 * 생산 실적 관리 Controller
 * 자동 생성일: 2025-11-30 13:30:54
 */
@Slf4j
@RestController
@RequestMapping("/api/production")
@RequiredArgsConstructor
public class ProductionResultController {

    private final ProductionResultService service;

    /**
     * 생산 실적 목록 조회
     */
    @GetMapping("/result/list")
    public ResponseEntity<?> getList(
            @RequestParam(required = false) String prdDateFrom,
            @RequestParam(required = false) String prdDateTo,
            @RequestParam(required = false) String factoryCd,
            @RequestParam(required = false) String lineCd,
            @RequestParam(required = false) String shiftCd,
            @RequestParam(required = false) String itemCd,
            @RequestParam(required = false) String itemNm,
            @RequestParam(required = false) String workerId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String confirmYn,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        log.info("생산 실적 목록 조회 - page: {}, size: {}", page, size);
        
        Map<String, Object> params = new HashMap<>();
        params.put("prdDateFrom", prdDateFrom != null ? prdDateFrom : "");
        params.put("prdDateTo", prdDateTo != null ? prdDateTo : "");
        params.put("factoryCd", factoryCd != null ? factoryCd : "");
        params.put("lineCd", lineCd != null ? lineCd : "");
        params.put("shiftCd", shiftCd != null ? shiftCd : "");
        params.put("itemCd", itemCd != null ? itemCd : "");
        params.put("itemNm", itemNm != null ? itemNm : "");
        params.put("workerId", workerId != null ? workerId : "");
        params.put("status", status != null ? status : "");
        params.put("confirmYn", confirmYn != null ? confirmYn : "");
        params.put("page", page);
        params.put("size", size);
        
        // 임시 응답 (Service 구현 전까지)
        Map<String, Object> response = new HashMap<>();
        response.put("list", List.of());
        response.put("total", 0);
        response.put("page", page);
        response.put("size", size);
        
        return ResponseEntity.ok(response);
    }

    /**
     * 생산 실적 저장
     */
    @PostMapping("/result")
    public ResponseEntity<?> save(@RequestBody List<Map<String, Object>> dataList) {
        log.info("생산 실적 저장 - 건수: {}", dataList.size());
        // service.save(dataList);
        return ResponseEntity.ok(Map.of("message", "저장되었습니다."));
    }

    /**
     * 생산 실적 삭제
     */
    @DeleteMapping("/result")
    public ResponseEntity<?> delete(@RequestBody Map<String, List<Long>> request) {
        List<Long> ids = request.get("ids");
        log.info("생산 실적 삭제 - 건수: {}", ids.size());
        // service.delete(ids);
        return ResponseEntity.ok(Map.of("message", "삭제되었습니다."));
    }

    /**
     * 생산 실적 확정
     */
    @PostMapping("/result/confirm")
    public ResponseEntity<?> confirm(@RequestBody Map<String, List<Long>> request) {
        List<Long> ids = request.get("ids");
        log.info("생산 실적 확정 - 건수: {}", ids.size());
        // service.confirm(ids);
        return ResponseEntity.ok(Map.of("message", "확정되었습니다."));
    }

    /**
     * Excel 템플릿 다운로드
     */
    @GetMapping("/result/template")
    public ResponseEntity<Resource> downloadTemplate() {
        log.info("Excel 템플릿 다운로드");
        byte[] data = new byte[0]; // service.generateTemplate();
        ByteArrayResource resource = new ByteArrayResource(data);
        
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=production_result_template.xlsx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

    /**
     * Excel 업로드
     */
    @PostMapping("/result/upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) {
        log.info("Excel 업로드 - 파일명: {}", file.getOriginalFilename());
        int count = 0; // service.uploadExcel(file);
        return ResponseEntity.ok(Map.of("message", count + "건이 업로드되었습니다.", "count", count));
    }

    /**
     * Excel 다운로드
     */
    @PostMapping("/result/download")
    public ResponseEntity<Resource> download(@RequestBody Map<String, Object> params) {
        log.info("Excel 다운로드");
        byte[] data = new byte[0]; // service.downloadExcel(params);
        ByteArrayResource resource = new ByteArrayResource(data);
        
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=production_result.xlsx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }


}
