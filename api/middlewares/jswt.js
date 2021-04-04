const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const token = req.body.token;
  const data = jwt.verify(token, "salvaomdb");

  if(data) {
    req.user = data;
    next()
}
};

module.exports = checkToken;
