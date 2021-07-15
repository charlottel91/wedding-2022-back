const GuestService = require('../services/GuestService');
const UserService = require('../services/UserService');

const GuestController = {
  apiCheckedIfGuestExist: async (req, res, next) => {
    try {
      const guest = req.body.params;
      const checkedIfUsersExist = await GuestService.checkedIfGuestExist(guest);
      if(checkedIfUsersExist) return res.status(404).json({message: 'already exist'});
    } catch(error) {
      next(res.status(500).json({error: error}));
    }
  },

  apiCreateGuestInUser: async (req, res, next) => {
    try {
      const value = req.body;
      const paramsId = req.params.id;
      let userChecked = await GuestService.checkedIfGuestExist(value);
      if (userChecked) {
        return next(res.status(409).json({
          msg: `${value.firstname.charAt(0).toUpperCase() + value.firstname.slice(1)} ${value.lastname.toUpperCase()} est déjà enregistré.e`,
          userChecked
        }));
      } else {
        UserService.createGuest(paramsId, value);
      }
      res.json (userChecked);
    } catch(error) {
      next(res.status(500).json({error: error}));
    }
  }
};

module.exports = GuestController;
