import { render, screen } from '@testing-library/react';
import App from '../App';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);
    expect(screen.getByText(/Characters Rick&Morty/i)).toBeInTheDocument();
  });
});

describe('For Search component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('Integration Test: saves trimmed search term to localStorage and calls fetch via App', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ results: [] }),
      })
    );

    render(<App />);

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, '  Morty  ');
    await userEvent.click(button);

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('Morty'));

    expect(localStorage.getItem('query')).toBe('Morty');
  });

  it('LocalStorage Integration: overwrites existing localStorage value when new search is performed', async () => {
    localStorage.setItem('query', 'some strange original meaning');
    expect(localStorage.getItem('query')).toBe('some strange original meaning');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ results: [] }),
      })
    );

    render(<App />);

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, 'Morty');
    await userEvent.click(button);

    expect(localStorage.getItem('query')).toBe('Morty');
  });
});

describe('For CardList and Result components', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('Shows loading state while fetching data', async () => {
    render(<App />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('Displays 404 error message when no results found', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      })
    );

    render(<App />);

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'UnknownCharacter');
    await userEvent.click(button);

    expect(screen.getByText(/Error: 404 Nothing was found for your request!/)).toBeInTheDocument();
  });
});
