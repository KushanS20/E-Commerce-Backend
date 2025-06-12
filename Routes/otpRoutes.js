const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTP,resetPassword } = require('../Controllers/otpController');

router.post('/send', sendOTP); 
router.post('/verify', verifyOTP);
router.post('/reset-password', resetPassword);
module.exports = router;
