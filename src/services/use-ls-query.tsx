import { useState } from 'react';

export function useLSQuery(): [string, (val: string) => void] {
  const [query, setQueryState] = useState(() => localStorage.getItem('query') || '');

  const setQuery = (val: string) => {
    localStorage.setItem('query', val);
    setQueryState(val);
  };

  return [query, setQuery];
}
