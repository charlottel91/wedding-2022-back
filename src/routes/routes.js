const express = require('express');
const GuestController = require('../controllers/guest.controller');

const router = express.Router();

router.post('/registration', GuestController.apiCreateGuest);

module.exports = router;