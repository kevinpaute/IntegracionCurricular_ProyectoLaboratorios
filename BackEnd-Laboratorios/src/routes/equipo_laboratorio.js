const express = require('express');
const router = express.Router();
const equiposController = require('../controller/equipo_laboratorio.controller');

router.get('/equipos', equiposController.getAll);
router.get('/equipos/:id', equiposController.getById);
router.post('/equipos', equiposController.create);
router.put('/equipos/:id', equiposController.update);
router.delete('/equipos/:id', equiposController.delete);
router.post('/equipos/many', equiposController.createMany);

module.exports = router;
