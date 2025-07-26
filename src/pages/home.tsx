import React, { useState, useRef, useEffect, useCallback } from 'react';
import Result from './../components/result';
import Search from './../components/search';
import type { CharacterType, InfoItem } from './../models/types';
import { getData } from './../services/fetch';
import { spinnerDelay } from './../models/constants';
import ErrorBoundary from './../components/errorBoundary';
import { Outlet, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [results, setResults] = useState<CharacterType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [info, setInfo] = useState<{ next: InfoItem; prev: InfoItem } | null>(null);
  const navigate = useNavigate();

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
    <main onClick={() => navigate('/')}>
      <h1 className="my-4 text-center text-2xl font-bold text-blue-600">
        Characters Rick&amp;Morty
      </h1>
      <ErrorBoundary
        fallback={<p className="text-red text-2xl font-bold">Something went wrong...</p>}
      >
        <div className="flex h-screen">
          <div className="w-3/4 overflow-y-auto p-6">
            <Search onSearch={whenSearch} />
            <Result results={results} error={error} loading={loading} />
            {results.length > 0 && info && (
              <div className="my-4 flex justify-center gap-4">
                <button
                  disabled={!info.prev}
                  onClick={() => whenSearch(query, page - 1)}
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-300 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  Previous
                </button>
                <button
                  disabled={!info.next}
                  onClick={() => whenSearch(query, page + 1)}
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-300 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
            )}
          </div>
          <div className="w-1/4 bg-white p-8">
            <Outlet />
          </div>
        </div>
      </ErrorBoundary>
    </main>
  );
};

export default Home;
