const materiasService = require('../service/materias.service');

class MateriasController {
    async getAll(req, res) {
        try {
            const materias = await materiasService.getAll();
            res.json(materias);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const materia = await materiasService.getById(id);
            if (materia) {
                res.json(materia);
            } else {
                res.status(404).json({ error: 'Materia no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const { codigo_materia, estado, id_catalogo, id_carrera, id_periodo } = req.body;
            const nuevaMateria = await materiasService.create({ codigo_materia, estado, id_catalogo, id_carrera, id_periodo });
            res.status(201).json(nuevaMateria);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { codigo_materia, estado, id_catalogo, id_carrera, id_periodo } = req.body;
            const materiaActualizada = await materiasService.update(id, { codigo_materia, estado, id_catalogo, id_carrera, id_periodo });
            if (materiaActualizada) {
                res.json(materiaActualizada);
            } else {
                res.status(404).json({ error: 'Materia no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const materiaEliminada = await materiasService.delete(id);
            if (materiaEliminada) {
                res.json(materiaEliminada);
            } else {
                res.status(404).json({ error: 'Materia no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new MateriasController();
