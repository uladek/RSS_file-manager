import { rename } from 'node:fs/promises';
import { printErrorMessage } from '../commands/commands.js';

export const renameFile = async (filePath, newFilename) => {
  try {
    await rename(filePath, newFilename);
    console.log(`File renamed successfully to ${newFilename}`);
  } catch (error) {
    printErrorMessage(`Operation Failed: File "${filePath}" not found.`);
  }
};
