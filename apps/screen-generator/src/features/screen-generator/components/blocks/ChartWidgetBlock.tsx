/**
 * ChartWidgetBlock Component
 * 
 * 차트 위젯을 렌더링합니다 (Line, Bar, Pie, Area 등)
 * Recharts 라이브러리 연동
 * 
 * @module features/screen-generator/components/blocks/ChartWidgetBlock
 */

'use client';

import React, { useState, useEffect } from 'react';
import type { ChartWidgetBlockProps } from '../../types/block-schema';
import { ChartType } from '../../types/block-schema';
import { Loader2, AlertCircle } from 'lucide-react';

// Chart Components
import {
  LineChartComponent,
  BarChartComponent,
  PieChartComponent,
  AreaChartComponent,
  ScatterChartComponent,
  type ChartDataPoint,
} from '../charts';

interface Props {
  block: ChartWidgetBlockProps;
  /** 외부에서 주입하는 데이터 (dataApi 대신 사용) */
  data?: ChartDataPoint[];
}

export function ChartWidgetBlock({ block, data: externalData }: Props) {
  const {
    title,
    chartType,
    dataApi,
    height = 300,
    xField = 'name',
    yField = 'value',
    seriesField,
    showLegend = true,
    showTooltip = true,
    showGridLines = true,
    chartOptions = {},
    className,
    style,
  } = block;

  const [data, setData] = useState<ChartDataPoint[]>(externalData || []);
  const [loading, setLoading] = useState(!externalData && !!dataApi);
  const [error, setError] = useState<string | null>(null);

  // 데이터 API 호출
  useEffect(() => {
    if (externalData) {
      setData(externalData);
      setLoading(false);
      return;
    }

    if (!dataApi) {
      // 샘플 데이터 생성 (개발용)
      setData(generateSampleData(chartType));
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(dataApi);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();
        setData(Array.isArray(result) ? result : result.data || []);
      } catch (err) {
        console.error('Chart data fetch error:', err);
        setError('데이터를 불러오는데 실패했습니다');
        // 에러 시 샘플 데이터로 대체
        setData(generateSampleData(chartType));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataApi, chartType, externalData]);

  // 로딩 상태
  if (loading) {
    return (
      <div
        className={`rounded-lg border border-gray-200 bg-white p-4 shadow-sm ${className || ''}`}
        style={{ ...style, minHeight: height }}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div
          className="flex items-center justify-center"
          style={{ height: height - 80 }}
        >
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      </div>
    );
  }

  // 에러 상태 (데이터는 샘플로 대체됨)
  const showErrorBanner = error !== null;

  // 차트 공통 Props
  const commonProps = {
    data,
    xField,
    yField,
    height: height - 80,
    showLegend,
    showTooltip,
    showGridLines,
  };

  // 차트 타입별 렌더링
  const renderChart = () => {
    switch (chartType) {
      case ChartType.LINE:
      case 'LINE':
        return (
          <LineChartComponent
            {...commonProps}
            smooth={chartOptions?.smooth ?? true}
            showDots={chartOptions?.showDots ?? true}
          />
        );

      case ChartType.BAR:
      case 'BAR':
        return (
          <BarChartComponent
            {...commonProps}
            stacked={chartOptions?.stacked ?? false}
            horizontal={chartOptions?.horizontal ?? false}
          />
        );

      case ChartType.PIE:
      case 'PIE':
        return (
          <PieChartComponent
            data={data}
            nameField={xField ?? 'name'}
            valueField={Array.isArray(yField) ? (yField[0] ?? 'value') : (yField ?? 'value')}
            height={height - 80}
            showLegend={showLegend}
            showTooltip={showTooltip}
            donut={false}
          />
        );

      case ChartType.DONUT:
      case 'DONUT':
        return (
          <PieChartComponent
            data={data}
            nameField={xField ?? 'name'}
            valueField={Array.isArray(yField) ? (yField[0] ?? 'value') : (yField ?? 'value')}
            height={height - 80}
            showLegend={showLegend}
            showTooltip={showTooltip}
            donut={true}
          />
        );

      case ChartType.AREA:
      case 'AREA':
        return (
          <AreaChartComponent
            {...commonProps}
            stacked={chartOptions?.stacked ?? false}
            gradient={chartOptions?.gradient ?? true}
          />
        );

      case ChartType.SCATTER:
      case 'SCATTER':
        return (
          <ScatterChartComponent
            data={data}
            xField={xField ?? 'x'}
            yField={Array.isArray(yField) ? (yField[0] ?? 'y') : (yField ?? 'y')}
            seriesField={seriesField}
            height={height - 80}
            showLegend={showLegend}
            showTooltip={showTooltip}
            showGridLines={showGridLines}
          />
        );

      case ChartType.HEATMAP:
      case 'HEATMAP':
        // HEATMAP은 Recharts에서 기본 지원하지 않음
        return (
          <div
            className="flex items-center justify-center bg-gray-50 rounded-lg"
            style={{ height: height - 80 }}
          >
            <div className="text-center">
              <AlertCircle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-sm text-gray-500">
                HEATMAP 차트는 추후 지원 예정입니다
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div
            className="flex items-center justify-center bg-gray-50 rounded-lg"
            style={{ height: height - 80 }}
          >
            <p className="text-sm text-gray-500">
              알 수 없는 차트 타입: {chartType}
            </p>
          </div>
        );
    }
  };

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-4 shadow-sm ${className || ''}`}
      style={style}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {showErrorBanner && (
          <span className="text-xs text-yellow-600 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            샘플 데이터
          </span>
        )}
      </div>

      {/* Chart */}
      {renderChart()}
    </div>
  );
}

/**
 * 샘플 데이터 생성 (개발/테스트용)
 */
function generateSampleData(chartType: ChartType | string): ChartDataPoint[] {
  const months = ['1월', '2월', '3월', '4월', '5월', '6월'];

  switch (chartType) {
    case ChartType.PIE:
    case ChartType.DONUT:
    case 'PIE':
    case 'DONUT':
      return [
        { name: '생산', value: 4000 },
        { name: '판매', value: 3000 },
        { name: '재고', value: 2000 },
        { name: '반품', value: 500 },
      ];

    case ChartType.SCATTER:
    case 'SCATTER':
      return Array.from({ length: 20 }, (_, i) => ({
        name: `Item ${i + 1}`,
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100),
        size: Math.floor(Math.random() * 50) + 10,
      }));

    default:
      return months.map((month, i) => ({
        name: month,
        매출: Math.floor(Math.random() * 3000) + 2000,
        비용: Math.floor(Math.random() * 2000) + 1000,
        이익: Math.floor(Math.random() * 1000) + 500,
      }));
  }
}

export default ChartWidgetBlock;
