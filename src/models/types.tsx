type Location = {
  name: string;
  url: string;
};

export interface CharacterType {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  created?: string;
  episode?: string[];
  gender?: string;
  location?: Location;
  origin?: Location;
  type?: string;
  url?: string;
}

export type InfoItem = string | null;

export interface Info {
  count: number;
  pages: number;
  next: InfoItem;
  prev: InfoItem;
}

export interface ApiResponse {
  info: Info;
  results: CharacterType[];
}

export type Store = {
  selectedIds: string[];
  toggleCard: (id: string) => void;
  isSelected: (id: string) => boolean;
};

export type Localization = "en" | "ru";

export type FetchCharactersParams = {
  name: string;
  page: string;
  language: Localization;
};

export type FetchCharactersResult =
  | { type: "success"; data: { results: CharacterType[]; info: Info | null } }
  | { type: "not_found"; message: string }
  | { type: "error"; message: string };
