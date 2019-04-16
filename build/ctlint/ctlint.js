/**
 * @fileoverview CTLint - applying predefined rules against code changes.
 * @author Cezary Tomczyk
 * @version 1.0.0
 */

/* eslint no-console: 0 */

const fs = require('fs');
const path = require('path');
const config = JSON.parse(fs.readFileSync(path.resolve(process.cwd() + '/ctlint.json'), 'utf-8'));
const taskList = Object.keys(config.tasks);
const taskUtil = require('./utils/task.js');

// Console colors
require('colors');

function exitError(message) {
  console.error(message.red);
}

function getTaskFunction(taskName) {
  const task = require(__dirname + '/tasks/' + taskName + '.js');
  const taskSettings = config.tasks[taskName];

  return function (resolve, reject) {
    task(resolve, reject, taskSettings);
  };
}

function wrapTask(fn) {
  return function () {
    return new global.Promise(fn);
  };
}

function processTask(target, item) {
  return target.then(item);
}

function onCompleted() {
  console.log('Validation has been done successfully'.green);
  taskUtil.showTotalTime();
}

const tasks = taskList.map(getTaskFunction).map(wrapTask);

console.log('\nValidation'.bold + ' Started\n'.green);

tasks.reduce(processTask, global.Promise.resolve())
  .then(onCompleted)
  .catch(exitError);
