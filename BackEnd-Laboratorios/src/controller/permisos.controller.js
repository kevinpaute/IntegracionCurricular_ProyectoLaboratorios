const permisosService = require('../service/permisos.service');

class PermisosController {
    async getAll(req, res) {
        try {
            const permisos = await permisosService.getAll();
            res.json(permisos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const permiso = await permisosService.getById(id);
            if (permiso) {
                res.json(permiso);
            } else {
                res.status(404).json({ error: 'Permiso no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const { nombre_permiso, id_rol } = req.body;
            const nuevoPermiso = await permisosService.create({ nombre_permiso, id_rol });
            res.status(201).json(nuevoPermiso);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async createMany(req, res) {
        try {
            const permisos = req.body;
            const nuevosPermisos = await permisosService.createMany(permisos);
            res.status(201).json(nuevosPermisos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { nombre_permiso, id_rol } = req.body;
            const permisoActualizado = await permisosService.update(id, { nombre_permiso, id_rol });
            if (permisoActualizado) {
                res.json(permisoActualizado);
            } else {
                res.status(404).json({ error: 'Permiso no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const permisoEliminado = await permisosService.delete(id);
            if (permisoEliminado) {
                res.json(permisoEliminado);
            } else {
                res.status(404).json({ error: 'Permiso no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PermisosController();
