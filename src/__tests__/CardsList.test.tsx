import { render, screen } from '@testing-library/react';
import { CardsList } from '../components/cardsList';
import { describe, expect, it } from 'vitest';

const mockCharacters = [
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
    render(<CardsList results={mockCharacters} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();

    expect(screen.getByAltText('Rick Sanchez')).toHaveAttribute('src', mockCharacters[0].image);
    expect(screen.getByAltText('Morty Smith')).toHaveAttribute('src', mockCharacters[1].image);
  });

  it('Renders correct number of items', () => {
    render(<CardsList results={mockCharacters} />);
    const cards = screen.getAllByRole('img');
    expect(cards).toHaveLength(2);
  });
});
