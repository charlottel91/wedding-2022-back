const User = require('../models/User');

const UserService = {
  getUserByName: async (name) => {
    try {
      const response = await User.findOne({name}).populate('guests');
      return response;
    } catch(err) {
      console.log(err);
    }
  },

  getUser: async (id) => {
    try {
      const response = await User.findById(id).populate('guests');
      return response;
    } catch(err) {
      console.log(err);
    }
  },

  getExistingUser: async (name) => {
    try {
      const response = await User.findOne({name}).select('+password');
      return response;
    } catch(err) {
      console.log(err);
    }
  },

  checkedIfGuestExistinUser: async (id) => {
    try {
      let checkedGuest = await User.find({'guests': id});
      return checkedGuest;
    } catch (error) {
      return(error);
    }
  },

  updateUserToCreatedGuest: async (paramsId, guestId) => {
    try {
      await User.updateOne(
        {_id: paramsId}, 
        {$push: {guests: [guestId]}},
        {new : true}
      );
      const updatedUser = await User.findById(paramsId).populate('guests');
      return updatedUser;
    } catch(err) {
      console.error(err.message);
    }
  },

  updateUserToDeletedGuest: async (paramsId, guestId) => {
    try {
      const response = await User.updateOne(
        {_id: paramsId}, 
        {$pull: {guests: { $in: [guestId] }}},
      );
      return response;
    } catch(err) {
      console.error(err.message);
    }
  },

  updateUserToCreateCarpooling: async (paramsId, carpoolingId) => {
    try {
      await User.updateOne(
        {_id: paramsId}, 
<<<<<<< HEAD
        {$push: {isCarpooling: [carpoolingId]}},
        {new : true},
      );
      const updatedUser = await User.findById(paramsId).populate('guests').populate('isCarpooling').exec();
=======
        {$push: {carpooling: [carpoolingId]}},
        {new : true}
      );
      const updatedUser = await User.findById(paramsId).populate('guests', 'carpooling');
>>>>>>> 64e32e4 (Add and modify carpooling.)
      return updatedUser;
    } catch(err) {
      console.error(err.message);
    }
  }
};

module.exports = UserService;
