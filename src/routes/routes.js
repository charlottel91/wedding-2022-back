const express = require('express');
const UserController = require('../controllers/user.controller');

const router = express.Router();

router.post('/registration', UserController.apiCreateUser);

module.exports = router;