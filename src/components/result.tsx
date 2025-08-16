"use client";
import { useContext, type FC } from "react";
import type { CharacterType, Info } from "../models/types";
import { CardsList } from "./cardsList";
import Spinner from "./spinner";
import { texts } from "../models/texts";
import { LanguageContext } from "../context/language-context";

interface ResultType {
  results: CharacterType[];
  info?: Info | null;
  error?: string;
  loading?: boolean;
  activeQuery?: string;
  currentPage?: string;
}

const Result: FC<ResultType> = ({ results, error, loading }: ResultType) => {
  const { language } = useContext(LanguageContext);
  return (
    <fieldset className="relative m-2 flex flex-col gap-2 rounded-xs border border-solid border-(--color-bg-button) p-2">
      <legend className="mb-2 text-xs text-(--color-bg-button)">
        {texts[language].results}
      </legend>
      {error && (
        <div
          className="rounded border border-red-400 bg-red-50 px-2 py-1 text-sm text-red-600"
          data-testid="error-message"
        >
          {error}
        </div>
      )}

      {results.length > 0 && !error && <CardsList results={results} />}
      {loading && <Spinner />}
    </fieldset>
  );
};
export default Result;
