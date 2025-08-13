import type { State } from "./state.js";
export async function commandMap(state: State) {
  const pageURL = state.pokeapi.nextLocationsURL;
  const locations = await state.pokeapi.fetchLocations(pageURL ? pageURL : "");

  for (const location of locations.results) {
    console.log(location.name);
  }
}
