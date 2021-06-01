const UserService = require('../services/GuestService');

module.exports = class GuestController {
  static async apiCheckedIfUserExist(req, res) {
    try {
      const user = req.body.params;
      const checkedIfUsersExist = await UserService.checkedIfUserExist(user);
      if(checkedIfUsersExist) return res.status(404).json({message: 'already exist'});
    } catch(error) {
      res.status(500).json({error: error});
    }
  }

  static async apiCreateGuest(req, res) {
    try {
      const value = req.body;
      let userChecked = await UserService.checkedIfGuestExist(value);
      if (userChecked) {
        return res.status(409).json({
          msg: `${value.firstname.charAt(0).toUpperCase() + value.firstname.slice(1)} ${value.lastname.toUpperCase()} est déjà enregistré.e`,
          userChecked
        });
      } else {
        UserService.createGuest(value);
      }
      res.json (userChecked);
    } catch(error) {
      res.status(500).json({error: error});
    }
  }
};
