import React from 'react';
import Result from './components/result';
import Search from './components/search';
import type { Character } from './models/types';
import { getData } from './services/fetch';
import { spinnerDelay } from './models/constants';
import ErrorBoundary from './components/errorBoundary';

interface AppState {
  results: Character[];
  loading: boolean;
  error?: string;
}

export default class App extends React.Component<unknown, AppState> {
  timeoutId: ReturnType<typeof setTimeout> | null = null;
  constructor(props: unknown) {
    super(props);
    this.state = { results: [], loading: false, error: undefined };
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  whenSearch = async (query: string) => {
    localStorage.setItem('query', query.trim());
    this.setState({ loading: true, error: undefined });
    try {
      const data = await getData(query.trim());
      this.setState({ results: data });
    } catch (error) {
      let errorMessage = '';
      if (error && /404/.test(String(error))) {
        errorMessage = 'Nothing was found for your request';
      }
      this.setState({ results: [], error: `${error} ${errorMessage}!` });
    } finally {
      this.timeoutId = setTimeout(() => {
        this.setState({ loading: false });
      }, spinnerDelay);
    }
  };

  render(): React.ReactNode {
    return (
      <>
        <h1 className="my-4 text-center text-2xl font-bold text-blue-600">Characters Rick&Morty</h1>
        <ErrorBoundary
          fallback={<p className="text-red text-2xl font-bold">Something went wrong...</p>}
        >
          <Search onSearch={this.whenSearch} />

          <Result
            results={this.state.results}
            error={this.state.error}
            loading={this.state.loading}
          />
        </ErrorBoundary>
      </>
    );
  }
}
