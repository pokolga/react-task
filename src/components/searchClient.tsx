"use client";

import { useContext, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ApiResponse, CharacterType } from "../models/types";
import { APICharacter } from "../models/constants";
import Search from "./search";
import Result from "./result";
import Details from "./details";
import Pagination from "./pagination";
import Spinner from "./spinner";
import { LanguageContext } from "../context/language-context";

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

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({ name, page });
      const res = await fetch(`${APICharacter}/?${query.toString()}`);

      if (res.status === 404) {
        setCharacters([]);
        setInfo(null);
        setErrorMessage(
          `${language === "en" ? "Error 404: nothing found for this request" : "Ошибка 404: по этому запросу ничего не найдено"}`,
        );
        return;
      }

      if (!res.ok) throw new Error(`${res.status}`);

      const data: ApiResponse = await res.json();
      setCharacters(data.results || []);
      setInfo(data.info || null);
      setErrorMessage("");
    } catch (err) {
      console.error("Fetch error:", err);
      setErrorMessage(
        `${language === "en" ? "Unknown error" : "Неизвестная ошибка"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [name, page]);

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
