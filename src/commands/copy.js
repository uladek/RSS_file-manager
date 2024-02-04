// import { createReadStream, createWriteStream } from 'node:fs';
import { createReadStream, createWriteStream, promises as fsPromises } from 'node:fs';

import { copyFile } from 'node:fs/promises';
import { printErrorMessage } from '../commands/commands.js';
import {  promptUser } from '../greeting/start.js';



export const cp = async (sourcePath, targetDirectory) => {
  return new Promise((resolve) => {
    const sourceStream = createReadStream(sourcePath);
    const targetPath = `${targetDirectory}/${sourcePath.split('/').pop()}`;
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
  });
};
