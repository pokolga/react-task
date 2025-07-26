import React from 'react';
import { useLSQuery } from '../services/use-ls-query';

type Props = {
  onSearch: (query: string) => Promise<void>;
};

const Search: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useLSQuery(onSearch);

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(query);
    }
  };

  const searchClick = () => {
    onSearch(query);
  };

  return (
    <fieldset className="m-2 flex gap-2 rounded-xs border border-solid border-blue-800 p-2">
      <legend className="mb-2 text-xs text-blue-800">Search</legend>
      <input
        type="text"
        value={query}
        onChange={inputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className="w-[90%] rounded border border-gray-600 bg-white px-4 py-2"
      />
      <button
        onClick={searchClick}
        className="rounded border-none bg-blue-800 px-4 py-2 text-white hover:cursor-pointer hover:bg-blue-600"
      >
        Search
      </button>
    </fieldset>
  );
};

export default Search;
