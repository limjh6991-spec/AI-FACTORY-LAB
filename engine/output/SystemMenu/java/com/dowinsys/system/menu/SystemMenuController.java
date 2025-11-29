package com.dowinsys.system.menu;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

/**
 * 메뉴 관리 Controller
 * 생성일: 2025-11-29
 */
@Slf4j
@RestController
@RequestMapping("/api/system/menu")
@RequiredArgsConstructor
public class SystemMenuController {

    private final SystemMenuService service;

    /**
     * 메뉴 목록 조회 (트리 구조)
     */
    @GetMapping("/tree")
    public List<Map<String, Object>> getMenuTree() {
        log.info("메뉴 트리 조회 요청");
        return service.getMenuTree();
    }

    /**
     * 메뉴 추가
     */
    @PostMapping
    public Map<String, Object> addMenu(@RequestBody Map<String, Object> menuData) {
        log.info("메뉴 추가 요청: {}", menuData);
        return service.addMenu(menuData);
    }

    /**
     * 메뉴 수정
     */
    @PutMapping
    public Map<String, Object> updateMenu(@RequestBody Map<String, Object> menuData) {
        log.info("메뉴 수정 요청: {}", menuData);
        return service.updateMenu(menuData);
    }

    /**
     * 메뉴 삭제
     */
    @DeleteMapping("/{menuId}")
    public Map<String, Object> deleteMenu(@PathVariable String menuId) {
        log.info("메뉴 삭제 요청: {}", menuId);
        return service.deleteMenu(menuId);
    }
}
