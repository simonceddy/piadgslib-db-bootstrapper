/* eslint-disable no-unused-vars */
const knex = require('knex');
const fs = require('fs');
const config = require('./config');
const parseCSVFile = require('./src/parseCSVFile');
const handleResult = require('./src/handleResult');
const saveAsJson = require('./src/persistance/saveAsJson');

const currentCsv = 'Book master - Simon (26 May 2021)';

const db = knex(config);

const catalogue = fs.createReadStream(`storage/${currentCsv}.csv`);

parseCSVFile(catalogue, (result) => {
  const handled = handleResult(result, (data) => saveAsJson(data));
  // console.log(handled);
});

// console.log(db);
// TODO
// create jsonable data structure
// should authors be a single string defaulting to surname?
