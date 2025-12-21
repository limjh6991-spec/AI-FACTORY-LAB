/**
 * 레이아웃 상태 관리 (Zustand) - 멀티 슬롯 지원
 */

import { create } from 'zustand';
import type { LayoutItem, LayoutType, ComponentItem, Slot } from '../types';
import { LAYOUT_DEFINITIONS, COMPONENT_DEFINITIONS } from '../types';

interface LayoutState {
    items: LayoutItem[];
    selectedItemId: string | null;
    selectedSlotId: string | null;

    // Actions
    addLayout: (type: LayoutType) => void;
    removeItem: (id: string) => void;
    updateLayout: (layout: { i: string; x: number; y: number; w: number; h: number }[]) => void;
    selectSlot: (itemId: string | null, slotId: string | null) => void;
    addComponent: (itemId: string, slotId: string, component: ComponentItem) => void;
    removeComponent: (itemId: string, slotId: string, componentIndex: number) => void;
    clearSlot: (itemId: string, slotId: string) => void;
    clearAll: () => void;
    loadLayout: (items: LayoutItem[]) => void;
}

let itemCounter = 0;

const createSlots = (count: number, layoutId: string): Slot[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: `${layoutId}_slot_${i + 1}`,
        components: [],
    }));
};

export const useLayoutStore = create<LayoutState>((set) => ({
    items: [],
    selectedItemId: null,
    selectedSlotId: null,

    addLayout: (type: LayoutType) => {
        const def = LAYOUT_DEFINITIONS.find(d => d.type === type);
        if (!def) return;

        itemCounter++;
        const layoutId = `layout_${itemCounter}`;
        const newItem: LayoutItem = {
            i: layoutId,
            type,
            x: 0,
            y: Infinity,
            w: def.defaultSize.w,
            h: def.defaultSize.h,
            minW: def.minSize.w,
            minH: def.minSize.h,
            slots: createSlots(def.slotCount, layoutId),
        };

        set((state) => ({ items: [...state.items, newItem] }));
    },

    removeItem: (id: string) => {
        set((state) => ({
            items: state.items.filter((item) => item.i !== id),
            selectedItemId: state.selectedItemId === id ? null : state.selectedItemId,
            selectedSlotId: state.selectedItemId === id ? null : state.selectedSlotId,
        }));
    },

    updateLayout: (layout) => {
        set((state) => ({
            items: state.items.map((item) => {
                const updated = layout.find((l) => l.i === item.i);
                if (updated) {
                    return { ...item, x: updated.x, y: updated.y, w: updated.w, h: updated.h };
                }
                return item;
            }),
        }));
    },

    selectSlot: (itemId, slotId) => {
        set({ selectedItemId: itemId, selectedSlotId: slotId });
    },

    addComponent: (itemId, slotId, component) => {
        set((state) => ({
            items: state.items.map((item) => {
                if (item.i !== itemId) return item;

                return {
                    ...item,
                    slots: item.slots.map((slot) => {
                        if (slot.id !== slotId) return slot;

                        // 단일 선택 컴포넌트(Grid, Chart, Tab)는 교체
                        const def = COMPONENT_DEFINITIONS.find(d => d.type === component.type);
                        if (def && !def.multiSelect) {
                            return { ...slot, components: [component] };
                        }

                        // 다중 선택 컴포넌트(Option, Button)는 추가
                        return { ...slot, components: [...slot.components, component] };
                    }),
                };
            }),
        }));
    },

    removeComponent: (itemId, slotId, componentIndex) => {
        set((state) => ({
            items: state.items.map((item) => {
                if (item.i !== itemId) return item;

                return {
                    ...item,
                    slots: item.slots.map((slot) => {
                        if (slot.id !== slotId) return slot;
                        return {
                            ...slot,
                            components: slot.components.filter((_, i) => i !== componentIndex),
                        };
                    }),
                };
            }),
        }));
    },

    clearSlot: (itemId, slotId) => {
        set((state) => ({
            items: state.items.map((item) => {
                if (item.i !== itemId) return item;
                return {
                    ...item,
                    slots: item.slots.map((slot) =>
                        slot.id === slotId ? { ...slot, components: [] } : slot
                    ),
                };
            }),
        }));
    },

    clearAll: () => {
        set({ items: [], selectedItemId: null, selectedSlotId: null });
        itemCounter = 0;
    },

    loadLayout: (items: LayoutItem[]) => {
        set({ items, selectedItemId: null, selectedSlotId: null });
        const maxId = items.reduce((max, item) => {
            const match = item.i.match(/_(\d+)$/);
            return match ? Math.max(max, parseInt(match[1], 10)) : max;
        }, 0);
        itemCounter = maxId;
    },
}));
