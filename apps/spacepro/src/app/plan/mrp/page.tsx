'use client';

import { useState, useEffect } from 'react';
import {
    Package, RefreshCw, AlertTriangle, CheckCircle, Play,
    TrendingDown, BarChart3, Settings, ArrowRight, Calculator,
    Box, Layers, Clock, Zap
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell,
    PieChart, Pie
} from 'recharts';

// 색상 팔레트
const colors = {
    primary: '#009ef7',
    success: '#50cd89',
    warning: '#ffc700',
    danger: '#f1416c',
    info: '#7239ea',
    gray100: '#f9f9f9',
    gray200: '#f4f4f4',
    gray300: '#e4e6ef',
    gray400: '#b5b5c3',
    gray500: '#a1a5b7',
    gray600: '#7e8299',
    gray700: '#5e6278',
    gray800: '#3f4254',
    gray900: '#181c32'
};

interface Product {
    item_code: string;
    item_name: string;
    item_type: string;
    unit: string;
    lead_time: number;
    safety_stock: number;
    standard_cost: number;
}

interface ProductionPlan {
    item_code: string;
    item_name: string;
    quantity: number;
}

interface MRPRequirement {
    item_code: string;
    item_name: string;
    item_type: string;
    unit: string;
    lead_time: number;
    safety_stock: number;
    gross_requirement: number;
    on_hand_qty: number;
    allocated_qty: number;
    in_transit_qty: number;
    net_requirement: number;
    order_quantity: number;
    parents: string[];
}

interface MRPResult {
    success: boolean;
    production_plans: ProductionPlan[];
    summary: {
        total_items: number;
        raw_materials: number;
        semi_products: number;
        shortage_items: number;
        total_gross: number;
        total_net: number;
    };
    requirements: MRPRequirement[];
}

