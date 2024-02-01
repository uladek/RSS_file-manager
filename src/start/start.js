import readline from 'readline';
import { redErrorMessage } from '../utils/redMessage.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const [, , fullStringName] = process.argv;
const [, username] = fullStringName.split('=');

const workingDirectory = process.cwd();

function printWelcomeMessage() {
  console.log(`Welcome to the File Manager, ${username}!`);
}

function printWorkingDirectory() {
    console.log(`You are currently in ${workingDirectory}`);
  }

function printGoodbyeMessage() {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
}
function promptUser() {
  rl.question('Enter your command: ', (input) => {
    processUserInput(input);
  });
}

// function processUserInput(input) {
//   if (input.trim().toLowerCase() === '.exit') {
//     rl.close();
//   } else {
//     console.log(`You entered: ${input}`);
//     promptUser();
//   }
// }

function processUserInput(input) {
  const command = input.trim().toLowerCase();

  switch (command) {
    case '.exit':
      rl.close();
      break;
    case '':
      printErrorMessage('Invalid empty input.  Please enter a command.');
      promptUser();
      break;
    default:
      printErrorMessage(`unknown operation "${command}"`);
      promptUser();
      break;
  }
}

function printErrorMessage(message) {
  redErrorMessage(`Error: ${message}`, '31');
}

printWelcomeMessage();
printWorkingDirectory();
promptUser();

rl.on('close', () => {
  printGoodbyeMessage();
  rl.close();
});

rl.on('error', (err) => {
  redErrorMessage(`An unexpected error occurred: ${err}`, '31');
  rl.close();
});
