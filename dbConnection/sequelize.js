const { Sequelize, DataTypes } = require('sequelize');
require("dotenv").config();
const sequelize = new Sequelize(process.env.database, process.env.User, process.env.password, {
  host: process.env.host,
  dialect: 'mysql'
});

const Employee = sequelize.define('Employee', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  Role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Department: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Salary: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('Employee table synced');
  })
  .catch(err => {
    console.error('Error syncing Employee table:', err);
  });


module.exports = Employee;