package com.dowinsys.system.menu.service;

import com.dowinsys.system.menu.dto.SystemMenuDto;
import com.dowinsys.system.menu.mapper.SystemMenuMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * 메뉴 관리 Service 구현체
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SystemMenuServiceImpl implements SystemMenuService {
    
    private final SystemMenuMapper menuMapper;
    
    /**
     * 메뉴 목록 조회 (트리 구조)
     * 1. 전체 메뉴 조회
     * 2. 계층형 트리 구조로 변환
     * 3. sortNo 기준 정렬
     */
    @Override
    public List<SystemMenuDto> getMenuTree() {
        log.info("메뉴 트리 조회 시작");
        
        // 1. 전체 메뉴 조회
        List<SystemMenuDto> allMenus = menuMapper.selectMenuList();
        
        if (allMenus == null || allMenus.isEmpty()) {
            log.warn("조회된 메뉴가 없습니다.");
            return new ArrayList<>();
        }
        
        // 2. 트리 구조로 변환
        List<SystemMenuDto> treeMenus = buildMenuTree(allMenus);
        
        log.info("메뉴 트리 조회 완료: {} 개의 루트 메뉴", treeMenus.size());
        return treeMenus;
    }
    
    /**
     * 평면 메뉴 리스트를 계층형 트리로 변환
     * 
     * @param flatMenus 평면 메뉴 리스트
     * @return 트리 구조 메뉴 리스트
     */
    private List<SystemMenuDto> buildMenuTree(List<SystemMenuDto> flatMenus) {
        // 1. 메뉴 ID를 키로 하는 맵 생성 (빠른 조회를 위해)
        Map<String, SystemMenuDto> menuMap = flatMenus.stream()
                .collect(Collectors.toMap(SystemMenuDto::getMenuId, menu -> menu));
        
        // 2. 루트 메뉴 리스트
        List<SystemMenuDto> rootMenus = new ArrayList<>();
        
        // 3. 각 메뉴를 순회하며 부모-자식 관계 설정
        for (SystemMenuDto menu : flatMenus) {
            String upMenuId = menu.getUpMenuId();
            
            // 상위 메뉴 ID가 없으면 루트 메뉴
            if (upMenuId == null || upMenuId.trim().isEmpty()) {
                rootMenus.add(menu);
            } else {
                // 상위 메뉴를 찾아서 children에 추가
                SystemMenuDto parentMenu = menuMap.get(upMenuId);
                if (parentMenu != null) {
                    parentMenu.getChildren().add(menu);
                } else {
                    // 부모를 찾지 못한 경우 루트로 처리
                    log.warn("상위 메뉴를 찾을 수 없습니다. menuId: {}, upMenuId: {}", 
                            menu.getMenuId(), upMenuId);
                    rootMenus.add(menu);
                }
            }
        }
        
        // 4. 재귀적으로 정렬 (sortNo 기준)
        sortMenuTree(rootMenus);
        
        return rootMenus;
    }
    
    /**
     * 메뉴 트리를 재귀적으로 정렬
     * 
     * @param menus 정렬할 메뉴 리스트
     */
    private void sortMenuTree(List<SystemMenuDto> menus) {
        if (menus == null || menus.isEmpty()) {
            return;
        }
        
        // 현재 레벨 정렬
        menus.sort(Comparator.comparing(SystemMenuDto::getSortNo, 
                Comparator.nullsLast(Comparator.naturalOrder())));
        
        // 하위 메뉴 재귀 정렬
        for (SystemMenuDto menu : menus) {
            if (menu.getChildren() != null && !menu.getChildren().isEmpty()) {
                sortMenuTree(menu.getChildren());
            }
        }
    }
    
    /**
     * 메뉴 추가
     */
    @Override
    @Transactional
    public Map<String, Object> addMenu(Map<String, Object> menuData) {
        log.info("메뉴 추가 요청: {}", menuData);
        
        Map<String, Object> result = new HashMap<>();
        
        try {
            // 메뉴 ID 자동 생성 (필요한 경우)
            if (menuData.get("menuId") == null) {
                String newMenuId = generateMenuId();
                menuData.put("menuId", newMenuId);
            }
            
            // 기본값 설정
            if (menuData.get("useYn") == null) {
                menuData.put("useYn", "Y");
            }
            if (menuData.get("sortNo") == null) {
                menuData.put("sortNo", 99);
            }
            
            int insertCount = menuMapper.insertMenu(menuData);
            
            if (insertCount > 0) {
                result.put("success", true);
                result.put("message", "메뉴가 추가되었습니다.");
                result.put("menuId", menuData.get("menuId"));
            } else {
                result.put("success", false);
                result.put("message", "메뉴 추가에 실패했습니다.");
            }
            
        } catch (Exception e) {
            log.error("메뉴 추가 중 오류 발생", e);
            result.put("success", false);
            result.put("message", "오류 발생: " + e.getMessage());
        }
        
        return result;
    }
    
    /**
     * 메뉴 수정
     */
    @Override
    @Transactional
    public Map<String, Object> updateMenu(Map<String, Object> menuData) {
        log.info("메뉴 수정 요청: {}", menuData);
        
        Map<String, Object> result = new HashMap<>();
        
        try {
            int updateCount = menuMapper.updateMenu(menuData);
            
            if (updateCount > 0) {
                result.put("success", true);
                result.put("message", "메뉴가 수정되었습니다.");
            } else {
                result.put("success", false);
                result.put("message", "수정할 메뉴를 찾을 수 없습니다.");
            }
            
        } catch (Exception e) {
            log.error("메뉴 수정 중 오류 발생", e);
            result.put("success", false);
            result.put("message", "오류 발생: " + e.getMessage());
        }
        
        return result;
    }
    
    /**
     * 메뉴 삭제
     */
    @Override
    @Transactional
    public Map<String, Object> deleteMenu(String menuId) {
        log.info("메뉴 삭제 요청: {}", menuId);
        
        Map<String, Object> result = new HashMap<>();
        
        try {
            int deleteCount = menuMapper.deleteMenu(menuId);
            
            if (deleteCount > 0) {
                result.put("success", true);
                result.put("message", "메뉴가 삭제되었습니다.");
            } else {
                result.put("success", false);
                result.put("message", "삭제할 메뉴를 찾을 수 없습니다.");
            }
            
        } catch (Exception e) {
            log.error("메뉴 삭제 중 오류 발생", e);
            result.put("success", false);
            result.put("message", "오류 발생: " + e.getMessage());
        }
        
        return result;
    }
    
    /**
     * 메뉴 ID 자동 생성
     */
    private String generateMenuId() {
        return "MENU_" + System.currentTimeMillis();
    }
}
