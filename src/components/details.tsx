"use client";
import { CharacterType } from "../models/types";

export default function Details({
  params,
}: {
  params: { characterData: CharacterType };
}) {
  const character = params.characterData;

  if (!character) {
    return <p className="p-4 text-red-500">Character could not found</p>;
  }

  return (
    <div className="p-4 w-[300px] flex-shrink-0 text-[var(--color-text)]">
      <div className="rounded border border-gray-200 bg-[var(--color-bg-card)] p-4 shadow hover:shadow-xl">
        <p className="text-sm font-bold">ID: {character.id}</p>
        <img
          src={character.image ?? ""}
          alt={character.name ?? "unknown"}
          className="mb-2 h-64 rounded object-contain"
        />
        <h3 className="my-4 text-lg font-bold">{character.name}</h3>
        <p className="my-1 text-sm">
          <strong>Status:</strong> {character.status}
        </p>
        <p className="my-1 text-sm">
          <strong>Species:</strong> {character.species}
        </p>
        <p className="my-1 text-sm">
          <strong>Gender:</strong> {character.gender}
        </p>
        <p className="my-1 text-sm">
          <strong>Origin:</strong> {character.origin?.name}
        </p>
        <p className="my-1 text-sm">
          <strong>Location:</strong> {character.location?.name}
        </p>
      </div>
    </div>
  );
}
