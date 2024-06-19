const equiposService = require('../service/equipo_laboratorio.service');

class EquiposController {
    async getAll(req, res) {
        try {
            const equipos = await equiposService.getAll();
            res.json(equipos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los equipos', error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const equipo = await equiposService.getById(id);
            res.json(equipo);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el equipo', error: error.message });
        }
    }

    async create(req, res) {
        try {
            const equipo = req.body;
            const nuevoEquipo = await equiposService.create(equipo);
            res.json(nuevoEquipo);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el equipo', error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const equipo = req.body;
            const equipoActualizado = await equiposService.update(id, equipo);
            res.json(equipoActualizado);
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el equipo', error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await equiposService.delete(id);
            res.json({ message: 'Equipo eliminado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el equipo', error: error.message });
        }
    }

    async createMany(req, res) {
        try {
            const equipos = req.body;
            const nuevosEquipos = await equiposService.createMany(equipos);
            res.json(nuevosEquipos);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear los equipos', error: error.message });
        }
    }
}

module.exports = new EquiposController();
