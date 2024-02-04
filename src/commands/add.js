
// import { writeFile } from 'node:fs/promises';
// import { printErrorMessage } from '../commands/commands.js';

// export const createEmptyFile = async (filename) => {
//   try {
//     await writeFile(filename, '');
//     console.log(`Empty file "${filename}" created successfully.`);
//   } catch (error) {
//     printErrorMessage(`Error creating empty file: ${error.message}`);
//   }
// };


// throw new Error(
//   `Operation failed: no such file or directory!`
// );

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
