import log from 'loglevel';
import config from './app-config';

export default function configureLogging() {
  log.setLevel(config.logLevel);
  log.info('Logging configured');
  window.logRef = log;
}
