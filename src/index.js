import { rl } from './interface/readline.js';
import { redErrorMessage } from './utils/redMessage.js';
import { printWelcomeMessage, printGoodbyeMessage, promptUser } from './greeting/start.js';
import { printWorkingDirectory } from './directory/workDirectory.js';

printWelcomeMessage();
printWorkingDirectory();
promptUser();

rl.on('close', () => {
  printGoodbyeMessage();
  rl.close();
});

rl.on('error', (error) => {
  redErrorMessage(`Operation failed: ${error}`, '31');
  rl.close();
});
