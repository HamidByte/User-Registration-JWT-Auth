module.exports = {
  service: 'gmail',
  auth: {
    user: '', // Update with your Gmail email
    pass: '', // Update with your Gmail password or Google app password
  },
  activationEmail: {
    from: '',
    subject: 'Activate Your Account',
    text: (activationLink) => `Click on the following link to activate your account: ${activationLink}`,
  },
  resetPassword: {
    from: '',
    subject: 'Reset Your Password',
    text: (resetLink) => `Click on the following link to reset your password: ${resetLink}`,
  },
};