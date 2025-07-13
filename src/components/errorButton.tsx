import React from 'react';
interface ErrorButtonState {
  isError: boolean;
}

export default class ErrorButton extends React.Component<unknown, ErrorButtonState> {
  constructor(props: unknown) {
    super(props);
    this.state = { isError: false };
  }

  handleClick = () => {
    this.setState({ isError: true });
  };

  render(): React.ReactNode {
    if (this.state.isError) {
      throw new Error('The test Error button was clicked!');
    }

    return (
      <button
        className="bg-blue-800 border-none text-white px-4 py-2 m-2 rounded hover:bg-blue-600 hover:cursor-pointer"
        onClick={this.handleClick}
      >
        Click to trigger error
      </button>
    );
  }
}
