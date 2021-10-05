const User = require('../models/User');
const bcrypt = require('bcrypt');
const {
  createJWT,
} = require('../utils/auth');
const { getExistingUser, getUserByName } = require('../services/UserService');

const AuthController = {
  signup: (req, res) => {
    let { name, password, password_confirmation, role } = req.body;
    let errors = [];
    if (!name) {
      errors.push({ name: 'required' });
    }
    if (!password) {
      errors.push({ password: 'required' });
    }
    if (!password_confirmation) {
      errors.push({
        password_confirmation: 'required',
      });
    }
    if (password != password_confirmation) {
      errors.push({ password: 'mismatch' });
    }
    if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
    }
    User.findOne({name: name})
      .then(user=>{
        if(user){
          return res.status(422).json({ errors: [{ user: 'name already exists' }] });
        }else {
          const user = new User({
            name: name,
            password: password,
            role: role
          });
          bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {
            if (err) throw err;
            user.password = hash;
            user.save()
              .then(response => {
                res.status(200).json({
                  success: true,
                  result: response
                });
              })
              .catch(err => {
                res.status(500).json({
                  errors: [{ error: err }]
                });
              });
          });
          });
        }
      }).catch(err =>{
        res.status(500).json({
          err,
          errors: [{ error: 'Something went wrong' }]
        });
      });
  },
  
  signin: async (req, res, next) => {
    let { name, password } = req.body;

    if (!name || !password) {
      return next(res.status(404).json('L\'identifiant et le mot de passe sont requis.'));
    }
    try {
      const user = await getExistingUser(name);
      if(!user) return next(res.status(403).json('Ce compte n\'existe pas.'));

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return next(res.status(401).json('L\'identifiant et/ou le mot de passe ne sont pas corrects.'));
      }

      const userWithoutPassword = await getUserByName(name);
      const token = createJWT(userWithoutPassword, '1h');
      return res.status(200).json({
        succes: true,
        token,
      });
    } catch (err) {
      res.status(500).json('Une erreur est survenue.');
    }
  }
};

module.exports = AuthController;
