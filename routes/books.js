const express = require('express');
const router = express.Router();

// Import the book model, destructuring from the index.js file which gives me access to the sequelize methods and the Books model

const { Books } = require('../models/index');

// As books is the home route there is no need to put books in the
// path //

/* Handler function to wrap each route. */
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

// Book route showing the list of books by rendering a index.pug page
// and passing the book model with all books in it to pug to iterate over

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const books = await Books.findAll();
    res.render('books/index', { books });
  })
);

// Book route to create a new book

router.get('/new', (req, res, next) => {
  res.render('books/new-book');
});

// Book route to show an individual book and update

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const book = await Books.findByPk(req.params.id);
    if (book) {
      res.render('books/update-book', { book });
    } else {
      res.render('books/page-not-found');
    }
  })
);

// Post route to add a new book to the database

router.post(
  '/new',
  asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Books.create(req.body);
      res.redirect('/');
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        // The line below will build sections of the form already filled in by the user so they can remain populated.
        book = await Books.build(req.body);
        res.render('books/error', { book, errors: error.errors });
      } else {
        throw error;
      }
    }
  })
);

// Post route to update a book on the database, route tested on the
// postman app //

router.post(
  '/:id',
  asyncHandler(async (req, res) => {
    const book = await Books.findByPk(req.params.id);
    await book.update(req.body);
    res.redirect(`/`);
  })
);

// post route to delete a book on the database, route tested on the postman ap
router.post(
  '/:id/delete',
  asyncHandler(async (req, res) => {
    console.log('hello', req.params.id);
    const book = await Books.findByPk(req.params.id);
    await book.destroy();
    res.redirect(`/`);
  })
);

module.exports = router;
