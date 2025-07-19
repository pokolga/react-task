import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../components/search';
import { beforeEach, describe, expect, it, vi } from 'vitest';

type SearchCallback = (query: string) => Promise<void>;

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe('Search Component', () => {
  it('renders input and button', () => {
    const mockSearch: SearchCallback = vi.fn();
    render(<Search onSearch={mockSearch} />);

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('displays saved search from localStorage', async () => {
    localStorage.setItem('query', 'Rick');
    const mockSearch: SearchCallback = vi.fn();
    render(<Search onSearch={mockSearch} />);

    const input = await screen.findByDisplayValue('Rick');
    expect(input).toBeInTheDocument();
  });

  it('shows empty input when no saved term exists', () => {
    const mockSearch: SearchCallback = vi.fn();
    render(<Search onSearch={mockSearch} />);

    const input = screen.getByPlaceholderText('Search...');
    expect(input).toHaveValue('');
  });

  it('updates input value when user types', async () => {
    const mockSearch: SearchCallback = vi.fn();
    render(<Search onSearch={mockSearch} />);

    const input = screen.getByPlaceholderText('Search...');
    await userEvent.type(input, 'Morty');

    expect(input).toHaveValue('Morty');
  });

  it('triggers search callback with correct parameters on button click', async () => {
    const onSearchMock: SearchCallback = vi.fn();
    render(<Search onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'Morty');
    await userEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('Morty');
  });

  it('retrieves saved search term on component mount', async () => {
    localStorage.setItem('query', 'Morty');
    const onSearchMock: SearchCallback = vi.fn();
    render(<Search onSearch={onSearchMock} />);

    const input = screen.getByDisplayValue('Morty');
    expect(input).toBeInTheDocument();
  });

  it('calls onSearch when Enter key is pressed in input field', async () => {
    const onSearchMock: SearchCallback = vi.fn();
    render(<Search onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText('Search...');
    await userEvent.type(input, 'Morty{enter}');

    expect(onSearchMock).toHaveBeenCalledWith('Morty');
  });
});
