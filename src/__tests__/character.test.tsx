import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Character from '../pages/character';
import userEvent from '@testing-library/user-event';

let mockUseParams: () => { id: string };
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useParams: () => mockUseParams(),
    useNavigate: () => mockNavigate,
  };
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </MemoryRouter>
);

beforeEach(() => {
  vi.restoreAllMocks();
  mockNavigate.mockClear();
  vi.stubGlobal('fetch', vi.fn());
  mockUseParams = () => ({ id: '1' }); // по умолчанию
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
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/characters/1']}>
          <Routes>
            <Route path="/characters/:id" element={<Character />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
      expect(screen.getByText(/Status:/)).toHaveTextContent('Status:');
      expect(screen.getByText(/Alive/i)).toBeInTheDocument();
    });
  });

  it('shows 404 error message when character not found', async () => {
    mockUseParams = () => ({ id: '999' });

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({}),
      })
    );

    render(<Character />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText(/404/i)).toBeInTheDocument();
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

    render(<Character />, { wrapper: Wrapper });

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

    render(<Character />, { wrapper: Wrapper });

    const closeButton = await screen.findByRole('button', { name: /❌/ });
    await userEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith(expect.stringContaining('/?page=1&name='));
  });
});
