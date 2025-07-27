import { expect, it } from 'vitest';
import ErrorBoundary from '../components/errorBoundary';
import { render, screen } from '@testing-library/react';
import React from 'react';

it('sets error state from getDerivedStateFromError', () => {
  const error = new Error('Test error');
  const result = ErrorBoundary.getDerivedStateFromError(error);

  expect(result).toEqual({
    hasError: true,
    error,
  });
});

function BrokenComponent() {
  React.useEffect(() => {
    throw new Error('Test error');
  }, []);
  return <div>Loaded</div>;
}

it('shows Try again button when error occurs', () => {
  render(
    <ErrorBoundary>
      <BrokenComponent />
    </ErrorBoundary>
  );

  const button = screen.getByRole('button', { name: /Try again!/i });
  expect(button).toBeInTheDocument();
});
