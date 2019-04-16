const path = require('path');

function getTaskName(fileName) {
  return path.basename(fileName).split(/^(.*)(\.js)$/)[1];
}

const common = {
  getTaskName: getTaskName
};

module.exports = common;