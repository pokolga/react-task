import { APICharacter } from '../models/constants';
import type { ApiResponse } from '../models/types';

export async function getData(query: string, page: number = 1): Promise<ApiResponse> {
  const showName = query ? `name=${encodeURIComponent(query)}&` : '';
  const url = `${APICharacter}?${showName}page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status}`);
  const data = await res.json();
  return data;
}
