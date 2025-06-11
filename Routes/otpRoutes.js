const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTPAndReset } = require('../Controllers/otpController');

router.post('/send', sendOTP); 
router.post('/verify', verifyOTPAndReset);
module.exports = router;
