const GuestService = require('../services/GuestService');
const UserService = require('../services/UserService');

const UserController = {
  apiGetOneUser: async (req, res, next) => {
    try {
      const paramsId = req.params.id;
      const user = await UserService.getUser(paramsId);
      return res.status(200).json(user);
    } catch(err) {
      next(res.status(500).json({error: err}));
    }
  },

  apiCreateGuestInUser: async (req, res, next) => {
    try {
      const guest = req.body;
      const paramsId = req.params.id;
      if (guest._id) {
        await GuestService.UpdateGuest(guest);
        const updatedUser = await UserService.getUser(paramsId);
        return next(res.status(201).json(updatedUser));
      }

      const checkedIfGuestExistInGuest = await GuestService.getGuestWithNames(guest);
      if (checkedIfGuestExistInGuest) {
        const checkedIfGuestIsAlreadyRegisterInUser = await UserService.checkedIfGuestExistinUser(checkedIfGuestExistInGuest._id);
        if (checkedIfGuestIsAlreadyRegisterInUser) {
          return next(res.status(409).json(`${guest.firstname.charAt(0).toUpperCase() + guest.firstname.slice(1)} ${guest.lastname.charAt(0).toUpperCase() + guest.lastname.slice(1)} est déjà enregistré.e`));
        }
      }

      const createdGuest = await GuestService.createGuest(guest);
      const updatedUser = await UserService.updateUserToCreatedGuest(paramsId, createdGuest._id);
      return next(res.status(200).json(updatedUser));
    } catch(err) {
      next(res.status(500).json('Une erreur est survenue.'));
    }
  },

  apiDeleteGuestInUser: async (req, res, next) => {
    try {
      const guest = req.body;
      const paramsId = req.params.id;
      await GuestService.deleteGuest(guest._id);
      await UserService.updateUserToDeletedGuest(paramsId, guest._id);
      const user = await UserService.getUser(paramsId);
      return res.status(200).json(user);
    } catch(err) {
      next(res.status(500).json('Une erreur est survenue.'));
    }
  }
};

module.exports = UserController;
