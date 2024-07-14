const express = require('express');
const router = express.Router();
const ReservaController = require('../controller/reservas.controller');

router.get('/reservas', (req, res) => ReservaController.getReservas(req, res));
router.post('/reservas', (req, res) => ReservaController.createReserva(req, res));
router.get('/reservas/laboratorio/:laboratorioId', (req, res) => ReservaController.getReservasByLaboratorio(req, res));
router.put('/reservas/:id_reserva', (req, res) => ReservaController.updateReserva(req, res));
router.put('/reservas/:id_reserva/status', (req, res) => ReservaController.changeReservaStatus(req, res));
router.put('/reservas/:id/cancel', (req, res) => ReservaController.changeReservaStatus(req, res));
//router.delete('reservas/:id_reserva', (req, res) => ReservaController.deleteReserva(req, res));

module.exports = router;
