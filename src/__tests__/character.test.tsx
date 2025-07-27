import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Character from '../pages/character';
import userEvent from '@testing-library/user-event';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(() => ({ id: '1' })),
    useNavigate: () => mockNavigate,
  };
});

beforeEach(() => {
  vi.restoreAllMocks();
  mockNavigate.mockClear();
  vi.stubGlobal('fetch', vi.fn());
});

describe('Character component', () => {
  it('renders character details when fetch succeeds', async () => {
    const mockCharacter = {
      id: '1',
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      origin: { name: 'Earth' },
      location: { name: 'Earth' },
      image: 'rick.png',
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockCharacter),
      })
    );

    render(
      <MemoryRouter initialEntries={['/characters/1']}>
        <Routes>
          <Route path="/characters/:id" element={<Character />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
      expect(screen.getByText(/Status:/)).toHaveTextContent('Status:');
      expect(screen.getByText(/Alive/i)).toBeInTheDocument();
    });
  });

  it('shows error message when fetch fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
      })
    );

    render(
      <MemoryRouter initialEntries={['/characters/999']}>
        <Routes>
          <Route path="/characters/:id" element={<Character />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Nothing was found for your request/i)).toBeInTheDocument();
    });
  });

  it('renders ❌ button with correct styles', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            id: '1',
            name: 'Rick',
            status: 'Alive',
            species: 'Human',
            gender: 'Male',
            origin: { name: 'Earth' },
            location: { name: 'Earth' },
            image: 'rick.png',
          }),
      })
    );

    render(<Character />, { wrapper: MemoryRouter });

    const closeButton = await screen.findByRole('button', { name: /❌/ });
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveClass('cursor-pointer', 'hover:border-red-300', 'active:bg-red-300');
  });

  it('calls navigate on ❌ button click', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            id: '1',
            name: 'Rick',
            status: 'Alive',
            species: 'Human',
            gender: 'Male',
            origin: { name: 'Earth' },
            location: { name: 'Earth' },
            image: 'rick.png',
          }),
      })
    );

    render(<Character />, { wrapper: MemoryRouter });

    const closeButton = await screen.findByRole('button', { name: /❌/ });
    await userEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});

it('renders character name, status, and species', async () => {
  const mockCharacter = {
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
  };

  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockCharacter),
    })
  );

  render(<Character />, { wrapper: MemoryRouter });

  expect(await screen.findByRole('heading', { name: /Morty Smith/i })).toBeInTheDocument();
  const img: HTMLImageElement = screen.getByRole('img');
  expect(img).toHaveAttribute('alt', 'Morty Smith');
});
