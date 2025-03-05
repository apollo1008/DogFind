import { Dog, SearchResult, Match, Location } from "@/types";

const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

export const login = async (name: string, email: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email }),
      credentials: "include"
    });

    return response.ok;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};

export const logout = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include"
    });

    return response.ok;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
};

export const getBreeds = async (): Promise<string[]> => {
  const response = await fetch(`${API_BASE_URL}/dogs/breeds`, {
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("Failed to fetch breeds");
  }

  return response.json();
};

export const searchDogsFromBreeds = async (params: {
  breeds?: string[];
  ageMin?: number;
  ageMax?: number;
  zipCodes?: string[];
  sort?: string;
  size?: number;
  from?: number;
}): Promise<SearchResult> => {
  const searchParams = new URLSearchParams();

  if (params.sort) searchParams.append("sort", params.sort);
  if (params.size) searchParams.append("size", params.size.toString());

  if (params.breeds && params.breeds.length > 0) {
    params.breeds.forEach(breed => {
      searchParams.append("breeds", breed);
    });
  }

  if (params.zipCodes && params.zipCodes.length > 0) {
    params.zipCodes.forEach(zipCode => {
      searchParams.append("zipCodes", zipCode);
    });
  }

  if (params.ageMin !== undefined)
    searchParams.append("ageMin", params.ageMin.toString());
  if (params.ageMax !== undefined)
    searchParams.append("ageMax", params.ageMax.toString());
  if (params.from) searchParams.append("from", params.from.toString());

  const response = await fetch(
    `${API_BASE_URL}/dogs/search?${searchParams.toString()}`,
    {
      credentials: "include"
    }
  );

  if (!response.ok) {
    throw new Error("Failed to search dogs");
  }

  return response.json();
};

export const getDogs = async (ids: string[]): Promise<Dog[]> => {
  if (ids.length === 0) return [];

  const response = await fetch(`${API_BASE_URL}/dogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ids),
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dog details");
  }

  return response.json();
};

export const matchDog = async (favoriteIds: string[]): Promise<Match> => {
  if (favoriteIds.length === 0) {
    throw new Error("No favorite dogs selected");
  }

  const response = await fetch(`${API_BASE_URL}/dogs/match`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(favoriteIds),
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("Failed to generate match");
  }

  return response.json();
};

export const getLocations = async (zipCodes: string[]): Promise<Location[]> => {
  if (zipCodes.length === 0) return [];

  const response = await fetch(`${API_BASE_URL}/locations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(zipCodes),
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("Failed to fetch locations");
  }

  return response.json();
};

export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
};
