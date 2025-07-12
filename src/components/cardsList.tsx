import React from 'react';
import type { Character } from '../models/types';
import { Card } from './card';

interface ListProps {
  results: Character[];
}

export class CardsList extends React.Component<ListProps> {
  render(): React.ReactNode {
    return (
      <div className="flex flex-wrap gap-4 justify-center">
        {this.props.results.map((char) => (
          <Card key={char.id} character={char} />
        ))}
      </div>
    );
  }
}
