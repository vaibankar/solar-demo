require('dotenv').config();
module.exports = {
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://mongo-svc:27017/solarapp',
  JWT_SECRET: process.env.JWT_SECRET || 'verysecret',
};
