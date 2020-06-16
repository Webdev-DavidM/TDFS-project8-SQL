const express = require('express');
const app = express();
const path = require('path');

// const sequelize = require('sequelize');

// Importing in the files required, I have not put the full path for
// the index as it be found and used as default.

const books = require('./routes/books');
const routes = require('./routes');

// the next two lines are the express built in replacement for the bodyparser //

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Loading the static files to use in the app which in this
// case is just the css file.

app.use(express.static('public'));

// Here I am setting up the view engine as pug

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Global error handling

// I am getting the routes for the project below, there is no
// route explicitly put for the index route as it will be found
// by default as it is the index

app.use(routes);
app.use('/books', books);

// Error handing for non-existent routes, the first function creates an error object and the second function renders the page

const errorObject = (req, res, next) => {
  const err = new Error('err');
  err.status = 404;
  next(err);
};

const handleErrors = (err, req, res, next) => {
  res.render('books/page-not-found');
};

// I am using the error handling function so that it will available if there is no error with the routes and it will display the pug template

app.use(errorObject);
app.use(handleErrors);

app.listen(3000);
