const express = require('express');
const router = express.Router();
const rolesController = require('../controller/roles.controller');

//Obtener todos
router.get('/roles', rolesController.getAll);

//Obtener por id
router.get('/roles/:id', rolesController.getById);

//Insertar
router.post('/roles', rolesController.create);

//Actualizar
router.put('/roles/:id', rolesController.update);

//Borrar por id
router.delete('/roles/:id', rolesController.delete);

module.exports = router;
