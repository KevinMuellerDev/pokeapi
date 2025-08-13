import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
  const location: string = args[0];
  const locationData = await state.pokeapi.fetchLocation(location);

  locationData.pokemon_encounters.forEach((element) => {
    console.log(element.pokemon.name);
  });
}
