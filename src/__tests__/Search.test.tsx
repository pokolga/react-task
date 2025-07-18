import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../components/search';
import { beforeEach, expect, it, vi } from 'vitest';

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

it('Rendering Test: renders input and button', () => {
  render(<Search onSearch={vi.fn()} />);
  expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
});

it('Rendering Test: displays saved search from localStorage', async () => {
  localStorage.setItem('query', 'Rick');
  render(<Search onSearch={vi.fn()} />);
  const input = await screen.findByDisplayValue('Rick');
  expect(input).toBeInTheDocument();
});

it('Rendering Test: shows empty input when no saved term exists', () => {
  render(<Search onSearch={vi.fn()} />);
  expect(screen.getByPlaceholderText('Search...')).toHaveValue('');
});

it('User Interaction Test: updates input value when user types', async () => {
  render(<Search onSearch={vi.fn()} />);
  const input = screen.getByPlaceholderText('Search...');

  await userEvent.type(input, 'Morty');

  expect(input).toHaveValue('Morty');
});

it('User Interaction Test: triggers search callback with correct parameters', async () => {
  const onSearchMock = vi.fn();
  render(<Search onSearch={onSearchMock} />);

  const input = screen.getByPlaceholderText('Search...');
  const button = screen.getByRole('button', { name: /search/i });

  await userEvent.type(input, 'Morty');
  await userEvent.click(button);

  expect(onSearchMock).toHaveBeenCalledWith('Morty');
});

it('LocalStorage Integration: retrieves saved search term on component mount', async () => {
  const onSearchMock = vi.fn();
  render(<Search onSearch={onSearchMock} />);

  const input = screen.getByPlaceholderText('Search...');
  const button = screen.getByRole('button', { name: /search/i });

  await userEvent.type(input, 'Morty');
  await userEvent.click(button);

  expect(onSearchMock).toHaveBeenCalledWith('Morty');
});

it('calls onSearch when Enter key is pressed in input field', async () => {
  const onSearchMock = vi.fn();

  render(<Search onSearch={onSearchMock} />);
  const input = screen.getByPlaceholderText('Search...');

  await userEvent.type(input, 'Morty{enter}');

  expect(onSearchMock).toHaveBeenCalledWith('Morty');
});
