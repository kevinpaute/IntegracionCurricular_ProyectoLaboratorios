const usuariosService = require('../service/usuarios.service');

class UsuariosController {
    async getAll(req, res) {
        try {
            const usuarios = await usuariosService.getAll();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const usuario = await usuariosService.getById(id);
            res.json(usuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updatePassword(req, res) {
        try {
            const { id } = req.params;
            const { contrasena } = req.body;
            const usuario = await usuariosService.updatePassword(id, contrasena);
            res.json(usuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UsuariosController();
