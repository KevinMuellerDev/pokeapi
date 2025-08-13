import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { PokeAPI } from "./pokeapi.js";
import type { PokeAPIInstance } from "./pokeapi.js";
import { commandExplore } from "./command_explore.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPIInstance;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
};

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Shows next 20 entries",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Shows previous 20 entries",
      callback: commandMapb,
    },
    explore: {
      name: "explore",
      description: "Explores a certain area",
      callback: commandExplore,
    },
  };
}

/**
 * The `initState` function initializes various variables and objects needed for a Pokedex application
 * in TypeScript.
 * @returns The `initState` function returns an object containing the following properties:
 * - `rl`: Readline interface created using `createInterface` with specified input, output, and prompt
 * - `commands`: Commands obtained from the `getCommands` function
 * - `pokeapi`: Instance of the `PokeAPI` class
 * - `nextLocationsURL`: An empty string for storing the URL of the
 */
export function initState() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  const commands = getCommands();
  const pokeapi = new PokeAPI(10000);
  const nextLocationsURL = "";
  const prevLocationsURL = "";

  return { rl, commands, pokeapi, nextLocationsURL, prevLocationsURL };
}
