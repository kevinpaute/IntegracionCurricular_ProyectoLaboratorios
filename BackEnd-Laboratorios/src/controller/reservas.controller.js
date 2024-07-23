// reserva.controller.js
const reservaService = require('../service/reservas.service');

class ReservaController {
  async createReserva(req, res) {
    try {
      const reserva = await reservaService.createReserva(req.body);
      const io = req.app.get('socketio');
      if (io) {
        io.emit('reservaCambiada', reserva);
      }
      res.status(201).json(reserva);
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async updateReserva(req, res) {
    try {
      const reserva = await reservaService.updateReserva(req.params.id_reserva, req.body);
      const io = req.app.get('socketio');
      if (io) {
        io.emit('reservaCambiada', reserva);
      }
      res.status(200).json(reserva);
    } catch (error) {
      console.error('Error al actualizar la reserva:', error);
      res.status(error.status || 500).json({ message: 'Error al actualizar la reserva' });
    }
  }

  async changeReservaStatus(req, res) {
    try {
      const reserva = await reservaService.changeReservaStatus(req.params.id_reserva);
      const io = req.app.get('socketio');
      if (io) {
        io.emit('reservaCambiada', reserva);
      }
      res.status(200).json(reserva);
    } catch (error) {
      console.error('Error al cambiar el estado de la reserva:', error);
      res.status(error.status || 500).json({ message: 'Error al cambiar el estado de la reserva' });
    }
  }

  async getReservas(req, res) {
    try {
      const reservas = await reservaService.getReservas();
      res.status(200).json(reservas);
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
      res.status(error.status || 500).json({ message: 'Error al obtener las reservas' });
    }
  }

  async getReservasByLaboratorio(req, res) {
    try {
      const { laboratorioId } = req.params;
      const reservas = await reservaService.getReservasByLaboratorio(Number(laboratorioId));
      res.status(200).json(reservas);
    } catch (error) {
      console.error('Error al obtener las reservas filtradas por laboratorio:', error);
      res.status(error.status || 500).json({ message: 'Error al obtener las reservas filtradas por laboratorio' });
    }
  }

  async markExpiredReservas(req, res) {
    try {
      await reservaService.markExpiredReservas();
      res.status(200).json({ message: 'Reservas expiradas marcadas como inactivas' });
    } catch (error) {
      console.error('Error al marcar reservas expiradas:', error);
      res.status(error.status || 500).json({ message: 'Error al marcar reservas expiradas' });
    }
  }

  //docente

  async getMateriasPorDocente(req, res) {
    try {
      const { id_docente } = req.params;
      const materias = await reservaService.getMateriasPorDocente(Number(id_docente));
      res.status(200).json(materias);
    } catch (error) {
      console.error('Error al obtener las materias del docente:', error);
      res.status(500).json({ message: 'Error al obtener las materias del docente' });
    }
  }

  async getReservasByDocente(req, res) {
    try {
      const { docenteId } = req.params;
      const reservas = await reservaService.getReservasByDocente(Number(docenteId));
      res.status(200).json(reservas);
    } catch (error) {
      console.error('Error al obtener las reservas del docente:', error);
      res.status(error.status || 500).json({ message: 'Error al obtener las reservas del docente' });
    }
  }


  //estudiante
  async getReservasByEstudiante(req, res) {
    try {
      const { id_estudiante } = req.params;
      if (!id_estudiante) {
        return res.status(400).json({ message: 'El id del estudiante es requerido' });
      }
      const reservas = await reservaService.getReservasByEstudiante(Number(id_estudiante));
      res.status(200).json(reservas);
    } catch (error) {
      console.error('Error al obtener las reservas del estudiante:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
  
}

module.exports = new ReservaController();
