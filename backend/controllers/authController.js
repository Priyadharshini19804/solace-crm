const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
const register = async (req, res) => {
  const { full_name, email, mobile, password } = req.body;

  if (!full_name || !email || !mobile || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO users (full_name, email, mobile, password) VALUES (?, ?, ?, ?)',
      [full_name, email, mobile, hashedPassword]
    );

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      user: { id: user.id, name: user.full_name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

module.exports = { register, login, logout };