export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2/location-area/";
  nextLocationsURL: string = "";
  prevLocationsURL: string = "";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    try {
      const response = await fetch(!pageURL ? PokeAPI.baseURL : pageURL);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      this.nextLocationsURL = data.next;
      this.prevLocationsURL = data.previous;

      return data;
    } catch (e) {
      throw new Error(`${(e as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    try {
      const response = await fetch(PokeAPI.baseURL + locationName);

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
  pokemon_encounters: any[];
};

export type PokeAPIInstance = {
  nextLocationsURL: string;
  prevLocationsURL: string;

  fetchLocations(pageURL?: string): Promise<ShallowLocations>;
  fetchLocation(locationName: string): Promise<Location>;
};
