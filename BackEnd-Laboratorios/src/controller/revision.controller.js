const revisionService = require('../service/revision.service');

class RevisionController {
    async getAll(req, res) {
        try {
            const revisiones = await revisionService.getAll();
            res.json(revisiones);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las revisiones', error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const revision = await revisionService.getById(id);
            res.json(revision);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la revisión', error: error.message });
        }
    }

    async create(req, res) {
        try {
            const revision = req.body;
            const nuevaRevision = await revisionService.create(revision);
            res.json(nuevaRevision);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear la revisión', error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const revision = req.body;
            const revisionActualizada = await revisionService.update(id, revision);
            res.json(revisionActualizada);
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar la revisión', error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await revisionService.delete(id);
            res.json({ message: 'Revisión eliminada' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar la revisión', error: error.message });
        }
    }

    async createMany(req, res) {
        try {
            const revisiones = req.body;
            const nuevasRevisiones = await revisionService.createMany(revisiones);
            res.json(nuevasRevisiones);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear las revisiones', error: error.message });
        }
    }
}

module.exports = new RevisionController();

