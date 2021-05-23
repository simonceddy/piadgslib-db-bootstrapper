const trim = require('lodash/trim');

const splitPattern = /\s\s+/i;
const replacePattern = /^\d\./i;

const processSubjects = (subjects = '') => {
  if (!subjects.split) console.log(subjects);
  return subjects.split(splitPattern)
    .map((subject = '') => trim(subject.replace(replacePattern, '')));
};

module.exports = processSubjects;
