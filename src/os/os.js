
import os from 'os';

export const printEOL = () => {
  const eol = os.EOL;
  console.log(`Default End-Of-Line for the system: ${JSON.stringify(eol)}`);
};

export const printCPUsInfo = () => {
  const cpus = os.cpus();

  const cpuData = cpus.map((cpu, index) => ({
    CPU: index + 1,
    Model: cpu.model,
    'Clock Rate (GHz)': cpu.speed / 1000
  }));

  console.log('CPUs Info:');
  console.table(cpuData, ['CPU', 'Model', 'Clock Rate (GHz)']);
};


export const printHomeDir = () => {
  const homedir = os.homedir();
  console.log(`Home Directory: ${homedir}`);
}


export const printUsername = () => {
  const username = os.userInfo().username;
  console.log(`Current System User Name: ${username}`);
}


export const  printCPUArchitecture = () => {
  const architecture = os.arch();
  console.log(`CPU Architecture: ${architecture}`);
}
