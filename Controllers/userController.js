const bcrypt = require('bcrypt');
const User = require('../Models/user');
const generateToken = require('../Utils/jwtUtils');

exports.getSignedUserDetails = async(req,res) => {
  const userId = req.user.id; 
  const user = await User.findByPk(userId, {
     attributes: ['id', 'fName', 'lName', 'email', 'mobile', 'createdAt']
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(user);
}