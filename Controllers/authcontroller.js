const bcrypt = require('bcrypt');
const User = require('../Models/user');
const generateToken = require('../Utils/jwtUtils');

exports.register = async (req, res) => {
  try {
    const { fName, lName, email, mobile, address_line, city, district, province, postalCode, sex, birthday, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(409).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fName, lName, email, mobile, address_line, city, district, province, postalCode, sex, birthday, password: hashedPassword
    });

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        fName: user.fName,
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        fName: user.fName,
      },
      token: generateToken(user.id)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
