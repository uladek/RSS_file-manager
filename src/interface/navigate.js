
import path from 'path';
import {  printErrorMessage } from '../commands/commands.js';


export const navigateUp = () => {
    const currentDirectory = process.cwd();
    const parentDirectory = path.dirname(currentDirectory);

    if (parentDirectory === currentDirectory) {
      printErrorMessage('Cannot go above the root directory.');
    } else {
      process.chdir(parentDirectory);
    }
  }


  export const navigateToDirectory = (directoryPath) => {
    const currentDirectory = process.cwd();
    const targetDirectory = path.resolve(currentDirectory, directoryPath);

    try {
      process.chdir(targetDirectory);
    } catch (error) {
      printErrorMessage(`Error navigating to directory "${directoryPath}": ${error.message}`);
    }
  }
