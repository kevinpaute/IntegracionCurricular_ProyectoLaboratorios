const express = require('express');
const router = express.Router();
const periodosAcademicosController = require('../controller/periodos_academicos.controller');

//Obtener todos
router.get('/periodos_academicos', periodosAcademicosController.getAll);

//Obtener por id
router.get('/periodos_academicos/:id', periodosAcademicosController.getById);

//insertar periodo academico
router.post('/periodos_academicos', periodosAcademicosController.create);

//actualizar periodo academico
router.put('/periodos_academicos/:id', periodosAcademicosController.update);

//Borrar por id
router.delete('/periodos_academicos/:id', periodosAcademicosController.delete);

router.post('/periodos_academicos/many', periodosAcademicosController.createMany);

module.exports = router;
