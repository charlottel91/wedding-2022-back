const User = require('../models/User');

module.exports = class UserService {
  static async createUser(value) {
    try {
      const newUser = {
        firstname: value.firstname,
        lastname: value.lastname,
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
};
