#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
화면생성기 Excel 파서
Excel 템플릿 파일을 읽어 JSON Schema로 변환

사용법:
    python generator_excel.py <excel_file_path> [output_json_path]

예제:
    python generator_excel.py input/screen_template.xlsx output/COST001.json
"""

import sys
import json
import os
from typing import Dict, List, Any, Optional
from datetime import datetime

try:
    import pandas as pd
    import openpyxl
except ImportError:
    print("❌ 필수 라이브러리가 설치되지 않았습니다.")
    print("다음 명령어로 설치해주세요:")
    print("  pip install pandas openpyxl")
    sys.exit(1)


class ExcelToSchemaParser:
    """Excel 템플릿 파일을 JSON Schema로 변환하는 파서"""
    
    def __init__(self, excel_path: str):
        """
        Args:
            excel_path: Excel 템플릿 파일 경로
        """
        self.excel_path = excel_path
        self.workbook = None
        self.schema = {}
        
    def parse(self) -> Dict[str, Any]:
        """
        Excel 파일을 파싱하여 JSON Schema 반환
        
        Returns:
            JSON Schema Dictionary
        """
        print(f"📖 Excel 파일 읽기: {self.excel_path}")
        
        if not os.path.exists(self.excel_path):
            raise FileNotFoundError(f"파일을 찾을 수 없습니다: {self.excel_path}")
        
        # Excel 파일 로드
        self.workbook = pd.ExcelFile(self.excel_path, engine='openpyxl')
        
        # 스키마 초기화
        self.schema = {
            "version": "1.0.0",
            "createdAt": datetime.now().isoformat(),
            "pageInfo": {},
            "features": {
                "search": True,
                "add": True,
                "delete": True,
                "save": True,
                "excelUpload": False,
                "excelDownload": True
            },
            "searchConditions": [],
            "gridColumns": [],
            "buttons": [],
            "api": {}
        }
        
        # 각 시트 파싱
        self._parse_basic_info()
        self._parse_grid_columns()
        self._parse_search_conditions()
        self._parse_button_definitions()
        self._parse_api_definitions()
        
        print("✅ 파싱 완료!")
        return self.schema
    
    def _parse_basic_info(self):
        """Sheet 1: 기본정보 (BasicInfo) 파싱"""
        print("  → 01_BasicInfo 시트 파싱...")
        
        sheet_name = '01_BasicInfo'
        if sheet_name not in self.workbook.sheet_names:
            print(f"    ⚠️  시트를 찾을 수 없습니다: {sheet_name}")
            return
        
        df = pd.read_excel(self.workbook, sheet_name=sheet_name)
        
        # Key-Value 구조로 변환 (한글 컬럼명 지원)
        config = {}
        for _, row in df.iterrows():
            # '항목명' 또는 'Key' 컬럼 확인
            key = str(row.get('항목명', row.get('Key', ''))).strip()
            value = str(row.get('값', row.get('Value', ''))).strip()
            
            if key and value and value != 'nan':
                config[key] = value
        
        # pageInfo 매핑 (한글 키 지원)
        self.schema['pageInfo'] = {
            "pageId": config.get('화면ID', config.get('screenId', '')),
            "pageTitle": config.get('화면명(한글)', config.get('screenName', '')),
            "category": config.get('카테고리', config.get('category', '')),
            "description": config.get('설명', f"{config.get('화면명(한글)', '')} 화면")
        }
        
        # tableName (Backend 생성용)
        table_name = config.get('테이블명', config.get('tableName', ''))
        if table_name:
            self.schema['tableName'] = table_name
        
        # features 설정 (한글 키 지원)
        self.schema['features']['search'] = config.get('검색기능', config.get('hasSearch', 'Y')) != 'N'
        self.schema['features']['add'] = config.get('행 추가 가능', config.get('hasAdd', 'N')) == 'Y'
        self.schema['features']['delete'] = config.get('행 삭제 가능', config.get('hasDelete', 'N')) == 'Y'
        self.schema['features']['excelUpload'] = config.get('Excel 업로드', config.get('hasExcelUpload', 'N')) == 'Y'
        self.schema['features']['excelDownload'] = config.get('Excel 다운로드', config.get('hasExcelDownload', 'Y')) == 'Y'
        
        # Grid 설정
        grid_height = config.get('gridHeight', '600')
        use_virtual_scroll = config.get('useVirtualScroll', 'true').lower() == 'true'
        
        self.schema['gridConfig'] = {
            "height": int(grid_height) if str(grid_height).isdigit() else 600,
            "virtualScrolling": use_virtual_scroll,
            "displayMode": "simple"
        }
        
        print(f"    ✓ 화면 ID: {self.schema['pageInfo']['pageId']}")
        print(f"    ✓ 화면명: {self.schema['pageInfo']['pageTitle']}")
    
    def _parse_grid_columns(self):
        """Sheet 2: 그리드 컬럼 (GridColumns) 파싱"""
        print("  → 02_GridColumns 시트 파싱...")
        
        sheet_name = '02_GridColumns'
        if sheet_name not in self.workbook.sheet_names:
            print(f"    ⚠️  시트를 찾을 수 없습니다: {sheet_name}")
            return
        
        df = pd.read_excel(self.workbook, sheet_name=sheet_name)
        
        excel_mapping = {}
        has_excel_mapping = False
        
        for _, row in df.iterrows():
            # 한글/영문 컬럼명 모두 지원
            field_name = str(row.get('Field Name', row.get('필드명', ''))).strip()
            header = str(row.get('Header Text', row.get('Header', row.get('헤더', '')))).strip()
            
            # 필수 필드 확인
            if not field_name or field_name == 'nan' or not header or header == 'nan':
                continue
            
            # Type 매핑
            col_type = str(row.get('Type', row.get('타입', 'text'))).strip().lower()
            data_type = 'number' if col_type == 'number' else 'text'
            
            # 컬럼 정의
            column = {
                "fieldName": field_name,
                "header": header,
                "dataType": data_type,
                "width": self._parse_int(row.get('Width', row.get('너비', 100))),
                "align": str(row.get('Align', row.get('정렬', 'left'))).strip().lower(),
                "editable": str(row.get('Editable', row.get('편집가능', 'N'))).strip().upper() == 'Y',
                "required": str(row.get('Required', row.get('필수', 'N'))).strip().upper() == 'Y'
            }
            
            # Format 처리
            format_str = str(row.get('Format', row.get('포맷', ''))).strip()
            if format_str and format_str != 'nan':
                if col_type == 'number':
                    column['styles'] = {
                        "numberFormat": format_str
                    }
                elif col_type == 'date':
                    column['dateFormat'] = format_str
            
            # Dropdown 옵션 (Type이 dropdown인 경우)
            if col_type == 'dropdown':
                column['editor'] = {
                    "type": "dropdown"
                }
            
            self.schema['gridColumns'].append(column)
            
            # Excel Mapping 처리 (한글/영문 모두 지원)
            excel_header = str(row.get('Excel Mapping Header', row.get('Excel 매핑 헤더', ''))).strip()
            if excel_header and excel_header != 'nan':
                excel_mapping[excel_header] = field_name
                has_excel_mapping = True
        
        # Excel Upload 기능 활성화
        if has_excel_mapping:
            self.schema['features']['excelUpload'] = True
            self.schema['excelMapping'] = excel_mapping
            print(f"    ✓ Excel Mapping 발견: {len(excel_mapping)}개 컬럼")
        
        print(f"    ✓ 그리드 컬럼: {len(self.schema['gridColumns'])}개")
    
    def _parse_search_conditions(self):
        """Sheet 3: 검색조건 (SearchConditions) 파싱"""
        print("  → 03_SearchConditions 시트 파싱...")
        
        sheet_name = '03_SearchConditions'
        if sheet_name not in self.workbook.sheet_names:
            print(f"    ⚠️  시트를 찾을 수 없습니다: {sheet_name}")
            return
        
        df = pd.read_excel(self.workbook, sheet_name=sheet_name)
        
        for _, row in df.iterrows():
            # 한글/영문 컬럼명 모두 지원
            field_id = str(row.get('Field Name', row.get('Field ID', row.get('필드명', '')))).strip()
            label = str(row.get('Label', row.get('라벨', ''))).strip()
            field_type = str(row.get('Type', row.get('타입', 'text'))).strip().lower()
            
            # 필수 필드 확인
            if not field_id or field_id == 'nan' or not label or label == 'nan':
                continue
            
            # 검색 조건 정의
            condition = {
                "key": field_id,
                "label": label,
                "type": field_type
            }
            
            # Options 처리 (select 타입) - "F001:본사공장,F002:2공장" 형식 지원
            options_str = str(row.get('Options', row.get('옵션', ''))).strip()
            if options_str and options_str != 'nan':
                options = []
                for opt in options_str.split(','):
                    opt = opt.strip()
                    if not opt:
                        continue
                    # "value:label" 형식 체크
                    if ':' in opt:
                        parts = opt.split(':', 1)
                        options.append({
                            "value": parts[0].strip(),
                            "label": parts[1].strip()
                        })
                    else:
                        # 단순 문자열인 경우
                        options.append(opt)
                
                if options:
                    condition['options'] = options
            
            # Default Value
            default_value = str(row.get('Default Value', row.get('기본값', ''))).strip()
            if default_value and default_value != 'nan':
                condition['defaultValue'] = default_value
            
            # Placeholder
            placeholder = str(row.get('Placeholder', row.get('안내문구', ''))).strip()
            if placeholder and placeholder != 'nan':
                condition['placeholder'] = placeholder
            
            self.schema['searchConditions'].append(condition)
        
        print(f"    ✓ 검색 조건: {len(self.schema['searchConditions'])}개")
    
    def _parse_button_definitions(self):
        """Sheet 4: 버튼정의 (ButtonDefinitions) 파싱"""
        print("  → 04_ButtonDefinitions 시트 파싱...")
        
        sheet_name = '04_ButtonDefinitions'
        if sheet_name not in self.workbook.sheet_names:
            print(f"    ⚠️  시트를 찾을 수 없습니다: {sheet_name}")
            return
        
        df = pd.read_excel(self.workbook, sheet_name=sheet_name)
        
        for _, row in df.iterrows():
            # 한글/영문 컬럼명 모두 지원
            button_id = str(row.get('Button ID', row.get('버튼ID', ''))).strip()
            label = str(row.get('Label', row.get('라벨', ''))).strip()
            
            # 필수 필드 확인
            if not button_id or button_id == 'nan' or not label or label == 'nan':
                continue
            
            # 버튼 정의
            button = {
                "id": button_id,
                "label": label,
                "type": str(row.get('Style', row.get('Type', row.get('스타일', 'primary')))).strip().lower(),
                "icon": str(row.get('Icon', row.get('아이콘', ''))).strip(),
                "position": str(row.get('Position', row.get('위치', 'top'))).strip().lower()
            }
            
            # Action
            action = str(row.get('Action', row.get('동작', ''))).strip()
            if action and action != 'nan':
                button['action'] = action
            
            # Confirm Message
            confirm_msg = str(row.get('Confirm Message', row.get('확인메시지', ''))).strip()
            if confirm_msg and confirm_msg != 'nan':
                button['confirmMessage'] = confirm_msg
            
            # API Endpoint
            api_endpoint = str(row.get('API Endpoint', row.get('API 엔드포인트', ''))).strip()
            if api_endpoint and api_endpoint != 'nan':
                button['apiEndpoint'] = api_endpoint
                # API 경로도 schema.api에 추가
                self.schema['api'][button_id] = api_endpoint
            
            self.schema['buttons'].append(button)
        
        print(f"    ✓ 버튼 정의: {len(self.schema['buttons'])}개")
    
    def _parse_api_definitions(self):
        """Sheet 5: API정의 (APIDefinitions) 파싱"""
        print("  → 05_APIDefinitions 시트 파싱...")
        
        sheet_name = '05_APIDefinitions'
        if sheet_name not in self.workbook.sheet_names:
            print(f"    ⚠️  시트를 찾을 수 없습니다: {sheet_name}")
            return
        
        df = pd.read_excel(self.workbook, sheet_name=sheet_name)
        
        for _, row in df.iterrows():
            # 한글/영문 컬럼명 모두 지원
            api_id = str(row.get('API Name', row.get('API ID', row.get('API명', '')))).strip()
            method = str(row.get('HTTP Method', row.get('Method', row.get('메소드', 'GET')))).strip().upper()
            path = str(row.get('Endpoint', row.get('Path', row.get('경로', '')))).strip()
            
            # 필수 필드 확인
            if not api_id or api_id == 'nan' or not path or path == 'nan':
                continue
            
            # API 정의 (schema.api에 추가)
            self.schema['api'][api_id] = path
            
            # Request Params 파싱
            request_params_str = str(row.get('Request Params', row.get('요청파라미터', ''))).strip()
            if request_params_str and request_params_str != 'nan':
                request_params = [p.strip() for p in request_params_str.split(',') if p.strip()]
                # API 상세 정보 저장 (선택사항)
                if 'apiDetails' not in self.schema:
                    self.schema['apiDetails'] = {}
                
                self.schema['apiDetails'][api_id] = {
                    "method": method,
                    "path": path,
                    "requestParams": request_params,
                    "responseField": str(row.get('Response Field', row.get('응답필드', 'data'))).strip()
                }
        
        print(f"    ✓ API 정의: {len(self.schema['api'])}개")
    
    @staticmethod
    def _parse_int(value: Any, default: int = 100) -> int:
        """안전한 정수 변환"""
        try:
            if pd.isna(value):
                return default
            return int(float(value))
        except (ValueError, TypeError):
            return default
    
    def save_to_json(self, output_path: str) -> str:
        """
        파싱된 스키마를 JSON 파일로 저장
        
        Args:
            output_path: 출력 JSON 파일 경로
            
        Returns:
            저장된 파일 경로
        """
        # 디렉토리 생성
        os.makedirs(os.path.dirname(output_path) if os.path.dirname(output_path) else '.', exist_ok=True)
        
        # JSON 파일 저장
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(self.schema, f, ensure_ascii=False, indent=2)
        
        print(f"\n💾 JSON 파일 저장: {output_path}")
        return output_path


def parse_excel_to_schema(file_path: str) -> Dict[str, Any]:
    """
    Excel 파일을 파싱하여 JSON Schema 반환
    
    Args:
        file_path: Excel 템플릿 파일 경로
        
    Returns:
        JSON Schema Dictionary
    """
    parser = ExcelToSchemaParser(file_path)
    return parser.parse()


def main():
    """메인 실행 함수"""
    print("=" * 70)
    print("화면생성기 Excel 파서 v1.0.0")
    print("=" * 70)
    
    # 인자 확인
    if len(sys.argv) < 2:
        print("\n사용법:")
        print(f"  python {sys.argv[0]} <excel_file_path> [output_json_path]")
        print("\n예제:")
        print(f"  python {sys.argv[0]} input/template.xlsx output/COST001.json")
        sys.exit(1)
    
    excel_path = sys.argv[1]
    
    # 출력 경로 결정
    if len(sys.argv) >= 3:
        output_path = sys.argv[2]
    else:
        # 기본 출력 경로: input 파일명 기반
        base_name = os.path.splitext(os.path.basename(excel_path))[0]
        output_path = f"output/{base_name}.json"
    
    try:
        # Excel 파싱
        parser = ExcelToSchemaParser(excel_path)
        schema = parser.parse()
        
        # JSON 파일 저장
        saved_path = parser.save_to_json(output_path)
        
        # 요약 정보
        print("\n" + "=" * 70)
        print("📊 파싱 결과 요약")
        print("=" * 70)
        print(f"화면 ID: {schema['pageInfo']['pageId']}")
        print(f"화면명: {schema['pageInfo']['pageTitle']}")
        print(f"카테고리: {schema['pageInfo']['category']}")
        print(f"그리드 컬럼: {len(schema['gridColumns'])}개")
        print(f"검색 조건: {len(schema['searchConditions'])}개")
        print(f"버튼: {len(schema['buttons'])}개")
        print(f"API: {len(schema['api'])}개")
        
        if 'excelMapping' in schema:
            print(f"Excel Mapping: {len(schema['excelMapping'])}개 컬럼")
        
        print("\n✅ 파싱 완료!")
        print(f"📁 출력 파일: {saved_path}")
        
    except Exception as e:
        print(f"\n❌ 오류 발생: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == '__main__':
    main()
