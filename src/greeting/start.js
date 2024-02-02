const [, , fullStringName] = process.argv;
import { rl } from '../interface/readline.js';
import { processUserInput } from '../commands/commands.js';
import {  printCurrentDirectory } from '../directory/workDirectory.js';



export const [, username] = fullStringName.split('--username=');

export const  printWelcomeMessage = () => {
    console.log(`Welcome to the File Manager, ${username}!`);
  }

 export const printGoodbyeMessage = () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    printCurrentDirectory();
  }

export const promptUser = () => {
    rl.question('Please enter your command: ', (input) => {
      processUserInput(input);
    });
  }
