import SearchClient from "../components/searchClient";
import { getCharacter, getInitialCharacters } from "../services/fetch";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { characterId?: string };
}) {
  const characterId = searchParams.characterId;

  const characterData = characterId ? await getCharacter(characterId) : null;
  const initialCharacters = await getInitialCharacters();

  return (
    <SearchClient
      initialCharacters={initialCharacters}
      characterData={characterData}
    />
  );
}
