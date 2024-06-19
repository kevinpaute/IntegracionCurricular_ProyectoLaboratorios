const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class EquiposService {
    async getAll() {
        return await prisma.equipo_Laboratorio.findMany();
    }

    async getById(id) {
        return await prisma.equipo_Laboratorio.findUnique({
            where: { id_equipo: parseInt(id, 10) }
        });
    }

    async create(equipo) {
        return await prisma.equipo_Laboratorio.create({
            data: equipo
        });
    }

    async update(id, equipo) {
        return await prisma.equipo_Laboratorio.update({
            where: { id_equipo: parseInt(id, 10) },
            data: equipo
        });
    }

    async delete(id) {
        return await prisma.equipo_Laboratorio.delete({
            where: { id_equipo: parseInt(id, 10) }
        });
    }

    async createMany(equipos) {
        return await prisma.equipo_Laboratorio.createMany({
            data: equipos
        });
    }
}

module.exports = new EquiposService();
