const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.TOKENSECRET);
      decodedToken.admin === true ?  next() : res.status(401).send({
        valid : false,
        admin : false,
        message : 'Not admin'
      });
     

  } catch (error) {
    res.status(401).send({
      err : error,
      valid : false,
      admin : false,
      message : 'Access denied, login to continue'
    });
  }
};