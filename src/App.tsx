import React from 'react';
import Result from './components/result';
import Search from './components/search';
import type { Character } from './models/types';
import { getData } from './services/fetch';

interface AppState {
  results: Character[];
  error?: string;
}

class App extends React.Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);
    this.state = { results: [], error: undefined };
  }

  whenSearch = async (query: string) => {
    try {
      const data = await getData(query);
      this.setState({ results: data, error: undefined });
    } catch (error) {
      this.setState({ results: [], error: `${error} Nothing found for your request!` });
    }
  };

  render(): React.ReactNode {
    return (
      <>
        <h1 className="text-2xl font-bold text-white text-center my-4">Characters Rick&Morthy</h1>
        <Search onSearch={this.whenSearch} />
        <Result results={this.state.results} error={this.state.error} />
      </>
    );
  }
}

export default App;
