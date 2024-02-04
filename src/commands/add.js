import { access, writeFile } from 'node:fs/promises';
import { printErrorMessage } from '../commands/commands.js';

export const createEmptyFile = async (filename) => {
  try {
    await access(filename);

    printErrorMessage(`Operation failed: File "${filename}" already exists.`);

  } catch (accessError) {
    try {
      await writeFile(filename, '');
      console.log(`Empty file "${filename}" created successfully.`);
    } catch (Error) {
      printErrorMessage(`Operation failed. Error creating empty file: ${Error.message}`);
    }
  }
};
