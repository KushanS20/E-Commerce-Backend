const User = require('../Models/user');
const Otp = require('../Models/OTP');
const generateOTP = require('../Utils/generateOTP');
const sendEmail = require('../Utils/sendEmail');
const bcrypt = require('bcryptjs');

exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await Otp.create({ email, otp, expiresAt });

  const emailContent = `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`;
  await sendEmail(email, 'Password Reset OTP', emailContent);

  res.status(200).json({ message: 'OTP sent to email' });
};

exports.verifyOTPAndReset = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const otpEntry = await Otp.findOne({ where: { email, otp } });
  if (!otpEntry || otpEntry.expiresAt < new Date()) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.update({ password: hashedPassword }, { where: { email } });

  await Otp.destroy({ where: { email } });

  res.status(200).json({ message: 'Password reset successful' });
};
