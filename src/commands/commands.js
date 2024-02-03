import { redErrorMessage } from '../utils/redMessage.js';
import {  promptUser } from '../greeting/start.js';
import { navigateUp, navigateToDirectory  } from '../interface/navigate.js';
import { listDirectoryContent  } from '../commands/list.js';
import { catFile  } from '../commands/cat.js';


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
      printErrorMessage('Empty input. Please enter command.');
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
      await listDirectoryContent();
      printCurrentDirectory();
      promptUser();
      break;

    case 'cat':
      const catArgs = input.split(' ');
      if (catArgs.length !== 2) {
        printErrorMessage('Invalid usage of "cat" command. Please provide a file path.');
      } else {
        const filePath = args[1];
       await catFile(filePath);
      }
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
