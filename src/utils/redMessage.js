export const redErrorMessage = (message, colorCode) => {
    console.error(`\x1b[${colorCode}m${message}\x1b[0m`);
};
