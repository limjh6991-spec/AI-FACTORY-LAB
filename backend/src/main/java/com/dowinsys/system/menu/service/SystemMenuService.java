package com.dowinsys.system.menu.service;

import com.dowinsys.system.menu.dto.SystemMenuDto;
import java.util.List;
import java.util.Map;

/**
 * 메뉴 관리 Service 인터페이스
 */
public interface SystemMenuService {
    
    /**
     * 메뉴 목록 조회 (트리 구조)
     */
    List<SystemMenuDto> getMenuTree();
    
    /**
     * 메뉴 추가
     */
    Map<String, Object> addMenu(Map<String, Object> menuData);
    
    /**
     * 메뉴 수정
     */
    Map<String, Object> updateMenu(Map<String, Object> menuData);
    
    /**
     * 메뉴 삭제
     */
    Map<String, Object> deleteMenu(String menuId);
}
