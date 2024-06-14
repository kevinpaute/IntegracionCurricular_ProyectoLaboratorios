const express = require('express');
const router = express.Router();
const rolesController = require('../controller/roles.controller');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth.middleware');

// Verificar si los métodos del controlador están definidos correctamente
// router.get('/roles', authenticateToken, authorizeRoles('admin'), rolesController.getAll);
// router.get('/roles/:id', authenticateToken, authorizeRoles('admin'), rolesController.getById);
// router.post('/roles', authenticateToken, authorizeRoles('admin'), rolesController.create);
// router.put('/roles/:id', authenticateToken, authorizeRoles('admin'), rolesController.update);
// router.delete('/roles/:id', authenticateToken, authorizeRoles('admin'), rolesController.delete);
// router.post('/roles/many', authenticateToken, authorizeRoles('admin'), rolesController.createMany);


router.get('/roles', rolesController.getAll);
router.get('/roles/:id', rolesController.getById);
router.post('/roles',  rolesController.create);
router.put('/roles/:id',  rolesController.update);
router.delete('/roles/:id',  rolesController.delete);
router.post('/roles/many', authenticateToken, authorizeRoles('admin'), rolesController.createMany);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const rolesController = require('../controller/roles.controller');
// const { authenticateToken, authorizeRoles } = require('../middlewares/auth.middleware');


// // //Obtener todos
// // router.get('/roles', rolesController.getAll);

// // //Obtener por id
// // router.get('/roles/:id', rolesController.getById);

// // //Insertar
// // router.post('/roles', rolesController.create);

// // //Actualizar
// // router.put('/roles/:id', rolesController.update);

// // //Borrar por id
// // router.delete('/roles/:id', rolesController.delete);

// // router.post('/roles/many', rolesController.createMany);

// router.get('/roles', authenticateToken, authorizeRoles('admin'), rolesController.getAll);
// router.get('/roles/:id', authenticateToken, authorizeRoles('admin'), rolesController.getById);
// router.post('/roles', authenticateToken, authorizeRoles('admin'), rolesController.create);
// router.put('/roles/:id', authenticateToken, authorizeRoles('admin'), rolesController.update);
// router.delete('/roles/:id', authenticateToken, authorizeRoles('admin'), rolesController.delete);
// router.post('/roles/many', authenticateToken, authorizeRoles('admin'), rolesController.createMany);


// module.exports = router;
