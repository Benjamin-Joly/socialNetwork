const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.TOKENSECRET);
    console.log(decodedToken);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).send({
      err : error,
      valid : false,
      message : 'Access denied, login to continue'
    });
  }
};