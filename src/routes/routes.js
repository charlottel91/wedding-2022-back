const express = require('express');
const UserController = require('../controllers/user.controller');
const AuthController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/api/signup', AuthController.signup);
router.post('/api/signin', AuthController.signin);
router.put('/register/:id', UserController.apiCreateGuestInUser);

module.exports = router;