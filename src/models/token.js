const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function generateToken(payload) {
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
}

function verifyToken(token) {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
}

module.exports = {
  generateToken,
  verifyToken,
};
