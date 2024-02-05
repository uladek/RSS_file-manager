import { access, unlink } from 'node:fs/promises';

export const removeFile = async (filePath) => {
  try {
    await access(filePath);

    await unlink(filePath);

    console.log(`File "${filePath}" successfully deleted.`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`File "${filePath}" not found.`);
    }
    throw new Error(`Error deleting file: ${error.message}`);
  }
};
