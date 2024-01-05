const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/auth');

// Import individual route modules
const indexRoute = require('./indexRoute');
const registerRoute = require('./registerRoute');
const activationRoute = require('./activationRoute');
const resendActivationRoute = require('./resendActivationRoute');
const loginRoute = require('./loginRoute');
const forgetPasswordRoute = require('./forgetPasswordRoute');
const resetPasswordRoute = require('./resetPasswordRoute');
const profileRoute = require('./profileRoute');

// Use the individual route modules
router.use('/', indexRoute);
router.use('/register', registerRoute);
router.get('/activate/:token', activationRoute);
router.use('/resend-activation', resendActivationRoute);
router.use('/login', loginRoute);
router.use('/forget-password', forgetPasswordRoute);
router.post('/reset-password/:token', resetPasswordRoute);
router.use('/profile', verifyToken, profileRoute);

// Catch-all route for 404 errors
router.use((req, res) => {
  res.status(404).json({ message: 'Page not found' });
});

module.exports = router;