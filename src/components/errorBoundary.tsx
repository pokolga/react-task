import React, { type ReactNode } from 'react';

interface ErrorProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorState {
  hasError: boolean;
  error: Error | null;
}
export default class ErrorBoundary extends React.Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorState {
    return { hasError: true, error };
  }

  tryAgain = () => this.setState({ hasError: false, error: null });

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 text-red-800 rounded">
          <h2 className="text-lg font-bold mb-2">Something went wrong...</h2>
          <pre className="text-sm mb-4">{this.state.error?.message}</pre>
          <button
            onClick={this.tryAgain}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
          >
            Try again!
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
