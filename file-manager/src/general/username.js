import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const [, , fullStringName] = process.argv;
const [, username] = fullStringName.split('=');

let workingDirectory = process.cwd();
console.log("usernameTRIM:", username.trim())

function printWelcomeMessage() {
  console.log(`Welcome to the File Manager, ${username}!`);
}

function printWorkingDirectory() {
    console.log(`You are currently in ${workingDirectory}`);
  }

function printGoodbyeMessage() {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
}

printWelcomeMessage();
printWorkingDirectory();

rl.on('close', () => {
  printGoodbyeMessage();
  rl.close();
});

rl.on('line', (input) => {
    if (input.trim().toLowerCase() === '.exit') {
      rl.close();
    } else {
      console.log(`You entered: ${input}`);
    }
  });
