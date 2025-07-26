import { render, screen } from '@testing-library/react';
import Home from './../pages/home';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import type { CharacterType } from '../models/types';

describe('Home', () => {
  it('renders headline', () => {
    render(<Home />);
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

    render(<Home />);

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

    render(<Home />);

    const input: HTMLInputElement = screen.getByPlaceholderText('Search...');
    const button: HTMLButtonElement = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, 'Morty');
    await userEvent.click(button);

    const updatedQuery: string | null = localStorage.getItem('query');
    expect(updatedQuery).toBe('Morty');
  });
});

it('Displays 404 error message when no results found', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(
      (): Promise<Response> =>
        Promise.resolve({
          ok: false,
          status: 404,
        } as Response)
    )
  );

  render(<Home />);

  const errorMessage = await screen.findByText(/Error: 404 Nothing was found for your request!/i);

  expect(errorMessage).toBeInTheDocument();
});
