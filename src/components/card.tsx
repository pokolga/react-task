"use client";

import { FC, useEffect, useState } from "react";
import { CharacterType } from "../models/types";
import { useIsSelected, useToggleCard } from "../store/cardStore";

interface CardProps {
  character: CharacterType;
  onSelect?: () => void;
}

const Card: FC<CardProps> = ({ character }) => {
  const toggleCard = useToggleCard();
  const isSelected = useIsSelected(String(character.id));

  // SSR-гигиена: отложенный рендер
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="w-64 rounded p-4 shadow hover:shadow-xl bg-[--color-bg-card] text-[--color-text]">
      <div
        onClick={(e) => {
          e.stopPropagation();
          toggleCard(String(character.id));
        }}
        className={`cursor-pointer relative -top-2 h-4 w-4 rounded-[25%] text-xs text-white select-none ${
          isSelected ? "bg-red-500" : "bg-white"
        }`}
      >
        ✓
      </div>

      <img
        src={character.image}
        alt={character.name}
        className="mb-2 h-64 w-full rounded object-cover"
      />

      <h3 className="text-lg font-semibold">{character.name}</h3>
      <p className="text-sm">
        {character.species} — {character.status}
      </p>
    </div>
  );
};

export default Card;
