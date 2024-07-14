// reserva.controller.js
const reservaService = require('../service/reservas.service');

class ReservaController {
  async createReserva(req, res) {
    try {
      const reserva = await reservaService.createReserva(req.body);
      const io = req.app.get('socketio');
      if (!io) {
        throw new Error('Socket.io no está configurado correctamente');
      }
      io.emit('reservaCambiada', reserva); // Emitir el evento usando Socket.io
      res.status(201).json(reserva);
    } catch (error) {
      console.error('Error al crear la reserva:', error); // Log del error
      res.status(500).json({ message: `Error al crear la reserva: ${error.message}` });
    }
  }

  async updateReserva(req, res) {
    try {
      const reserva = await reservaService.updateReserva(req.params.id_reserva, req.body);
      const io = req.app.get('socketio');
      io.emit('reservaCambiada', reserva);
      res.status(200).json(reserva);
    } catch (error) {
      console.error('Error al actualizar la reserva:', error); // Log del error
      res.status(500).json({ message: 'Error al actualizar la reserva', error: error.message });
    }
  }

  async changeReservaStatus(req, res) {
    try {
      const reserva = await reservaService.changeReservaStatus(req.params.id);
      const io = req.app.get('socketio');
      io.emit('reservaCambiada', reserva);
      res.status(200).json(reserva);
    } catch (error) {
      console.error('Error al cambiar el estado de la reserva:', error);
      res.status(500).json({ message: 'Error al cambiar el estado de la reserva' });
    }
  }

  async getReservas(req, res) {
    try {
      const reservas = await reservaService.getReservas();
      res.status(200).json(reservas);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las reservas' });
    }
  }

  async getReservasByLaboratorio(req, res) {
    try {
      const { laboratorioId } = req.params;
      const reservas = await reservaService.getReservasByLaboratorio(Number(laboratorioId));
      res.status(200).json(reservas);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las reservas filtradas por laboratorio' });
    }
  }

  async markExpiredReservas(req, res) {
    try {
      await reservaService.markExpiredReservas();
      res.status(200).json({ message: 'Reservas expiradas marcadas como inactivas' });
    } catch (error) {
      res.status(500).json({ message: 'Error al marcar reservas expiradas' });
    }
  }
}

module.exports = new ReservaController();
