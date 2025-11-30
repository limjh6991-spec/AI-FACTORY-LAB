#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Java Backend 코드 생성기
JSON Schema를 기반으로 Spring Boot Controller, Service, Mapper XML을 생성합니다.
"""

import json
import os
from datetime import datetime
from typing import Dict, List, Any


class JavaGenerator:
    """Java Backend 코드 생성기"""
    
    def __init__(self, json_schema: Dict[str, Any]):
        """
        초기화
        
        Args:
            json_schema: JSON Schema 데이터
        """
        self.schema = json_schema
        self.page_info = json_schema.get('pageInfo', {})
        self.page_id = self.page_info.get('pageId', 'Unknown')
        self.page_title = self.page_info.get('pageTitle', '제목 없음')
        self.category = self.page_info.get('category', 'common')
        self.table_name = json_schema.get('database', {}).get('tableName', 'unknown_table')
        self.grid_columns = json_schema.get('gridColumns', [])
        self.api_definitions = json_schema.get('apiDefinitions', [])
        self.buttons = json_schema.get('buttonDefinitions', [])
        
    def generate_controller(self) -> str:
        """Spring Boot Controller 생성"""
        
        # 패키지명
        package = f"com.dowinsys.{self.category}"
        
        # API 메소드들 생성
        api_methods = []
        for api in self.api_definitions:
            api_name = api.get('apiName', '')
            method = api.get('method', 'GET')
            endpoint = api.get('endpoint', '')
            description = api.get('description', '')
            
            if api_name == 'search':
                api_methods.append(self._generate_search_method(endpoint, description))
            elif api_name == 'save':
                api_methods.append(self._generate_save_method(endpoint, description))
            elif api_name == 'delete':
                api_methods.append(self._generate_delete_method(endpoint, description))
            elif api_name == 'confirm':
                api_methods.append(self._generate_confirm_method(endpoint, description))
            elif api_name == 'uploadExcel':
                api_methods.append(self._generate_upload_excel_method(endpoint, description))
            elif api_name == 'downloadExcel':
                api_methods.append(self._generate_download_excel_method(endpoint, description))
        
        controller_code = f"""package {package};

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
 * {self.page_title} Controller
 * 자동 생성일: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
 */
@Slf4j
@RestController
@RequestMapping("/api/{self.category}")
@RequiredArgsConstructor
public class {self.page_id}Controller {{

