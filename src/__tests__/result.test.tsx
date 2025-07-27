import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import Result from '../components/result';

it('renders legend "Results"', () => {
  render(<Result results={[]} error={undefined} loading={false} />);
  expect(screen.getByText('Results')).toBeInTheDocument();
});
