/* eslint-disable no-unused-vars */
const knex = require('knex');
const fs = require('fs');
const config = require('./config');
const parseCSVFile = require('./src/parseCSVFile');
const handleResult = require('./src/handleResult');

const db = knex(config);

const catalogue = fs.createReadStream('storage/catalogue - master (15 October 2019).csv');

parseCSVFile(catalogue, handleResult);

// console.log(db);
// TODO
// create jsonable data structure
// should authors be a single string defaulting to surname?
