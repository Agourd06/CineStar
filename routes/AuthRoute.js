const express = require('express');
const router = express.Router();
const AuthController = require('../controller/AuthController.js');


router.post("/login",AuthController.login);
router.post("/register",AuthController.register);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password/:token', AuthController.resetPasswordHandler);


module.exports = router;