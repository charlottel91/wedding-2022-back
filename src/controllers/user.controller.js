const UserService = require('../services/UserService');

module.exports = class UserController {
  static async apiCheckedIfUserExist(req, res) {
    try {
      const user = req.body.params;
      const checkedIfUsersExist = await UserService.checkedIfUserExist(user);
      if(checkedIfUsersExist) return res.status(404).json({message: 'already exist'});
    } catch(error) {
      res.status(500).json({error: error});
    }
  }

  static async apiCreateUser(req, res) {
    try {
      const value = req.body;
      let userChecked = await UserService.checkedIfUserExist(value);
      if (userChecked) {
        return res.status(409).json({
          msg: `${value.firstname.charAt(0).toUpperCase() + value.firstname.slice(1)} ${value.lastname.toUpperCase()} est déjà enregistré.e`,
          userChecked
        });
      } else {
        UserService.createUser(value);
      }
      res.json (userChecked);
    } catch(error) {
      res.status(500).json({error: error});
    }
  }
};