    private final {self.page_id}Service service;

{chr(10).join(api_methods)}
}}
"""
        return controller_code
    
    def _generate_search_method(self, endpoint: str, description: str) -> str:
        """조회 메소드 생성"""
        return f"""    /**
     * {description}
     */
    @GetMapping("/result/list")
    public ResponseEntity<Map<String, Object>> getList(@RequestParam Map<String, Object> params) {{
        log.info("{self.page_title} 조회 요청: {{}}", params);
        try {{
            List<Map<String, Object>> list = service.getList(params);
            int totalCount = service.getCount(params);
            
            Map<String, Object> result = Map.of(
                "success", true,
                "data", list,
                "totalCount", totalCount
            );
            return ResponseEntity.ok(result);
        }} catch (Exception e) {{
            log.error("{self.page_title} 조회 오류", e);
            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "message", e.getMessage()));
        }}
    }}"""
    
    def _generate_save_method(self, endpoint: str, description: str) -> str:
        """저장 메소드 생성"""
        return f"""
    /**
     * {description}
     */
    @PostMapping("/result/save")
    public ResponseEntity<Map<String, Object>> save(@RequestBody Map<String, Object> data) {{
        log.info("{self.page_title} 저장 요청: {{}}", data);
        try {{
            service.save(data);
            return ResponseEntity.ok(Map.of("success", true, "message", "저장되었습니다."));
        }} catch (Exception e) {{
            log.error("{self.page_title} 저장 오류", e);
            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "message", e.getMessage()));
        }}
    }}"""
    
    def _generate_delete_method(self, endpoint: str, description: str) -> str:
        """삭제 메소드 생성"""
        return f"""
    /**
     * {description}
     */
    @DeleteMapping("/result/delete")
    public ResponseEntity<Map<String, Object>> delete(@RequestBody Map<String, Object> data) {{
        log.info("{self.page_title} 삭제 요청: {{}}", data);
        try {{
            service.delete(data);
            return ResponseEntity.ok(Map.of("success", true, "message", "삭제되었습니다."));
        }} catch (Exception e) {{
            log.error("{self.page_title} 삭제 오류", e);
            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "message", e.getMessage()));
        }}
    }}"""
    
    def _generate_confirm_method(self, endpoint: str, description: str) -> str:
        """확정 메소드 생성"""
        return f"""
    /**
     * {description}
     */
    @PostMapping("/result/confirm")
    public ResponseEntity<Map<String, Object>> confirm(@RequestBody Map<String, Object> data) {{
        log.info("{self.page_title} 확정 요청: {{}}", data);
        try {{
            service.confirm(data);
            return ResponseEntity.ok(Map.of("success", true, "message", "확정되었습니다."));
        }} catch (Exception e) {{
            log.error("{self.page_title} 확정 오류", e);
            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "message", e.getMessage()));
        }}
    }}"""
    
    def _generate_upload_excel_method(self, endpoint: str, description: str) -> str:
        """Excel 업로드 메소드 생성"""
        return f"""
    /**
     * {description}
     */
    @PostMapping("/result/excel/upload")
    public ResponseEntity<Map<String, Object>> uploadExcel(@RequestParam("file") MultipartFile file) {{
        log.info("{self.page_title} Excel 업로드 요청: {{}}", file.getOriginalFilename());
        try {{
            int count = service.uploadExcel(file);
            return ResponseEntity.ok(Map.of(
                "success", true, 
                "message", count + "건의 데이터가 업로드되었습니다.",
                "count", count
            ));
        }} catch (Exception e) {{
            log.error("{self.page_title} Excel 업로드 오류", e);
            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "message", e.getMessage()));
        }}
    }}"""
    
    def _generate_download_excel_method(self, endpoint: str, description: str) -> str:
        """Excel 다운로드 메소드 생성"""
        return f"""
    /**
     * {description}
     */
    @GetMapping("/result/excel/download")
    public ResponseEntity<Resource> downloadExcel(@RequestParam Map<String, Object> params) {{
        log.info("{self.page_title} Excel 다운로드 요청: {{}}", params);
        try {{
            byte[] excelData = service.downloadExcel(params);
            ByteArrayResource resource = new ByteArrayResource(excelData);
            
            String filename = "{self.page_id}_" + 
                java.time.LocalDateTime.now().format(
                    java.time.format.DateTimeFormatter.ofPattern("yyyyMMddHHmmss")
                ) + ".xlsx";
            
            return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\\"" + filename + "\\"")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(resource);
        }} catch (Exception e) {{
            log.error("{self.page_title} Excel 다운로드 오류", e);
            return ResponseEntity.internalServerError().build();
        }}
    }}"""
    
    def generate_service(self) -> str:
        """Spring Boot Service Interface 생성"""
        
        package = f"com.dowinsys.{self.category}"
        
        service_code = f"""package {package};

import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;

/**
 * {self.page_title} Service Interface
 * 자동 생성일: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
 */
public interface {self.page_id}Service {{

    /**
     * 목록 조회
     */
    List<Map<String, Object>> getList(Map<String, Object> params);
    
    /**
     * 전체 건수 조회
     */
    int getCount(Map<String, Object> params);
    
    /**
     * 저장 (등록/수정)
     */
    void save(Map<String, Object> data);
    
    /**
     * 삭제
     */
    void delete(Map<String, Object> data);
    
    /**
     * 확정
     */
    void confirm(Map<String, Object> data);
    
    /**
     * Excel 업로드
     */
    int uploadExcel(MultipartFile file) throws Exception;
    
