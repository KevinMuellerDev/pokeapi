import type { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("you must provide a pokemon name");
  }

  const name = args[0];

  if (state.pokedex[name]) {
    console.log(`Name: ${state.pokedex[name].name}`);
    console.log(`Height: ${state.pokedex[name].height}`);
    console.log(`Weight: ${state.pokedex[name].weight}`);
    console.log("Stats:");
    state.pokedex[name].stats.forEach((statData: any) => {
      console.log(`   -${statData.stat.name}: ${statData.base_stat}`);
    });
    console.log("Types:");
    state.pokedex[name].types.forEach((typeData: any) => {
      console.log(`   -${typeData.type.name}`);
    });
  } else {
    console.log("you have not caught that pokemon");
  }
}
