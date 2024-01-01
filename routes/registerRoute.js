const express = require('express');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const User = require('../models/User');
const { sendActivationEmail } = require('../utils/email');
const { port, baseURL } = require('../config/serverConfig');

const router = express.Router();

// Registration endpoint
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    // Generate activation token and expiration date
    const activationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Save user data to the database
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      // password: await bcrypt.hash(password, 10),
      activationToken,
      activationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });

    await newUser.save();

    // Send activation email
    sendActivationEmail(newUser.email, activationToken, port, baseURL);

    res.status(201).json({ message: 'User registered successfully. Please check your email for activation.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;