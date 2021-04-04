const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres@localhost/OMDB', {
  logging: false,
  dialect: 'postgres'
});

module.exports = sequelize;