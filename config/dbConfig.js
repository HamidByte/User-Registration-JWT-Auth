require('dotenv').config();

const { MONGO_URI_DEV, MONGO_URI_PROD } = process.env;

module.exports = {
  mongoURI:
  process.env.NODE_ENV === 'development'
    ? MONGO_URI_DEV
    : process.env.NODE_ENV === 'production'
    ? MONGO_URI_PROD
    : MONGO_URI_DEV,
};