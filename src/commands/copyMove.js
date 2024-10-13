import { createReadStream, createWriteStream, promises as fsPromises } from 'node:fs';

import { printErrorMessage } from '../commands/commands.js';
import { unlink } from 'node:fs/promises';




// export const createEmptyFile = async (filename) => {
//   try {
//     await access(filename);

//     printErrorMessage(`Operation failed: File "${filename}" already exists.`);

//   } catch (accessError) {
//     try {
//       await writeFile(filename, '');
//       console.log(`Empty file "${filename}" created successfully.`);
//     } catch (Error) {
//       printErrorMessage(`Operation failed. Error creating empty file: ${Error.message}`);
//     }
//   }
// };

export const cp = async (sourcePath, targetDirectory) => {
  return new Promise(async (resolve) => {

    // промис для последовательного выполнеря перед
    //  printCurrentDirectory();
    // promptUser();
    const targetPath = `${targetDirectory}/${sourcePath.split('/').pop()}`;

    try {
      await fsPromises.access(targetPath);
      printErrorMessage(`Operation Failed: File "${targetPath}" already exists in the target directory.`);
      // resolve();
      return resolve()
    } catch {

      try {
      const sourceStream = createReadStream(sourcePath);
      const targetStream = createWriteStream(targetPath);

      let hasError = false;

      const errorHandler = (error) => {
        if (!hasError) {
          hasError = true;
          printErrorMessage(`Operation Failed: ${error.message}`);
          resolve();
        }
      };

      sourceStream.on('error', errorHandler);
      targetStream.on('error', errorHandler);

      targetStream.on('finish', () => {
        if (!hasError) {
          console.log(`File copied successfully to ${targetPath}`);
        }
        resolve();
      });

      sourceStream.pipe(targetStream);
    } catch (copyError) {
      printErrorMessage(`Operation Failed during copy: ${copyError.message}`);
      resolve();
    };
  };
});
};



export const mv = async (sourcePath, targetDirectory) => {
  const fileName = sourcePath.split('/').pop();
  const targetPath = `${targetDirectory}/${fileName}`;

  return new Promise((resolve) => {
    let errorHandled = false;

    const sourceStream = createReadStream(sourcePath);
    const targetStream = createWriteStream(targetPath);

    sourceStream
      .on('error', () => {
        if (!errorHandled) {
          printErrorMessage(`Operation Failed: File "${sourcePath}" not found.`);
          errorHandled = true;
          resolve(false);
        }
      })
      .pipe(targetStream)
      .on('error', async (error) => {
        if (!errorHandled) {
          printErrorMessage(`Operation Failed: Unable to move file to "${targetDirectory}".`);
          errorHandled = true;
          resolve(false);
        }
      })
      .on('finish', async () => {
        try {
          await unlink(sourcePath);
          console.log(`File moved successfully to ${targetDirectory}`);
          resolve(true);
        } catch (unlinkError) {
          if (!errorHandled) {
            printErrorMessage(`Operation Failed: Unable to delete source file "${sourcePath}".`);
            errorHandled = true;
            resolve(false);
          }
        }
      });
  });
};
