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
        className="m-2 rounded border-none bg-blue-800 px-4 py-2 text-white hover:cursor-pointer hover:bg-blue-600"
        onClick={this.handleClick}
      >
        Click to trigger error
      </button>
    );
  }
}
