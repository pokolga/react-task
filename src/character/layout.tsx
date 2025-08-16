import SearchClient from "../../components/searchClient";
import { CharacterType } from "../../models/types";
import { getInitialCharacters } from "../../services/fetch";

export default async function CharacterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialCharacters: CharacterType[] = await getInitialCharacters();

  return (
    <main className="flex">
      <div className="w-3/4 p-4">
        <SearchClient initialCharacters={initialCharacters} />
      </div>
      <div className="w-1/4 p-4 border-l">{children}</div>
    </main>
  );
}
