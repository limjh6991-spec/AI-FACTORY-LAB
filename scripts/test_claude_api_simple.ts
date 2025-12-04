import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';

async function testClaudeAPI() {
  console.log('🔑 API 키 길이:', process.env.ANTHROPIC_API_KEY?.length);
  console.log('🔑 API 키:', process.env.ANTHROPIC_API_KEY?.substring(0, 20) + '...');
  console.log('🔑 전체 키:', process.env.ANTHROPIC_API_KEY);
  
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  });

  try {
    console.log('📞 Claude API 호출 중...\n');
    
    const message = await anthropic.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 100,
      messages: [
        {
          role: 'user',
          content: '안녕하세요! 간단히 인사해주세요.'
        }
      ]
    });

    console.log('✅ Claude 응답:');
    for (const block of message.content) {
      if (block.type === 'text') {
        console.log(block.text);
      }
    }
    
    console.log('\n🎉 API 키가 정상 작동합니다!');
    
  } catch (error: any) {
    console.error('❌ API 오류:', error.message);
    if (error.status === 401) {
      console.log('\n⚠️  인증 실패: API 키를 다시 확인하세요');
    }
  }
}

testClaudeAPI();
