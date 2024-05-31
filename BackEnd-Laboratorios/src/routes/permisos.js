const express = require('express');
const router = express.Router();
const permisosController = require('../controller/permisos.controller');


//Obtener todos
router.get('/permisos', permisosController.getAll);

//Obtener por id
router.get('/permisos/:id', permisosController.getById);

//Insertar
router.post('/permisos', permisosController.create);

//Actualizar
router.put('/permisos/:id', permisosController.update);

//Borrar por id
router.delete('/permisos/:id', permisosController.delete);

router.post('/permisos/many', permisosController.createMany);

module.exports = router;
