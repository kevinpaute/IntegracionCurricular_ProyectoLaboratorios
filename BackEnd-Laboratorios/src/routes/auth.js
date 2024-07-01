const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');

router.post('/login', (req, res) => authController.login(req, res));

module.exports = router;
