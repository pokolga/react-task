import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, expect, it, vi } from 'vitest';
import Character from '../pages/character';

beforeEach(() => {
  vi.restoreAllMocks();
});

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
