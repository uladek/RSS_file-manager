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

  case 'cd':
    if (args.length > 1) {
        const directoryPath = args.slice(1).join(' ');
        try {
            navigateToDirectory(directoryPath);
        } catch (error) {
            printErrorMessage(`Operation Failed: ${error}`);
        }
    } else {
        printErrorMessage('Operation failed. Invalid input. Please provide a directory path.');
    }
    printCurrentDirectory();
    promptUser();
    break;




  // ls
    case 'ls':
      await listDirectoryContent();
      printCurrentDirectory();
      promptUser();
      break;

 // cat
    case 'cat':
      const catArgs = input.match(/cat\s+(.+)/);
      if (!catArgs || catArgs.length !== 2) {
        printErrorMessage('Operation failed .Invalid input of "cat" command. Please provide a valid file path.');
      } else {
        const filePath = catArgs[1];
        try {
          await catFile(filePath);
        } catch (error) {
          printErrorMessage(`Operation Failed: ${error.message}, no such file "${filePath}"`);
        }
      }
      printCurrentDirectory();
      promptUser();
      break;

    case 'add':
      if (args.length < 2) {
        printErrorMessage('Operation failed. Invalid usage of "add" command. Please provide a new filename.');
      } else {
        const newFilename = args.slice(1).join(' ');
        await createEmptyFile(newFilename);
      }
      printCurrentDirectory();
      promptUser();
      break;

  case 'rn':
      if (args.length < 3) {
        printErrorMessage('Operation failed. Invalid usage of "rn" command. Please provide a file path and a new filename.');
      } else {
        const filePath = args.slice(1, -1).join(' ');
        const newFilename = args[args.length - 1];
        await renameFile(filePath, newFilename);
      }
      printCurrentDirectory();
      promptUser();
      break;


// copy
case 'cp':
  const argsCp = input.match(/(?:[^\s'"]+|"[^"]*"|'[^']*')+/g);
  console.log(argsCp);
  if (argsCp.length < 3) {
      printErrorMessage('Operation failed. Invalid usage of "cp" command. Please provide a source file path and a target directory path.');
  } else {
      const sourcePath = argsCp[1].replace(/^['"]|['"]$/g, '');
      const targetDirectory = argsCp[2].replace(/^['"]|['"]$/g, '');
      await cp(sourcePath, targetDirectory);
  }
  printCurrentDirectory();
  promptUser();
  break;



// move

 case 'mv':
    const argsMv = input.match(/(?:[^\s'"]+|'[^']*'|"[^"]*")+/g);

    // console.log(argsMv);
    if (argsMv.length !== 3) {
        printErrorMessage('Operation failed. Invalid usage of "mv" command. Please provide a source file path and a target directory path.');
    } else {
        const sourcePathMv = argsMv[1].replace(/^['"]|['"]$/g, '');
        const targetDirectoryMv = argsMv[2].replace(/^['"]|['"]$/g, '');

        // console.log("sourcePath", sourcePathMv);
        // console.log("targetDirectory", targetDirectoryMv);
        await mv(sourcePathMv, targetDirectoryMv);
    }
    printCurrentDirectory();
    promptUser();
    break;


//default
    default:
      printErrorMessage(`Operation failed. Unknown operation "${command}"`);
      printCurrentDirectory();
      promptUser();
      break;
  }
}

export const printErrorMessage = (message) => {
    redErrorMessage(`${message}`, '31');
  }
