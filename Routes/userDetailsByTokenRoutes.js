const express = require('express')
const router = express.Router()
const protect = require('../Middleware/authMiddleware'); 
const User = require('../Models/user');


router.get('/me', protect, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = {
      id: req.user.id,
      name: `${req.user.fName} ${req.user.lName}`,
      email: req.user.email,
      mobile: req.user.mobile,
      address: {
        line: req.user.address_line,
        city: req.user.city,
        district: req.user.district,
        province: req.user.province,
        postalCode: req.user.postalCode,
      },
      sex: req.user.sex,
      birthday: req.user.birthday,
    };

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
