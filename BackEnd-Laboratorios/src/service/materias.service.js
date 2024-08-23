const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class MateriasService {
    async getAll() {
        return await prisma.materia.findMany({
            include: {
                Catalogo_Materia: true,
                Curso: true,
                Usuario: {
                    include: {
                        Detalle_Usuario: true
                    }
                }
            }
        });
    }

    async getByCurso(idCurso) {
        return await prisma.materia.findMany({
            where: { id_curso: parseInt(idCurso) },
            include: {
                Catalogo_Materia: true,
                Curso: true,
                Usuario: {
                    include: {
                        Detalle_Usuario: true
                    }
                }
            }
        }); 
    }

    async getById(id) {
        return await prisma.materia.findUnique({
            where: { id_materia: parseInt(id, 10) },
            include: {
                Catalogo_Materia: true,
                Curso: true,
                Docente: {
                    include: {
                        Detalle_Usuario: true
                    }
                }
            }
        });
    }

    async create(materia) {
        return await prisma.materia.create({
            data: materia
        });
    }

    async update(id, materia) {
        return await prisma.materia.update({
            where: { id_materia: parseInt(id, 10) },
            data: materia
        });
    }

    async delete(id) {
        return await prisma.materia.delete({
            where: { id_materia: parseInt(id, 10) }
        });
    }
}

module.exports = new MateriasService();
