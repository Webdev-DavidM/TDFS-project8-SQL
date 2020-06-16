'use strict';
const Sequelize = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
  class Books extends Sequelize.Model {}
  Books.init(
    {
      title: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: '"Title" is required',
          },
        },
      },
      author: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: '"Author" is required',
          },
        },
      },
      genre: Sequelize.STRING,
      year: Sequelize.INTEGER,
    },
    { sequelize }
  );
  return Books;
};
