const catalogoMateriasService = require('../service/catalogo_materias.service');

class CatalogoMateriasController {
    async getAll(req, res) {
        try {
            const catalogoMaterias = await catalogoMateriasService.getAll();
            res.json(catalogoMaterias);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const catalogoMateria = await catalogoMateriasService.getById(id);
            if (catalogoMateria) {
                res.json(catalogoMateria);
            } else {
                res.status(404).json({ error: 'Catálogo de materia no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const { nombre_materia } = req.body;
            const nuevoCatalogoMateria = await catalogoMateriasService.create({ nombre_materia });
            res.status(201).json(nuevoCatalogoMateria);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createMany(req, res) {
        try {
            const materias = req.body;
            const nuevasMaterias = await catalogoMateriasService.createMany(materias);
            res.status(201).json(nuevasMaterias);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { nombre_materia } = req.body;
            const catalogoMateriaActualizado = await catalogoMateriasService.update(id, { nombre_materia });
            if (catalogoMateriaActualizado) {
                res.json(catalogoMateriaActualizado);
            } else {
                res.status(404).json({ error: 'Catálogo de materia no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const catalogoMateriaEliminado = await catalogoMateriasService.delete(id);
            if (catalogoMateriaEliminado) {
                res.json(catalogoMateriaEliminado);
            } else {
                res.status(404).json({ error: 'Catálogo de materia no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CatalogoMateriasController();
