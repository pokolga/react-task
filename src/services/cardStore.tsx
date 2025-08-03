import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Store } from '../models/types';

export const useCardStore = create<Store>()(
  persist(
    (set, get) => ({
      selectedIds: [],
      toggleCard: (id: string) => {
        const current = get().selectedIds;
        const updated = current.includes(id) ? current.filter((i) => i !== id) : [...current, id];
        set({ selectedIds: updated });
      },
      isSelected: (id: string) => get().selectedIds.includes(id),
    }),
    {
      name: 'selected-cards',
    }
  )
);
