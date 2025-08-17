"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { CharacterType } from "../models/types";
import { LanguageContext } from "../context/language-context";
import { useContext } from "react";
import { texts } from "../models/texts";
import Image from "next/image";

export default function Details({
  params,
}: {
  params: { characterData: CharacterType };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const character = params.characterData;
  const page = searchParams.get("page") ?? "1";
  const query = searchParams.get("name") ?? "";
  const { language } = useContext(LanguageContext);

  if (!character) {
    return (
      <p className="p-4 text-red-500">{texts[language].detailes.notFound}</p>
    );
  }

  return (
    <div className="p-4 w-[300px] flex-shrink-0 text-[var(--color-text)]">
      <div className="rounded border border-gray-200 bg-[var(--color-bg-card)] p-4 shadow hover:shadow-xl">
        <button
          className="mb-4 cursor-pointer rounded-sm border-2 border-solid border-transparent hover:border-red-300 active:bg-red-300"
          onClick={() => {
            router.push(`/?page=${page}&name=${query}`);
          }}
        >
          ❌
        </button>
        <p className="text-sm font-bold">ID: {character.id}</p>
        <div className="relative mb-2 h-[230px] w-[230px] rounded overflow-hidden">
          <Image
            src={character.image ?? ""}
            alt={character.name ?? "unknown"}
            fill
          />
        </div>
        <h3 className="my-4 text-lg font-bold">{character.name}</h3>
        <p className="my-1 text-sm">
          <strong>{texts[language].detailes.status}: </strong>
          {character.status}
        </p>
        <p className="my-1 text-sm">
          <strong>{texts[language].detailes.species}: </strong>
          {character.species}
        </p>
        <p className="my-1 text-sm">
          <strong>{texts[language].detailes.gender}: </strong>
          {character.gender}
        </p>
        <p className="my-1 text-sm">
          <strong>{texts[language].detailes.origin}: </strong>
          {character.origin?.name}
        </p>
        <p className="my-1 text-sm">
          <strong>{texts[language].detailes.location}: </strong>
          {character.location?.name}
        </p>
      </div>
    </div>
  );
}
