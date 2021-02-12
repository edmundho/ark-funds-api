const express = require('express')
const app = express()
const port = 3000

const parser = require('csv-parser')
const request = require('request');

const ARKQ = 'https://ark-funds.com/wp-content/fundsiteliterature/csv/ARK_AUTONOMOUS_TECHNOLOGY_&_ROBOTICS_ETF_ARKQ_HOLDINGS.csv';
const ARKW = 'https://ark-funds.com/wp-content/fundsiteliterature/csv/ARK_NEXT_GENERATION_INTERNET_ETF_ARKW_HOLDINGS.csv';
const ARKK = 'https://ark-funds.com/wp-content/fundsiteliterature/csv/ARK_INNOVATION_ETF_ARKK_HOLDINGS.csv';
const ARKF = 'https://ark-funds.com/wp-content/fundsiteliterature/csv/ARK_FINTECH_INNOVATION_ETF_ARKF_HOLDINGS.csv';
const ARKG = 'https://ark-funds.com/wp-content/fundsiteliterature/csv/ARK_GENOMIC_REVOLUTION_MULTISECTOR_ETF_ARKG_HOLDINGS.csv';

function createCsvStream(url) {
  return request.get(url).on('error', err => console.log(`Error: ${err}`));
}

function sendJsonPayloadFromCsvStream(stream, res) {
  const output = [];

  stream.pipe(parser())
  .on('data', row => output.push(row))
  .on('end', () => res.send(output))
}

app.get('/funds/arkw', (req, res) => {
  const stream = createCsvStream(ARKW);

  sendJsonPayloadFromCsvStream(stream, res);
})

app.get('/funds/arkk', (req, res) => {
  const stream = createCsvStream(ARKK);

  sendJsonPayloadFromCsvStream(stream, res);
})

app.get('/funds/arkg', (req, res) => {
  const stream = createCsvStream(ARKG);

  sendJsonPayloadFromCsvStream(stream, res);
})

app.get('/funds/arkq', (req, res) => {
  const stream = createCsvStream(ARKQ);

  sendJsonPayloadFromCsvStream(stream, res);
})

app.get('/funds/arkf', (req, res) => {
  const stream = createCsvStream(ARKF);

  sendJsonPayloadFromCsvStream(stream, res);
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
