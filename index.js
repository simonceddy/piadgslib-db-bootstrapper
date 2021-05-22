/* eslint-disable no-unused-vars */
const knex = require('knex');
const fs = require('fs');
const Papa = require('papaparse');
const config = require('./config');

const db = knex(config);

// console.log(fs.readdirSync('storage'));
const catalogue = fs.createReadStream('storage/catalogue - master (15 October 2019).csv');

// const event = {
//   reply: (...args) => console.log(...args)
// };

const cols = ['',
  'author',
  '',
  'title',
  '.',
  'imprint',
  '.',
  'pagination',
  '.',
  'isbn',
  '',
  '...............',
  '',
  'call_number',
  'date',
  'source',
  'cost',
  '........',
  '',
  'accession_number',
  'subjects'];

const errors = [];

const lineArrayToObject = (data, line) => Object.fromEntries(
  data.map((bit, index) => {
    if (cols[index] === undefined) {
      errors.push(Error(`Index mistmatch on line ${line} with index ${index} having the value ${bit}`));
    }
    return [cols[index], bit];
  })
);

const transformLines = (lines) => lines.map((data, line) => lineArrayToObject(data, line));

const processData = async (data) => transformLines(data);

Papa.parse(catalogue, {
  complete: (results) => {
    processData(results.data)
      .then((data) => {
        console.log(data[1]);
        console.log(errors.length);
      });
  }
});

// TODO
// convert CSV data into lines, than arrays/objects
// create jsonable data structure

// TODO
// add migration data
