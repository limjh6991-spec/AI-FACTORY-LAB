'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const styles = [
  {
    id: 'style-1-corporate',
    name: 'Corporate Professional',
    description: '블루 그라디언트 헤더, 엔터프라이즈 느낌의 전문적인 비즈니스 스타일',
    features: ['2행 헤더', '셀 병합', '조건부 서식', '합계 행'],
    gradient: 'from-blue-600 to-blue-800',
    textColor: 'text-blue-600',
  },
  {
    id: 'style-2-modern-dark',
    name: 'Modern Dark',
    description: '다크 테마 기반, 네온 강조색을 사용한 모던한 대시보드 스타일',
    features: ['다크 테마', '네온 강조', '그룹핑', '스파크라인'],
    gradient: 'from-gray-800 to-gray-900',
    textColor: 'text-gray-300',
  },
  {
    id: 'style-3-soft-pastel',
    name: 'Soft Pastel',
    description: '파스텔톤 컬러, 라운드 코너, 부드러운 그림자의 친근한 스타일',
    features: ['파스텔 컬러', '라운드 코너', '아이콘 헤더', '호버 효과'],
    gradient: 'from-pink-400 to-purple-500',
    textColor: 'text-pink-600',
  },
  {
    id: 'style-4-financial',
    name: 'Financial Dashboard',
    description: '금융/회계 데이터에 최적화된 밀집 레이아웃, 숫자 포맷팅 스타일',
    features: ['밀집 레이아웃', '숫자 포맷', '색상 인디케이터', '트리 구조'],
    gradient: 'from-green-600 to-emerald-700',
    textColor: 'text-green-600',
  },
  {
    id: 'style-5-minimal',
    name: 'Minimal Clean',
    description: '불필요한 장식 제거, 타이포그래피 중심의 미니멀 스타일',
    features: ['보더리스', '화이트스페이스', '호버 표시', '깔끔한 정렬'],
    gradient: 'from-gray-500 to-gray-600',
    textColor: 'text-gray-600',
  },
];

export default function AGGridExamplesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">AG</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              AG Grid Style Gallery
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            AG Grid로 구현한 5가지 스타일 예제입니다.<br/>
            RealGrid와 동일한 데이터로 비교해보세요.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Link 
              href="/screens/grid-examples" 
              className="text-blue-600 hover:text-blue-700 font-medium underline"
            >
              ← RealGrid 갤러리로 이동
            </Link>
          </div>
        </div>

        {/* Style Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {styles.map((style) => (
            <Link
              key={style.id}
              href={`/screens/ag-grid-examples/${style.id}`}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Preview Header */}
              <div className={`h-32 bg-gradient-to-r ${style.gradient} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                <div className="relative flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center">
                    <span className="text-white text-sm font-bold">AG</span>
                  </div>
                  <span className="text-white text-xl font-bold">AG Grid</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className={`text-xl font-bold ${style.textColor} mb-2`}>
                  {style.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {style.description}
                </p>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2">
                  {style.features.map((feature) => (
                    <Badge
                      key={feature}
                      variant="secondary"
                      className="text-xs"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">클릭하여 확인</span>
                  <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Comparison Info */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 RealGrid vs AG Grid 비교</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-xl">
              <h3 className="font-bold text-blue-700 mb-2">RealGrid</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 한국 기업, 한글 문서 우수</li>
                <li>• dwisCOST 라이센스 보유</li>
                <li>• 복잡한 그룹 헤더/셀 병합</li>
                <li>• 피벗/차트 기능</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <h3 className="font-bold text-green-700 mb-2">AG Grid</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 글로벌 표준, 커뮤니티 활발</li>
                <li>• Community 무료 (Enterprise 유료)</li>
                <li>• 풍부한 예제/문서</li>
                <li>• 서버사이드 렌더링 지원</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
