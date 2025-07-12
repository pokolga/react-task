import React from 'react';
import type { Character } from '../models/types';
import { CardsList } from './cardsList';

interface ResultState {
  output: string;
}
interface ResultType {
  results: Character[];
}

export default class Result extends React.Component<ResultType, ResultState> {
  constructor(props: ResultType) {
    super(props);
    this.state = {
      output: '',
    };
  }

  render(): React.ReactNode {
    return (
      <fieldset className="border border-blue-800 border-solid flex gap-2 m-2 p-2 rounded-xs">
        <legend className="text-xs text-blue-800 mb-2">Results</legend>
        <CardsList results={this.props.results} />
      </fieldset>
    );
  }
}
