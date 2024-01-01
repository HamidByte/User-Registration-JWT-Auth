require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  baseURL: process.env.BASE_URL || 'http://localhost',
};