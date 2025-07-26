import { render, screen } from '@testing-library/react';
import { Card } from '../components/card';
import { describe, expect, it } from 'vitest';
import type { CharacterType } from '../models/types';

describe('Card', () => {
  const mockCharacter: CharacterType = {
    id: 1,
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/rick.png',
    species: 'Human',
    status: 'Alive',
  };

  it('renders character info correctly', () => {
    render(<Card character={mockCharacter} onSelect={() => {}} />);

    const img: HTMLImageElement = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockCharacter.image);
    expect(img).toHaveAttribute('alt', mockCharacter.name);

    const nameText: HTMLElement = screen.getByText(mockCharacter.name);
    expect(nameText).toBeInTheDocument();

    const speciesStatusText: HTMLElement = screen.getByText(/Human — Alive/);
    expect(speciesStatusText).toBeInTheDocument();
  });

  const incompleteCharacter = {
    id: 1,
    name: '',
    image: 'abracadabra',
    species: '',
    status: '',
  };

  it('handles missing props gracefully', () => {
    render(<Card character={incompleteCharacter} onSelect={() => {}} />);
    const img: HTMLImageElement = screen.getByAltText('');
    expect(img).toHaveAttribute('src', 'abracadabra');
  });
});
