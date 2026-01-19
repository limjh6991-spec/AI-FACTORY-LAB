import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker 배포를 위한 standalone 출력 모드
  output: 'standalone',

  // 실험적 기능
  experimental: {
    // Prisma 등 서버 컴포넌트 최적화
  },
};

export default nextConfig;
