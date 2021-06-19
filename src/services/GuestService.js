const Guest = require('../models/Guest');

module.exports = class GuestService {
  static async createGuest(value) {
    try {
      const newGuest = {
        firstname: value.firstname.toLowerCase(),
        lastname: value.lastname.toLowerCase(),
        isChild: value.child,
        isVegetarian: value.vegetarian,
        presentBrunch: value.brunch,
      };
      const response = await new Guest(newGuest).save();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async checkedIfGuestExist(guest) {
    try {
      let checkedGuest = await Guest.findOne({ firstname: guest.firstname, lastname: guest.lastname });
      return checkedGuest;
    } catch (error) {
      return(error);
    }
  }

  static async deleteGuest(guestId) {
    try {
      let deleteGuest = await Guest.deleteOne({_id: guestId});
      return deleteGuest;
    } catch (error) {
      return(error);
    }
  }
};
