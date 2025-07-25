import { APICharacter } from '../models/constants';
import type { Character } from '../models/types';

export async function getData(query: string, page: number = 1): Promise<Character[]> {
  const showName = query ? `name=${encodeURIComponent(query)}&` : '';
  const url = `${APICharacter}?${showName}page=${page}`;
  console.log(url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status}`);
  const data = await res.json();
  return data.results;
}
