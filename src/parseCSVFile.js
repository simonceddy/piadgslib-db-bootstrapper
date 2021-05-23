const Papa = require('papaparse');
const processSubjects = require('./processors/processSubjects');
const processParsedCSVData = require('./processParsedCSVData');

/**
 * @param {fs.ReadStream} csvFile
 * 
 * @returns {object { data: {array}, issues: {object} }}
 */
const parseCSVFile = async (csvFile, onComplete = () => null) => Papa.parse(csvFile, {
  complete: (results) => processParsedCSVData(results.data)
    .then(({ data, issues }) => {
      const processed = data.map((result = {}, index) => ({
        ...result,
        id: index,
        subjects: result.subjects ? processSubjects(result.subjects) : []
      }));
      return onComplete({ data: processed, issues });
    })
});

module.exports = parseCSVFile;
