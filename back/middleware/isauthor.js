const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const decodedToken = jwt.verify(token, process.env.TOKENSECRET);
      const userId = decodedToken.userId;
      const author = parseInt(req.body.messageAuthor, 10);
      console.log(author);
      if (author === userId) {
        next();
      } else {
        throw 'Invalid user ID';
      }
    } catch {
      res.status(401).send('Access denied, login to continue' + '__' + false);
    }
  };