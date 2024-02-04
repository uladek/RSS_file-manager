import { access, rename } from 'node:fs/promises';
import path from 'node:path';
import { printErrorMessage } from '../commands/commands.js';

export const renameFile = async (filePath, newFilename) => {
  try {
    const directory = path.dirname(filePath);
    const newFilePath = path.join(directory, newFilename);

    await access(newFilePath);

    printErrorMessage(`Operation Failed: File "${newFilename}" already exists.`);
  } catch (accessError) {
    try {
      await rename(filePath, path.join(path.dirname(filePath), newFilename));
      console.log(`File renamed successfully to ${newFilename}`);
    } catch (renameError) {
      printErrorMessage(`Operation Failed: File "${filePath}" not found.`);
    }
  }
};
