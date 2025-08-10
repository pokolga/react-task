import { render, screen } from '@testing-library/react';
import Home from '../pages/home';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import type { CharacterType } from '../models/types';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </MemoryRouter>
);

describe('Home', () => {
  it('renders headline', () => {
    render(
      <Wrapper>
        <Home />
      </Wrapper>
    );
    const headline: HTMLElement = screen.getByText(/Characters Rick&Morty/i);
    expect(headline).toBeInTheDocument();
  });
});

describe('For Search component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('Integration Test: saves trimmed search term to localStorage and calls fetch via App', async () => {
    const mockFetch = vi.fn(
      (): Promise<Response> =>
        Promise.resolve({
          ok: true,
          json: async (): Promise<{ results: CharacterType[] }> => ({ results: [] }),
        } as Response)
    );

    vi.stubGlobal('fetch', mockFetch);

    render(
      <Wrapper>
        <Home />
      </Wrapper>
    );

    const input: HTMLInputElement = screen.getByPlaceholderText('Search...');
    const button: HTMLButtonElement = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, '  Morty  ');
    await userEvent.click(button);

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('Morty'));

    const savedQuery: string | null = localStorage.getItem('query');
    expect(savedQuery).toBe('Morty');
  });

  it('LocalStorage Integration: overwrites existing localStorage value when new search is performed', async () => {
    localStorage.setItem('query', 'some strange original meaning');
    const initialQuery: string | null = localStorage.getItem('query');
    expect(initialQuery).toBe('some strange original meaning');

    const mockFetch = vi.fn(
      (): Promise<Response> =>
        Promise.resolve({
          ok: true,
          json: async (): Promise<{ results: CharacterType[] }> => ({ results: [] }),
        } as Response)
    );

    vi.stubGlobal('fetch', mockFetch);

    render(
      <Wrapper>
        <Home />
      </Wrapper>
    );

    const input: HTMLInputElement = screen.getByPlaceholderText('Search...');
    const button: HTMLButtonElement = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, 'Morty');
    await userEvent.click(button);

    const updatedQuery: string | null = localStorage.getItem('query');
    expect(updatedQuery).toBe('Morty');
  });
});

it('renders pagination buttons with Previous disabled on first page', async () => {
  const mockData = {
    info: {
      count: 20,
      pages: 2,
      next: 'https://api.example.com/?page=2',
      prev: null,
    },
    results: [
      { id: 1, name: 'Rick Sanchez' },
      { id: 2, name: 'Morty Smith' },
    ],
  };

  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    })
  );

  render(
    <MemoryRouter initialEntries={['/?name=rick&page=1']}>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </MemoryRouter>
  );

  const prevButton = await screen.findByRole('button', { name: /previous/i });
  const nextButton = screen.getByRole('button', { name: /next/i });

  expect(prevButton).toBeDisabled();
  expect(nextButton).toBeEnabled();
});
