import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import Result from '../components/result';
import { MemoryRouter } from 'react-router-dom';

it('renders legend "Results"', () => {
  render(
    <MemoryRouter>
      <Result results={[]} error={undefined} loading={false} activeQuery={''} currentPage={'1'} />
    </MemoryRouter>
  );
  expect(screen.getByText('Results')).toBeInTheDocument();
});
