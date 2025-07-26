import { useEffect, useState } from 'react';

export function useLSQuery(onSearch: (query: string) => void) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const savedQuery = localStorage.getItem('query') ?? '';
    setQuery(savedQuery);
    onSearch(savedQuery);
  }, [onSearch]);

  return [query, setQuery] as const;
}
