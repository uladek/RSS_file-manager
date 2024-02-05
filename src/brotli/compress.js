import { createReadStream, createWriteStream, promises as fsPromises, constants } from 'fs';
import { createBrotliCompress } from 'zlib';
import { dirname } from 'path';
import { printErrorMessage } from '../commands/commands.js';


const isDirectory = async (path) => {
  try {
    const stats = await fsPromises.stat(path);
    return stats.isDirectory();
  } catch (error) {
    return false;
  }
};

export const compressFile = async (inputPath, outputPath) => {
  try {
    try {
      await fsPromises.access(inputPath, constants.R_OK);
    } catch (inputFileError) {
        printErrorMessage(`Operation failed: Input file "${inputPath}" does not exist.`);
      return;
    }

    if (!(await isDirectory(dirname(outputPath)))) {
        printErrorMessage(`Operation failed: Output directory "${dirname(outputPath)}" does not exist.`);
      return;
    }

    try {
      await fsPromises.access(outputPath, constants.F_OK);
      printErrorMessage(`Operation failed: Output file "${outputPath}" already exists.`);
      return;
    } catch (error) {
    }

    const inputStream = createReadStream(inputPath);
    const brotliStream = createBrotliCompress();
    const outputStream = createWriteStream(outputPath);

    await new Promise((resolve) => {
      inputStream.pipe(brotliStream).pipe(outputStream)
        .on('finish', resolve)
        .on('error', (error) => {
            printErrorMessage(`Operation failed: ${error.message}`);
          });
      });

    console.log(`Compression successful. ${inputPath} has been compressed and saved to ${outputPath}`);
  } catch (error) {
    printErrorMessage(`Operation failed: ${error.message}`);
  }
};
