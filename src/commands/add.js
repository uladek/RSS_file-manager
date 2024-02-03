
import { writeFile } from 'node:fs/promises';
import { printErrorMessage } from '../commands/commands.js';

export const createEmptyFile = async (filename) => {
  try {
    await writeFile(filename, '');
    console.log(`Empty file "${filename}" created successfully.`);
  } catch (error) {
    printErrorMessage(`Error creating empty file: ${error.message}`);
  }
};
