const express = require('express');
const router = express.Router();
const cursoController = require('../controller/cursos.controller');

router.get('/carreras/:idCarrera/cursos', cursoController.getCursosByCarrera);

// Ruta para obtener cursos por periodo académico
router.get('/periodos/:idPeriodo/cursos', cursoController.getCursosByPeriodo);

// Ruta para obtener cursos por carrera del último periodo académico activo
router.get('/carrera/:carreraId/ultimo-periodo', cursoController.obtenerCursosPorCarreraUltimoPeriodo);

module.exports = router;
