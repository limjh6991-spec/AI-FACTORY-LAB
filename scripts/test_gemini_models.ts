#!/usr/bin/env tsx
/**
 * Gemini 모델 테스트
 * 여러 모델명을 시도하여 사용 가능한 모델 찾기
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const modelsToTest = [
  'gemini-pro',
  'gemini-1.5-pro',
  'gemini-1.5-flash',
  'gemini-1.5-pro-latest',
  'gemini-1.5-flash-latest',
  'gemini-2.0-flash-exp',
  'gemini-exp-1206',
];

async function testModel(modelName: string) {
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent('Hello');
    return {
      model: modelName,
      status: '✅ 사용 가능',
      response: result.response.text().substring(0, 50)
    };
  } catch (error: any) {
    return {
      model: modelName,
      status: '❌ 불가능',
      error: error?.message?.substring(0, 100) || error
    };
  }
}

async function testAllModels() {
  console.log('🔍 Gemini 모델 테스트 중...\n');
  console.log('=' .repeat(80));
  
  for (const modelName of modelsToTest) {
    console.log(`\n테스트: ${modelName}`);
    const result = await testModel(modelName);
    
    if (result.status === '✅ 사용 가능') {
      console.log(`  ${result.status}`);
      console.log(`  응답 샘플: ${result.response}...`);
    } else {
      console.log(`  ${result.status}`);
      console.log(`  에러: ${result.error}`);
    }
    
    // API Rate Limit 방지
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n' + '=' .repeat(80));
  console.log('\n완료!');
}

testAllModels().catch(console.error);
