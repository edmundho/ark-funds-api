'use strict';

// eslint-disable-next-line import/no-unresolved
const express = require('express');

const app = express();

const parser = require('csv-parser')
const request = require('request');

const funds = [
  { symbol: 'ARKQ', url: 'https://ark-funds.com/wp-content/fundsiteliterature/csv/ARK_AUTONOMOUS_TECHNOLOGY_&_ROBOTICS_ETF_ARKQ_HOLDINGS.csv' },
  { symbol: 'ARKW', url: 'https://ark-funds.com/wp-content/fundsiteliterature/csv/ARK_NEXT_GENERATION_INTERNET_ETF_ARKW_HOLDINGS.csv' },
  { symbol: 'ARKK', url: 'https://ark-funds.com/wp-content/fundsiteliterature/csv/ARK_INNOVATION_ETF_ARKK_HOLDINGS.csv' },
  { symbol: 'ARKF', url: 'https://ark-funds.com/wp-content/fundsiteliterature/csv/ARK_FINTECH_INNOVATION_ETF_ARKF_HOLDINGS.csv' },
  { symbol: 'ARKG', url: 'https://ark-funds.com/wp-content/fundsiteliterature/csv/ARK_GENOMIC_REVOLUTION_MULTISECTOR_ETF_ARKG_HOLDINGS.csv' },
];

function createCsvStream(url) {
  return request.get(url).on('error', err => console.log(`Error: ${err}`));
}

function sendJsonPayloadFromCsvStream(stream, res) {
  const output = [];

  stream.pipe(parser())
  .on('data', row => output.push(row))
  .on('end', () => res.send(output))
}

funds.forEach(fund => {
  app.get(`/funds/${fund.symbol.toLowerCase()}`, (req, res) => {
    const stream = createCsvStream(fund.url);

    sendJsonPayloadFromCsvStream(stream, res);
  })
})


// Error handler
app.use((err, req, res) => {
  console.error(err);
  res.status(500).send('Internal Serverless Error');
});

module.exports = app;
