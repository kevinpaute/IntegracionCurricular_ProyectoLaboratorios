const express = require('express');
const router = express.Router();
const laboratorioController = require('../controller/laboratorios.controller');

// Obtener todos los laboratorios
router.get('/laboratorios', laboratorioController.getAll);

// Obtener un laboratorio por ID
router.get('/laboratorios/:id', laboratorioController.getById);

// Crear un nuevo laboratorio
router.post('/laboratorios', laboratorioController.create);

// Actualizar un laboratorio por ID
router.put('/laboratorios/:id', laboratorioController.update);

// Eliminar un laboratorio por ID
router.delete('/laboratorios/:id', laboratorioController.delete);

module.exports = router;
