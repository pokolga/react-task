import React, { type ReactNode } from 'react';
import type { Character } from '../models/types';
import { Card } from './card';

interface ListProps {
  results: Character[];
}

export const CardsList: React.FC<ListProps> = ({ results }): ReactNode => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {results.map((char) => (
        <Card key={char.id} character={char} />
      ))}
    </div>
  );
};
