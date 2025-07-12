import React from 'react';
import Result from './components/result';
import Search from './components/search';
import type { Character } from './models/types';
import { getData } from './services/fetch';

interface AppState {
  results: Character[];
}

class App extends React.Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);
    this.state = { results: [] };
  }

  whenSearch = async (query: string) => {
    try {
      const data = await getData(query);
      this.setState({ results: data });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Ошибка при поиске:', error);
      this.setState({ results: [] });
    }
  };

  render(): React.ReactNode {
    return (
      <>
        <h1 className="text-2xl font-bold text-center mb-4">Characters Rick&Morthy</h1>
        <Search onSearch={this.whenSearch} />
        <Result results={this.state.results} />
      </>
    );
  }
}

export default App;
