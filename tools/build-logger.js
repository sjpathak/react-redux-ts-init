import colors from 'colors'; // eslint-disable-line no-unused-vars
import moment from 'moment';

class BuildLogger {
  logStart(name, func) {
    const startTime = moment();
    const promise = Promise.resolve().then((resolve, reject) => {
      console.log(`${this.getLogDate()} ${'Start:'.green} ${name.bold}`);
    }).then(func)
        .then(() =>
            this.logEnd(name, startTime),
        ).catch((err) => {
          this.logEnd(name, startTime, err);
        });
    return promise;
  }

  logEnd(name, startTime, err) {
    if (err) {
      console.log(` Error: ${err}`.red);
    }
    console.log(`${this.getLogDate()} ${'End:'.green} ${name.bold}`);
  }

  getLogDate() {
    return `${'['.magenta}${moment().format('hh:mm:ss').cyan}${']'.magenta}`;
  }
}

export default new BuildLogger();
