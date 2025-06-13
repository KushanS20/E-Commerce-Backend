const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  productName: DataTypes.STRING,
  category: {
    type: DataTypes.ENUM('handcraft', 'foodAndBev', 'Spices', 'Herbals','clayPots','clothings'),
    allowNull: false,
  },
  description: {
    type:DataTypes.TEXT,
    allowNull:false
  },
  price: DataTypes.DECIMAL,
  discount_available: DataTypes.BOOLEAN,
  discount_percentage: DataTypes.DECIMAL,
  primary_image_url: DataTypes.TEXT,
  images_url: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  sellerID: {
    type: DataTypes.UUID,
    allowNull: true,
  }
});

module.exports = Product;
