const express = require('express');
const router = express.Router();
const protect = require('../Middleware/authMiddleware');

router.get('/profile', protect, (req, res) => {
  const user = req.user;
  res.json({
    id: user.id,
    name: `${user.fName} ${user.lName}`,
    email: user.email,
  });
});

module.exports = router;
