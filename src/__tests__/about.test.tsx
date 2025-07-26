import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import About from '../pages/about';

describe('Page About', () => {
  it('renders page', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    const titleText: HTMLElement = screen.getByText(/About me/);
    expect(titleText).toBeInTheDocument();
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', expect.stringContaining('olga.jpg'));
  });
});
