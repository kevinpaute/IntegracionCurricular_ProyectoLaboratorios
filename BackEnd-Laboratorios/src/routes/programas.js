const express = require('express');
const router = express.Router();
const apiController = require('../controller/api_programas.controller');

// Ruta para importar todos los datos
router.post('/import-all-data', apiController.importAllData);

module.exports = router;
