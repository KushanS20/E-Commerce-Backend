const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  fName: DataTypes.STRING,
  lName: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  mobile: DataTypes.STRING,
  address_line: DataTypes.STRING,
  city: DataTypes.STRING,
  district: DataTypes.STRING,
  province: DataTypes.STRING,
  postalCode: DataTypes.STRING,
  sex: DataTypes.STRING,
  birthday: DataTypes.DATEONLY,
  password: DataTypes.STRING,
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: false
});

module.exports = User;
