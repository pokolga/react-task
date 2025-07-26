import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NotFound from '../pages/404';
import { MemoryRouter } from 'react-router-dom';

describe('Page 404', () => {
  it('renders page', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    const titleText: HTMLElement = screen.getByText(/ERROR 404/);
    expect(titleText).toBeInTheDocument();
  });
});
