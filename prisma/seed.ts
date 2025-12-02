import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  await prisma.product.deleteMany();
  console.log('✅ Cleared existing products');

  // Sample products
  const products = [
    {
      productCode: 'PRD-001',
      productName: '노트북 - MacBook Pro 16"',
      category: '전자제품',
      price: 2890000,
      stock: 15,
      description: 'M3 Max 칩, 36GB RAM, 1TB SSD',
      isActive: true,
    },
    {
      productCode: 'PRD-002',
      productName: '무선 키보드 - Magic Keyboard',
      category: '전자제품',
      price: 149000,
      stock: 45,
      description: '한글 각인, 블루투스 연결',
      isActive: true,
    },
    {
      productCode: 'PRD-003',
      productName: '사무용 의자 - 에르고 체어',
      category: '가구',
      price: 450000,
      stock: 8,
      description: '요추 지지, 헤드레스트 포함',
      isActive: true,
    },
    {
      productCode: 'PRD-004',
      productName: '모니터 - 27인치 4K UHD',
      category: '전자제품',
      price: 680000,
      stock: 22,
      description: 'IPS 패널, USB-C 충전 지원',
      isActive: true,
    },
    {
      productCode: 'PRD-005',
      productName: '책상 - 스탠딩 데스크',
      category: '가구',
      price: 890000,
      stock: 5,
      description: '전동 높이 조절, 140x80cm',
      isActive: true,
    },
    {
      productCode: 'PRD-006',
      productName: '마우스 - MX Master 3S',
      category: '전자제품',
      price: 135000,
      stock: 0,
      description: '무선, 멀티 디바이스 지원',
      isActive: false,
    },
    {
      productCode: 'PRD-007',
      productName: '노트 - 몰스킨 클래식',
      category: '문구',
      price: 28000,
      stock: 120,
      description: 'A5 사이즈, 라인드',
      isActive: true,
    },
    {
      productCode: 'PRD-008',
      productName: '펜 - 제트스트림 0.5mm',
      category: '문구',
      price: 2500,
      stock: 250,
      description: '검정색, 빠른 건조',
      isActive: true,
    },
    {
      productCode: 'PRD-009',
      productName: 'USB 허브 - 7포트',
      category: '전자제품',
      price: 45000,
      stock: 35,
      description: 'USB 3.0, 전원 어댑터 포함',
      isActive: true,
    },
    {
      productCode: 'PRD-010',
      productName: '책꽂이 - 3단 선반',
      category: '가구',
      price: 125000,
      stock: 12,
      description: '원목 재질, 80x120x30cm',
      isActive: true,
    },
    {
      productCode: 'PRD-011',
      productName: '헤드폰 - AirPods Max',
      category: '전자제품',
      price: 769000,
      stock: 7,
      description: '노이즈 캔슬링, 공간 오디오',
      isActive: true,
    },
    {
      productCode: 'PRD-012',
      productName: '독서대 - 북 스탠드',
      category: '문구',
      price: 18000,
      stock: 30,
      description: '각도 조절 가능, 접이식',
      isActive: true,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log(`✅ Created ${products.length} products`);
  console.log('🎉 Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
