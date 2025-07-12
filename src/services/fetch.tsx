import { APICharacter } from '../models/constants';
import type { Character } from '../models/types';

export async function getData(query: string): Promise<Character[]> {
  const url = `${APICharacter}?name=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  const data = await res.json();
  return data.results;
}
