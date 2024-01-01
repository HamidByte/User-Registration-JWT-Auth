const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // jwt.verify(token, process.env.JWT_SECRET, { algorithm: 'HS256' }, (err, decoded) => {
  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, { algorithms: ['HS256'] }, (err, decoded) => {
    if (err) {

      return res.status(401).json({ message: 'Invalid token' });
    }

    req.userId = decoded.userId;
    next();
  });
};

module.exports = { verifyToken };