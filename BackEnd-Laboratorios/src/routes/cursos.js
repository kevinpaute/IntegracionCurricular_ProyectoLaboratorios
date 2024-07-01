const express = require('express');
const router = express.Router();
const cursoController = require('../controller/cursos.controller');

// router.get('/carreras', carreraController.getAll);
// router.get('/carreras/:id', carreraController.getById);
// router.get('/carreras/:idCarrera/cursos', carreraController.getCursosByCarrera);
//router.get('/cursos/:idPeriodo/:idCarrera', cursoController.getByPeriodoAndCarrera);

router.get('/carreras/:idCarrera/cursos', cursoController.getCursosByCarrera);

// Ruta para obtener cursos por periodo académico
router.get('/periodos/:idPeriodo/cursos', cursoController.getCursosByPeriodo);


module.exports = router;
