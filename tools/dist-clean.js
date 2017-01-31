import fs from 'fs-extra';
import colors from 'colors'; // eslint-disable-line no-unused-vars
import logger from './build-logger';

const TASK_NAME = 'Clean';
const distFolderRoot = '../dist';
const folders = [
  `${distFolderRoot}/css`,
  `${distFolderRoot}/img`,
  `${distFolderRoot}/js`,
  './dist',
];

const cleanFolders = () => Promise.all(folders.map(folder => new Promise((resolve, reject) => {
  fs.remove(folder, (error) => {
                // console.log(`Removing: ${folder}... ${(error) ? `Error: ${error}` : 'done'.green} `);
    resolve();
  });
})));

export default cleanFolders;

logger.logStart(TASK_NAME, cleanFolders);

