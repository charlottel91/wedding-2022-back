const jwt = require('jsonwebtoken');

exports.createJWT = (name, userId, duration) => {
  console.log(name, userId, duration, 'ici je  suis');
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