import React from 'react';

type Props = {
  onSearch: (query: string) => Promise<void>;
};

interface SearchState {
  query: string;
}

export default class Search extends React.Component<Props, SearchState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  componentDidMount() {
    let initialValue = localStorage.getItem('query');
    if (initialValue === null) {
      initialValue = '';
    }
    this.setState({ query: initialValue }, () => {
      this.searchClick();
    });
  }

  searchClick = () => {
    this.props.onSearch(this.state.query);
  };

  inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.searchClick();
    }
  };

  render(): React.ReactNode {
    return (
      <fieldset className="m-2 flex gap-2 rounded-xs border border-solid border-blue-800 p-2">
        <legend className="mb-2 text-xs text-blue-800">Search</legend>
        <input
          type="text"
          value={this.state.query}
          onChange={this.inputChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Search..."
          className="w-[90%] rounded border border-gray-600 bg-white px-4 py-2"
        />
        <button
          onClick={this.searchClick}
          className="rounded border-none bg-blue-800 px-4 py-2 text-white hover:cursor-pointer hover:bg-blue-600"
        >
          Search
        </button>
      </fieldset>
    );
  }
}