export default function MRPPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [productionPlans, setProductionPlans] = useState<ProductionPlan[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);
    const [result, setResult] = useState<MRPResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [considerInventory, setConsiderInventory] = useState(true);

    const API_BASE = 'http://localhost:8000';

    // 완제품 목록 로드
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE}/mrp/products`);
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
                // 초기 생산 계획 설정
                setProductionPlans(data.map((p: Product) => ({
                    item_code: p.item_code,
                    item_name: p.item_name,
                    quantity: 0
                })));
            }
        } catch (err) {
            setError('완제품 목록을 불러오는 중 오류가 발생했습니다.');
        }
        setIsLoading(false);
    };

    // 수량 변경 핸들러
    const handleQuantityChange = (itemCode: string, value: number) => {
        setProductionPlans(prev =>
            prev.map(p => p.item_code === itemCode ? { ...p, quantity: value } : p)
        );
    };

    // MRP 계산 실행
    const runMRP = async () => {
        setIsCalculating(true);
        setError(null);

        try {
            const plans = productionPlans.filter(p => p.quantity > 0);
            if (plans.length === 0) {
                setError('생산 계획 수량을 입력해주세요.');
                setIsCalculating(false);
                return;
            }

            const res = await fetch(`${API_BASE}/mrp/calculate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    production_plans: plans.map(p => ({
                        item_code: p.item_code,
                        quantity: p.quantity
                    })),
                    consider_inventory: considerInventory
                })
            });

            if (res.ok) {
                const data = await res.json();
                setResult(data);
            } else {
                const errData = await res.json();
                setError(errData.detail || 'MRP 계산 실패');
            }
        } catch (err) {
            setError('MRP 계산 중 오류가 발생했습니다.');
        }
        setIsCalculating(false);
    };

    // 품목 유형별 색상
    const typeColors: Record<string, string> = {
        'PRODUCT': colors.primary,
        'SEMI': colors.info,
        'RAW': colors.success
    };

    // 차트 데이터
    const chartData = result?.requirements
        .filter(r => r.item_type === 'RAW')
        .slice(0, 8)
        .map(r => ({
            name: r.item_code,
            총소요: r.gross_requirement,
            순소요: r.net_requirement,
            현재고: r.on_hand_qty
        })) || [];

    return (
        <div className="p-6 min-h-screen" style={{ background: colors.gray100 }}>
            {/* Header */}
            <div className="mb-6 p-4 bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg" style={{ background: `${colors.success}15` }}>
                            <Package className="w-6 h-6" style={{ color: colors.success }} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold" style={{ color: colors.gray900 }}>자재 소요량 예측 (MRP)</h1>
                            <p className="text-sm" style={{ color: colors.gray500 }}>Material Requirements Planning</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchProducts}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
                            style={{ background: colors.gray200, color: colors.gray700 }}
                        >
                            <RefreshCw className="w-4 h-4" />
                            새로고침
                        </button>
                        <button
                            onClick={runMRP}
                            disabled={isCalculating}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white"
                            style={{ background: isCalculating ? colors.gray400 : `linear-gradient(135deg, ${colors.success} 0%, #00a86b 100%)` }}
                        >
                            {isCalculating ? (
                                <>
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                    계산 중...
                                </>
                            ) : (
                                <>
                                    <Calculator className="w-4 h-4" />
                                    MRP 계산
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="mb-4 p-4 rounded-lg flex items-center gap-3" style={{ background: `${colors.danger}15` }}>
                    <AlertTriangle className="w-5 h-5" style={{ color: colors.danger }} />
                    <span style={{ color: colors.danger }}>{error}</span>
                </div>
            )}

            {/* Production Plan Input */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-xl p-4" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                    <h3 className="font-semibold mb-4" style={{ color: colors.gray900 }}>
                        <Box className="w-4 h-4 inline mr-2" />
                        생산 계획 입력
                    </h3>
                    <table className="w-full text-sm">
                        <thead style={{ background: colors.gray100 }}>
                            <tr>
                                <th className="px-3 py-2 text-left" style={{ color: colors.gray600 }}>품목코드</th>
                                <th className="px-3 py-2 text-left" style={{ color: colors.gray600 }}>품목명</th>
                                <th className="px-3 py-2 text-right" style={{ color: colors.gray600 }}>생산 수량</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productionPlans.map(plan => (
                                <tr key={plan.item_code} className="border-b" style={{ borderColor: colors.gray200 }}>
                                    <td className="px-3 py-2 font-medium" style={{ color: colors.primary }}>{plan.item_code}</td>
                                    <td className="px-3 py-2" style={{ color: colors.gray700 }}>{plan.item_name}</td>
                                    <td className="px-3 py-2 text-right">
                                        <input
                                            type="number"
                                            min="0"
                                            value={plan.quantity}
                                            onChange={(e) => handleQuantityChange(plan.item_code, Number(e.target.value))}
                                            className="w-28 px-3 py-1.5 text-right rounded border"
                                            style={{ borderColor: colors.gray300 }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* 옵션 */}
                    <div className="mt-4 flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={considerInventory}
                                onChange={(e) => setConsiderInventory(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <span className="text-sm" style={{ color: colors.gray700 }}>재고 고려 (순소요량 계산)</span>
                        </label>
                    </div>
                </div>

                {/* Summary Cards */}
                {result && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-xl p-4" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg" style={{ background: `${colors.primary}15` }}>
                                        <Layers className="w-5 h-5" style={{ color: colors.primary }} />
                                    </div>
                                    <div>
                                        <p className="text-xs" style={{ color: colors.gray500 }}>총 품목 수</p>
                                        <p className="text-xl font-bold" style={{ color: colors.gray900 }}>{result.summary.total_items}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-4" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg" style={{ background: `${colors.danger}15` }}>
                                        <AlertTriangle className="w-5 h-5" style={{ color: colors.danger }} />
                                    </div>
                                    <div>
                                        <p className="text-xs" style={{ color: colors.gray500 }}>부족 품목</p>
                                        <p className="text-xl font-bold" style={{ color: colors.danger }}>{result.summary.shortage_items}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-4" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg" style={{ background: `${colors.success}15` }}>
                                        <Box className="w-5 h-5" style={{ color: colors.success }} />
                                    </div>
                                    <div>
                                        <p className="text-xs" style={{ color: colors.gray500 }}>원자재</p>
                                        <p className="text-xl font-bold" style={{ color: colors.gray900 }}>{result.summary.raw_materials}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-4" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg" style={{ background: `${colors.info}15` }}>
                                        <Zap className="w-5 h-5" style={{ color: colors.info }} />
                                    </div>
                                    <div>
                                        <p className="text-xs" style={{ color: colors.gray500 }}>반제품</p>
                                        <p className="text-xl font-bold" style={{ color: colors.gray900 }}>{result.summary.semi_products}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 총소요/순소요 요약 */}
                        <div className="bg-white rounded-xl p-4" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-xs" style={{ color: colors.gray500 }}>총 소요량</p>
                                    <p className="text-2xl font-bold" style={{ color: colors.primary }}>
                                        {result.summary.total_gross.toLocaleString()}
                                    </p>
                                </div>
                                <ArrowRight className="w-6 h-6 self-center" style={{ color: colors.gray400 }} />
                                <div className="text-right">
                                    <p className="text-xs" style={{ color: colors.gray500 }}>순 소요량 (발주 필요)</p>
                                    <p className="text-2xl font-bold" style={{ color: colors.danger }}>
                                        {result.summary.total_net.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Chart */}
            {result && chartData.length > 0 && (
                <div className="bg-white rounded-xl p-4 mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                    <h3 className="font-semibold mb-4" style={{ color: colors.gray900 }}>원자재 소요량 비교</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={chartData} barGap={2}>
                            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip />
                            <Bar dataKey="현재고" fill={colors.gray400} radius={[4, 4, 0, 0]} />
                            <Bar dataKey="총소요" fill={colors.primary} radius={[4, 4, 0, 0]} />
                            <Bar dataKey="순소요" fill={colors.danger} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Detail Table */}
            {result && (
                <div className="bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                    <div className="p-4 border-b" style={{ borderColor: colors.gray200 }}>
                        <h3 className="font-semibold" style={{ color: colors.gray900 }}>상세 소요량 분석</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead style={{ background: colors.gray100 }}>
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium" style={{ color: colors.gray600 }}>품목</th>
                                    <th className="px-4 py-3 text-center font-medium" style={{ color: colors.gray600 }}>유형</th>
                                    <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray600 }}>총소요량</th>
                                    <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray600 }}>현재고</th>
                                    <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray600 }}>할당</th>
                                    <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray600 }}>입고예정</th>
                                    <th className="px-4 py-3 text-right font-medium" style={{ color: colors.danger }}>순소요량</th>
                                    <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray600 }}>L/T</th>
                                    <th className="px-4 py-3 text-center font-medium" style={{ color: colors.gray600 }}>상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.requirements.map((req) => (
                                    <tr key={req.item_code} className="border-b hover:bg-gray-50" style={{ borderColor: colors.gray200 }}>
                                        <td className="px-4 py-3">
                                            <div className="font-medium" style={{ color: colors.gray800 }}>{req.item_code}</div>
                                            <div className="text-xs" style={{ color: colors.gray500 }}>{req.item_name}</div>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="px-2 py-1 rounded text-xs" style={{ background: typeColors[req.item_type] + '15', color: typeColors[req.item_type] }}>
                                                {req.item_type}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right font-medium" style={{ color: colors.primary }}>{req.gross_requirement.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-right" style={{ color: colors.gray700 }}>{req.on_hand_qty.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-right" style={{ color: colors.gray600 }}>{req.allocated_qty.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-right" style={{ color: colors.gray600 }}>{req.in_transit_qty.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-right font-bold" style={{ color: req.net_requirement > 0 ? colors.danger : colors.success }}>
                                            {req.net_requirement.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-right" style={{ color: colors.gray600 }}>{req.lead_time}일</td>
                                        <td className="px-4 py-3 text-center">
                                            {req.net_requirement > 0 ? (
                                                <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ background: colors.danger + '15', color: colors.danger }}>
                                                    발주필요
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ background: colors.success + '15', color: colors.success }}>
                                                    충분
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="mt-6 p-4 rounded-xl" style={{ background: colors.gray200 }}>
                <div className="flex items-center justify-between text-sm">
                    <span style={{ color: colors.gray600 }}>
                        💡 <strong>Tip</strong>: 생산 수량을 입력하고 MRP 계산을 실행하면 BOM 전개 및 순소요량을 분석합니다.
                    </span>
                    <div className="flex items-center gap-2" style={{ color: colors.gray500 }}>
                        <Clock className="w-4 h-4" />
                        <span>API: localhost:8000</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
