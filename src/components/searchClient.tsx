"use client";

import { useContext, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ApiResponse, CharacterType } from "../models/types";
import Search from "./search";
import Result from "./result";
import Details from "./details";
import Pagination from "./pagination";
import Spinner from "./spinner";
import { LanguageContext } from "../context/language-context";
import { fetchCharacters } from "../services/fetch";

type Props = {
  initialCharacters: ApiResponse | null;
  characterId?: string;
  characterData?: CharacterType | null;
};

const SearchClient = ({ initialCharacters, characterData }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { language } = useContext(LanguageContext);

  const name = searchParams.get("name") ?? "";
  const page = searchParams.get("page") ?? "1";

  const [characters, setCharacters] = useState<CharacterType[]>(
    initialCharacters?.results ?? [],
  );
  const [info, setInfo] = useState(initialCharacters?.info ?? null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const result = await fetchCharacters({ name, page, language });

      if (result.type === "success") {
        setCharacters(result.data.results);
        setInfo(result.data.info);
        setErrorMessage("");
      } else {
        setCharacters([]);
        setInfo(null);
        setErrorMessage(result.message);
      }

      setLoading(false);
    };

    load();
  }, [name, page, language]);

  const updateSearchParams = (newName: string) => {
    const params = new URLSearchParams();
    if (newName) params.set("name", newName);
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  return (
    <>
      {loading && <Spinner />}
      <Search query={name} onSearch={updateSearchParams} />
      <div className="flex">
        <div>
          {!errorMessage && <Result results={characters} />}
          {errorMessage && (
            <p className="text-red-500 border border-solid border-red-500 p-2 ml-2">
              {errorMessage}
            </p>
          )}
          {info && (info.prev || info.next) && <Pagination {...info} />}
        </div>
        {characterData && (
          <div className="w-1/4 p-4 border-l">
            <Details params={{ characterData }} />
          </div>
        )}
      </div>
    </>
  );
};

export default SearchClient;
