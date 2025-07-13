import React from 'react';
import type { Character } from '../models/types';

interface CardProps {
  character: Character;
}

export class Card extends React.Component<CardProps> {
  render(): React.ReactNode {
    const { character } = this.props;
    return (
      <div className="bg-white shadow rounded p-4 w-64 hover:shadow-xl">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-64 object-cover rounded mb-2"
        />
        <h3 className="text-lg font-semibold">{character.name}</h3>
        <p className="text-sm">
          {character.species} — {character.status}
        </p>
      </div>
    );
  }
}
