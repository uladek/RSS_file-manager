import { redErrorMessage } from '../utils/redMessage.js';
import { printGoodbyeMessage, promptUser } from '../greeting/start.js';
import { navigateUp } from '../interface/navigate.js';
import { rl } from '../interface/readline.js';
import {  printCurrentDirectory } from '../directory/workDirectory.js';


export const processUserInput = (input) => {
  const command = input.trim().toLowerCase();

  switch (command) {
    case '.exit':
      printGoodbyeMessage();
      rl.close();
      break;
    case '':
      printErrorMessage('Empty input. Please enter a command.');
      printCurrentDirectory();
      promptUser();
      break;
// up

    case 'up':
    case 'cd ..':
       navigateUp();
       printCurrentDirectory();
       promptUser();
      break;

    default:
      printErrorMessage(`Unknown operation "${command}"`);

      printCurrentDirectory();
      promptUser();
      break;
  }
}

export const printErrorMessage = (message) => {
    redErrorMessage(`Error: ${message}`, '31');
  }
