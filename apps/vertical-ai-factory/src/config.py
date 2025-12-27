"""
LLM 설정 및 모델 팩토리

Clean Architecture: 도메인 레이어에서 사용되는 LLM 인터페이스
LLM_PROVIDER 환경변수로 Gemini ↔ Ollama 전환 가능

환경변수:
- LLM_PROVIDER: "gemini" (기본) 또는 "ollama"
- GOOGLE_API_KEY: Gemini API 키
- OLLAMA_BASE_URL: Ollama 서버 URL (기본: http://localhost:11434)
"""

import os
from pathlib import Path
from typing import Literal, Union
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_ollama import ChatOllama

# .env 자동 로드
_env_path = Path(__file__).parent.parent / ".env"
load_dotenv(_env_path)


# ============================================
# 설정
# ============================================

# LLM Provider 타입
LLMProviderType = Literal["gemini", "ollama"]
RoleType = Literal["analyst", "writer", "critic"]

# 환경변수에서 기본 provider 결정
DEFAULT_PROVIDER: LLMProviderType = os.getenv("LLM_PROVIDER", "gemini")
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")

# 모델 매핑
GEMINI_MODEL_CONFIG = {
    "analyst": "gemini-2.5-flash",
    "writer": "gemini-2.5-flash",
    "critic": "gemini-2.5-flash",
}

OLLAMA_MODEL_CONFIG = {
    "analyst": "llama3.2:1b",  # 테스트용 (추후 qwen2.5-coder:7b로 변경)
    "writer": "llama3.2:1b",
    "critic": "llama3.2:1b",
}


# ============================================
# LLM 팩토리 함수
# ============================================

def get_llm(
    role: RoleType, 
    temperature: float = 0.0,
    provider: LLMProviderType = None
) -> Union[ChatGoogleGenerativeAI, ChatOllama]:
    """
    역할에 맞는 LLM 인스턴스를 반환합니다.
    
    Args:
        role: 에이전트 역할 (analyst, writer, critic)
        temperature: 생성 다양성 (0.0 = 결정적, 정확성 중요)
        provider: LLM Provider ("gemini" 또는 "ollama")
        
    Returns:
        LLM 인스턴스 (Gemini 또는 Ollama)
        
    Example:
        >>> llm = get_llm("analyst")  # 기본 provider 사용
        >>> llm = get_llm("writer", provider="ollama")  # Ollama 사용
    """
    provider = provider or DEFAULT_PROVIDER
    
    if provider == "ollama":
        model_name = OLLAMA_MODEL_CONFIG.get(role, "llama3.2:1b")
        return ChatOllama(
            model=model_name,
            base_url=OLLAMA_BASE_URL,
            temperature=temperature,
        )
    else:
        model_name = GEMINI_MODEL_CONFIG.get(role, "gemini-2.5-flash")
        return ChatGoogleGenerativeAI(
            model=model_name,
            temperature=temperature,
            convert_system_message_to_human=True,
        )


def get_current_provider() -> LLMProviderType:
    """현재 설정된 LLM Provider 반환"""
    return DEFAULT_PROVIDER


def get_model_config(provider: LLMProviderType = None) -> dict:
    """현재 Provider의 모델 설정 반환"""
    provider = provider or DEFAULT_PROVIDER
    return OLLAMA_MODEL_CONFIG if provider == "ollama" else GEMINI_MODEL_CONFIG


# ============================================
# 테스트 코드
# ============================================

if __name__ == "__main__":
    print("=== LLM Config 테스트 ===")
    print(f"기본 Provider: {DEFAULT_PROVIDER}")
    print(f"Ollama URL: {OLLAMA_BASE_URL}")
    
    # Ollama 테스트
    print("\n[Ollama 테스트]")
    try:
        llm = get_llm("analyst", provider="ollama")
        print(f"모델: {OLLAMA_MODEL_CONFIG['analyst']}")
        response = llm.invoke("안녕하세요! 한 문장으로 인사해줘.")
        print(f"응답: {response.content[:100]}...")
    except Exception as e:
        print(f"⚠️ Ollama 에러: {e}")
    
    # Gemini 테스트
    print("\n[Gemini 테스트]")
    try:
        llm = get_llm("analyst", provider="gemini")
        print(f"모델: {GEMINI_MODEL_CONFIG['analyst']}")
        response = llm.invoke("안녕하세요! 한 문장으로 인사해줘.")
        print(f"응답: {response.content[:100]}...")
    except Exception as e:
        print(f"⚠️ Gemini 에러: {e}")
