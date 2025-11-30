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


}
