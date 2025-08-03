import { getData, getMultipleCharacters } from '../services/fetch';
import { beforeEach, expect, it, vi } from 'vitest';

beforeEach(() => {
  vi.restoreAllMocks();
});

it('fetch getData succeeds', async () => {
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

it('fetch getData fails: 404', async () => {
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

it('fetch getMultipleCharacters succeeds for 1 card', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: '1' }),
    })
  );

  const result = await getMultipleCharacters('1');
  expect(result[0].id).toBe('1');
});

it('fetch getMultipleCharacters succeeds for several s', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: '1' }, { id: '2' }, { id: '3' }],
    })
  );

  const result = await getMultipleCharacters('1,2,3');
  expect(result).toHaveLength(3);
});

it('fetch getMultipleCharacters fails: 404', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    })
  );

  await expect(getMultipleCharacters('https://api.example.com')).rejects.toThrow('404');
});
