const GuestService = require('../services/GuestService');
const UserService = require('../services/UserService');

module.exports = class GuestController {
  static async apiCheckedIfGuestExist(req, res) {
    try {
      const guest = req.body.params;
      console.log(guest);
      const checkedIfUsersExist = await GuestService.checkedIfGuestExist(guest);
      if(checkedIfUsersExist) return res.status(404).json({message: 'already exist'});
    } catch(error) {
      res.status(500).json({error: error});
    }
  }

  static async apiCreateGuestInUser(req, res) {
    try {
      const value = req.body;
      const paramsId = req.params.id;
      console.log(value, paramsId);
      let userChecked = await GuestService.checkedIfGuestExist(value);
      if (userChecked) {
        return res.status(409).json({
          msg: `${value.firstname.charAt(0).toUpperCase() + value.firstname.slice(1)} ${value.lastname.toUpperCase()} est déjà enregistré.e`,
          userChecked
        });
      } else {
        UserService.createGuest(paramsId, value);
      }
      res.json (userChecked);
    } catch(error) {
      res.status(500).json({error: error});
    }
  }
};
