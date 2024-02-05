import { redErrorMessage } from '../utils/redMessage.js';
import {  promptUser } from '../greeting/start.js';
import { navigateUp, navigateToDirectory  } from '../interface/navigate.js';
import { listDirectoryContent  } from '../commands/list.js';
import { catFile  } from '../commands/cat.js';
import { createEmptyFile } from '../commands/add.js';
import { renameFile } from '../commands/rename.js';
import { cp, mv } from '../commands/copyMove.js';


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
      printErrorMessage('Operation failed. Empty input. Please enter command.');
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

// cd
  //  case 'cd':
  //   if (args.length > 1) {
  //     const directoryPath = args.slice(1).join(' ');
  //     try {
  //       navigateToDirectory(directoryPath);
  //     } catch (error) {
  //       printErrorMessage(`Operation Failed: ${error}`);
  //     }
  //   } else {
  //     printErrorMessage('Operation failed. Invalid input. Please provide a directory path.');
  //   }
  //   printCurrentDirectory();
  //   promptUser();
  //   break;
  // ...

  // case 'cd':
  //   if (args.length > 1) {
  //       const directoryPath = args.slice(1).join(' ');
  //       try {
  //           navigateToDirectory(directoryPath);
  //       } catch (error) {
  //           printErrorMessage(`Operation Failed: ${error}`);
  //       }
  //   } else {
  //       printErrorMessage('Operation failed. Invalid input. Please provide a directory path.');
  //   }
  //   printCurrentDirectory();
  //   promptUser();
  //   break;

  // cd
case 'cd':
  processCommand(input, async (directoryPath) => {
    try {
      navigateToDirectory(directoryPath);
    } catch (error) {
      printErrorMessage(`Operation Failed: ${error}`);
    }
  }, 'cd', 2, 2);
  break;


  // ls
    case 'ls':
      await listDirectoryContent();
      printCurrentDirectory();
      promptUser();
      break;

 // Cat

    // case 'cat':
    //   const catArgs = input.match(/cat\s+(.+)/);
    //   if (!catArgs || catArgs.length !== 2) {
    //     printErrorMessage('Operation failed .Invalid input of "cat" command. Please provide a valid file path.');
    //   } else {
    //     const filePath = catArgs[1];
    //     try {
    //       await catFile(filePath);
    //     } catch (error) {
    //       printErrorMessage(`Operation Failed: ${error.message}, no such file "${filePath}"`);
    //     }
    //   }
    //   printCurrentDirectory();
    //   promptUser();
    //   break;

  case 'cat':
      processCommand(input, async (filePath) => {
        try {
          await catFile(filePath);
        } catch (error) {
          printErrorMessage(`Operation Failed: ${error.message}, no such file "${filePath}"`);
        }
      }, 'cat', 2, 2);
      break;

// Add
case 'add':
  processCommand(input, createEmptyFile, 'add', 1, 2);
  break;

// Rename
case 'rn':
  processCommand(input, renameFile, 'rn', 2, 3);
  break;

// Copy
case 'cp':
  processCommand(input, cp, 'cp', 2, 3);
  break;

// Move
case 'mv':
  processCommand(input, mv, 'mv', 2, 3);
  break;

//default
    default:
      printErrorMessage(`Operation failed. Unknown operation "${command}"`);
      printCurrentDirectory();
      promptUser();
      break;
  }
}


async function processCommand(input, operationFunction, commandName, minArgsLength, maxArgsLength) {
  const argsCommand = input.match(/(?:[^\s'"]+|"[^"]*"|'[^']*')+/g);
  console.log(argsCommand);
  if (argsCommand.length < minArgsLength || argsCommand.length > maxArgsLength) {
    printErrorMessage(`Operation failed. Invalid usage of "${commandName}" command. Please provide between ${minArgsLength - 1} and ${maxArgsLength - 1} arguments.`);
  } else {
    const arg1 = argsCommand[1] ? argsCommand[1].replace(/^['"]|['"]$/g, '') : undefined;
    const arg2 = argsCommand[2] ? argsCommand[2].replace(/^['"]|['"]$/g, '') : undefined;
    await operationFunction(arg1, arg2);
  }
  printCurrentDirectory();
  console.log('\x1b[34m%s\x1b[0m', '-----');
  promptUser();
}

export const printErrorMessage = (message) => {
    redErrorMessage(`${message}`, '31');
  }
