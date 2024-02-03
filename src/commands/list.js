import path from 'path';
import { readdir, stat } from 'node:fs/promises';

export const listDirectoryContent = async () => {
  try {
    const currentDirectory = process.cwd();
    const directoryContent = await readdir(currentDirectory);

    const items = [];

    await Promise.all(
      directoryContent.map(async (item) => {
        const fullPath = path.join(currentDirectory, item);
        const stats = await stat(fullPath);
        console.log('stats: ', stats);

        const itemType = stats.isDirectory() ? 'Directory' : 'File';
        items.push({ Name: item, Type: itemType });
      })
    );

     items.sort((a, b) => a.Name.localeCompare(b.Name));

     console.table(items);

  } catch (error) {
    console.error(`Error listing directory content: ${error.message}`);
  }
};
