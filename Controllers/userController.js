const bcrypt = require('bcrypt');
const User = require('../Models/user');
const generateToken = require('../Utils/jwtUtils');

exports.getSignedUserDetails = async(req,res) => {
  try{
    const userId = req.user.id; 
    const user = await User.findByPk(userId, {
        attributes: ['id', 'fName', 'lName', 'email', 'mobile', 'createdAt']
    });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

  res.status(200).json(user);
  }
  catch(error){
    return res.status(404).json({
        status : "Error",
        message : error.message
    })
  }
}

exports.updateSignedUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fName, lName, email, mobile } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.fName = fName || user.fName;
    user.lName = lName || user.lName;
    user.email = email || user.email;
    user.mobile = mobile || user.mobile;

    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};


exports.changePassword = async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  const user = await User.findByPk(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Incorrect current password' });

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  await user.save();

  res.status(200).json({ message: 'Password changed successfully' });
};