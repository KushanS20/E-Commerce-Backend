const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const Seller = sequelize.define('Seller', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  shopName: DataTypes.STRING,
}, {
  timestamps: true
});

module.exports = Seller;
