/**
 * 🧪 Gemini API 모델 테스트 v2
 * 
 * 2025년 12월 기준 최신 모델명으로 테스트
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const modelsToTest = [
  // 2025년 최신 모델
  'gemini-1.5-flash-002',
  'gemini-1.5-flash-001',
  'gemini-1.5-flash',
  'gemini-1.5-pro-002',
  'gemini-1.5-pro-001',
  'gemini-1.5-pro',
  'gemini-pro',
  'models/gemini-1.5-flash',
  'models/gemini-1.5-pro',
];

async function testModel(modelName: string) {
  try {
    console.log(`\n🔍 테스트: ${modelName}`);
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent('안녕하세요. 1+1은?');
    const response = result.response.text();
    
    console.log(`  ✅ 성공!`);
    console.log(`  응답: ${response.substring(0, 100)}${response.length > 100 ? '...' : ''}`);
    return {
      model: modelName,
      status: 'success',
      response: response.substring(0, 50)
    };
  } catch (error: any) {
    console.log(`  ❌ 실패`);
    console.log(`  에러: ${error.message?.substring(0, 150)}`);
    return {
      model: modelName,
      status: 'failed',
      error: error.message
    };
  }
}

async function main() {
  console.log('🤖 Gemini API 모델 테스트 v2');
  console.log('='.repeat(80));
  console.log(`API 키: ${process.env.GEMINI_API_KEY ? '설정됨' : '❌ 없음'}`);
  console.log('='.repeat(80));

  const results = [];
  
  for (const modelName of modelsToTest) {
    const result = await testModel(modelName);
    results.push(result);
    
    // Rate limit 방지를 위해 1초 대기
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n\n📊 최종 결과');
  console.log('='.repeat(80));
  
  const successful = results.filter(r => r.status === 'success');
  const failed = results.filter(r => r.status === 'failed');
  
  console.log(`\n✅ 성공: ${successful.length}개`);
  successful.forEach(r => {
    console.log(`  - ${r.model}`);
  });
  
  console.log(`\n❌ 실패: ${failed.length}개`);
  failed.forEach(r => {
    console.log(`  - ${r.model}`);
  });

  if (successful.length > 0) {
    console.log(`\n\n🎯 추천 모델: ${successful[0]!.model}`);
  }
}

main().catch(console.error);
