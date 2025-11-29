#!/bin/bash

# AI Factory - Menu Generator Runner
# menu_pi.txt를 읽어서 SystemMenu 관련 파일들 생성

PI_FILE="input/menu_pi.txt"
OUTPUT_DIR="output/SystemMenu"

echo "============================================================"
echo "AI Factory - Menu Code Generator"
echo "============================================================"
echo ""

# PI 파일 존재 확인
if [ ! -f "$PI_FILE" ]; then
    echo "❌ 오류: $PI_FILE 파일이 없습니다."
    exit 1
fi

echo "📋 PI 문서: $PI_FILE"
echo ""

# Output 디렉토리 생성
mkdir -p "$OUTPUT_DIR"

# Python 가상환경 활성화 및 generator 실행
cd ../generator
source venv/bin/activate

echo "🤖 Gemini AI 코드 생성 시작..."
echo ""

# generator.py 실행 (menu_pi.txt를 인자로 전달)
python3 << EOF
import sys
sys.path.insert(0, '.')
from generator import CodeGenerator

# PI 문서 읽기
with open('../engine/$PI_FILE', 'r', encoding='utf-8') as f:
    pi_text = f.read()

# 코드 생성
generator = CodeGenerator()
result = generator.generate_code(pi_text)

# 결과 출력 및 파일 저장
import os
output_base = '../engine/$OUTPUT_DIR'
os.makedirs(output_base, exist_ok=True)

for item in result:
    filename = item['filename']
    code = item['code']
    
    # 파일 경로 결정
    if filename.endswith('.json'):
        filepath = os.path.join(output_base, filename)
    elif filename.endswith('.java'):
        # Java 파일은 패키지 구조 생성
        java_dir = os.path.join(output_base, 'java/com/dowinsys/system/menu')
        os.makedirs(java_dir, exist_ok=True)
        filepath = os.path.join(java_dir, filename)
    elif filename.endswith('.xml'):
        # XML 파일은 mapper 폴더에
        mapper_dir = os.path.join(output_base, 'mapper')
        os.makedirs(mapper_dir, exist_ok=True)
        filepath = os.path.join(mapper_dir, filename)
    else:
        filepath = os.path.join(output_base, filename)
    
    # 파일 저장
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(code)
    
    print(f"✅ {filepath}")

print()
print("============================================================")
print("🎉 코드 생성 완료!")
print(f"📁 결과 위치: engine/$OUTPUT_DIR/")
print("============================================================")
EOF

deactivate
cd ../engine
