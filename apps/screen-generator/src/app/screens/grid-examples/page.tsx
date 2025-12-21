'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function GridExamplesIndexPage() {
  const examples = [
    {
      id: 'style-1-corporate',
      title: '🏢 Corporate Professional',
      description: '기업 표준 스타일 - 깔끔하고 절제된 디자인',
      features: ['2행 헤더', '셀 병합', '숫자 포맷팅', '그라디언트 헤더'],
      color: 'bg-blue-500'
    },
    {
      id: 'style-2-modern-dark',
      title: '🌙 Modern Dark',
      description: '다크 테마 - 눈의 피로를 줄이는 현대적인 디자인',
      features: ['다크 모드', '네온 강조', '부드러운 그림자', '컬러 인디케이터'],
      color: 'bg-slate-800'
    },
    {
      id: 'style-3-soft-pastel',
      title: '🎨 Soft Pastel',
      description: '파스텔톤 - 부드럽고 친근한 디자인',
      features: ['파스텔 컬러', '둥근 모서리', '아이콘 통합', '애니메이션'],
      color: 'bg-pink-300'
    },
    {
      id: 'style-4-financial',
      title: '📊 Financial Dashboard',
      description: '금융/회계 스타일 - 숫자 중심의 전문적인 디자인',
      features: ['밀집 레이아웃', 'Bar 렌더러', '조건부 서식', '소계/합계'],
      color: 'bg-emerald-600'
    },
    {
      id: 'style-5-minimal',
      title: '✨ Minimal Clean',
      description: '미니멀 스타일 - 군더더기 없는 깔끔한 디자인',
      features: ['보더리스', '마이크로 인터랙션', '화이트스페이스', '타이포그래피'],
      color: 'bg-gray-100'
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🎨 RealGrid 스타일 갤러리</h1>
        <p className="text-gray-600">
          5가지 고품질 그리드 스타일 예제를 비교하고 최적의 디자인을 선택하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((example) => (
          <Link key={example.id} href={`/screens/grid-examples/${example.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className={`w-full h-3 ${example.color} rounded-t-lg mb-3`} />
                <CardTitle className="text-lg">{example.title}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {example.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">💡 사용 방법</h3>
        <ol className="text-sm text-gray-600 space-y-1">
          <li>1. 각 스타일을 클릭하여 실제 그리드를 확인합니다</li>
          <li>2. 마음에 드는 스타일을 선택합니다</li>
          <li>3. 선택된 스타일이 시스템 전체 표준으로 적용됩니다</li>
          <li>4. Claude API가 해당 스타일로 화면을 생성합니다</li>
        </ol>
      </div>

      {/* AG Grid 비교 링크 */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-green-800 mb-1">🔄 AG Grid와 비교하기</h3>
            <p className="text-sm text-green-700">동일한 5가지 스타일을 AG Grid로 구현한 예제와 비교해보세요.</p>
          </div>
          <Link 
            href="/screens/ag-grid-examples" 
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            AG Grid 갤러리 →
          </Link>
        </div>
      </div>
    </div>
  );
}
