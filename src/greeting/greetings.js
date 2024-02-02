const [, , fullStringName] = process.argv;
export const [, username] = fullStringName.split('=');


export const  printWelcomeMessage = () => {
    console.log(`Welcome to the File Manager, ${username}!`);
  }
