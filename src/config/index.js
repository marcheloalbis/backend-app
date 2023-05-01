require('dotenv').config();

const config = {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  jwtSecret: process.env.JWT_SECRET,
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD,
};

module.exports = config;
