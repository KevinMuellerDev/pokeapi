import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const path = "/location-area";
    const URL = pageURL ? pageURL : PokeAPI.baseURL + path;
    const cached = this.cache.get<ShallowLocations>(URL);

    if (cached) return cached;

    try {
      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      this.cache.add(URL, data);

      return data;
    } catch (e) {
      throw new Error(`${(e as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const path = "/location-area/";
    const URL = PokeAPI.baseURL + path + locationName;
    const cached = this.cache.get<Location>(URL);

    if (cached) return cached;

    try {
      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (e) {
      throw new Error(`${(e as Error).message}`);
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

export type Location = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: any[];
  location: Location;
  names: any[];
  pokemon_encounters: PokemonList[];
};

export type PokemonList = {
  pokemon: Pokemon;
};

export type Pokemon = {
  name: string;
  url: string;
};

export type PokeAPIInstance = {
  fetchLocations(pageURL?: string): Promise<ShallowLocations>;
  fetchLocation(locationName: string): Promise<Location>;
};
