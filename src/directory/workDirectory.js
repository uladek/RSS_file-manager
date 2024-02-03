import { homedir } from "node:os";


export const printCurrentDirectory = () => {
    console.log(`You are currently in ${process.cwd()}`);
};

export const printWorkingDirectory = () => {
   console.log(`You are currently in ${homedir()}`);
};


export const navigateToDirectory = async (directoryPath) => {
    const currentDirectory = process.cwd();
    const targetPath = path.isAbsolute(directoryPath) ? directoryPath : path.join(currentDirectory, directoryPath);

    try {
      await fsPromises.access(targetPath);
      const realpath = await fsPromises.realpath(targetPath);
      process.chdir(realpath);
      printCurrentDirectory();
    } catch (err) {
      printErrorMessage(`Directory not found: ${directoryPath}`);
      // printCurrentDirectory();
    } finally {
      promptUser();
    }
  }
