const express = require('express');
const AuthController = require('../controllers/auth.controller');
const UserController = require('../controllers/user.controller');

const router = express.Router();

router.post('/api/signup', AuthController.signup);
router.post('/api/signin', AuthController.signin);
router.get('/api/users', UserController.apiGetUsers);
router.get('/user/:id', UserController.apiGetOneUser);
router.put('/register/:id', UserController.apiCreateGuestInUser);
router.put('/user/:id/delete/guest', UserController.apiDeleteGuestInUser);

module.exports = router;