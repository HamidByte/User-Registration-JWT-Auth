const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendActivationEmail } = require('../utils/email');
const { port, baseURL } = require('../config/serverConfig');

const router = express.Router();

// Resend activation link
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user in the database
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the account is already activated
    if (user.isActive) {
      return res.status(400).json({ message: 'Account is already activated.' });
    }

    // Generate a new activation token and update it in the database
    const newActivationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    user.activationToken = newActivationToken;
    user.activationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    await user.save();

    // Send the new activation email
    sendActivationEmail(user.email, newActivationToken, port, baseURL);

    res.status(200).json({ message: 'Activation link resent successfully. Please check your email for activation.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;