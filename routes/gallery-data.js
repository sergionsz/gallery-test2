const express = require('express');
const fs = require('fs');
// const JS = require('JSONStream');
const router = express.Router();
const dataFile = './data.json';

/* GET gallery JSON data. */
router.get('/', (req, res) => {
  const logger = req.app.get('logger');
  const dataRS = fs.createReadStream(dataFile);
  res.set('Content-Type', 'application/json');
  // const parser = JS.parse('*');
  dataRS.on('open', () => dataRS.pipe(res));
  dataRS.on('error', err => logger.error(err));
});

module.exports = router;
