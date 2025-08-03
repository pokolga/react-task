import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useCardStore } from '../services/cardStore';
import * as fetchModule from '../services/fetch';
import { SelectedItemsPanel } from '../components/selectedItemsPanel';

vi.mock('../services/fetch');

describe('SelectedItemsPanel tests', () => {
  beforeEach(() => {
    useCardStore.setState({ selectedIds: [] });
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'blob:mock-url'),
      revokeObjectURL: vi.fn(),
    });
  });
  const cardArray = ['1'];

  it('renders panel when card is selected', () => {
    useCardStore.setState({ selectedIds: cardArray });

    render(<SelectedItemsPanel SelectedIds={cardArray} />);
    expect(screen.getByText(/Selected: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Unselect all/)).toBeInTheDocument();
    expect(screen.getByText(/Download/i)).toBeInTheDocument();
  });

  it('clears selection when button "Unselect all" is clicked', () => {
    const cardsArray = ['1', '2'];
    useCardStore.setState({ selectedIds: cardsArray });

    render(<SelectedItemsPanel SelectedIds={cardsArray} />);
    fireEvent.click(screen.getByText(/Unselect all/i));

    expect(useCardStore.getState().selectedIds).toEqual([]);
  });

  it('download when "Download" is clicked', async () => {
    const mockData = [
      {
        id: 1,
        name: 'Rick',
        status: 'Alive',
        species: 'Human',
        image: 'url',
      },
    ];

    (fetchModule.getMultipleCharacters as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockData
    );

    useCardStore.setState({ selectedIds: cardArray });

    render(<SelectedItemsPanel SelectedIds={cardArray} />);

    const anchor = screen.getByText(/virtual link/i) as HTMLAnchorElement;

    expect(anchor).toBeInTheDocument();

    const clickSpy = vi.spyOn(anchor, 'click');

    await fireEvent.click(screen.getByText(/Download/i));

    expect(clickSpy).toHaveBeenCalled();
  });
});
