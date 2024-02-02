import { rl } from './interface/readline.js';
import { redErrorMessage } from './utils/redMessage.js';
import { printWelcomeMessage, printGoodbyeMessage, promptUser } from './greeting/start.js';
import {  printWorkingDirectory } from './directory/workDirectory.js';

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
