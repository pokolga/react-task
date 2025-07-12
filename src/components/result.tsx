import React from 'react';
import type { Character } from '../models/types';
import { CardsList } from './cardsList';

interface ResultState {
  output: string;
}
interface ResultType {
  results: Character[];
  error?: string;
}

export default class Result extends React.Component<ResultType, ResultState> {
  constructor(props: ResultType) {
    super(props);
    this.state = {
      output: '',
    };
  }

  render(): React.ReactNode {
    const { results, error } = this.props;
    return (
      <fieldset className="border border-blue-800 border-solid flex gap-2 m-2 p-2 rounded-xs">
        <legend className="text-xs text-blue-800 mb-2">Results</legend>
        {error && (
          <div className="text-red-600 text-sm px-2 py-1 border border-red-400 rounded bg-red-50">
            {error}
          </div>
        )}

        {results.length > 0 && !error && <CardsList results={results} />}
      </fieldset>
    );
  }
}
