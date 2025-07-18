import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../App';

describe('App with ErrorButton and ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('shows fallback UI when ErrorButton throws', async () => {
    render(<App />);

    const button = screen.getByRole('button', { name: /Click to trigger error/i });

    await userEvent.click(button);

    expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
    expect(screen.getByText('The test Error button was clicked!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Try again!/ })).toBeInTheDocument();
  });
});
