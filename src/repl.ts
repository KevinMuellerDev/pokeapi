import { createInterface } from "node:readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import type { CLICommand } from "./command.js";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/);
}

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
    // can add more commands here
  };
}

export function startREPL() {
  //readline interface created
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  //activate prompt
  rl.prompt();

  //on input clean the input and do:
  rl.on("line", (input) => {
    const getInput = cleanInput(input);
    const command = getInput[0];
    const commands = getCommands();
    const cmd = commands[command];

    if (cmd) {
      cmd.callback(commands);
      rl.prompt();
    } else {
      rl.prompt();
    }
  });
}
