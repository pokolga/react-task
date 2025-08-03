import { describe, it, expect, beforeEach } from 'vitest';
import { useCardStore } from '../services/cardStore';

describe('useCardStore toggleCard (real implementation)', () => {
  beforeEach(() => {
    useCardStore.setState({ selectedIds: [] });
  });

  it('adds id if not present', () => {
    useCardStore.getState().toggleCard('999');
    expect(useCardStore.getState().selectedIds).toEqual(['999']);
  });

  it('removes id if already present', () => {
    useCardStore.setState({ selectedIds: ['1'] });
    useCardStore.getState().toggleCard('1');
    expect(useCardStore.getState().selectedIds).toEqual([]);
  });

  it('preserves other ids when removing one', () => {
    useCardStore.setState({ selectedIds: ['1', '999'] });
    useCardStore.getState().toggleCard('1');
    expect(useCardStore.getState().selectedIds).toEqual(['999']);
  });
});
