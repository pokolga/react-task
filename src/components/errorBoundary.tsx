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
        <div className="rounded bg-red-100 p-4 text-red-800">
          <h2 className="mb-2 text-lg font-bold">Something went wrong...</h2>
          <pre className="mb-4 text-sm">{this.state.error?.message}</pre>
          <button
            onClick={this.tryAgain}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-500"
          >
            Try again!
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
