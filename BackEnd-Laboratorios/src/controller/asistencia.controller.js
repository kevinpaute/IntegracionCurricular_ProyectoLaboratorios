// asistencia.controller.js
const asistenciaService = require('../service/asistencia.service');

class AsistenciaController {
  async createOrUpdateAsistencia(req, res) {
    try {
      const asistencia = await asistenciaService.createOrUpdateAsistencia(req.body);
      res.status(201).json(asistencia);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear o actualizar la asistencia' });
    }
  }

  async getAsistenciasByReserva(req, res) {
    try {
      const { id_reserva } = req.params;
      const asistencias = await asistenciaService.getAsistenciasByReserva(Number(id_reserva));
      res.status(200).json(asistencias);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las asistencias' });
    }
  }

  async updateAsistencia(req, res) {
    try {
      const { id } = req.params;
      const asistencia = await asistenciaService.updateAsistencia(Number(id), req.body);
      res.status(200).json(asistencia);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la asistencia' });
    }
  }

  async markAttendanceViaQr(req, res) {
    try {
      const { id_reserva, id_estudiante } = req.body;
      const asistencia = await asistenciaService.markAttendance(id_reserva, id_estudiante);
      res.status(200).json(asistencia);
    } catch (error) {
      res.status(500).json({ message: 'Error al marcar la asistencia via QR' });
    }
  }
}

module.exports = new AsistenciaController();
