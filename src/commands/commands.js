import { redErrorMessage } from '../utils/redMessage.js';
import {  promptUser } from '../greeting/start.js';
import { navigateUp, navigateToDirectory  } from '../interface/navigate.js';
import { listDirectoryContent  } from '../commands/list.js';

import { rl } from '../interface/readline.js';
import {  printCurrentDirectory } from '../directory/workDirectory.js';


export const processUserInput = async (input) => {
  const command = input.trim().toLowerCase();
  const args = command.split(' ');

  switch (args[0]) {

    case '.exit':
      // printGoodbyeMessage();
      rl.close();
      break;
    case '':
      printErrorMessage('Empty input. Please enter a command.');
      printCurrentDirectory();
      promptUser();
      break;

    case 'up':
    case 'cd ..':
      navigateUp();
      printCurrentDirectory();
      promptUser();
      break;

    case 'cd':
      if (args.length > 1) {
        const directoryPath = args.slice(1).join(' ');
        navigateToDirectory(directoryPath);
      } else {
        printErrorMessage('Invalid usage. Please provide a directory path.');
      }
      printCurrentDirectory();
      promptUser();
      break;

    case 'ls':
      printCurrentDirectory();
      await listDirectoryContent();
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
