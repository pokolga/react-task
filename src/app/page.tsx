import SearchClient from "../components/searchClient";
import { CharacterType } from "../models/types";
import { getCharacter, getInitialCharacters } from "../services/fetch";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { characterId?: string };
}) {
  const characterId = searchParams.characterId;
  let characterData: CharacterType | null = null;
  if (characterId) {
    characterData = await getCharacter(characterId);
  }
  const initialCharacters = await getInitialCharacters();
  return (
    <>
      <SearchClient
        initialCharacters={initialCharacters}
        characterData={characterData}
      />
    </>
  );
}
