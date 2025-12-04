/**
 * 🧪 Gemini API 키 및 연결 테스트
 * 
 * API v1 사용 테스트
 */

import 'dotenv/config';

async function testGeminiAPI() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY가 설정되지 않았습니다.');
    return;
  }

  console.log('🔍 Gemini API 연결 테스트');
  console.log('='.repeat(80));
  console.log(`API 키 (처음 10자): ${apiKey.substring(0, 10)}...`);
  console.log('='.repeat(80));

  // API v1 사용 (v1beta 대신)
  const models = [
    'gemini-1.5-flash-latest',
    'gemini-1.5-pro-latest',
    'gemini-pro',
  ];

  for (const modelName of models) {
    console.log(`\n🔍 테스트: ${modelName} (API v1)`);
    
    try {
      const url = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: '안녕하세요. 1+1은?'
            }]
          }]
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('  ✅ 성공!');
        console.log(`  응답: ${JSON.stringify(data.candidates?.[0]?.content?.parts?.[0]?.text || 'N/A').substring(0, 100)}`);
      } else {
        console.log('  ❌ 실패');
        console.log(`  상태: ${response.status} ${response.statusText}`);
        console.log(`  에러: ${JSON.stringify(data).substring(0, 200)}`);
      }
    } catch (error: any) {
      console.log('  ❌ 네트워크 오류');
      console.log(`  ${error.message}`);
    }

    // Rate limit 방지
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // 모델 목록 조회 시도
  console.log('\n\n📋 사용 가능한 모델 목록 조회');
  console.log('='.repeat(80));
  
  try {
    const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      console.log('✅ 모델 목록 조회 성공!\n');
      
      const models = data.models || [];
      const generateModels = models.filter((m: any) => 
        m.supportedGenerationMethods?.includes('generateContent')
      );

      console.log(`총 ${generateModels.length}개의 generateContent 지원 모델:`);
      generateModels.forEach((model: any, idx: number) => {
        console.log(`  ${idx + 1}. ${model.name}`);
        console.log(`     - Display Name: ${model.displayName}`);
        console.log(`     - Description: ${model.description?.substring(0, 80)}...`);
      });
    } else {
      console.log('❌ 모델 목록 조회 실패');
      console.log(`상태: ${response.status} ${response.statusText}`);
      console.log(`에러: ${JSON.stringify(data).substring(0, 200)}`);
    }
  } catch (error: any) {
    console.log('❌ 네트워크 오류');
    console.log(error.message);
  }
}

testGeminiAPI().catch(console.error);
