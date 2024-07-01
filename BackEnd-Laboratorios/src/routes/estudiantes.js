const express = require('express');
const router = express.Router();
const estudiantesController = require('../controller/estudiantes.controller');

router.get('/materia/:idMateria/estudiantes', estudiantesController.getByMateria);

module.exports = router;
