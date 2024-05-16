const rolesService = require('../service/roles.service');

class RolesController {
    async getAll(req, res) {
        try {
            const roles = await rolesService.getAll();
            res.json(roles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const rol = await rolesService.getById(id);
            if (rol) {
                res.json(rol);
            } else {
                res.status(404).json({ error: 'Rol no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const { nombre_rol, estado } = req.body;
            const nuevoRol = await rolesService.create({ nombre_rol, estado });
            res.status(201).json(nuevoRol);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { nombre_rol, estado } = req.body;
            const rolActualizado = await rolesService.update(id, { nombre_rol, estado });
            if (rolActualizado) {
                res.json(rolActualizado);
            } else {
                res.status(404).json({ error: 'Rol no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const rolEliminado = await rolesService.delete(id);
            if (rolEliminado) {
                res.json(rolEliminado);
            } else {
                res.status(404).json({ error: 'Rol no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new RolesController();
