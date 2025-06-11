const Sequelize = require('sequelize');
const sequelize = require('../Config/db');
const Product = require('./product');
const Seller = require('./seller');
const Rating = require('./rating');
const User = require('./user');

Seller.hasMany(Product, { foreignKey: 'sellerID' });
Product.belongsTo(Seller, { foreignKey: 'sellerID' });

Product.hasMany(Rating);
Rating.belongsTo(Product);

User.hasMany(Rating);
Rating.belongsTo(User);

module.exports = {
  sequelize,
  Product,
  Seller,
  Rating,
  User
};
