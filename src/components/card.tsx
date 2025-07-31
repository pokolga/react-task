import React from 'react';
import type { CharacterType } from '../models/types';
import { useCardStore } from '../services/cardStore';

interface CardProps {
  character: CharacterType;
  onSelect: () => void;
}

export const Card: React.FC<CardProps> = ({ character, onSelect }) => {
  const toggleCard = useCardStore((s) => s.toggleCard);
  const isSelected = useCardStore((s) => s.isSelected(String(character.id)));
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      className="w-64 rounded bg-(--color-bg-card) p-4 text-(--color-text) shadow hover:shadow-xl"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          toggleCard(String(character.id));
        }}
        className={`cursor-poiner relative -top-2 h-4 w-4 rounded-[25%] text-xs text-white select-none ${isSelected ? 'bg-(--color-red-500)' : 'bg-white'}`}
      >
        &nbsp;✓
      </div>
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
