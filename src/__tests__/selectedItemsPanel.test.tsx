import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useCardStore } from '../store/cardStore';
import * as fetchModule from '../services/fetch';
import { SelectedItemsPanel } from '../components/selectedItemsPanel';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
  const queryClient = new QueryClient();

  it('renders panel when card is selected', () => {
    useCardStore.setState({ selectedIds: cardArray });

    render(
      <QueryClientProvider client={queryClient}>
        <SelectedItemsPanel SelectedIds={cardArray} />
      </QueryClientProvider>
    );
    expect(screen.getByText(/Selected: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Unselect all/)).toBeInTheDocument();
    expect(screen.getByText(/Download/i)).toBeInTheDocument();
  });

  it('clears selection when button "Unselect all" is clicked', () => {
    const cardsArray = ['1', '2'];
    useCardStore.setState({ selectedIds: cardsArray });

    render(
      <QueryClientProvider client={queryClient}>
        <SelectedItemsPanel SelectedIds={cardsArray} />
      </QueryClientProvider>
    );
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
    render(
      <QueryClientProvider client={queryClient}>
        <SelectedItemsPanel SelectedIds={cardArray} />
      </QueryClientProvider>
    );

    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click');

    await userEvent.click(screen.getByText(/Download/i));

    expect(clickSpy).toHaveBeenCalled();
    const anchor = screen.getByRole('link');
    expect(anchor).toHaveAttribute('href', expect.stringContaining('blob:mock-url'));
  });

  it('generates correct filename on download', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SelectedItemsPanel SelectedIds={['1']} />
        );
      </QueryClientProvider>
    );
    const downloadButton = screen.getByText('Download');
    await userEvent.click(downloadButton);

    await waitFor(() => {
      const link = screen.getByText('virtual link') as HTMLAnchorElement;
      expect(link.download).toBe('1_items.csv');
    });
  });
});
