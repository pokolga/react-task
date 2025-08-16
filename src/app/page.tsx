import SearchClient from "../components/searchClient";
import { APICharacter } from "../models/constants";
import { CharacterType } from "../models/types";

export default async function Page() {
  const res = await fetch(`${APICharacter}`, {
    next: { revalidate: 3600 }, // ISR: обновление раз в час
  });
  const data = await res.json();

  const characters: CharacterType[] = data.results;

  return (
    <main className="p-4">
      <SearchClient initialCharacters={characters} />
    </main>
  );
}
