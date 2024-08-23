const express = require('express');
const router = express.Router();
const rolesController = require('../controller/roles.controller');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth.middleware');


router.get('/roles', rolesController.getAll);
router.get('/roles/:id', rolesController.getById);
router.post('/roles',  rolesController.create);
router.put('/roles/:id',  rolesController.update);
router.delete('/roles/:id',  rolesController.delete);
router.post('/roles/many', authenticateToken, authorizeRoles('admin'), rolesController.createMany);

module.exports = router;

