import React, { useState, useRef, useEffect, useCallback } from 'react';
import Result from './../components/result';
import Search from './../components/search';
import type { Character, InfoItem } from './../models/types';
import { getData } from './../services/fetch';
import { spinnerDelay } from './../models/constants';
import ErrorBoundary from './../components/errorBoundary';

const Home: React.FC = () => {
  const [results, setResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [info, setInfo] = useState<{ next: InfoItem; prev: InfoItem } | null>(null);
  const [selected, setSelected] = useState<Character | null>(null);

  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  const whenSearch = useCallback(async (query: string, pageNum = 1) => {
    const trimmedQuery = query.trim();
    setQuery(trimmedQuery);
    localStorage.setItem('query', trimmedQuery);
    setLoading(true);
    setError(undefined);
    setPage(pageNum);

    try {
      const data = await getData(trimmedQuery, pageNum);
      setResults(data.results);
      setInfo(data.info);
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
        <div className="flex h-screen">
          <div className="w-2/3 overflow-y-auto p-6">
            <Search onSearch={whenSearch} />
            <Result results={results} error={error} loading={loading} onSelectCard={setSelected} />
            {results.length > 0 && info && (
              <div className="my-4 flex justify-center gap-4">
                <button
                  disabled={!info.prev}
                  onClick={() => whenSearch(query, page - 1)}
                  className="rounded bg-blue-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  Previous
                </button>
                <button
                  disabled={!info.next}
                  onClick={() => whenSearch(query, page + 1)}
                  className="rounded bg-blue-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {selected && (
            <div className="w-1/3 bg-white p-8">
              <button
                onClick={() => setSelected(null)}
                className="mb-4 text-blue-500 hover:underline"
              >
                ← Закрыть
              </button>
              <div className="flex flex-col gap-6 xl:flex-row">
                <img src={selected.image} alt={selected.name} className="w-48 rounded" />
                <div>
                  <h2 className="text-2xl font-bold">{selected.name}</h2>
                  <p>
                    <strong>Status:</strong> {selected.status}
                  </p>
                  <p>
                    <strong>Species:</strong> {selected.species}
                  </p>
                  <p>
                    <strong>Gender:</strong> {selected.gender}
                  </p>
                  <p>
                    <strong>Location:</strong> {selected?.location?.name ?? 'Unknown'}
                  </p>
                  <p>
                    <strong>Origin:</strong> {selected?.origin?.name ?? 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </ErrorBoundary>
    </>
  );
};

export default Home;
