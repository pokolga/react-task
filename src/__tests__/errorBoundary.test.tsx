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

    const button: HTMLButtonElement = screen.getByRole('button', {
      name: /Click to trigger error/i,
    });
    await userEvent.click(button);

    const fallbackText: HTMLElement = screen.getByText('Something went wrong...');
    const errorMessage: HTMLElement = screen.getByText('The test Error button was clicked!');
    const tryAgainButton: HTMLButtonElement = screen.getByRole('button', {
      name: /Try again!/i,
    });

    expect(fallbackText).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
    expect(tryAgainButton).toBeInTheDocument();
  });
});
