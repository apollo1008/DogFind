export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface SearchResult {
  resultIds: string[];
  total: number;
  next: string | null;
  prev: string | null;
}

export interface Match {
  match: string;
}

export interface DogSearchParams {
  breeds?: string[];
  ageMin?: number;
  ageMax?: number;
  zipCodes?: string[];
  sort?: string;
  size?: number;
  from?: string;
}

export interface LocationSearchParams {
  city?: string;
  states?: string[];
  geoBoundingBox?: {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
    bottom_left?: Coordinates;
    top_right?: Coordinates;
    bottom_right?: Coordinates;
    top_left?: Coordinates;
  };
  size?: number;
  from?: number;
}

export interface LocationSearchResult {
  results: Location[];
  total: number;
}

export interface AuthData {
  name: string;
  email: string;
}
