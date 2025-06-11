const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const Rating = sequelize.define('Rating', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  rating: DataTypes.INTEGER,
  review: DataTypes.TEXT,
});

module.exports = Rating;
