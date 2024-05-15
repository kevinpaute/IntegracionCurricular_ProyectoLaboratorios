const laboratorioService = require('../service/laboratorios.service');

class LaboratorioController {
    async getAll(req, res) {
        try {
            const laboratorios = await laboratorioService.getAll();
            res.json(laboratorios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const laboratorio = await laboratorioService.getById(id);
            if (laboratorio) {
                res.json(laboratorio);
            } else {
                res.status(404).json({ error: 'Laboratorio no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const { nombre_laboratorio, ubicacion, capacidad } = req.body;
            const nuevoLaboratorio = await laboratorioService.create({ nombre_laboratorio, ubicacion, capacidad });
            res.status(201).json(nuevoLaboratorio);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
//actualizar laboratorio
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nombre_laboratorio, ubicacion, capacidad } = req.body;
            const laboratorioActualizado = await laboratorioService.update(id, { nombre_laboratorio, ubicacion, capacidad });
            if (laboratorioActualizado) {
                res.json(laboratorioActualizado);
            } else {
                res.status(404).json({ error: 'Laboratorio no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    

    async delete(req, res) {
        try {
            const { id } = req.params;
            const laboratorioEliminado = await laboratorioService.delete(id);
            if (laboratorioEliminado) {
                res.json(laboratorioEliminado);
            } else {
                res.status(404).json({ error: 'Laboratorio no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new LaboratorioController();
