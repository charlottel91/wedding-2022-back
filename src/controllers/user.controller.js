const User = require('../models/User');
const GuestService = require('../services/GuestService');
const UserService = require('../services/UserService');

module.exports = class UserController {
  static async apiCreateGuestInUser(req, res) {
    try {
      const value = req.body;
      const paramsId = req.params.id;
      const user = await await UserService.getUser(paramsId);
      console.log(user.guests);
      if (user.guests.length > 0) {
        //delete guest eand delete 
        user.guests.map(guest => GuestService.deleteGuest(guest));
        const deleteGuest = await User.update({_id: paramsId}, {$set: {guests: []}});
        console.log(deleteGuest);
      }
      let guestChecked = await GuestService.checkedIfGuestExist(value);
      if (guestChecked) {
        return res.status(409).json({
          msg: `${value.firstname.charAt(0).toUpperCase() + value.firstname.slice(1)} ${value.lastname.toUpperCase()} est déjà enregistré.e`,
          guestChecked
        });
      } else {
        const createdGuest = await GuestService.createGuest(value);
        const updatedUser = await UserService.updateUser(paramsId, createdGuest._id);
        return res.status(200).json(updatedUser);
      }
    } catch(error) {
      res.status(500).json({error: error});
    }
  }};