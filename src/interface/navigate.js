
import path from 'path';
import { promptUser } from '../greeting/start.js';
import {  printCurrentDirectory } from '../directory/workDirectory.js';
import {  printErrorMessage } from '../commands/commands.js';


export const navigateUp = () => {
    const currentDirectory = process.cwd();
    const parentDirectory = path.dirname(currentDirectory);
    // const parentDirectory = path.resolve(currentDirectory, '..');

    if (parentDirectory === currentDirectory) {
      printErrorMessage('Cannot go above the root directory.');
    //   printCurrentDirectory();
    //   promptUser();
    } else {
      process.chdir(parentDirectory);
    //   printCurrentDirectory();
    //   promptUser();
    }
  }
