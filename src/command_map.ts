import type { State } from "./state.js";
export async function commandMap(state: State) {
  const pageURL = state.nextLocationsURL;
  const locations = await state.pokeapi.fetchLocations(pageURL ? pageURL : "");

  for (const location of locations.results) {
    console.log(location.name);
  }
  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;
}
