import Result from "../components/result";
import { APICharacter } from "../models/constants";
//import Search from "../components/search";
import { CharacterType } from "../models/types";
import "./global.css";

async function getCards(name: string, page: string): Promise<CharacterType[]> {
  const res = await fetch(`${APICharacter}?name=${name}&page=${page}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Something went wrong...");
  const data = await res.json();
  return data.results;
}

export default async function Home({
  searchParams,
}: {
  searchParams?: { name?: string; page?: string };
}) {
  const name = searchParams?.name ?? "";
  const page = searchParams?.page ?? "1";
  const cards = await getCards(name, page);

  return (
    <main className="flex">
      <div className="w-3/4 p-4">
        <Result results={cards} />
      </div>
    </main>
  );
}