    /**
     * Excel 다운로드
     */
    byte[] downloadExcel(Map<String, Object> params) throws Exception;
}}
"""
        return service_code
    
    def generate_service_impl(self) -> str:
        """Spring Boot Service Implementation 생성"""
        
        package = f"com.dowinsys.{self.category}"
        
        service_impl_code = f"""package {package};

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

/**
 * {self.page_title} Service Implementation
 * 자동 생성일: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class {self.page_id}ServiceImpl implements {self.page_id}Service {{

    private final {self.page_id}Mapper mapper;

    @Override
    public List<Map<String, Object>> getList(Map<String, Object> params) {{
        return mapper.selectList(params);
    }}

    @Override
    public int getCount(Map<String, Object> params) {{
        return mapper.selectCount(params);
    }}

    @Override
    @Transactional
    public void save(Map<String, Object> data) {{
        Object resultId = data.get("resultId");
        
        if (resultId == null || resultId.toString().isEmpty()) {{
            // 신규 등록
            mapper.insert(data);
        }} else {{
            // 수정
            mapper.update(data);
        }}
    }}

    @Override
    @Transactional
    public void delete(Map<String, Object> data) {{
        mapper.delete(data);
    }}

    @Override
    @Transactional
    public void confirm(Map<String, Object> data) {{
        mapper.confirm(data);
    }}

    @Override
    @Transactional
    public int uploadExcel(MultipartFile file) throws Exception {{
        // TODO: Excel 파일 파싱 및 데이터 저장 구현
        log.warn("Excel 업로드 기능은 아직 구현되지 않았습니다.");
        return 0;
    }}

    @Override
    public byte[] downloadExcel(Map<String, Object> params) throws Exception {{
        // TODO: Excel 파일 생성 및 다운로드 구현
        log.warn("Excel 다운로드 기능은 아직 구현되지 않았습니다.");
        return new byte[0];
    }}
}}
"""
        return service_impl_code
    
    def generate_mapper_interface(self) -> str:
        """MyBatis Mapper Interface 생성"""
        
        package = f"com.dowinsys.{self.category}"
        
        mapper_code = f"""package {package};

import org.apache.ibatis.annotations.Mapper;
import java.util.List;
import java.util.Map;

/**
 * {self.page_title} Mapper Interface
 * 자동 생성일: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
 */
@Mapper
public interface {self.page_id}Mapper {{

    /**
     * 목록 조회
     */
    List<Map<String, Object>> selectList(Map<String, Object> params);
    
    /**
     * 전체 건수 조회
     */
    int selectCount(Map<String, Object> params);
    
    /**
     * 등록
     */
    void insert(Map<String, Object> data);
    
    /**
     * 수정
     */
    void update(Map<String, Object> data);
    
    /**
     * 삭제
     */
    void delete(Map<String, Object> data);
    
