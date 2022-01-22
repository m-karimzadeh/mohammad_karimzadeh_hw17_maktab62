const { DataTypes } = require('sequelize');
const sequelize = require("../connection");

const company = sequelize.define('company', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true
    },
    registration_number: {
        type: DataTypes.STRING,
        default: null
    },
    city: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    state: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    registration_date: {
        type: DataTypes.STRING(10),
        default: null,
    },
    phone: {
        type: DataTypes.STRING(11),
        allowNull: false
    }
}, {
    // Other model options go here
    tableName: "companies",
    timestamps: true
});


module.exports = company;