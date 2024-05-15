const express = require('express');
const router = express.Router();
const carreraController = require('../controller/carreras.controller');

//Obtener todos
router.get('/carreras', carreraController.getAll);

//Obtener por id
router.get('/carreras/:id', carreraController.getById);

//Insertar carrera
router.post('/carreras', carreraController.create);

//Actualizar carrera por id
router.put('/carreras/:id', carreraController.update);

//Borrar por id
router.delete('/carreras/:id', carreraController.delete);

module.exports = router;