    /**
     * 확정
     */
    void confirm(Map<String, Object> data);
}}
"""
        return mapper_code
    
    def generate_mapper_xml(self) -> str:
        """MyBatis Mapper XML 생성"""
        
        # 컬럼 목록 생성
        columns = []
        for col in self.grid_columns:
            field_name = col.get('fieldName', '')
            if field_name and field_name != 'rowNum':  # rowNum은 제외
                columns.append(field_name)
        
        # SELECT 컬럼 목록 (snake_case)
        select_columns = ',\n        '.join([self._camel_to_snake(col) for col in columns])
        
        # INSERT 컬럼 목록
        insert_columns = ',\n            '.join([self._camel_to_snake(col) for col in columns if col != 'resultId'])
        insert_values = ',\n            '.join([f"#{{{col}}}" for col in columns if col != 'resultId'])
        
        # UPDATE SET 절
        update_sets = []
        for col in columns:
            if col not in ['resultId', 'createDate', 'createUser']:  # PK와 생성정보는 제외
                snake_col = self._camel_to_snake(col)
                update_sets.append(f"{snake_col} = #{{{col}}}")
        update_set_clause = ',\n            '.join(update_sets)
        
        mapper_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" 
    "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.dowinsys.{self.category}.{self.page_id}Mapper">

    <!-- {self.page_title} 목록 조회 -->
    <select id="selectList" parameterType="map" resultType="map">
        SELECT
        {select_columns}
        FROM {self.table_name}
        WHERE 1=1
        <if test="prdDateFrom != null and prdDateFrom != ''">
            AND prd_date &gt;= #{{prdDateFrom}}
        </if>
        <if test="prdDateTo != null and prdDateTo != ''">
            AND prd_date &lt;= #{{prdDateTo}}
        </if>
        <if test="factoryCd != null and factoryCd != ''">
            AND factory_cd = #{{factoryCd}}
        </if>
        <if test="lineCd != null and lineCd != ''">
            AND line_cd = #{{lineCd}}
        </if>
        <if test="shiftCd != null and shiftCd != ''">
            AND shift_cd = #{{shiftCd}}
        </if>
        <if test="itemCd != null and itemCd != ''">
            AND item_cd LIKE '%' + #{{itemCd}} + '%'
        </if>
        <if test="itemNm != null and itemNm != ''">
            AND item_nm LIKE '%' + #{{itemNm}} + '%'
        </if>
        <if test="workerId != null and workerId != ''">
            AND worker_id = #{{workerId}}
        </if>
        <if test="status != null and status != ''">
            AND status = #{{status}}
        </if>
        <if test="confirmYn != null and confirmYn != ''">
            AND confirm_yn = #{{confirmYn}}
        </if>
        ORDER BY prd_date DESC, result_id DESC
        <if test="pageSize != null and pageNum != null">
            OFFSET (#{{pageNum}} - 1) * #{{pageSize}} ROWS
            FETCH NEXT #{{pageSize}} ROWS ONLY
        </if>
    </select>

    <!-- {self.page_title} 전체 건수 조회 -->
    <select id="selectCount" parameterType="map" resultType="int">
        SELECT COUNT(*)
        FROM {self.table_name}
        WHERE 1=1
        <if test="prdDateFrom != null and prdDateFrom != ''">
            AND prd_date &gt;= #{{prdDateFrom}}
        </if>
        <if test="prdDateTo != null and prdDateTo != ''">
            AND prd_date &lt;= #{{prdDateTo}}
        </if>
        <if test="factoryCd != null and factoryCd != ''">
            AND factory_cd = #{{factoryCd}}
        </if>
        <if test="lineCd != null and lineCd != ''">
            AND line_cd = #{{lineCd}}
        </if>
        <if test="shiftCd != null and shiftCd != ''">
            AND shift_cd = #{{shiftCd}}
        </if>
        <if test="itemCd != null and itemCd != ''">
            AND item_cd LIKE '%' + #{{itemCd}} + '%'
        </if>
        <if test="itemNm != null and itemNm != ''">
            AND item_nm LIKE '%' + #{{itemNm}} + '%'
        </if>
        <if test="workerId != null and workerId != ''">
            AND worker_id = #{{workerId}}
        </if>
        <if test="status != null and status != ''">
            AND status = #{{status}}
        </if>
        <if test="confirmYn != null and confirmYn != ''">
            AND confirm_yn = #{{confirmYn}}
        </if>
    </select>

    <!-- {self.page_title} 등록 -->
    <insert id="insert" parameterType="map">
        INSERT INTO {self.table_name} (
            {insert_columns}
        ) VALUES (
            {insert_values}
        )
    </insert>

    <!-- {self.page_title} 수정 -->
    <update id="update" parameterType="map">
        UPDATE {self.table_name}
        SET
            {update_set_clause}
        WHERE result_id = #{{resultId}}
    </update>

    <!-- {self.page_title} 삭제 -->
    <delete id="delete" parameterType="map">
        DELETE FROM {self.table_name}
        WHERE result_id = #{{resultId}}
    </delete>

    <!-- {self.page_title} 확정 -->
    <update id="confirm" parameterType="map">
        UPDATE {self.table_name}
        SET
            status = 'CONFIRM',
            confirm_yn = 'Y',
            confirm_date = GETDATE(),
            confirm_user = #{{userId}}
        WHERE result_id = #{{resultId}}
    </update>

</mapper>
"""
        return mapper_xml
    
    def _camel_to_snake(self, camel_str: str) -> str:
        """camelCase를 snake_case로 변환"""
        result = []
        for i, char in enumerate(camel_str):
            if char.isupper() and i > 0:
                result.append('_')
            result.append(char.lower())
        return ''.join(result)


