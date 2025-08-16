"use client";
import { type FC } from "react";
import type { CharacterType, Info } from "../models/types";
import { CardsList } from "./cardsList";
import Spinner from "./spinner";
import Pagination from "./pagination";

interface ResultType {
  results: CharacterType[];
  info: Info | null;
  error?: string;
  loading?: boolean;
  activeQuery?: string;
  currentPage?: string;
}

const Result: FC<ResultType> = ({
  results,
  info,
  error,
  loading,
}: ResultType) => {
  return (
    <fieldset className="relative m-2 flex flex-col gap-2 rounded-xs border border-solid border-(--color-bg-button) p-2">
      <legend className="mb-2 text-xs text-(--color-bg-button)">Results</legend>
      {error && (
        <div
          className="rounded border border-red-400 bg-red-50 px-2 py-1 text-sm text-red-600"
          data-testid="error-message"
        >
          {error}
        </div>
      )}

      {results.length > 0 && !error && <CardsList results={results} />}
      {info && <Pagination {...info} />}
      {loading && <Spinner />}
    </fieldset>
  );
};
export default Result;
