// import readline from 'readline';

// import path from 'path';
import { rl } from './interface/readline.js';
import { redErrorMessage } from './utils/redMessage.js';
import { printWelcomeMessage, printGoodbyeMessage, promptUser } from './greeting/start.js';
import {  printWorkingDirectory } from './directory/workDirectory.js';


// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });


printWelcomeMessage();
printWorkingDirectory();
promptUser();

// function printGoodbyeMessage() {
//   console.log(`Thank you for using File Manager, ${username}, goodbye!`);
// }

// function promptUser() {
//   rl.question('Please enter your command: ', (input) => {
//     processUserInput(input);
//   });
// }

// export const  processUserInput = (input) => {
//   const command = input.trim().toLowerCase();

//   switch (command) {
//     case '.exit':
//       printGoodbyeMessage();
//       rl.close();
//       break;
//     case '':
//       printErrorMessage('Empty input.  Please enter a command.');
//       promptUser();
//       break;
// // up

//     case 'up':
//     case 'cd ..':
//        navigateUp();
//       break;

//     default:
//       printErrorMessage(`Unknown operation "${command}"`);
//       promptUser();
//       break;
//   }
// }

// function navigateUp() {
//     const currentDirectory = process.cwd();
//     // const parentDirectory = path.dirname(currentDirectory);
//     const parentDirectory = path.resolve(currentDirectory, '..');

//     if (parentDirectory === currentDirectory) {
//       printErrorMessage('Cannot go above the root directory.');
//       promptUser();
//     } else {
//       process.chdir(parentDirectory);
//       printWorkingDirectory();
//       promptUser();
//     }
//   }


// function printErrorMessage(message) {
//   redErrorMessage(`Error: ${message}`, '31');
// }



rl.on('close', () => {
  printGoodbyeMessage();
  rl.close();
});

rl.on('error', (err) => {
  redErrorMessage(`An unexpected error occurred: ${err}`, '31');
  rl.close();
});
