// asistencia.routes.js
const express = require('express');
const router = express.Router();
const AsistenciaController = require('../controller/asistencia.controller');

router.post('/asistencias', (req, res) => AsistenciaController.createOrUpdateAsistencia(req, res));
router.get('/asistencias/reserva/:id_reserva', (req, res) => AsistenciaController.getAsistenciasByReserva(req, res));
router.put('/asistencias/:id', (req, res) => AsistenciaController.updateAsistencia(req, res));
router.post('/asistencias/qr', (req, res) => AsistenciaController.markAttendanceViaQr(req, res)); // Nueva ruta


module.exports = router;
