#!/usr/bin/env tsx
/**
 * 샘플 Excel 파일 생성 (부서별 원가 분석)
 */

import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

const sampleData = [
  // 헤더
  ['부서코드', '부서명', '제품코드', '제품명', '원가', '수량', '작업시간'],
  // 데이터
  ['D001', '생산1부', 'P001', '제품A', 15000, 100, 8.5],
  ['D001', '생산1부', 'P002', '제품B', 25000, 50, 6.0],
  ['D002', '생산2부', 'P003', '제품C', 30000, 75, 10.0],
  ['D002', '생산2부', 'P004', '제품D', 18000, 120, 7.5],
  ['D003', '품질관리부', 'P001', '제품A', 5000, 100, 3.0],
  ['D003', '품질관리부', 'P002', '제품B', 5000, 50, 2.5],
  ['D004', '자재관리부', 'P005', '제품E', 40000, 30, 12.0],
];

const outputDir = path.join(process.cwd(), 'data', 'sample_excel');

// 디렉토리 생성
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 워크북 생성
const wb = XLSX.utils.book_new();
const ws = XLSX.utils.aoa_to_sheet(sampleData);

// 열 너비 설정
ws['!cols'] = [
  { wch: 12 },  // 부서코드
  { wch: 15 },  // 부서명
  { wch: 12 },  // 제품코드
  { wch: 15 },  // 제품명
  { wch: 12 },  // 원가
  { wch: 10 },  // 수량
  { wch: 12 },  // 작업시간
];

// 시트 추가
XLSX.utils.book_append_sheet(wb, ws, '부서별원가분석');

// 파일 저장
const filePath = path.join(outputDir, '부서별_원가_분석.xlsx');
XLSX.writeFile(wb, filePath);

console.log(`✅ 샘플 Excel 파일 생성 완료: ${filePath}`);
console.log(`📊 데이터: ${sampleData.length - 1}개 행, ${sampleData[0]?.length}개 컬럼`);
console.log(`📁 컬럼: ${sampleData[0]?.join(', ')}`);
