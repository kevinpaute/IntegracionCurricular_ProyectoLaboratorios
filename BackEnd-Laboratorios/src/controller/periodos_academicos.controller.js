const periodosAcademicosService = require('../service/periodos_academicos.service');

class PeriodosAcademicosController {
    async getAll(req, res) {
        try {
            const periodos = await periodosAcademicosService.getAll();
            res.json(periodos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const periodo = await periodosAcademicosService.getById(id);
            if (periodo) {
                res.json(periodo);
            } else {
                res.status(404).json({ error: 'Período académico no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const { nombre_periodo, detalle_periodo, anio_lectivo, estado } = req.body;
            const nuevoPeriodo = await periodosAcademicosService.create({ nombre_periodo, detalle_periodo, anio_lectivo, estado });
            res.status(201).json(nuevoPeriodo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async createMany(req, res) {
        try {
            const periodos = req.body;
            const nuevosPeriodos = await periodosAcademicosService.createMany(periodos);
            res.status(201).json(nuevosPeriodos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { nombre_periodo, detalle_periodo, anio_lectivo, estado } = req.body;
            const periodoActualizado = await periodosAcademicosService.update(id, { nombre_periodo, detalle_periodo, anio_lectivo, estado });
            if (periodoActualizado) {
                res.json(periodoActualizado);
            } else {
                res.status(404).json({ error: 'Período académico no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const periodoEliminado = await periodosAcademicosService.delete(id);
            if (periodoEliminado) {
                res.json(periodoEliminado);
            } else {
                res.status(404).json({ error: 'Período académico no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PeriodosAcademicosController();
