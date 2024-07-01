const materiaService = require('../service/materias.service');

class MateriasController {

        async getAll(req, res) {
            try {
                const materias = await materiaService.getAll();
                res.json(materias);
            } catch (error) {
                res.status(500).json({ message: 'Error al obtener las materias', error: error.message });
            }
        }
    
        async getById(req, res) {
            try {
                const { id } = req.params;
                const materia = await materiaService.getById(id);
                res.json(materia);
            } catch (error) {
                res.status(500).json({ message: 'Error al obtener la materia', error: error.message });
            }
        }
    
        async getByCurso(req, res) {
            try {
                const { idCurso } = req.params;
                const materias = await materiaService.getByCurso(idCurso);
                res.json(materias);
            } catch (error) {
                res.status(500).json({ message: 'Error al obtener las materias', error: error.message });
            }
        }
    
        async create(req, res) {
            try {
                const materia = req.body;
                const nuevaMateria = await materiaService.create(materia);
                res.json(nuevaMateria);
            } catch (error) {
                res.status(500).json({ message: 'Error al crear la materia', error: error.message });
            }
        }
    
        async update(req, res) {
            try {
                const { id } = req.params;
                const materia = req.body;
                const materiaActualizada = await materiaService.update(id, materia);
                res.json(materiaActualizada);
            } catch (error) {
                res.status(500).json({ message: 'Error al actualizar la materia', error: error.message });
            }
        }
    
        async delete(req, res) {
            try {
                const { id } = req.params;
                await materiaService.delete(id);
                res.json({ message: 'Materia eliminada' });
            } catch (error) {
                res.status(500).json({ message: 'Error al eliminar la materia', error: error.message });
            }
        }
}

module.exports = new MateriasController();
