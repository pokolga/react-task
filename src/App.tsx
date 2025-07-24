import React, { useState, useRef, useEffect, useCallback } from 'react';
import Result from './components/result';
import Search from './components/search';
import type { Character } from './models/types';
import { getData } from './services/fetch';
import { spinnerDelay } from './models/constants';
import ErrorBoundary from './components/errorBoundary';

const App: React.FC = () => {
  const [results, setResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  const whenSearch = useCallback(async (query: string) => {
    const trimmedQuery = query.trim();
    localStorage.setItem('query', trimmedQuery);
    setLoading(true);
    setError(undefined);

    try {
      const data = await getData(trimmedQuery);
      setResults(data);
    } catch (error) {
      let errorMessage = '';
      if (error && /404/.test(String(error))) {
        errorMessage = 'Nothing was found for your request';
      }
      setResults([]);
      setError(`${error} ${errorMessage}!`);
    } finally {
      timeoutId.current = setTimeout(() => {
        setLoading(false);
      }, spinnerDelay);
    }
  }, []);

  return (
    <>
      <h1 className="my-4 text-center text-2xl font-bold text-blue-600">
        Characters Rick&amp;Morty
      </h1>
      <ErrorBoundary
        fallback={<p className="text-red text-2xl font-bold">Something went wrong...</p>}
      >
        <Search onSearch={whenSearch} />
        <Result results={results} error={error} loading={loading} />
      </ErrorBoundary>
    </>
  );
};

export default App;
