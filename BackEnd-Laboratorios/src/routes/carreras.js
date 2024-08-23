const express = require('express');
const router = express.Router();
const carreraController = require('../controller/carreras.controller');

router.get('/carreras', carreraController.getAll);
router.get('/carreras/:id', carreraController.getById);

module.exports = router;
