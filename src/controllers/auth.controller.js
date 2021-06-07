const User = require('../models/User');
const bcrypt = require('bcrypt');
const {
  createJWT,
} = require('../utils/auth');

module.exports = class UserController {
  static signup (req, res) {
    let { name, password, password_confirmation } = req.body;
    console.log(req.body);
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
  }
  
  static signin (req, res) {
    let { name, password } = req.body;
    let errors = [];
    if (!name) {
      errors.push({ name: 'required' });
    }
    if (!password) {
      errors.push({ password: 'required' });
    }
    if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
    }
    User.findOne({ name: name }).then(user => {
      if (!user) {
        return res.status(404).json({
          errors: [{ user: 'not found' }],
        });
      } else {
        bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return res.status(400).json({ errors: [{ password: 'incorrect' }] 
            });
          } else {
            let access_token = createJWT(
              user.name,
              user._id,
              3600
            );
            return res.status(200).json({
              success: true,
              token: access_token,
              user: user
            });
          }
        }).catch(err => {
          res.status(500).json({ errors: err});
        });
      }
    }).catch(err => {
      res.status(500).json({ errors: err });
    });
  }
};