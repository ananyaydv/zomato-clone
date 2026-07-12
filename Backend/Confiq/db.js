const Sequelize = require('sequelize');

const db = new Sequelize('zamato', 'root', 'anjya', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

 

module.exports = db;