import type { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
  const name = args[0];
  console.log(`Throwing a Pokeball at ${name}...`);

  const pokemon = await state.pokeapi.fetchPokemon(name);
  const chance = 1 / (1 + pokemon.base_experience / 100);

  if (Math.random() > chance) {
    state.pokedex[name] = pokemon;
    console.log(`${name} was caught!`);
  } else {
    console.log(`${name} escaped!`);
  }
}
