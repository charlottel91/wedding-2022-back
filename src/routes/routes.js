const express = require('express');
const GuestController = require('../controllers/guest.controller');
const AuthController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup', AuthController.signup);
router.post('/signin', AuthController.signin);
router.post('/registration', GuestController.apiCreateGuest);
router.get('/registration/:id');
router.put('/registration/:id');

module.exports = router;