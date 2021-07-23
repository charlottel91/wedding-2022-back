const CarpoolingService = require('../services/CarpoolingService');
const UserService = require('../services/UserService');

const CarpoolingController = {
  apiCreateCarpoolingInUser: async (req, res, next) => {
    try  {
      const paramsId = req.params.id;
      const carpooling = req.body;
      if (carpooling._id) {
        await CarpoolingService.UpdateGuest(carpooling);
        const updatedUser = await UserService.getUser(paramsId);
        return next(res.status(201).json(updatedUser));
      }

      const newCarpooling = await CarpoolingService.createCarpooling(carpooling);
      const carpoolingInUser = await UserService.updateUserToCreateCarpooling(paramsId, newCarpooling._id);
      return next(res.status(201).json({carpoolingInUser}));
    } catch(error) {
      next(res.status(500).json({error: error}));
    }
  },
};

module.exports = CarpoolingController;
