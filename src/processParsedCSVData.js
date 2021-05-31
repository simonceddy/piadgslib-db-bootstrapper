const { trim } = require('lodash');
// const { exit } = require('process');
const { UnexpectedValue } = require('./errors');
const columns = require('./support/columns');

const dotPattern = /^\.+$/i;

const issues = {};

let totalIssues = 0;

const handleUnexpectedValue = (data, index, line) => {
  const adjacentCols = [
    index > 0 ? columns[index - 1] : null,
    index < columns.length ? columns[index + 1] : null
  ];

  if (!issues[line]) issues[line] = [];

  issues[line].push(UnexpectedValue(data[index], index, adjacentCols, line));
  totalIssues++;
};

const lineArrayToObject = (data, line) => Object.fromEntries(
  data.map((bit = '', index) => {
    if (columns[index] === undefined) {
      throw Error(`Index mistmatch on line ${line} with index ${index} having the value ${bit}`);
    }
    const value = trim(dotPattern.test(bit) ? bit.replace(/\./g, '') : bit);
    if (value.length > 0 && columns[index] === false) {
      handleUnexpectedValue(data, index, line);
      // console.log(dotPattern.test(value));
    }
    return [columns[index], value];
  })
    .filter((bit, index) => {
      if (columns[index] !== false) {
        return true;
      }
      return false;
    })
);

const transformLines = (lines) => lines.map((data, line) => lineArrayToObject(data, line));

const processParsedCSVData = async (data) => ({
  data: transformLines(data),
  issues: { issues, totalIssues }
});

module.exports = processParsedCSVData;
