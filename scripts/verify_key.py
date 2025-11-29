#!/usr/bin/env python3
"""
Gemini API 키 진단 스크립트
API 키의 유효성을 확인하고 모델 사용 가능 여부를 테스트합니다.
"""

import os
import sys
from pathlib import Path

# 프로젝트 루트 경로 추가
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root / 'generator'))

try:
    import google.generativeai as genai
    from dotenv import load_dotenv
except ImportError as e:
    print(f"❌ 필수 패키지 누락: {e}")
    print("📦 다음 명령으로 설치하세요:")
    print("   cd generator && source venv/bin/activate")
    print("   pip install google-generativeai python-dotenv")
    sys.exit(1)

def verify_api_key():
    """API 키 유효성 검증"""
    
    print("=" * 60)
    print("🔍 Gemini API 키 진단 시작")
    print("=" * 60)
    
    # 1. .env 파일 로드
    env_path = project_root / 'generator' / '.env'
    print(f"\n📂 .env 파일 경로: {env_path}")
    
    if not env_path.exists():
        print("❌ .env 파일을 찾을 수 없습니다!")
        return False
    
    load_dotenv(env_path)
    api_key = os.getenv('GEMINI_API_KEY')
    
    if not api_key:
        print("❌ GEMINI_API_KEY 환경 변수가 설정되지 않았습니다!")
        return False
    
    # API 키 마스킹 표시
    masked_key = api_key[:10] + "..." + api_key[-4:]
    print(f"✅ API 키 로드 성공: {masked_key}")
    print(f"   키 길이: {len(api_key)} 문자")
    
    # 2. API 키 설정
    try:
        genai.configure(api_key=api_key)
        print("✅ Gemini API 설정 완료")
    except Exception as e:
        print(f"❌ API 설정 실패: {e}")
        return False
    
    # 3. 사용 가능한 모델 목록 조회
    print("\n🔍 사용 가능한 모델 확인 중...")
    try:
        models = genai.list_models()
        available_models = []
        
        for model in models:
            if 'generateContent' in model.supported_generation_methods:
                available_models.append(model.name)
        
        if available_models:
            print(f"✅ {len(available_models)}개의 생성 모델 사용 가능:")
            for model_name in available_models[:5]:  # 처음 5개만 표시
                print(f"   - {model_name}")
        else:
            print("⚠️ 사용 가능한 생성 모델이 없습니다")
            return False
            
    except Exception as e:
        print(f"❌ 모델 목록 조회 실패: {e}")
        print(f"   오류 상세: {type(e).__name__}")
        
        # API 키 만료/무효 판별
        error_msg = str(e).lower()
        if 'expired' in error_msg:
            print("\n💡 진단: API 키가 만료되었습니다")
            print("   → https://aistudio.google.com/apikey 에서 새 키를 발급받으세요")
        elif 'invalid' in error_msg or 'api_key_invalid' in error_msg:
            print("\n💡 진단: API 키가 유효하지 않습니다")
            print("   → API 키를 다시 확인하고 복사해주세요")
        elif 'quota' in error_msg:
            print("\n💡 진단: API 할당량 초과")
            print("   → 잠시 후 다시 시도하거나 할당량을 확인하세요")
        
        return False
    
    # 4. 실제 생성 테스트
    print("\n🧪 실제 콘텐츠 생성 테스트 중...")
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content("Hello, say 'API key is working!'")
        
        if response and response.text:
            print(f"✅ 생성 성공!")
            print(f"   응답: {response.text[:100]}")
        else:
            print("⚠️ 응답이 비어있습니다")
            
    except Exception as e:
        print(f"❌ 콘텐츠 생성 실패: {e}")
        return False
    
    # 5. 최종 결과
    print("\n" + "=" * 60)
    print("✅ API 키 진단 완료: 모든 테스트 통과!")
    print("=" * 60)
    return True

if __name__ == '__main__':
    success = verify_api_key()
    sys.exit(0 if success else 1)
