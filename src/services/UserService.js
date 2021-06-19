const User = require('../models/User');

module.exports = class UserService {
  static async getUser(paramsId) {
    try {
      const response = await User.findById({_id: paramsId});
      return response;
    } catch(err) {
      console.log(err);
    }
  }

  static async updateUser(paramsId, guestId) {
    try {
      const response = await User.updateOne(
        {_id: paramsId}, 
        {$push: {guests: [guestId]}},
        {new : true}
      );
      return response;
    } catch(err) {
      console.error(err.message);
    }
  }
};
