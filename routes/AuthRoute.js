const express = require('express');
const router = express.Router();
const LoginController = require('../controller/AuthController.js');
const UserController = require('../controller/UserController.js');


router.post("/login",LoginController.login);
router.post("/register",LoginController.register);

module.exports = router;