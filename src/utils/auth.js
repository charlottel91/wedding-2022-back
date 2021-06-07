const jwt = require('jsonwebtoken');

exports.createJWT = (name, userId, duration) => {
  const payload = {
    name,
    userId,
    duration
  };
  const token = jwt.sign(Object.assign({}, payload), 'your_jwt_secret', {
    expiresIn: duration,
  });
  return token;
};