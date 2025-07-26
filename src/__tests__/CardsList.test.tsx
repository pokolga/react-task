import { render, screen } from '@testing-library/react';
import { CardsList } from '../components/cardsList';
import { describe, expect, it } from 'vitest';
import type { CharacterType } from '../models/types';
import { MemoryRouter } from 'react-router-dom';

const mockCharacters: CharacterType[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/rick.png',
    species: 'Human',
    status: 'Alive',
  },
  {
    id: 2,
    name: 'Morty Smith',
    image: 'https://rickandmortyapi.com/morty.png',
    species: 'Human',
    status: 'Alive',
  },
];

describe('CardsList', () => {
  it('renders a list of character cards', () => {
    render(
      <MemoryRouter>
        <CardsList results={mockCharacters} />
      </MemoryRouter>
    );

    const rickText: HTMLElement = screen.getByText('Rick Sanchez');
    const mortyText: HTMLElement = screen.getByText('Morty Smith');

    const rickImg: HTMLImageElement = screen.getByAltText('Rick Sanchez');
    const mortyImg: HTMLImageElement = screen.getByAltText('Morty Smith');

    expect(rickText).toBeInTheDocument();
    expect(mortyText).toBeInTheDocument();

    expect(rickImg).toHaveAttribute('src', mockCharacters[0].image);
    expect(mortyImg).toHaveAttribute('src', mockCharacters[1].image);
  });

  it('renders correct number of items', () => {
    render(
      <MemoryRouter>
        <CardsList results={mockCharacters} />
      </MemoryRouter>
    );
    const cards: HTMLImageElement[] = screen.getAllByRole('img');
    expect(cards).toHaveLength(2);
  });
});
