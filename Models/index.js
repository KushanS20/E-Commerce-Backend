const Sequelize = require('sequelize');
const sequelize = require('../Config/db');
const Product = require('./product');
const Seller = require('./seller');
const Rating = require('./rating');
const User = require('./user');
const Cart = require('./cart');
const Notification = require('./notification');

Seller.hasMany(Product, { foreignKey: 'sellerID' });
Product.belongsTo(Seller, { foreignKey: 'sellerID' });

Product.hasMany(Rating);
Rating.belongsTo(Product);

User.hasMany(Rating);
Rating.belongsTo(User);

Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(Notification, { foreignKey: 'userId' });
Notification.belongsTo(User, { foreignKey: 'userId' })

module.exports = {
  sequelize,
  Product,
  Seller,
  Rating,
  User,
  Cart,
  Notification
};
