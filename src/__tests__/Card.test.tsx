import { render, screen } from '@testing-library/react';
import { Card } from '../components/card';
import { describe, expect, it, vi } from 'vitest';
import type { CharacterType } from '../models/types';
import userEvent from '@testing-library/user-event';

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
    name: 'Name',
    image: 'abracadabra',
    species: '',
    status: '',
  };

  it('handles missing props gracefully', () => {
    render(<Card character={incompleteCharacter} onSelect={() => {}} />);
    const img: HTMLImageElement = screen.getByAltText('Name');
    expect(img).toHaveAttribute('src', 'abracadabra');
  });

  it('calls onSelect when card is clicked', async () => {
    const mockCharacter = {
      id: 1,
      name: 'Summer Smith',
      status: 'Alive',
      species: 'Human',
      image: 'summer.png',
    };

    const mockOnSelect = vi.fn();
    render(<Card character={mockCharacter} onSelect={mockOnSelect} />);

    const cardElement: HTMLElement | null = screen
      .getByRole('img', { name: /Summer Smith/i })
      .closest('div');
    expect(cardElement).toBeInTheDocument();
    if (cardElement) {
      await userEvent.click(cardElement);
    }

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });
});
