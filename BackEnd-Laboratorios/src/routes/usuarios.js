const express = require('express');
const router = express.Router();
const usuariosController = require('../controller/usuarios.controller');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth.middleware');


router.post('/usuarios/importar', authenticateToken, authorizeRoles('administrador'), usuariosController.importUsuarios);
// Obtener todos los usuarios (solo para admin)
router.get('/usuarios', authenticateToken, authorizeRoles('administrador'), usuariosController.getAll);

// Obtener un usuario por ID (acceso para admin y usuario mismo)
router.get('/usuarios/:id', authenticateToken, authorizeRoles('administrador', 'laboratorista', 'docente', 'estudiante'), usuariosController.getById);

// Crear un nuevo usuario (solo para admin)
router.post('/usuarios', usuariosController.create);

// Actualizar un usuario existente (solo para admin)
router.put('/usuarios/:id', authenticateToken, authorizeRoles('administrador'), usuariosController.update);

// Asignar un rol a un usuario (solo para admin)
router.put('/usuarios/:id/assign/:rolId', authenticateToken, authorizeRoles('administrador'), usuariosController.assignRole);

// Obtener docentes (acceso para todos)
router.get('/docentes', authenticateToken, authorizeRoles('administrador', 'laboratorista', 'docente', 'estudiante'), usuariosController.getDocentes);

module.exports = router;
