const express = require('express');
const router = express.Router();

// get the home page and redirect to books

router.get('/', (req, res, next) => {
  res.redirect('/books');
});

module.exports = router;
