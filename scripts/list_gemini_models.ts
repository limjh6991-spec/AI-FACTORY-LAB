#!/usr/bin/env tsx
/**
 * Gemini API 사용 가능한 모델 목록 조회
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function listModels() {
  try {
    console.log('🔍 Gemini API 사용 가능한 모델 조회 중...\n');
    
    // 모든 모델 나열
    const models = await genAI.listModels();
    
    console.log(`✅ 총 ${models.length}개 모델 발견\n`);
    console.log('=' .repeat(80));
    
    for (const model of models) {
      console.log(`\n📦 모델: ${model.name}`);
      console.log(`   표시 이름: ${model.displayName}`);
      console.log(`   설명: ${model.description}`);
      console.log(`   지원 메서드: ${model.supportedGenerationMethods?.join(', ') || 'N/A'}`);
      console.log(`   입력 토큰 한도: ${model.inputTokenLimit || 'N/A'}`);
      console.log(`   출력 토큰 한도: ${model.outputTokenLimit || 'N/A'}`);
      console.log('-'.repeat(80));
    }
    
    // generateContent 지원 모델만 필터링
    const generateModels = models.filter(m => 
      m.supportedGenerationMethods?.includes('generateContent')
    );
    
    console.log(`\n\n✨ generateContent 지원 모델 (${generateModels.length}개):`);
    console.log('=' .repeat(80));
    generateModels.forEach(m => {
      console.log(`  - ${m.name.replace('models/', '')}`);
    });
    
  } catch (error) {
    console.error('❌ 에러:', error);
    process.exit(1);
  }
}

listModels();
