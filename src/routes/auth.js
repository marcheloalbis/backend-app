const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.registerUser);
router.get('/activate-account/:token', authController.activateAccount);
router.post('/login', authController.loginUser);
router.post('/forgot-password', authController.forgotPassword);
router.get("/reset-password/:token", authController.resetPasswordView);
router.post('/reset-password/', authController.resetPassword);
router.post('/reset-password-current/:token', authController.resetPasswordWithoutCurrent);

module.exports = router;
