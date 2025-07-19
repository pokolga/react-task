import { getData } from '../services/fetch';
import { beforeEach, expect, it, vi } from 'vitest';

beforeEach(() => {
  vi.restoreAllMocks();
});

it('fetch succeeds', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: 'Rick Sanchez' }),
    })
  );

  const result = await getData('https://api.example.com');
  expect(result).toBe('Rick Sanchez');
});

it('fetch fails: 404', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    })
  );

  await expect(getData('https://api.example.com')).rejects.toThrow('404');
});

it('throws error when fetch throws', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Fetch failed')));

  await expect(getData('https://api.example.com')).rejects.toThrow('Fetch failed');
});
