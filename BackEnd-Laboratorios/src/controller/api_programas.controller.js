const apiConsumeService = require('../service/api-consume-programas.service');

class ApiController {
  async importAllData(req, res) {
    try {
      await apiConsumeService.saveCarreras();
      await apiConsumeService.savePeriodos();
      await apiConsumeService.saveCursos();
      await apiConsumeService.saveMaterias();
      
      res.status(200).json({ message: 'Datos importados exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al importar datos', details: error.message });
    }
  }
}

module.exports = new ApiController();
