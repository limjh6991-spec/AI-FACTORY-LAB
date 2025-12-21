"""
LLM 설정 및 모델 팩토리

Google Gemini 모델 설정:
- Analyst: gemini-1.5-pro (깊은 분석용)
- Writer/Critic: gemini-1.5-flash (빠른 응답용)
"""

from typing import Literal
from langchain_google_genai import ChatGoogleGenerativeAI


# Role 타입 정의
RoleType = Literal["analyst", "writer", "critic"]


# 모델 매핑
MODEL_CONFIG = {
    "analyst": "gemini-2.5-flash",    # 분석용
    "writer": "gemini-2.5-flash",     # SQL 생성용
    "critic": "gemini-2.5-flash",     # 검증용
}


def get_llm(role: RoleType, temperature: float = 0.0) -> ChatGoogleGenerativeAI:
    """
    역할에 맞는 LLM 인스턴스를 반환합니다.
    
    Args:
        role: 에이전트 역할 (analyst, writer, critic)
        temperature: 생성 다양성 (0.0 = 결정적, 정확성 중요)
        
    Returns:
        ChatGoogleGenerativeAI: 설정된 Gemini 모델 인스턴스
        
    Example:
        >>> llm = get_llm("analyst")
        >>> llm.invoke("분석해줘")
    """
    model_name = MODEL_CONFIG.get(role, "gemini-1.5-flash")
    
    return ChatGoogleGenerativeAI(
        model=model_name,
        temperature=temperature,
        convert_system_message_to_human=True,  # Gemini 호환성
    )


# 테스트 코드
if __name__ == "__main__":
    import os
    from dotenv import load_dotenv
    from pathlib import Path
    
    env_path = Path(__file__).parent.parent / ".env"
    load_dotenv(env_path)
    
    if not os.getenv("GOOGLE_API_KEY"):
        print("⚠️  GOOGLE_API_KEY가 설정되지 않았습니다.")
        exit(1)
    
    print("=== LLM 설정 테스트 ===")
    for role in ["analyst", "writer", "critic"]:
        llm = get_llm(role)
        print(f"✅ {role}: {MODEL_CONFIG[role]}")
