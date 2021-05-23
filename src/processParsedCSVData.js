const { trim } = require('lodash');
// const { exit } = require('process');
const { UnexpectedValue } = require('./errors');

const dotPattern = /^\.+$/i;

const cols = [false,
  'author',
  false,
  'title',
  false,
  'imprint',
  false,
  'pagination',
  false,
  'isbn',
  false,
  false,
  false,
  'call_number',
  'date',
  'source',
  'cost',
  false,
  false,
  'accession_number',
  'subjects'];

const issues = {};

let totalIssues = 0;

const handleUnexpectedValue = (data, index, line) => {
  const adjacentCols = [
    index > 0 ? cols[index - 1] : null,
    index < cols.length ? cols[index + 1] : null
  ];

  if (!issues[line]) issues[line] = [];

  issues[line].push(UnexpectedValue(data[index], index, adjacentCols, line));
  totalIssues++;
};

const lineArrayToObject = (data, line) => Object.fromEntries(
  data.map((bit = '', index) => {
    if (cols[index] === undefined) {
      throw Error(`Index mistmatch on line ${line} with index ${index} having the value ${bit}`);
    }
    const value = trim(dotPattern.test(bit) ? bit.replace(/\./g, '') : bit);
    if (value.length > 0 && cols[index] === false) {
      handleUnexpectedValue(data, index, line);
      // console.log(dotPattern.test(value));
    }
    return [cols[index], value];
  })
    .filter((bit, index) => {
      if (cols[index] !== false) {
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
