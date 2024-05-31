const express = require('express');
const router = express.Router();
const materiasController = require('../controller/materias.controller');

//Obtener todos
router.get('/materias', materiasController.getAll);

//Obtener por id
router.get('/materias/:id', materiasController.getById);

//insertar
router.post('/materias', materiasController.create);

//actualizar
router.put('/materias/:id', materiasController.update);

//borrar por id
router.delete('/materias/:id', materiasController.delete);

router.post('/materias/many', materiasController.createMany);

module.exports = router;
