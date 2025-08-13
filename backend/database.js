const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pessoas', 'root', '1234567', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize