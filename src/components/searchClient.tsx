"use client";

import { useState } from "react";
import { CharacterType } from "../models/types";
import { APICharacter } from "../models/constants";
import Search from "./search";
import Result from "./result";

type Props = {
  initialCharacters: CharacterType[];
};

const SearchClient = ({ initialCharacters }: Props) => {
  const [query, setQuery] = useState("");
  const [characters, setCharacters] =
    useState<CharacterType[]>(initialCharacters);

  const onSearch = async (searchQuery: string) => {
    const res = await fetch(
      `${APICharacter}/?name=${encodeURIComponent(searchQuery)}`,
    );
    const data = await res.json();
    setCharacters(data.results || []);
  };

  return (
    <>
      <Search query={query} setQuery={setQuery} onSearch={onSearch} />
      <Result results={characters} />
    </>
  );
};

export default SearchClient;
