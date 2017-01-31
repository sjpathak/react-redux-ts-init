import fs from 'fs-extra';
import colors from 'colors'; // eslint-disable-line no-unused-vars
import logger from './build-logger';
const TASK_NAME = 'Copy';

const srcFolder = './dist';
const distFolder = '../dist';

const mappings = [
    { from: `${srcFolder}/js`, to: `${distFolder}/js` },
    { from: `${srcFolder}/img`, to: `${distFolder}/img` },
    { from: `${srcFolder}/css`, to: `${distFolder}/css` },
    // {from: `${srcFolder}/fonts`, to: `${distFolder}/css/fonts`},
    { from: `${srcFolder}/index.html`, to: `${distFolder}/index.html` },
];

const doCopy = () => {
  const errors = [];
  return Promise.all(mappings.map(mapping => new Promise((resolve, reject) => {
    fs.copy(mapping.from, mapping.to, (error) => {
      console.log(`Copying: ${mapping.from} to ${mapping.to}... ${(error) ? `Error: ${error}` : 'done'.green} `);
      if (error) {
        errors.push(error);
      }
      resolve();
    });
  }))).then(() => {
    if (errors.length > 0) {
      throw errors;
    }
  });
};

const copy = () => {
  logger.logStart(TASK_NAME, doCopy);
};

export default copy;

