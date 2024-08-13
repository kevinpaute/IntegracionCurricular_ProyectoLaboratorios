const express = require('express');
const router = express.Router();
const bitacoraController = require('../controller/bitacora.controller');

router.post('/bitacoras', bitacoraController.createBitacora);
router.get('/bitacoras', bitacoraController.getAllBitacoras);
router.get('/bitacoras/:id', bitacoraController.getBitacoraById);
router.put('/bitacoras/:id', bitacoraController.updateBitacora);

module.exports = router;
