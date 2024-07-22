const estudiantesService = require('../service/estudiantes.service');

class EstudiantesController {
    async getByMateria(req, res) {
        try {
            const { idMateria } = req.params;
            const materia = await estudiantesService.getByMateria(idMateria);
            res.json(materia);
        } catch (error) {
            res.status(500).json({error: error.message });
        }
    }

    async getInscripcionesPorMateria(req, res) {
        try {
          const { id_materia } = req.params;
          const inscripciones = await estudiantesService.getInscripcionesPorMateria(parseInt(id_materia, 10));
          res.status(200).json(inscripciones);
        } catch (error) {
          console.error('Error al obtener inscripciones por materia:', error);
          res.status(500).json({ message: 'Error al obtener inscripciones por materia' });
        }
      }
 
}


module.exports = new EstudiantesController();
