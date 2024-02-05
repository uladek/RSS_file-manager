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

//     case 'add':
//       if (args.length < 2) {
//         printErrorMessage('Operation failed. Invalid usage of "add" command. Please provide a new filename.');
//       } else {
//         const newFilename = args.slice(1).join(' ');
//         await createEmptyFile(newFilename);
//       }
//       printCurrentDirectory();
//       promptUser();
//       break;

// // rename
// case 'rn':
//   const argsRn = input.match(/(?:[^\s'"]+|"[^"]*"|'[^']*')+/g);
//   console.log(argsRn);
//   if (argsRn.length < 3) {
//       printErrorMessage('Operation failed. Invalid usage of "rn" command. Please provide a file path and a new filename.');
//   } else {
//       const filePathRn = argsRn[1].replace(/^['"]|['"]$/g, '');
//       const newFilenameRn = argsRn[2].replace(/^['"]|['"]$/g, '');
//       await renameFile(filePathRn, newFilenameRn);
//   }
//   printCurrentDirectory();
//   promptUser();
//   break;

// // copy
// case 'cp':
//   const argsCp = input.match(/(?:[^\s'"]+|"[^"]*"|'[^']*')+/g);
//   console.log(argsCp);
//   if (argsCp.length < 3) {
//       printErrorMessage('Operation failed. Invalid usage of "cp" command. Please provide a source file path and a target directory path.');
//   } else {
//       const sourcePath = argsCp[1].replace(/^['"]|['"]$/g, '');
//       const targetDirectory = argsCp[2].replace(/^['"]|['"]$/g, '');
//       await cp(sourcePath, targetDirectory);
//   }
//   printCurrentDirectory();
//   promptUser();
//   break;

// // move
//  case 'mv':
//     const argsMv = input.match(/(?:[^\s'"]+|'[^']*'|"[^"]*")+/g);
//     // console.log(argsMv);
//     if (argsMv.length !== 3) {
//         printErrorMessage('Operation failed. Invalid usage of "mv" command. Please provide a source file path and a target directory path.');
//     } else {
//         const sourcePathMv = argsMv[1].replace(/^['"]|['"]$/g, '');
//         const targetDirectoryMv = argsMv[2].replace(/^['"]|['"]$/g, '');
//         await mv(sourcePathMv, targetDirectoryMv);
//     }
//     printCurrentDirectory();
//     promptUser();
//     break;

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
