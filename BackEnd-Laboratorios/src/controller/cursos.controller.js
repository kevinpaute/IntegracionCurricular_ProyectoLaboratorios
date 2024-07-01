const cursoService = require('../service/cursos.service');

class CursoController {
    async getCursosByCarrera(req, res) {
        try {
          const { idCarrera } = req.params;
          const cursos = await cursoService.getCursosByCarrera(idCarrera);
          if (cursos) {
            res.json(cursos);
          } else {
            res.status(404).json({ error: 'Cursos no encontrados' });
          }
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
    
      async getCursosByPeriodo(req, res) {
        try {
          const { idPeriodo } = req.params;
          const cursos = await cursoService.getCursosByPeriodo(idPeriodo);
          if (cursos) {
            res.json(cursos);
          } else {
            res.status(404).json({ error: 'Cursos no encontrados' });
          }
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
      
    async getByPeriodoAndCarrera(req, res) {
        try {
            const { idPeriodo, idCarrera } = req.params;
            const cursos = await cursoService.getByPeriodoAndCarrera(idPeriodo, idCarrera);
            res.json(cursos);
        } catch (error) {
            res.status(500).json({error: error.message });
        }
    }
}

module.exports = new CursoController();
