const Guest = require('../models/Guest');

const GuestService = {
  getGuest: async (guestId) => {
    try {
      const guest = await Guest.findById({_id: guestId});
      return guest;
    } catch (error) {
      console.log(error);
    }
  },

  getGuestWithNames: async (guest) => {
    try {
      const checkedGuest = await Guest.findOne({firstname: guest.firstname, lastname: guest.lastname});
      return checkedGuest;
    } catch (error) {
      console.log(error);
    }
  },

  createGuest: async (value) => {
    try {
      const newGuest = {
        firstname: value.firstname.toLowerCase(),
        lastname: value.lastname.toLowerCase(),
        isChild: value.isChild,
        isVegetarian: value.isVegetarian,
        presentBrunch: value.presentBrunch,
      };
      const response = await new Guest(newGuest).save();
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  UpdateGuest: async (guest) => {
    try {
      const response = await Guest.updateOne({_id: guest._id},
        {$set: {firstname: guest.firstname,
          lastname: guest.lastname,
          isChild: guest.isChild,
          isVegetarian: guest.isVegetarian,
          presentBrunch: guest.presentBrunch}} 
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  deleteGuest: async (guestId) => {
    try {
      let deleteGuest = await Guest.deleteOne({_id: guestId});
      return deleteGuest;
    } catch (error) {
      return(error);
    }
  }
};

module.exports = GuestService;
