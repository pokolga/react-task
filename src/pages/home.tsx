import { useState, useRef, useEffect, useCallback, type FC } from 'react';
import Result from './../components/result';
import Search from './../components/search';
import type { CharacterType, InfoItem } from './../models/types';
import { getData } from './../services/fetch';
import { btnBase, spinnerDelay } from './../models/constants';
import ErrorBoundary from './../components/errorBoundary';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const Home: FC = () => {
  const { page } = useParams();
  const currentPage = Number(page) || 1;
  const [results, setResults] = useState<CharacterType[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(() => localStorage.getItem('query') || '');
  const [error, setError] = useState<string | undefined>();
  const [info, setInfo] = useState<{ next: InfoItem; prev: InfoItem; pages: number } | null>(null);
  const navigate = useNavigate();

  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      setQuery(trimmedQuery);
      navigate('/page/1');
    },
    [navigate]
  );

  const loadPage = useCallback(
    async (pageNum: number) => {
      setLoading(true);
      setError(undefined);

      try {
        const data = await getData(query, pageNum);
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
    [query]
  );

  useEffect(() => {
    loadPage(currentPage);
  }, [currentPage, query, loadPage]);

  return (
    <main onClick={() => navigate(`/page/${currentPage}`)}>
      <h1 className="my-4 text-center text-2xl font-bold text-(--color-bg-button)">
        Characters Rick&amp;Morty
      </h1>
      <ErrorBoundary
        fallback={<p className="text-red text-2xl font-bold">Something went wrong...</p>}
      >
        <div className="flex">
          <div className="px-6 py-2">
            <Search onSearch={whenSearch} />
            <Result results={results} error={error} loading={loading} />
            {results.length > 0 && info && (
              <div className="item-center my-4 flex items-center justify-center gap-4">
                <button
                  disabled={!info.prev}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/page/${currentPage - 1}`);
                  }}
                  className={`${btnBase} disabled:cursor-not-allowed disabled:bg-gray-300`}
                >
                  Previous
                </button>
                <button
                  disabled={!info.next}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/page/${currentPage + 1}`);
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
