const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Pessoa = sequelize.define('Pessoa', {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
})

module.exports = Pessoa