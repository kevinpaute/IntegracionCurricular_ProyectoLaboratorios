const BitacoraService = require('../service/bitacora.service');
const bitacoraService = new BitacoraService();

class BitacoraController {
  async crearBitacora(req, res) {
    try {
      const bitacora = await bitacoraService.crearBitacora(req.body);
      res.status(201).json(bitacora);
    } catch (error) {
      console.error('Error al crear la bitácora:', error);
      res.status(500).json({ error: 'Error al crear la bitácora. Por favor, intente de nuevo.' });
    }
  }

  async obtenerBitacorasActivas(req, res) {
    try {
      const bitacoras = await bitacoraService.obtenerBitacorasActivas();
      res.status(200).json(bitacoras);
    } catch (error) {
      console.error('Error al obtener las bitácoras activas:', error);
      res.status(500).json({ error: 'Error al obtener las bitácoras activas. Por favor, intente de nuevo.' });
    }
  }

  async obtenerBitacorasCompletadas(req, res) {
    try {
      const bitacoras = await bitacoraService.obtenerBitacorasCompletadas();
      res.status(200).json(bitacoras);
    } catch (error) {
      console.error('Error al obtener las bitácoras completadas:', error);
      res.status(500).json({ error: 'Error al obtener las bitácoras completadas. Por favor, intente de nuevo.' });
    }
  }

  async obtenerBitacoraPorId(req, res) {
    try {
      const bitacora = await bitacoraService.obtenerBitacoraPorId(parseInt(req.params.id));
      if (bitacora) {
        res.status(200).json(bitacora);
      } else {
        res.status(404).json({ error: 'Bitácora no encontrada' });
      }
    } catch (error) {
      console.error('Error al obtener la bitácora:', error);
      res.status(500).json({ error: 'Error al obtener la bitácora. Por favor, intente de nuevo.' });
    }
  }

  async editarBitacora(req, res) {
    try {
      const bitacora = await bitacoraService.editarBitacora(parseInt(req.params.id), req.body);
      res.status(200).json(bitacora);
    } catch (error) {
      console.error('Error al editar la bitácora:', error);
      res.status(500).json({ error: 'Error al editar la bitácora. Por favor, intente de nuevo.' });
    }
  }

  async subirEvidenciaBitacora(req, res) {
    try {
      const filePath = req.file.path;  // Ruta del archivo subido
      const bitacora = await bitacoraService.subirEvidenciaBitacora(parseInt(req.params.id), filePath);
      res.status(200).json(bitacora);
    } catch (error) {
      console.error('Error al subir la evidencia de la bitácora:', error);
      res.status(500).json({ error: 'Error al subir la evidencia de la bitácora. Por favor, intente de nuevo.' });
    }
  }
}

module.exports = BitacoraController;
