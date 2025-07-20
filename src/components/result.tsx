import React from 'react';
import type { Character } from '../models/types';
import { CardsList } from './cardsList';

interface ResultState {
  output: string;
}
interface ResultType {
  results: Character[];
  error?: string;
  loading: boolean;
}

export default class Result extends React.Component<ResultType, ResultState> {
  constructor(props: ResultType) {
    super(props);
    this.state = {
      output: '',
    };
  }

  render(): React.ReactNode {
    const { results, error, loading } = this.props;
    return (
      <fieldset className="relative m-2 flex gap-2 rounded-xs border border-solid border-blue-800 p-2">
        <legend className="mb-2 text-xs text-blue-800">Results</legend>
        {error && (
          <div className="rounded border border-red-400 bg-red-50 px-2 py-1 text-sm text-red-600">
            {error}
          </div>
        )}

        {results.length > 0 && !error && <CardsList results={results} />}
        {loading && (
          <div className="fixed inset-0 z-2 flex justify-center bg-gray-700/90 px-2 py-1 text-xl">
            <div
              className="h-8 w-8 animate-spin place-self-center rounded-full border-4 border-white border-t-transparent"
              data-testid="spinner"
            ></div>
          </div>
        )}
      </fieldset>
    );
  }
}
