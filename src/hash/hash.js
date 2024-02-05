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

    return new Promise((resolve) => {
      stream.on('data', (data) => {
        hash.update(data);
      });

      stream.on('end', () => {
        const fileHash = hash.digest('hex');
        console.log(`Hash for ${filePath}: \x1b[35m${fileHash}\x1b[0m\n`);
        resolve(fileHash);
      });

      stream.on('error', (error) => {
        redErrorMessage(`Operation failed: ${error.message}`);
        resolve();
      });
    });
  // } catch (error) {
  //   // Handle access or stat errors
  //   throw new Error(`Operation failed: ${error.message}`);
  // }
};
