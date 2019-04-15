const shell = require('shelljs');

const task = require('../utils/task.js');
const commonUtils = require('../utils/common.js');
const constants = require('../constants');
const taskName = commonUtils.getTaskName(__filename);

function action(resolve, reject, settings) {
  if (settings.run === false) {
    task.skipped(taskName);
    return resolve();
  }

  task.timeStart(taskName);

  const CIRCULAR_DEPENDENCY_OUTPUT_WARNING = 'WARNING in Circular dependency detected';

  function resultCallback(code, output) {
    let errorCode = code;

    if (String(output).includes(CIRCULAR_DEPENDENCY_OUTPUT_WARNING)) {
      errorCode = constants.EXIT_UNCAUGHT_FATAL_EXCEPTION;
    }

    if (errorCode === constants.EXIT_SUCCESS) {
      task.success(taskName);
      task.timeEnd(taskName);
      resolve();
      return;
    }

    task.timeEnd(taskName);
    reject('There were errors (code: ' + errorCode + ') while building app package');
  }

  shell.exec('npm run build', resultCallback);
}

module.exports = action;