def generate_backend_code(json_file_path: str, output_dir: str):
    """
    JSON Schema 파일을 읽어서 Backend 코드 생성
    
    Args:
        json_file_path: JSON Schema 파일 경로
        output_dir: 출력 디렉토리
    """
    # JSON 파일 읽기
    with open(json_file_path, 'r', encoding='utf-8') as f:
        schema = json.load(f)
    
    # 생성기 초기화
    generator = JavaGenerator(schema)
    
    # 출력 디렉토리 생성
    java_dir = os.path.join(output_dir, 'java')
    mapper_dir = os.path.join(output_dir, 'mapper')
    os.makedirs(java_dir, exist_ok=True)
    os.makedirs(mapper_dir, exist_ok=True)
    
    # Controller 생성
    controller_code = generator.generate_controller()
    controller_file = os.path.join(java_dir, f'{generator.page_id}Controller.java')
    with open(controller_file, 'w', encoding='utf-8') as f:
        f.write(controller_code)
    print(f"✅ Controller 생성: {controller_file}")
    
    # Service Interface 생성
    service_code = generator.generate_service()
    service_file = os.path.join(java_dir, f'{generator.page_id}Service.java')
    with open(service_file, 'w', encoding='utf-8') as f:
        f.write(service_code)
    print(f"✅ Service 생성: {service_file}")
    
    # Service Implementation 생성
    service_impl_code = generator.generate_service_impl()
    service_impl_file = os.path.join(java_dir, f'{generator.page_id}ServiceImpl.java')
    with open(service_impl_file, 'w', encoding='utf-8') as f:
        f.write(service_impl_code)
    print(f"✅ ServiceImpl 생성: {service_impl_file}")
    
    # Mapper Interface 생성
    mapper_interface_code = generator.generate_mapper_interface()
    mapper_interface_file = os.path.join(java_dir, f'{generator.page_id}Mapper.java')
    with open(mapper_interface_file, 'w', encoding='utf-8') as f:
        f.write(mapper_interface_code)
    print(f"✅ Mapper Interface 생성: {mapper_interface_file}")
    
    # Mapper XML 생성
    mapper_xml_code = generator.generate_mapper_xml()
    mapper_xml_file = os.path.join(mapper_dir, f'{generator.page_id}Mapper.xml')
    with open(mapper_xml_file, 'w', encoding='utf-8') as f:
        f.write(mapper_xml_code)
    print(f"✅ Mapper XML 생성: {mapper_xml_file}")
    
    print(f"\n🎉 Backend 코드 생성 완료!")
    print(f"   - Controller: {generator.page_id}Controller.java")
    print(f"   - Service: {generator.page_id}Service.java")
    print(f"   - ServiceImpl: {generator.page_id}ServiceImpl.java")
    print(f"   - Mapper Interface: {generator.page_id}Mapper.java")
    print(f"   - Mapper XML: {generator.page_id}Mapper.xml")


if __name__ == '__main__':
    import sys
    
    if len(sys.argv) < 2:
        print("사용법: python generator_java.py <JSON파일경로>")
        sys.exit(1)
    
    json_file = sys.argv[1]
    output_dir = os.path.dirname(json_file)
    
    generate_backend_code(json_file, output_dir)
