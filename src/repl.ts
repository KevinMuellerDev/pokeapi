import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/);
}

export function startREPL(state: State) {
  //activate prompt
  state.rl.prompt();

  //on input clean the input and do:
  state.rl.on("line", async (input) => {
    const getInput = cleanInput(input);
    const commandName = getInput[0];
    const cmd = state.commands[commandName];

    if (!cmd) {
      console.log(
        `Unknown command: "${commandName}". Type "help" for a list of commands.`
      );
      state.rl.prompt();
      return;
    }

    try {
      await cmd.callback(state);
    } catch (e) {
      console.log(e);
    }

    state.rl.prompt();
  });
}
