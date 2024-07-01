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
}

module.exports = new EstudiantesController();
