import { APICharacter } from '../models/constants';
import type { ApiResponse, CharacterType } from '../models/types';

export async function getData(query: string, page: number = 1): Promise<ApiResponse> {
  const showName = query ? `name=${encodeURIComponent(query)}&` : '';
  const url = `${APICharacter}?${showName}page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status}`);
  const data = await res.json();
  return data;
}

export async function getMultipleCharacters(query: string): Promise<CharacterType[]> {
  const url = `${APICharacter}/${query}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status}`);
  const data = await res.json();
  if (Array.isArray(data)) {
    return data;
  }
  return [data];
}

export async function getCharacter(id: string): Promise<CharacterType> {
  try {
    const res = await fetch(`${APICharacter}/${id}`);
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Network error: ${err.message}`);
    }
    throw new Error(`Unknown error`);
  }
}
