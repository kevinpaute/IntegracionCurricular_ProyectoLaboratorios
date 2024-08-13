const usuariosService = require('../service/usuarios.service');
const apiConsumeService = require('../service/api-consume.service');

class UsuariosController {

  // Método para consumir la API y guardar los usuarios
  async importUsuarios(req, res) {
    try {
      await apiConsumeService.saveUsuarios();
      res.status(200).json({ message: 'Usuarios importados correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


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

  async create(req, res) {
    try {
      const usuario = await usuariosService.create(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const usuario = await usuariosService.update(id, req.body);
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async assignRole(req, res) {
    try {
      const { docenteId, rolId } = req.body;
      const usuario = await usuariosService.assignRole(docenteId, rolId);
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDocentes(req, res) {
    try {
      const docentes = await usuariosService.getDocentes();
      res.json(docentes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllRoles(req, res) {
    try {
      const roles = await usuariosService.getAllRoles();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = new UsuariosController();
