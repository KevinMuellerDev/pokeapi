import { CLICommand } from "./command";

export function commandHelp(commands: Record<string, CLICommand>) {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n");

  for (const cmd of Object.values(commands)) {
    console.log(`${cmd.name}: ${cmd.description}`);
  }
}
