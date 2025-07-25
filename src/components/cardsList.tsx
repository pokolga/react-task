import React, { type ReactNode } from 'react';
import type { Character } from '../models/types';
import { Card } from './card';

interface ListProps {
  results: Character[];
  onSelectCard: (char: Character) => void;
}

export const CardsList: React.FC<ListProps> = ({ results, onSelectCard }): ReactNode => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {results.map((char) => (
        <Card key={char.id} character={char} onSelect={() => onSelectCard(char)} />
      ))}
    </div>
  );
};
