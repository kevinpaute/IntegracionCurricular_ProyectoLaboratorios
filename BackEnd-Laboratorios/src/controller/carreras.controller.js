const carreraService = require('../service/carreras.service');

class CarreraController {
    async getAll(req, res) {
        try {
            const carreras = await carreraService.getAll();
            res.json(carreras);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const carrera = await carreraService.getById(id);
            if (carrera) {
                res.json(carrera);
            } else {
                res.status(404).json({ error: 'Carrera no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCursosByCarrera(req, res) {
        try {
            const { idCarrera } = req.params;
            const cursos = await carreraService.getCursosByCarrera(idCarrera);
            if (cursos){
                res.json(cursos);
            }else{
                res.status(404).json({ error: 'Cursos no encontrados' });
            }
        } catch (error) {
            res.status(500).json({error: error.message });
        }
    }

    async createMany(req, res) {
        try {
            const carreras = req.body;
            const nuevasCarreras = await carreraService.createMany(carreras);
            res.status(201).json(nuevasCarreras);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const { nombre_carrera, estado } = req.body;
            const nuevaCarrera = await carreraService.create({ nombre_carrera, estado });
            res.status(201).json(nuevaCarrera);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { nombre_carrera, estado } = req.body;
            const carreraActualizada = await carreraService.update(id, { nombre_carrera, estado });
            if (carreraActualizada) {
                res.json(carreraActualizada);
            } else {
                res.status(404).json({ error: 'Carrera no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const carreraEliminada = await carreraService.delete(id);
            if (carreraEliminada) {
                res.json(carreraEliminada);
            } else {
                res.status(404).json({ error: 'Carrera no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CarreraController();
