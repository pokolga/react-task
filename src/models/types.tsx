type Location = {
  name: string;
  url: string;
};

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  created?: string;
  episode?: string[];
  gender?: string;
  location?: Location[];
  origin?: Location[];
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
  results: Character[];
}
