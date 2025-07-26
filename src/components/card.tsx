import React from 'react';
import type { Character } from '../models/types';

interface CardProps {
  character: Character;
  onSelect: () => void;
}

export const Card: React.FC<CardProps> = ({ character, onSelect }) => {
  return (
    <div onClick={onSelect} className="w-64 rounded bg-white p-4 shadow hover:shadow-xl">
      <img
        src={character.image}
        alt={character.name}
        className="mb-2 h-64 w-full rounded object-cover"
      />
      <h3 className="text-lg font-semibold">{character.name}</h3>
      <p className="text-sm">
        {character.species} — {character.status}
      </p>
    </div>
  );
};
