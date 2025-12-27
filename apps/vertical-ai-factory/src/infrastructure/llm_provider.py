"""
Ollama LLM Provider - Infrastructure Layer

Clean Architecture에 따라 외부 LLM 서비스 연동을 Infrastructure Layer에 배치.
Ollama를 통해 로컬에서 Qwen2.5-Coder 등의 모델을 실행합니다.

주요 기능:
- Ollama 서버 연결 관리
- 모델 전환 (Gemini ↔ Ollama)
- 구조화된 출력 지원
"""

import os
from typing import Optional, Literal
from langchain_ollama import ChatOllama
from langchain_google_genai import ChatGoogleGenerativeAI
from pydantic import BaseModel

# LLM Provider 타입
LLMProviderType = Literal["gemini", "ollama"]

# 기본 설정
DEFAULT_PROVIDER: LLMProviderType = os.getenv("LLM_PROVIDER", "gemini")
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")

# 모델 설정
OLLAMA_MODEL_CONFIG = {
    "analyst": "llama3.2:1b",  # 테스트용 (추후 qwen2.5-coder:7b로 변경)
    "writer": "llama3.2:1b",
    "critic": "llama3.2:1b",
}

GEMINI_MODEL_CONFIG = {
    "analyst": "gemini-2.5-flash",
    "writer": "gemini-2.5-flash",
    "critic": "gemini-2.5-flash",
}


class OllamaLLMProvider:
    """
    Ollama 기반 로컬 LLM Provider
    
    Clean Architecture: Infrastructure Layer
    - 외부 시스템(Ollama)과의 통신 담당
    - Domain Layer에서 사용할 LLM 인터페이스 제공
    """
    
    def __init__(self, base_url: str = OLLAMA_BASE_URL):
        self.base_url = base_url
        self._models: dict = {}
    
    def get_llm(
        self, 
        role: str, 
        temperature: float = 0.0,
        model_override: Optional[str] = None
    ) -> ChatOllama:
        """
        역할에 맞는 Ollama LLM 인스턴스 반환
        
        Args:
            role: 에이전트 역할 (analyst, writer, critic)
            temperature: 생성 다양성
            model_override: 모델 오버라이드 (선택)
            
        Returns:
            ChatOllama 인스턴스
        """
        model_name = model_override or OLLAMA_MODEL_CONFIG.get(role, "qwen2.5-coder:7b")
        
        cache_key = f"{model_name}_{temperature}"
        if cache_key not in self._models:
            self._models[cache_key] = ChatOllama(
                model=model_name,
                base_url=self.base_url,
                temperature=temperature,
            )
        
        return self._models[cache_key]
    
    def get_structured_llm(
        self, 
        role: str, 
        output_schema: type[BaseModel],
        temperature: float = 0.0
    ):
        """
        구조화된 출력을 위한 LLM 반환
        
        Args:
            role: 에이전트 역할
            output_schema: Pydantic 스키마
            temperature: 생성 다양성
            
        Returns:
            구조화된 출력이 설정된 LLM
        """
        llm = self.get_llm(role, temperature)
        return llm.with_structured_output(output_schema)
    
    @staticmethod
    def is_available() -> bool:
        """Ollama 서버 가용성 확인"""
        try:
            import httpx
            response = httpx.get(f"{OLLAMA_BASE_URL}/api/tags", timeout=5.0)
            return response.status_code == 200
        except Exception:
            return False


class GeminiLLMProvider:
    """
    Google Gemini LLM Provider
    
    Clean Architecture: Infrastructure Layer
    """
    
    def __init__(self):
        self._models: dict = {}
    
    def get_llm(
        self, 
        role: str, 
        temperature: float = 0.0,
        model_override: Optional[str] = None
    ) -> ChatGoogleGenerativeAI:
        """역할에 맞는 Gemini LLM 인스턴스 반환"""
        model_name = model_override or GEMINI_MODEL_CONFIG.get(role, "gemini-2.5-flash")
        
        cache_key = f"{model_name}_{temperature}"
        if cache_key not in self._models:
            self._models[cache_key] = ChatGoogleGenerativeAI(
                model=model_name,
                temperature=temperature,
                convert_system_message_to_human=True,
            )
        
        return self._models[cache_key]
    
    def get_structured_llm(
        self, 
        role: str, 
        output_schema: type[BaseModel],
        temperature: float = 0.0
    ):
        """구조화된 출력을 위한 LLM 반환"""
        llm = self.get_llm(role, temperature)
        return llm.with_structured_output(output_schema)


# ============================================
# Factory 함수
# ============================================

_ollama_provider: Optional[OllamaLLMProvider] = None
_gemini_provider: Optional[GeminiLLMProvider] = None


def get_llm_provider(provider_type: LLMProviderType = None):
    """
    LLM Provider 팩토리
    
    Args:
        provider_type: "gemini" 또는 "ollama"
        
    Returns:
        LLM Provider 인스턴스
    """
    global _ollama_provider, _gemini_provider
    
    provider_type = provider_type or DEFAULT_PROVIDER
    
    if provider_type == "ollama":
        if _ollama_provider is None:
            _ollama_provider = OllamaLLMProvider()
        return _ollama_provider
    else:
        if _gemini_provider is None:
            _gemini_provider = GeminiLLMProvider()
        return _gemini_provider


def get_llm(
    role: str, 
    temperature: float = 0.0, 
    provider: LLMProviderType = None
):
    """
    통합 LLM 팩토리 함수
    
    Args:
        role: 에이전트 역할
        temperature: 생성 다양성
        provider: LLM Provider 타입
        
    Returns:
        LLM 인스턴스
    """
    return get_llm_provider(provider).get_llm(role, temperature)


# ============================================
# 테스트 코드
# ============================================

if __name__ == "__main__":
    print("=== LLM Provider 테스트 ===")
    
    # Ollama 가용성 확인
    print(f"\n[Ollama 상태]")
    if OllamaLLMProvider.is_available():
        print("✅ Ollama 서버 연결됨")
        
        # Ollama 테스트
        provider = get_llm_provider("ollama")
        llm = provider.get_llm("analyst")
        print(f"모델: {llm.model}")
        
        # 간단한 테스트
        response = llm.invoke("Hello, 간단히 인사해줘. 한 문장으로.")
        print(f"응답: {response.content[:100]}...")
    else:
        print("⚠️ Ollama 서버 연결 실패")
    
    # Gemini 테스트
    print(f"\n[Gemini 상태]")
    try:
        provider = get_llm_provider("gemini")
        llm = provider.get_llm("analyst")
        print(f"✅ Gemini 설정됨: {GEMINI_MODEL_CONFIG['analyst']}")
    except Exception as e:
        print(f"⚠️ Gemini 오류: {e}")
