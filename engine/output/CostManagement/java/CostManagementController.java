package com.dowinsys.cost;

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
 * 원가 관리 Controller
 * 자동 생성일: 2025-11-30 13:34:00
 */
@Slf4j
@RestController
@RequestMapping("/api/cost")
@RequiredArgsConstructor
public class CostManagementController {

    private final CostManagementService service;


}
