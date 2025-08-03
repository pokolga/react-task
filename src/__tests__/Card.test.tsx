import { fireEvent, render, screen } from '@testing-library/react';
import { Card } from '../components/card';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { CharacterType } from '../models/types';
import { useCardStore } from '../store/cardStore';

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

  const mockToggleCard = vi.fn();

  beforeEach(() => {
    useCardStore.setState({
      selectedIds: ['1'],
      toggleCard: mockToggleCard,
      isSelected: (id: string) => id === '1',
    });
  });

  it('calls toggleCard when checkmark is clicked', () => {
    const character: CharacterType = {
      id: 1,
      name: 'Rick Sanchez',
      image: 'https://example.com/rick.png',
      species: 'Human',
      status: 'Alive',
    };

    render(<Card character={character} onSelect={() => {}} />);

    const checkmark = screen.getByText('✓');
    fireEvent.click(checkmark);

    expect(mockToggleCard).toHaveBeenCalledWith('1');
    expect(mockToggleCard).toHaveBeenCalledTimes(1);
  });
});
