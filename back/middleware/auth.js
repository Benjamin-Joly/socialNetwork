const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.TOKENSECRET);
    console.log(decodedToken);
    const userId = parseInt(decodedToken.userId, 10);
      next();
  } catch (error) {
    res.status(401).send({
      err : error,
      valid : false,
      message : 'Access denied, login to continue'
    });
  }
};