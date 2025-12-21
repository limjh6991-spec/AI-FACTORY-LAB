/**
 * Chart Demo Page
 * 
 * 모든 차트 컴포넌트를 테스트하는 데모 페이지
 */

'use client';

import React from 'react';
import { ChartWidgetBlock } from '@/features/screen-generator/components/blocks/ChartWidgetBlock';
import { ChartType, type ChartWidgetBlockProps, BlockType } from '@/features/screen-generator/types/block-schema';

// 샘플 데이터
const lineBarData = [
    { name: '1월', 매출: 4000, 비용: 2400, 이익: 1600 },
    { name: '2월', 매출: 3000, 비용: 1398, 이익: 1602 },
    { name: '3월', 매출: 2000, 비용: 9800, 이익: -7800 },
    { name: '4월', 매출: 2780, 비용: 3908, 이익: -1128 },
    { name: '5월', 매출: 1890, 비용: 4800, 이익: -2910 },
    { name: '6월', 매출: 2390, 비용: 3800, 이익: -1410 },
];

const pieData = [
    { name: '생산', value: 4000 },
    { name: '판매', value: 3000 },
    { name: '재고', value: 2000 },
    { name: '반품', value: 2780 },
    { name: '기타', value: 1890 },
];

const scatterData = Array.from({ length: 30 }, (_, i) => ({
    name: `Item ${i + 1}`,
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    size: Math.floor(Math.random() * 50) + 10,
}));

// 차트 블록 설정 헬퍼
function createChartBlock(
    id: string,
    title: string,
    chartType: ChartType,
    xField: string,
    yField: string | string[]
): ChartWidgetBlockProps {
    return {
        id,
        type: BlockType.CHART_WIDGET,
        order: 1,
        title,
        chartType,
        dataApi: '', // 샘플 데이터 사용
        xField,
        yField,
        height: 350,
        showLegend: true,
        showTooltip: true,
        showGridLines: true,
    };
}

export default function ChartDemoPage() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">📊 Chart Demo</h1>
                    <p className="text-gray-600 mt-2">
                        ChartWidgetBlock + Recharts 연동 테스트 페이지
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* LINE Chart */}
                    <ChartWidgetBlock
                        block={createChartBlock(
                            'chart-line',
                            '선형 차트 (Line Chart)',
                            ChartType.LINE,
                            'name',
                            ['매출', '비용', '이익']
                        )}
                        data={lineBarData}
                    />

                    {/* BAR Chart */}
                    <ChartWidgetBlock
                        block={createChartBlock(
                            'chart-bar',
                            '막대 차트 (Bar Chart)',
                            ChartType.BAR,
                            'name',
                            ['매출', '비용']
                        )}
                        data={lineBarData}
                    />

                    {/* AREA Chart */}
                    <ChartWidgetBlock
                        block={createChartBlock(
                            'chart-area',
                            '영역 차트 (Area Chart)',
                            ChartType.AREA,
                            'name',
                            ['매출', '비용']
                        )}
                        data={lineBarData}
                    />

                    {/* PIE Chart */}
                    <ChartWidgetBlock
                        block={createChartBlock(
                            'chart-pie',
                            '파이 차트 (Pie Chart)',
                            ChartType.PIE,
                            'name',
                            'value'
                        )}
                        data={pieData}
                    />

                    {/* DONUT Chart */}
                    <ChartWidgetBlock
                        block={createChartBlock(
                            'chart-donut',
                            '도넛 차트 (Donut Chart)',
                            ChartType.DONUT,
                            'name',
                            'value'
                        )}
                        data={pieData}
                    />

                    {/* SCATTER Chart */}
                    <ChartWidgetBlock
                        block={createChartBlock(
                            'chart-scatter',
                            '산점도 (Scatter Chart)',
                            ChartType.SCATTER,
                            'x',
                            'y'
                        )}
                        data={scatterData}
                    />
                </div>

                <div className="mt-8 p-4 bg-white rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">✅ 구현 완료</h2>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>• LINE: 다중 시리즈, 부드러운 곡선, 점 표시</li>
                        <li>• BAR: 그룹/스택 바, 가로/세로 방향</li>
                        <li>• AREA: 그라데이션 채우기, 스택 지원</li>
                        <li>• PIE: 라벨, 비율 표시</li>
                        <li>• DONUT: 내부 반경 적용</li>
                        <li>• SCATTER: 시리즈 그룹핑</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
