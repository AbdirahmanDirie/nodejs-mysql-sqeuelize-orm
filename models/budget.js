const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');


const Budget = sequelize.define('Budget', {
  user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM,
    values: ['income', 'expense'],
    allowNull: false
  },
  

});


module.exports = Budget;
