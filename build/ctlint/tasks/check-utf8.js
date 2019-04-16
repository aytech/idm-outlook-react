const fs = require('fs');
const path = require('path');
const isUtf8 = require('is-utf8');
const glob = require('glob-all');
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

  const srcDir = path.resolve(__dirname, '../../src');
  let invalidUTF8files = [];

  const NO_INVALID_FILES = 0;
  const files = [
    srcDir + '/**/*.tsx',
    srcDir + '/**/*.html',
    srcDir + '/**/*.css',
    srcDir + '/**/*.less',
    srcDir + '/**/*.json'
  ];
  const allFiles = glob.sync(files);

  for (let i = 0; i < allFiles.length; i += 1) {
    if (isUtf8(fs.readFileSync(allFiles[i])) === false) {
      invalidUTF8files.push(allFiles[i]);
    }
  }

  if (invalidUTF8files.length === NO_INVALID_FILES) {
    task.success(taskName);
    task.timeEnd(taskName);
    resolve();
    return;
  }

  console.log(JSON.stringify(invalidUTF8files, null, constants.JSON_AMOUNT_OF_WHITESPACE));

  task.timeEnd(taskName);
  reject('[' + taskName + '] There are files that are not UTF-8 valid!');
}

module.exports = action;
