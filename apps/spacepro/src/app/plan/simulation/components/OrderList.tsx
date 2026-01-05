/**
 * OrderList Component
 * 제품 목록 관리 (추가/삭제/수량/우선순위)
 */

import React from 'react';
import { Package, Trash2 } from 'lucide-react';
import { colors, ProductOrder } from '../types';

interface OrderListProps {
    orders: ProductOrder[];
    onRemove: (code: string) => void;
    onUpdateQuantity: (code: string, qty: number) => void;
    onUpdatePriority: (code: string, priority: 'NORMAL' | 'HIGH' | 'URGENT') => void;
}

const priorityLabels = {
    NORMAL: { label: '일반', color: colors.success },
    HIGH: { label: '높음', color: colors.warning },
    URGENT: { label: '긴급', color: colors.danger }
};

export function OrderList({ orders, onRemove, onUpdateQuantity, onUpdatePriority }: OrderListProps) {
    if (orders.length === 0) return null;

    return (
        <div className="mt-4 pt-4 border-t" style={{ borderColor: colors.gray200 }}>
            <h3 className="text-sm font-medium mb-3" style={{ color: colors.gray700 }}>생산 목록</h3>
            <div className="space-y-2">
                {orders.map((order, idx) => (
                    <div
                        key={order.item_code}
                        className="flex items-center gap-3 p-2 rounded-lg transition-all hover:shadow-sm"
                        style={{ background: colors.gray100 }}
                    >
                        <div className="w-3 h-8 rounded" style={{ background: order.color }} />
                        <Package className="w-4 h-4" style={{ color: colors.gray500 }} />
                        <div className="flex-1">
                            <div className="font-medium text-sm" style={{ color: colors.gray800 }}>
                                {order.item_code}
                                {order.source_progress_id && (
                                    <span className="ml-2 text-xs px-1.5 py-0.5 rounded"
                                        style={{ background: colors.warning + '20', color: colors.warning }}>
                                        이월
                                    </span>
                                )}
                            </div>
                            <div className="text-xs" style={{ color: colors.gray500 }}>
                                {order.routing.length}개 공정
                            </div>
                        </div>
                        <input
                            type="number"
                            value={order.quantity}
                            onChange={(e) => onUpdateQuantity(order.item_code, parseInt(e.target.value) || 0)}
                            className="w-20 px-2 py-1 rounded text-sm text-right border"
                            style={{ borderColor: colors.gray300 }}
                        />
                        <select
                            value={order.priority}
                            onChange={(e) => onUpdatePriority(order.item_code, e.target.value as any)}
                            className="px-2 py-1 rounded text-xs border"
                            style={{
                                borderColor: colors.gray300,
                                color: priorityLabels[order.priority].color,
                                fontWeight: 600
                            }}
                        >
                            <option value="NORMAL" style={{ color: colors.success }}>일반</option>
                            <option value="HIGH" style={{ color: colors.warning }}>높음</option>
                            <option value="URGENT" style={{ color: colors.danger }}>긴급</option>
                        </select>
                        <button
                            onClick={() => onRemove(order.item_code)}
                            className="p-1 rounded hover:bg-red-50"
                        >
                            <Trash2 className="w-4 h-4" style={{ color: colors.danger }} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
