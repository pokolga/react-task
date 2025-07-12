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
