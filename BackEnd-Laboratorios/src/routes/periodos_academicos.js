const express = require('express');
const router = express.Router();
const periodosAcademicosController = require('../controller/periodos_academicos.controller');

router.get('/periodos_academicos', periodosAcademicosController.getAll);
router.get('/periodos_academicos/:id', periodosAcademicosController.getById);
router.post('/periodos_academicos', periodosAcademicosController.create);
router.put('/periodos_academicos/:id', periodosAcademicosController.update);
router.delete('/periodos_academicos/:id', periodosAcademicosController.delete);

module.exports = router;
