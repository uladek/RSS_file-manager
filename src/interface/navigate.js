
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
    } else {
      process.chdir(parentDirectory);

    }
  }

  // export const navigateToDirectory = async (directoryPath) => {
  //   const currentDirectory = process.cwd();
  //   const targetPath = path.isAbsolute(directoryPath) ? directoryPath : path.join(currentDirectory, directoryPath);

  //   try {
  //     await fsPromises.access(targetPath);
  //     const realpath = await fsPromises.realpath(targetPath);
  //     process.chdir(realpath);
  //     printCurrentDirectory();
  //   } catch (err) {
  //     printErrorMessage(`Directory not found: ${directoryPath}`);
  //     // printCurrentDirectory();
  //   } finally {
  //     promptUser();
  //   }
  // }


  // export const navigateToDirectory = (targetDirectory) => {
  //   try {
  //     process.chdir(targetDirectory);
  //     printCurrentDirectory();
  //     promptUser();
  //   } catch (error) {
  //     printErrorMessage(`Error navigating to "${targetDirectory}": ${error.message}`);
  //     printCurrentDirectory();
  //     promptUser();
  //   }
  // }


  export const navigateToDirectory = (directoryPath) => {
    const currentDirectory = process.cwd();
    const targetDirectory = path.resolve(currentDirectory, directoryPath);

    try {
      process.chdir(targetDirectory);
    } catch (error) {
      printErrorMessage(`Error navigating to directory "${directoryPath}": ${error.message}`);
    }
  }
