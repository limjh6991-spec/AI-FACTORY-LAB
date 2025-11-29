package com.dowinsys.system.menu.mapper;

import com.dowinsys.system.menu.dto.SystemMenuDto;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;
import java.util.Map;

/**
 * 메뉴 관리 Mapper 인터페이스
 */
@Mapper
public interface SystemMenuMapper {
    
    /**
     * 메뉴 목록 조회 (전체)
     */
    List<SystemMenuDto> selectMenuList();
    
    /**
     * 메뉴 추가
     */
    int insertMenu(Map<String, Object> menuData);
    
    /**
     * 메뉴 수정
     */
    int updateMenu(Map<String, Object> menuData);
    
    /**
     * 메뉴 삭제
     */
    int deleteMenu(String menuId);
}
