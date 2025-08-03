import { type FC } from 'react';
import type { CharacterType } from '../models/types';
import { CardsList } from './cardsList';
import Spinner from './spinner';

interface ResultType {
  results: CharacterType[];
  error?: string;
  loading: boolean;
}

const Result: FC<ResultType> = ({ results, error, loading }: ResultType) => {
  return (
    <fieldset className="relative m-2 flex gap-2 rounded-xs border border-solid border-(--color-bg-button) p-2">
      <legend className="mb-2 text-xs text-(--color-bg-button)">Results</legend>
      {error && (
        <div className="rounded border border-red-400 bg-red-50 px-2 py-1 text-sm text-red-600">
          {error}
        </div>
      )}

      {results.length > 0 && !error && <CardsList results={results} />}
      {loading && <Spinner />}
    </fieldset>
  );
};
export default Result;
