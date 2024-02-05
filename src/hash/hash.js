// import { createReadStream } from "node:fs";
// import { createHash } from "node:crypto";
// import { redErrorMessage } from '../utils/redMessage.js';


// export const  printFileHash = async (filePath) => {
//   try {
//     const hash = createHash('sha256');
//     const stream = createReadStream(filePath);

//     stream.on('data', (data) => {
//       hash.update(data);
//     });

//     return new Promise((resolve) => {
//       stream.on('end', () => {
//         const fileHash = hash.digest('hex');
//         console.log(`Hash for ${filePath}: \x1b[35m${fileHash}\x1b[0m`);
//         resolve(fileHash);
//       });

//       stream.on('error', (error) => {
//         redErrorMessage(`Operation failed: ${error.message}`);
//         // reject(error);
//       });
//     });
//   } catch (error) {
//     // throw new Error(`Operation failed: ${error.message}`);
//     console.error(`Operation failed: ${error.message}`);
//     // throw error;
//   }
// }

import { createHash } from 'crypto';
import { createReadStream, promises as fsPromises } from 'fs';
import { redErrorMessage } from '../utils/redMessage.js';

const { access, stat } = fsPromises;

export const printFileHash = async (filePath) => {
  // try {
    await access(filePath);

    const fileStats = await stat(filePath);
    if (fileStats.isDirectory()) {
      throw new Error(`Operation failed: "${filePath}" is a directory, not a file.`);
    }

    const hash = createHash('sha256');
    const stream = createReadStream(filePath);

    return new Promise((resolve, reject) => {
      stream.on('data', (data) => {
        hash.update(data);
      });

      stream.on('end', () => {
        const fileHash = hash.digest('hex');
        console.log(`Hash for ${filePath}: \x1b[35m${fileHash}\x1b[0m\n`);
        resolve(fileHash);
      });

      stream.on('error', (error) => {
        // Handle the error without throwing or rejecting
        redErrorMessage(`Operation failed: ${error.message}`);
        resolve(); // Resolve with undefined to continue execution
      });
    });
  // } catch (error) {
  //   // Handle access or stat errors
  //   throw new Error(`Operation failed: ${error.message}`);
  // }
};
