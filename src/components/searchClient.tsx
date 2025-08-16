"use client";

import { useState } from "react";
import { ApiResponse, CharacterType } from "../models/types";
import { APICharacter } from "../models/constants";
import Search from "./search";
import Result from "./result";
import Details from "./details";

type Props = {
  initialCharacters: ApiResponse | null;
  characterId?: string;
  characterData?: CharacterType | null;
};

const SearchClient = ({ initialCharacters, characterData }: Props) => {
  const [query, setQuery] = useState("");
  const [characters, setCharacters] = useState<CharacterType[]>(
    initialCharacters?.results ?? [],
  );
  const [errorMessage, setErrorMessage] = useState("");

  const onSearch = async (searchQuery: string) => {
    try {
      const res = await fetch(
        `${APICharacter}/?name=${encodeURIComponent(searchQuery)}&page=1`,
      );
      if (res.status === 404) {
        setCharacters([]);
        setErrorMessage("Error 404 for this request");
        return;
      }

      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      setCharacters(data.results || []);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Fetch error:", err.message);
        throw err;
      }
      throw new Error("Unknown error");
    }
  };
  let info = null;
  if (initialCharacters?.info) {
    info = initialCharacters.info;
  }

  return (
    <>
      <Search query={query} setQuery={setQuery} onSearch={onSearch} />
      <div className="flex">
        <Result results={characters} info={info} />
        {errorMessage && <p>{errorMessage}</p>}
        {characterData && (
          <div className="w-1/4 p-4 border-l">
            <Details params={{ characterData: characterData }} />
          </div>
        )}
      </div>
    </>
  );
};

export default SearchClient;
