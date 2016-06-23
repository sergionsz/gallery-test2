const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Intel 2013 Conference Moments' });
});

module.exports = router;
