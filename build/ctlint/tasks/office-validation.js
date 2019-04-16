const task = require('../utils/task.js');
const commonUtils = require('../utils/common.js');
const shell = require('shelljs');
const constants = require('../constants');
const taskName = commonUtils.getTaskName(__filename);

function action(resolve, reject, settings) {
  if (settings.run === false) {
    task.skipped(taskName);
    return resolve();
  }

  task.timeStart(taskName);

  function resultCallback(code) {

    if (code === constants.EXIT_SUCCESS) {
      task.success(taskName);
      task.timeEnd(taskName);
      resolve();
      return;
    }

    task.timeEnd(taskName);
    reject('[' + taskName + '] Office validation failed. Code: ' + code);
  }

  shell.exec('npm run validate:office', resultCallback);
}

module.exports = action;
