"use client";

import { FC, ReactNode } from "react";
import { CharacterType } from "../models/types";

import { useSelectedIds } from "../store/cardStore";
import Card from "./card";
import { SelectedItemsPanel } from "./selectedItemsPanel";
import { useRouter, useSearchParams } from "next/navigation";

interface ListProps {
  results: CharacterType[];
  onClick?: () => void;
}

export const CardsList: FC<ListProps> = ({ results, onClick }): ReactNode => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedIds = useSelectedIds();

  const handleClick = (id: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("characterId", id.toString());

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4" onClick={onClick}>
      {results.map((char) => (
        <Card
          key={char.id}
          character={char}
          onClick={() => {
            console.log("Navigating to", char.id);
            handleClick(char.id);
          }}
        />
      ))}
      {selectedIds.length > 0 && (
        <SelectedItemsPanel SelectedIds={selectedIds} />
      )}
    </div>
  );
};
