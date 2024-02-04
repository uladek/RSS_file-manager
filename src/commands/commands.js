import { redErrorMessage } from '../utils/redMessage.js';
import {  promptUser } from '../greeting/start.js';
import { navigateUp, navigateToDirectory  } from '../interface/navigate.js';
import { listDirectoryContent  } from '../commands/list.js';
import { catFile  } from '../commands/cat.js';
import { createEmptyFile } from '../commands/add.js';
import { renameFile } from '../commands/rename.js';
import { cp } from '../commands/copy.js';



import { rl } from '../interface/readline.js';
import {  printCurrentDirectory } from '../directory/workDirectory.js';


export const processUserInput = async (input) => {
  const command = input.trim().toLowerCase();
  const args = command.split(' ');

  switch (args[0]) {

    case '.exit':
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
      try {
        navigateToDirectory(directoryPath);
      } catch (error) {
        printErrorMessage(`Operation Failed: ${error}`);
      }
    } else {
      printErrorMessage('Invalid input. Please provide a directory path.');
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
          printErrorMessage('Invalid input of "cat" command. Please provide a file path.');
        } else {
          const filePath = catArgs[1];
          try {
            await catFile(filePath);
          } catch (error) {
            printErrorMessage(`Operation Failed: ${error}`);
          }
        }
        printCurrentDirectory();
        promptUser();
        break;
// add
    case 'add':
      if (args.length !== 2) {
        printErrorMessage('Invalid usage of "add" command. Please provide a new filename.');
      } else {
        const newFilename = args[1];
        // try {
          await createEmptyFile(newFilename);
        // } catch (error) {
        //   printErrorMessage(`${error}`);
        // }
      }
      printCurrentDirectory();
      promptUser();
      break;
// rename
case 'rn':
      if (args.length !== 3) {
        printErrorMessage('Invalid usage of "rn" command. Please provide a file path and a new filename.');
      } else {
        // console.log("args", args)
        const filePath = args[1];
        const newFilename = args[2];
        // try {
          await renameFile(filePath, newFilename);
        // } catch (error) {
        //   printErrorMessage(`${error}`);
        // }
      }
      printCurrentDirectory();
      promptUser();
      break;

  // copy
    case 'cp':
      if (args.length !== 3) {
        printErrorMessage('Invalid usage of "cp" command. Please provide a source file path and a target directory path.');
      } else {
        const sourcePath = args[1];
        const targetDirectory = args[2];
        await cp(sourcePath, targetDirectory);
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
