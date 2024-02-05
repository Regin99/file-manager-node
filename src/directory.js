import { stat, readdir } from 'fs/promises';
import { homedir } from 'os';

export const changeDirectory = async (currentDir, target) => {
  if (!target) {
    console.log('Invalid input');
    return currentDir;
  }

  const isRootDir = currentDir.toLowerCase() === homedir().toLowerCase();
  if (isRootDir && target === '..') {
    return homedir();
  }

  if (target === '..') {
    console.log('You are in the root directory');
    return currentDir.split('/').slice(0, -1).join('/');
  }

  try {
    const newPath = `${currentDir}/${target}`;
    const stats = await stat(newPath);
    if (stats.isDirectory()) {
      return newPath;
    }
  } catch (error) {
    try {
      const stats = await stat(target);
      if (stats.isDirectory() && target.includes(homedir().toLowerCase())) {
        return target;
      }
    } catch (error) {
      console.log('Invalid input');
    }
  }

  return currentDir;
};

export const list = async (currentDir) => {
  try {
    const files = await readdir(currentDir, { withFileTypes: true });
    const sortedFiles = files.sort((a, b) => {
      if (a.isDirectory() === b.isDirectory()) {
        return a.name.localeCompare(b.name);
      }
      return a.isDirectory() ? -1 : 1;
    });
    const output = sortedFiles.map((file) => ({
      Name: file.name,
      Type: file.isDirectory() ? 'directory' : 'file'
    }));
    console.table(output);
  } catch (error) {
    console.log('Invalid input');
  }
};
