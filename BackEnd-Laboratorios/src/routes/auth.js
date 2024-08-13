const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');

router.post('/login', (req, res) => authController.login(req, res));
router.post('/forgot-password', (req, res) => authController.forgotPassword(req, res));
router.post('/reset-password', (req, res) => authController.resetPassword(req, res));

module.exports = router;
