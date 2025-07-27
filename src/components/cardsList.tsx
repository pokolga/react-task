import React, { type ReactNode } from 'react';
import type { CharacterType } from '../models/types';
import { Card } from './card';
import { useNavigate } from 'react-router-dom';

interface ListProps {
  results: CharacterType[];
  onClick?: () => void;
}

export const CardsList: React.FC<ListProps> = ({ results, onClick }): ReactNode => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap justify-center gap-4" onClick={onClick}>
      {results.map((char) => (
        <Card key={char.id} character={char} onSelect={() => navigate(`/characters/${char.id}`)} />
      ))}
    </div>
  );
};
