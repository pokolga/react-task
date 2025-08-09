import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useState } from 'react';
import Search from '../components/search';

describe('Search Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  const mockSetQuery = vi.fn();
  const mockSearch = vi.fn();
  const user = userEvent.setup();

  it('renders input and button', () => {
    const query = 'Morty';

    render(<Search query={query} setQuery={mockSetQuery} onSearch={mockSearch} />);

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(input).toHaveValue('Morty');
  });

  it('shows empty input when no saved term exists', () => {
    render(<Search query="" setQuery={mockSetQuery} onSearch={mockSearch} />);
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toHaveValue('');
  });

  it('calls setQuery when user types', async () => {
    render(<Search query="" setQuery={mockSetQuery} onSearch={mockSearch} />);
    const input = screen.getByPlaceholderText('Search...');

    await user.type(input, 'Morty');

    expect(mockSetQuery).toHaveBeenCalledTimes(5);
    expect(mockSetQuery).toHaveBeenLastCalledWith('y');
  });

  it('triggers search callback with correct parameters on button click', async () => {
    const query = 'Rick';

    render(<Search query={query} setQuery={mockSetQuery} onSearch={mockSearch} />);
    const button = screen.getByRole('button', { name: /search/i });

    await user.click(button);

    expect(mockSearch).toHaveBeenCalledWith('Rick');
  });

  it('calls onSearch when Enter key is pressed in input field', async () => {
    render(<Search query="Morty" setQuery={mockSetQuery} onSearch={mockSearch} />);
    const input = screen.getByPlaceholderText('Search...');

    await user.type(input, '{enter}');

    expect(mockSearch).toHaveBeenCalledWith('Morty');
  });

  it('updates input value when user types', async () => {
    const Wrapper = () => {
      const [query, setQuery] = useState('');
      return <Search query={query} setQuery={setQuery} onSearch={vi.fn()} />;
    };

    render(<Wrapper />);
    const input = screen.getByPlaceholderText('Search...');

    await user.type(input, 'Morty');

    expect(input).toHaveValue('Morty');
  });
});
