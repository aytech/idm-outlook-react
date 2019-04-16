const path = require('path');
const shell = require('shelljs');
const glob = require('glob-all');

const task = require('../utils/task.js');
const commonUtils = require('../utils/common.js');
const taskName = commonUtils.getTaskName(__filename);
const root = path.resolve(__dirname, '../../..');

function action(resolve, reject, settings) {
  if (settings.run === false) {
    task.skipped(taskName);
    return resolve();
  }

  const files = [
    root + '/src/**/*.json',
    root + '/package.json',
    root + '/package-lock.json',
    root + '/ctlint.json',
    root + '/tsconfig.json',
    root + '/tsfmt.json',
    root + '/tslint.json'
  ];

  function validJSON(file) {

    try {
      JSON.parse(shell.cat(file));
    } catch (err) {
      reject('[' + taskName + '] File ' + file + ' failed JSON validation.\n');
    }

  }

  task.timeStart(taskName);
  glob.sync(files).forEach(validJSON);

  task.success(taskName);
  task.timeEnd(taskName);
  resolve('[' + taskName + '] No errors found in JSON files');
}

module.exports = action;
