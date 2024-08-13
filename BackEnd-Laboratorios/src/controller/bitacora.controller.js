const bitacoraService = require('../service/bitacora.service');

class BitacoraController {
  async createBitacora(req, res) {
    try {
      const bitacora = await bitacoraService.createBitacora(req.body);
      res.status(201).json(bitacora);
    } catch (error) {
      res.status(500).json({ message: 'Error creating bitacora', error });
    }
  }

  async getAllBitacoras(req, res) {
    try {
      const bitacoras = await bitacoraService.getAllBitacoras();
      res.status(200).json(bitacoras);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bitacoras', error });
    }
  }

  async getBitacoraById(req, res) {
    try {
      const bitacora = await bitacoraService.getBitacoraById(req.params.id);
      res.status(200).json(bitacora);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bitacora', error });
    }
  }

  async updateBitacora(req, res) {
    try {
      const bitacora = await bitacoraService.updateBitacora(req.params.id, req.body);
      res.status(200).json(bitacora);
    } catch (error) {
      res.status(500).json({ message: 'Error updating bitacora', error });
    }
  }
}

module.exports = new BitacoraController();
