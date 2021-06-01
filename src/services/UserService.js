const User = require('../models/User');

module.exports = class UserService {
  static async createUser(value) {
    try {
      const newUser = {
        firstname: value.firstname.toLowerCase(),
        lastname: value.lastname.toLowerCase(),
        isChild: value.child,
        isVegetarian: value.vegetarian,
        presentBrunch: value.brunch,
      };
      const response = await new User(newUser).save();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async checkedIfUserExist(user) {
    try {
      let checkedUser = await User.findOne({ firstname: user.firstname, lastname: user.lastname });
      return checkedUser;
    } catch (error) {
      console.log(error);
    }
  }
};
