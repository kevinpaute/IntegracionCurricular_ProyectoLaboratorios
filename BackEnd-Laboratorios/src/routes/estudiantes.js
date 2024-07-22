const express = require('express');
const router = express.Router();
const estudiantesController = require('../controller/estudiantes.controller');

router.get('/materia/:idMateria/estudiantes', estudiantesController.getByMateria);
router.get('/inscripciones/materia/:id_materia', (req, res) => estudiantesController.getInscripcionesPorMateria(req, res));

module.exports = router;
