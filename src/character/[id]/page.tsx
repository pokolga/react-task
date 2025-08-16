import { APICharacter, unknownCharacter } from "../../../models/constants";
import { CharacterType } from "../../../models/types";

export async function getCharacter(id: string): Promise<CharacterType | null> {
  try {
    const res = await fetch(`${APICharacter}/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    return data;
  } catch {
    console.error(`Network error`);
    return null;
  }
}

export default async function CharacterPage({
  params,
}: {
  params: { id: string };
}) {
  const character = await getCharacter(params.id);

  if (!character) {
    return <p className="p-4 text-red-500">Character could not found</p>;
  }

  return (
    <div className="p-4 w-[300px] flex-shrink-0 text-[var(--color-text)]">
      <div className="rounded border border-gray-200 bg-[var(--color-bg-card)] p-4 shadow hover:shadow-xl">
        <p className="text-sm font-bold">ID: {params.id}</p>
        <img
          src={character.image ?? unknownCharacter}
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
