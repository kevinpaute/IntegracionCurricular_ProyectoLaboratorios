const express = require('express');
const router = express.Router();
const materiaController = require('../controller/materias.controller');

router.get('/materias', materiaController.getAll);
router.get('/materias/:id', materiaController.getById);
router.get('/cursos/:idCurso/materias', materiaController.getByCurso);
router.post('/materias', materiaController.create);
router.put('/materias/:id', materiaController.update);
router.delete('/materias/:id', materiaController.delete);

module.exports = router;
