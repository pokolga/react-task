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
      json: async () => ({
        info: {
          count: 1,
          pages: 1,
          next: null,
          prev: null,
        },
        results: [{ name: 'Rick Sanchez' }],
      }),
    })
  );

  const result = await getData('Rick');
  expect(result.results[0].name).toBe('Rick Sanchez');
  expect(result.info.next).toBeNull();
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
