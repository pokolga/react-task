import React from 'react';
import Result from './components/result';
import Search from './components/search';
import type { Character } from './models/types';
import { getData } from './services/fetch';
import { spinnerDelay } from './models/constants';

interface AppState {
  results: Character[];
  loading: boolean;
  error?: string;
}

class App extends React.Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);
    this.state = { results: [], loading: false, error: undefined };
  }

  whenSearch = async (query: string) => {
    localStorage.setItem('query', query.trim());
    this.setState({ loading: true, error: undefined });
    try {
      const data = await getData(query.trim());
      this.setState({ results: data });
    } catch (error) {
      this.setState({ results: [], error: `${error} Nothing found for your request!` });
    } finally {
      setTimeout(() => {
        this.setState({ loading: false });
      }, spinnerDelay);
    }
  };

  render(): React.ReactNode {
    return (
      <>
        <h1 className="text-2xl font-bold text-blue-600 text-center my-4">Characters Rick&Morty</h1>
        <Search onSearch={this.whenSearch} />
        <Result
          results={this.state.results}
          error={this.state.error}
          loading={this.state.loading}
        />
      </>
    );
  }
}

export default App;
