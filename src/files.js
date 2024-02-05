import { createReadStream, createWriteStream } from 'fs';
import { rename, unlink, writeFile } from 'fs/promises';
import { createHash } from 'crypto';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

export const readFile = async (currentDir, path) => {
  const readStream = createReadStream(`${currentDir}/${path}`, 'utf-8');
  readStream.on('data', (data) => {
    console.log(data);
  });
  readStream.on('error', () => {
    console.log('Operation failed');
  });
};

export const addFile = async (currentDir, name) => {
  try {
    await writeFile(`${currentDir}/${name}`, '', { encoding: 'utf-8' });
  } catch (error) {
    console.log('Operation failed');
  }
};

export const renameFile = async (currentDir, oldName, newName) => {
  try {
    const oldPath = `${currentDir}/${oldName}`;
    const newPath = `${currentDir}/${newName}`;
    await rename(oldPath, newPath);
  } catch (error) {
    console.log('Operation failed');
  }
};

export const copyFile = async (currentDir, fileName, newPath) => {
  try {
    const oldPath = `${currentDir}/${fileName}`;
    const readStream = createReadStream(oldPath);
    const writeStream = createWriteStream(
      `${currentDir}/${newPath}/${fileName}`
    );
    readStream.pipe(writeStream);
  } catch (error) {
    console.log('Operation failed');
  }
};

export const removeFile = async (currentDir, fileName) => {
  try {
    await unlink(`${currentDir}/${fileName}`);
  } catch (error) {
    console.log('Operation failed');
  }
};

export const moveFile = async (currentDir, fileName, newPath) => {
  await copyFile(currentDir, fileName, newPath);
  await removeFile(currentDir, fileName);
};

export const calculateHash = async (currentDir, filePath) => {
  const hash = createHash('sha256');
  const path = `${currentDir}/${filePath}`;
  const readStream = createReadStream(path, 'utf-8');
  readStream.on('data', (chunk) => {
    hash.update(chunk);
  });
  readStream.on('end', () => {
    console.log(hash.digest('hex'));
  });
  readStream.on('error', () => {
    console.log('Operation failed');
  });
};

export const compress = async (currentDir, fileName, newPath) => {
  try {
    const oldPath = `${currentDir}/${fileName}`;
    const readStream = createReadStream(oldPath);
    const writeStream = createWriteStream(`${newPath}.br`);
    const brotliStream = createBrotliCompress();
    readStream.pipe(brotliStream).pipe(writeStream);
  } catch (error) {
    console.log('Operation failed');
  }
};

export const decompress = async (currentDir, fileName, newPath) => {
  try {
    const oldPath = `${currentDir}/${fileName}`;
    const readStream = createReadStream(oldPath);
    const writeStream = createWriteStream(
      `${newPath}/${fileName.slice(0, -3)}`
    );
    const brotliStream = createBrotliDecompress();
    readStream.pipe(brotliStream).pipe(writeStream);
  } catch (error) {
    console.log('Operation failed');
  }
};
