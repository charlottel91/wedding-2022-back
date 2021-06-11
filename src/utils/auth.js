const jwt = require('jsonwebtoken');

exports.createJWT = (name, userId, duration) => {
  const payload = {
    name,
    userId,
    duration
  };
  const token = jwt.sign(Object.assign({}, payload), process.env.JWT_SECRET_KEY, {
    expiresIn: duration,
  });
  return token;
};