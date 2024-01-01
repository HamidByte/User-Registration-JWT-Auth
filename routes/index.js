const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/auth');

// Import individual route modules
const indexRoute = require('./indexRoute');
const registerRoute = require('./registerRoute');
const activationRoute = require('./activationRoute');
const resendActivationRoute = require('./resendActivationRoute');
const loginRoute = require('./loginRoute');
const profileRoute = require('./profileRoute');

// Use the individual route modules
router.use('/', indexRoute);
router.use('/register', registerRoute);
router.get('/activate/:token', activationRoute);
router.use('/resend-activation', resendActivationRoute);
router.use('/login', loginRoute);
router.use('/profile', verifyToken, profileRoute);

module.exports = router;