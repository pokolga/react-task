"use client";

import React, { useState, type FC } from "react";
import { btnBase } from "../models/constants";

type Props = {
  query: string;
  onSearch: (query: string) => void;
};

const Search: FC<Props> = ({ query, onSearch }) => {
  const [localQuery, setLocalQuery] = useState(query);

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(localQuery);
    }
  };

  const searchClick = () => {
    onSearch(localQuery);
  };

  return (
    <fieldset className="m-2 flex gap-2 rounded-xs border border-solid border-(--color-bg-button) p-2">
      <legend className="mb-2 text-xs text-(--color-bg-button)">Search</legend>
      <input
        type="text"
        value={localQuery}
        onChange={inputChange}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
        placeholder="Search..."
        className="w-[90%] rounded border border-gray-600 bg-(--color-bg-card) px-4 py-2 text-(--color-text)"
      />
      <button onClick={searchClick} className={`${btnBase}`}>
        Search
      </button>
    </fieldset>
  );
};

export default Search;
