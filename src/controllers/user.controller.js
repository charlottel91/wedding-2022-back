const UserService = require('../services/UserService');

module.exports = class UserController {
  static async apiCreateUser(req, res) {
    try {
      const value = req.body;
      const createdUsers = await value.map(user => UserService.createUser(user));
      res.json (createdUsers);
    } catch(error) {
      res.status(500).json({error: error});
    }
  }
};
