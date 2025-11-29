package com.dowinsys.system.menu.dto;

import lombok.Data;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 메뉴 관리 DTO
 * 생성일: 2025-01-29
 */
@Data
public class SystemMenuDto {
    
    /**
     * 메뉴 ID
     */
    private String menuId;
    
    /**
     * 상위 메뉴 ID
     */
    private String upMenuId;
    
    /**
     * 메뉴명
     */
    private String menuName;
    
    /**
     * 메뉴 URL
     */
    private String menuUrl;
    
    /**
     * 정렬 순서
     */
    private Integer sortNo;
    
    /**
     * 사용 여부 (Y/N)
     */
    private String useYn;
    
    /**
     * 아이콘 클래스
     */
    private String iconCls;
    
    /**
     * 등록일시
     */
    private Date regDt;
    
    /**
     * 하위 메뉴 목록 (트리 구조용)
     */
    private List<SystemMenuDto> children = new ArrayList<>();
}
