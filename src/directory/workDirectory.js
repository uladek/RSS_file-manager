import { homedir } from "node:os";


export const printCurrentDirectory = () => {
    console.log(`You are currently in ${process.cwd()}`);
};

export const printWorkingDirectory = () => {
   console.log(`You are currently in ${homedir()}`);
};
