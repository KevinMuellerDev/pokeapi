import type { State } from "./state.js";

export async function commandMapb(state: State) {
  const pageURL = state.prevLocationsURL;
  if (!pageURL) {
    console.log("you're on the first page");
    return;
  }
  const locations = await state.pokeapi.fetchLocations(pageURL);

  for (const location of locations.results) {
    console.log(location.name);
  }

  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;
}
