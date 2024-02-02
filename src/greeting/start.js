const [, , fullStringName] = process.argv;
import { rl } from '../interface/readline.js';
import { processUserInput } from '../commands/commands.js';


export const [, username] = fullStringName.split('=');

export const  printWelcomeMessage = () => {
    console.log(`Welcome to the File Manager, ${username}!`);
  }

 export const printGoodbyeMessage = () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  }

export const promptUser = () => {
    rl.question('Please enter your command: ', (input) => {
      processUserInput(input);
    });
  }
