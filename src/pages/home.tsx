import { useCallback, useEffect, useRef, useState, type FC } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import type { CharacterType, InfoItem } from '../models/types';
import { getData } from '../services/fetch';
import { btnBase, spinnerDelay } from '../models/constants';
import ErrorBoundary from '../components/errorBoundary';
import Search from '../components/search';
import Result from '../components/result';

const Home: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromParams = searchParams.get('name')?.trim() || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const [query, setQuery] = useState(queryFromParams);
  const [activeQuery, setActiveQuery] = useState(queryFromParams);

  const [results, setResults] = useState<CharacterType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [info, setInfo] = useState<{ next: InfoItem; prev: InfoItem; pages: number } | null>(null);

  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const hasQuery = searchParams.has('name');
    const storedQuery = localStorage.getItem('query');
    if (!hasQuery && storedQuery) {
      setSearchParams({ name: storedQuery, page: '1' });
      setQuery(storedQuery);
      setActiveQuery(storedQuery);
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  const whenSearch = useCallback(
    async (newQuery: string) => {
      const trimmedQuery = newQuery.trim();
      localStorage.setItem('query', trimmedQuery);
      setSearchParams({ name: trimmedQuery, page: '1' });
      setActiveQuery(trimmedQuery);
    },
    [setSearchParams]
  );

  const loadPage = useCallback(
    async (pageNum: number) => {
      setLoading(true);
      setError(undefined);

      try {
        const data = await getData(activeQuery, pageNum);
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
    },
    [activeQuery]
  );

  useEffect(() => {
    loadPage(currentPage);
  }, [currentPage, activeQuery, loadPage]);

  return (
    <main onClick={() => navigate(`/?name=${activeQuery}&page=${currentPage}`)}>
      <h1 className="my-4 text-center text-2xl font-bold text-(--color-bg-button)">
        Characters Rick&amp;Morty
      </h1>
      <ErrorBoundary
        fallback={<p className="text-red text-2xl font-bold">Something went wrong...</p>}
      >
        <div className="flex">
          <div className="px-6 py-2">
            <Search query={query} setQuery={setQuery} onSearch={whenSearch} />
            <Result results={results} error={error} loading={loading} />
            {results.length > 0 && info && (
              <div className="item-center my-4 flex items-center justify-center gap-4">
                <button
                  disabled={!info.prev}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchParams({ name: activeQuery, page: String(currentPage - 1) });
                  }}
                  className={`${btnBase} disabled:cursor-not-allowed disabled:bg-gray-300`}
                >
                  Previous
                </button>
                <button
                  disabled={!info.next}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchParams({ name: activeQuery, page: String(currentPage + 1) });
                  }}
                  className={`${btnBase} disabled:cursor-not-allowed disabled:bg-gray-300`}
                >
                  Next
                </button>
                <span className="text-sm text-(--color-text)">
                  Page {currentPage} of {info.pages}
                </span>
              </div>
            )}
          </div>

          <Outlet />
        </div>
      </ErrorBoundary>
    </main>
  );
};

export default Home;
