// import readline from 'readline';
// import path from 'path';
// import { redErrorMessage } from '../utils/redMessage.js';
// // import { navigateToParentDirectory } from '../nav/navigation.js';

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// const [, , fullStringName] = process.argv;
// const [, username] = fullStringName.split('=');

// export let workingDirectory = process.cwd();

// function printWelcomeMessage() {
//   console.log(`Welcome to the File Manager, ${username}!`);
// }

// function printWorkingDirectory() {
//     console.log(`You are currently in ${workingDirectory}`);
//   }

// function printGoodbyeMessage() {
//   console.log(`Thank you for using File Manager, ${username}, goodbye!`);
// }

// function promptUser() {
//   rl.question('Please enter your command: ', (input) => {
//     processUserInput(input);
//   });
// }

// function processUserInput(input) {
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
//       case 'up':
//       case 'cd ..':
//       navigateToParentDirectory();
//       // printWorkingDirectory();
//       promptUser();
//       break;

//     default:
//       printErrorMessage(`Unknown operation "${command}"`);
//       promptUser();
//       break;
//   }
// }

// function navigateToParentDirectory() {
//   const parentDirectory = path.resolve(workingDirectory, '..');

//   if (path.relative(parentDirectory, path.sep) === '') {
//     printErrorMessage('Cannot go above the root directory.');
//   } else {
//     workingDirectory = parentDirectory;
//     printWorkingDirectory();
//   }
// }

// function printErrorMessage(message) {
//   redErrorMessage(`Error: ${message}`, '31');
// }

// printWelcomeMessage();
// printWorkingDirectory();
// promptUser();

// rl.on('close', () => {
//   printGoodbyeMessage();
//   rl.close();
// });

// rl.on('error', (err) => {
//   redErrorMessage(`An unexpected error occurred: ${err}`, '31');
//   rl.close();
// });


// start.js

import readline from 'readline';
import { processUserInput, printWelcomeMessage, printWorkingDirectory, printGoodbyeMessage, printErrorMessage } from '../comands/comands.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const [, , fullStringName] = process.argv;
const [, username] = fullStringName.split('=');

let workingDirectory = process.cwd();

printWelcomeMessage(username);
printWorkingDirectory(workingDirectory);
promptUser();

rl.on('close', () => {
  printGoodbyeMessage(username);
  rl.close();
});

rl.on('error', (err) => {
  printErrorMessage(`An unexpected error occurred: ${err}`);
  rl.close();
});

export function promptUser() {
  rl.question('Please enter your command: ', (input) => {
    workingDirectory = processUserInput(input.trim().toLowerCase(), workingDirectory);
  });
}
