import { createReadStream } from 'node:fs';

export const catFile = async (filePath) => {
  return new Promise((resolve) => {
    const readStream = createReadStream(filePath, 'utf-8');
    let content = '';

    readStream.on('data', (chunk) => {
      content += chunk;
    });

    readStream.on('end', () => {
      console.log('File content:');
      console.log(content);
      console.log('File reading completed.');
      resolve();
    });
  });
};
