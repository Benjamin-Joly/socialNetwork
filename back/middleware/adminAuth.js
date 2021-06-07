const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log('admin token ', token);
    const decodedToken = jwt.verify(token, process.env.TOKENSECRET);
    console.log('admin token ', decodedToken);
      next();

  } catch (error) {
    res.status(401).send({
      err : error,
      valid : false,
      admin : false,
      message : 'Access denied, login to continue'
    });
  }
};