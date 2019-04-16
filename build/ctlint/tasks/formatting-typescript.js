const shell = require('shelljs');
const task = require('../utils/task.js');
const commonUtils = require('../utils/common.js');
const constants = require('../constants');
const taskName = commonUtils.getTaskName(__filename);
const npmbin = require('npm-which')(__dirname);

function action(resolve, reject, settings) {
  if (settings.run === false) {
    task.skipped(taskName);
    resolve();
    return;
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
    reject('[' + taskName + '] TypeScript formatting failed. Code: ' + code);
  }

  const tsfmtPath = '"' + npmbin.sync('tsfmt') + '"';
  shell.exec(tsfmtPath + ' -r', resultCallback);
}

module.exports = action;
