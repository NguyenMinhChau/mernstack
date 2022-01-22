const express = require('express');
const router = express.Router();
const checkCurrentUser = require('../middlewares/checkCurrentUser');
const UserController = require('../controllers/UserController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/', checkCurrentUser, UserController.getCurentUser);

module.exports = router;