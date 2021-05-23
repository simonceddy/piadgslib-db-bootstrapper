const splitPattern = /\s&\s/i;

const processAuthors = (authors = '') => authors.split(splitPattern);

module.exports = processAuthors;
