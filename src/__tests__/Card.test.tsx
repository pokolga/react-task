import { render, screen } from '@testing-library/react';
import { Card } from '../components/card';
import { describe, expect, it } from 'vitest';
import type { Character } from '../models/types';

describe('Card', () => {
  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/rick.png',
    species: 'Human',
    status: 'Alive',
  };

  it('renders character info correctly', () => {
    render(<Card character={mockCharacter} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockCharacter.image);
    expect(img).toHaveAttribute('alt', mockCharacter.name);

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();

    expect(screen.getByText(/Human — Alive/)).toBeInTheDocument();
  });
});
