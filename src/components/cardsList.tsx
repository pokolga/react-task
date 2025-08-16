import { type ReactNode, type FC } from "react";
import type { CharacterType } from "../models/types";

import { useSelectedIds } from "../store/cardStore";
import { SelectedItemsPanel } from "./selectedItemsPanel";
import Card from "./card";
import { useRouter } from "next/navigation";

interface ListProps {
  results: CharacterType[];
  onClick?: () => void;
}

export const CardsList: FC<ListProps> = ({ results, onClick }): ReactNode => {
  //const [searchParams] = useSearchParams();
  //const page = URLSearchParams.get("page") ?? "1";
  //const query = URLSearchParams.get("name") ?? "";

  const selectedIds = useSelectedIds();
  const router = useRouter();
  return (
    <div className="flex flex-wrap justify-center gap-4" onClick={onClick}>
      {results.map((char) => (
        <Card
          key={char.id}
          character={char}
          onClick={() => {
            console.log("Navigating to", char.id);
            router.push(`/character/${char.id}`);
          }}
        /> //navigate(`/characters/${char.id}?page=${page}&name=${query}`)
      ))}
      {selectedIds.length > 0 && (
        <SelectedItemsPanel SelectedIds={selectedIds} />
      )}
    </div>
  );
};
