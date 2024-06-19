const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class RevisionService {
    async getAll() {
        return await prisma.revision_Equipo.findMany({
            include: {
                Equipo_Laboratorio: true,
                Usuario: {
                    include: {
                        Detalle_Usuario: true
                    }
                }
            }
        });
    }

    async getById(id) {
        return await prisma.revision_Equipo.findUnique({
            where: { id_revision: parseInt(id, 10) },
            include: {
                Equipo_Laboratorio: true,
                Usuario: {
                    include: {
                        Detalle_Usuario: true
                    }
                }
            }
        });
    }

    async create(revision) {
        return await prisma.revision_Equipo.create({
            data: revision
        });
    }

    async update(id, revision) {
        return await prisma.revision_Equipo.update({
            where: { id_revision: parseInt(id, 10) },
            data: revision
        });
    }

    async delete(id) {
        return await prisma.revision_Equipo.delete({
            where: { id_revision: parseInt(id, 10) }
        });
    }

    async createMany(revisiones) {
        return await prisma.revision_Equipo.createMany({
            data: revisiones
        });
    }
}

module.exports = new RevisionService();
