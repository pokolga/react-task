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

  searchClick = () => {
    this.props.onSearch(this.state.query);
  };

  inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  render(): React.ReactNode {
    return (
      <fieldset className="border border-blue-800 border-solid flex gap-2 m-2 p-2 rounded-xs">
        <legend className="text-xs text-blue-800 mb-2">Search</legend>
        <input
          type="text"
          value={this.state.query}
          onChange={this.inputChange}
          placeholder="Search..."
          className="border border-gray px-4 py-2 rounded w-[90%]"
        />
        <button
          onClick={this.searchClick}
          className="bg-blue-800  border-none text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </fieldset>
    );
  }
}
