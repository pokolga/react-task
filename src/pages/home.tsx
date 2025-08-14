import { useEffect, useState, type FC } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { btnBase } from "../models/constants";
import ErrorBoundary from "../components/errorBoundary";
import Search from "../components/search";
import Result from "../components/result";
import { useResult } from "../hooks/useResult";

const Home: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromParams = searchParams.get("name")?.trim() || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  const [query, setQuery] = useState(queryFromParams);
  const [activeQuery, setActiveQuery] = useState(queryFromParams);

  const { data, isLoading, isError, error } = useResult(
    activeQuery,
    currentPage,
  );

  useEffect(() => {
    const storedQuery = localStorage.getItem("query");
    if (!searchParams.has("name") && storedQuery) {
      setSearchParams({ name: storedQuery, page: "1" });
      setQuery(storedQuery);
      setActiveQuery(storedQuery);
    }
  }, [searchParams, setSearchParams]);

  const whenSearch = async (newQuery: string): Promise<void> => {
    const trimmedQuery = newQuery.trim();
    localStorage.setItem("query", trimmedQuery);
    setSearchParams({ name: trimmedQuery, page: "1" });
    setActiveQuery(trimmedQuery);
  };

  const errorMessage = isError
    ? /404/.test(String(error))
      ? "Nothing was found for your request!"
      : String(error)
    : "";

  return (
    <main>
      <h1 className="my-4 text-center text-2xl font-bold text-(--color-bg-button)">
        Characters Rick&amp;Morty
      </h1>
      <ErrorBoundary
        fallback={
          <p className="text-red text-2xl font-bold">Something went wrong...</p>
        }
      >
        <div className="flex">
          <div className="px-6 py-2">
            <Search query={query} setQuery={setQuery} onSearch={whenSearch} />
            <Result
              results={data?.results ?? []}
              error={isError ? errorMessage : undefined}
              loading={isLoading}
              activeQuery={activeQuery}
              currentPage={String(currentPage)}
            />
            {data?.results && data?.results?.length > 0 && data?.info && (
              <div className="item-center my-4 flex items-center justify-center gap-4">
                <button
                  disabled={!data.info.prev}
                  onClick={() =>
                    setSearchParams({
                      name: activeQuery,
                      page: String(currentPage - 1),
                    })
                  }
                  className={`${btnBase} disabled:cursor-not-allowed disabled:bg-gray-300`}
                >
                  Previous
                </button>
                <button
                  disabled={!data.info.next}
                  onClick={() =>
                    setSearchParams({
                      name: activeQuery,
                      page: String(currentPage + 1),
                    })
                  }
                  className={`${btnBase} disabled:cursor-not-allowed disabled:bg-gray-300`}
                >
                  Next
                </button>
                <span className="text-sm text-(--color-text)">
                  Page {currentPage} of {data.info.pages}
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
