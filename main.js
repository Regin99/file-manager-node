import { homedir } from 'os';
import readline from 'readline';

import { changeDirectory, list } from './directory.js';
import {
  addFile,
  calculateHash,
  compress,
  copyFile,
  decompress,
  moveFile,
  readFile,
  removeFile,
  renameFile
} from './files.js';
import { handleOSInput } from './os.js';

const main = async () => {
  const username = process.argv
    .find((arg) => arg.includes('--username'))
    .split('=')[1];
  const homeDir = homedir();
  let currentDir = homeDir;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const handleInput = async (command) => {
    if (command === '.exit') {
      rl.close();
    } else {
      await handleCommand(command);
    }
  };

  const handleCommand = async (input) => {
    const command = input.split(' ')[0];
    const firstArg = input.split(' ')[1];
    const secondArg = input.split(' ')[2];
    switch (command) {
      case 'up':
        currentDir = await changeDirectory(currentDir, '..');
        break;
      case 'cd':
        currentDir = await changeDirectory(currentDir, firstArg);
        break;
      case 'ls':
        await list(currentDir);
        break;
      case 'cat':
        await readFile(currentDir, firstArg);
        break;
      case 'add':
        await addFile(currentDir, firstArg);
        break;
      case 'rn':
        await renameFile(currentDir, firstArg, secondArg);
        break;
      case 'cp':
        await copyFile(currentDir, firstArg, secondArg);
        break;
      case 'mv':
        await moveFile(currentDir, firstArg, secondArg);
        break;
      case 'rm':
        await removeFile(currentDir, firstArg);
        break;
      case 'os':
        handleOSInput(firstArg);
        break;
      case 'compress':
        await compress(currentDir, firstArg, secondArg);
        break;
      case 'decompress':
        await decompress(currentDir, firstArg, secondArg);
        break;
      case 'hash':
        await calculateHash(currentDir, firstArg);
        break;
      default:
        console.log('Invalid input');
    }
    rl.question(`You are currently in ${currentDir}\n`, handleInput);
  };

  rl.write(`Welcome to the File Manager, ${username}\n`);
  rl.question(`You are currently in ${currentDir}\n`, handleInput);

  rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
  });
};

main();
