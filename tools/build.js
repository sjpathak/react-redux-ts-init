// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/* eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import devConfig from '../webpack.dev.config';
import deployConfig from '../webpack.deploy.config';
import colors from 'colors'; // eslint-disable-line no-unused-vars
import copy from './dist-copy';
import yargs from 'yargs';
import merge from 'webpack-merge';

const args = yargs.argv;

// Check args first
if (args.env === null || args.env === undefined) {
  console.log('Missing argument for --env.'.red);
  process.exit(1);
}

const processCallback = (err, stats) => {
  if (err) { // so a fatal error occurred. Stop here.
    console.log('Errors so bailing out at top...');
    console.log(err.bold.red);
    process.exit(1);
  }

  const jsonStats = stats.toJson();

  console.log(`\nProcessing complete. Errors: ${stats.hasErrors()}, Warnings: ${stats.hasWarnings()}`.bgCyan);

  if (stats.hasWarnings()) {
    console.log('Webpack generated the following warnings: '.bold.yellow);
    jsonStats.warnings.forEach(warning => console.log(warning.bold.yellow));
  }

  if (stats.hasErrors()) {
    console.log('Webpack generated the following errors: '.bold.red);
    jsonStats.errors.forEach((error) => {
      console.log('\n***'.bold.white);
      console.log(`\n${error.bold.red}`);
    });
    if (!args.watch) {
      process.exit(1);
    }

    return 1;
  }

  console.log(`Webpack stats: \n${stats.toString({ colors: true, chunks: false, children: false })}`);

    // if we got this far, the build succeeded.
  console.log('Compilation success...'.bgGreen);

  copy();

  return 0;
};

console.log('\nGenerating bundles via Webpack. Please wait a moment...'.bold.cyan);
console.log(`\Configuring webpack config for environment: [${args.env.bold.red}]\n`);
let config = {};
switch (args.env) {
  case 'dev':
    config = merge(webpackConfig, devConfig);
    break;
  case 'prod':
    config = merge(webpackConfig, deployConfig);
    break;
  default:
    config = webpackConfig;
}

const compiler = webpack(config);
console.log('Starting webpack...'.bold.yellow);

if (args.watch) {
  compiler.watch({}, processCallback);
}
else {
  compiler.run(processCallback);
}

