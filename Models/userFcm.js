const { DataTypes } = require("sequelize");
const sequelize = require("../Config/db");

const UserFcmToken = sequelize.define('UserFcmToken', {
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  fcmToken: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  indexes: [{ unique: true, fields: ['userId'] }]
});

module.exports = UserFcmToken;
