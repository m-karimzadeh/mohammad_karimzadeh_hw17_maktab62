const { DataTypes } = require('sequelize');
const sequelize = require("../connection");
const Company = require("./company");

const employee = sequelize.define('employee', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        required: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    national_code: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    sex: {
        type: DataTypes.STRING,
        enum: ['مرد', 'زن', 'سایر'],
        default: 'مرد'
    },
    manager: {
        type: DataTypes.BOOLEAN,
        default: false
    },
    birthdate: {
        type: DataTypes.STRING(10),
    }
}, {
    // Other model options go here
    tableName: "employees",
    timestamps: true
})

Company.hasMany(employee,{
    onDelete: 'CASCADE'
});
employee.belongsTo(Company);

module.exports = employee;