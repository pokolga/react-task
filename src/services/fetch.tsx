import { APICharacter } from "../models/constants";
import type {
  ApiResponse,
  CharacterType,
  FetchCharactersParams,
  FetchCharactersResult,
} from "../models/types";

export async function getData(
  query: string,
  page: number = 1,
): Promise<ApiResponse> {
  const showName = query ? `name=${encodeURIComponent(query)}&` : "";
  const url = `${APICharacter}?${showName}page=${page}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status}`);
  const data = await res.json();
  return data;
}

export async function getMultipleCharacters(
  query: string,
): Promise<CharacterType[]> {
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

export async function getInitialCharacters(): Promise<ApiResponse | null> {
  try {
    const res = await fetch(`${APICharacter}?page=1`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    const data = await res.json();
    return data ?? Promise.resolve(null);
  } catch {
    throw Error("Couldn't found characters");
  }
}

export async function fetchCharacters({
  name,
  page,
  language,
}: FetchCharactersParams): Promise<FetchCharactersResult> {
  try {
    const query = new URLSearchParams({ name, page });
    const res = await fetch(`${APICharacter}/?${query.toString()}`);

    if (res.status === 404) {
      return {
        type: "not_found",
        message:
          language === "en"
            ? "Error 404: nothing found for this request"
            : "Ошибка 404: по этому запросу ничего не найдено",
      };
    }

    if (!res.ok) {
      return {
        type: "error",
        message: `${language === "en" ? "Error" : "Ошибка"} ${res.status}`,
      };
    }

    const data: ApiResponse = await res.json();
    return {
      type: "success",
      data: {
        results: data.results || [],
        info: data.info || null,
      },
    };
  } catch {
    return {
      type: "error",
      message: language === "en" ? "Unknown error" : "Неизвестная ошибка",
    };
  }
}
