const jwt = require('jsonwebtoken');

exports.createJWT = (user, duration) => {
  const payload = {
    user,
    duration
  };
  const token = jwt.sign(Object.assign({}, payload), process.env.JWT_SECRET_KEY, {
    expiresIn: duration,
  });
  return token;
};