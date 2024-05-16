const express = require('express');
const router = express.Router();
const catalogoMateriasController = require('../controller/catalogo_materias.controller');

//Obtener todos
router.get('/catalogo_materias', catalogoMateriasController.getAll);

//Obtener por id
router.get('/catalogo_materias/:id', catalogoMateriasController.getById);

//Insertar materia
router.post('/catalogo_materias', catalogoMateriasController.create);

//Actualizar catalogo
router.put('/catalogo_materias/:id', catalogoMateriasController.update);

//Borrar catalogo por id
router.delete('/catalogo_materias/:id', catalogoMateriasController.delete);

module.exports = router;
