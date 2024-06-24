const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class MateriasService {

    async getAll() {
        try {
            const materias = await prisma.materia.findMany({
                include: {
                    Catalogo_Materia: true,
                    Curso: true,
                    Usuario: true
                }
            });
            return materias;
        } catch (error) {
            throw new Error(`No se pudieron obtener las materias: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const materia = await prisma.materia.findUnique({
                where: {
                    id_materia: parseInt(id, 10)
                },
                include: {
                    Catalogo_Materia: true,
                    Curso: true,
                    Usuario: true
                }
            });
            return materia;
        } catch (error) {
            throw new Error(`No se pudo obtener la materia: ${error.message}`);
        }
    }

    async create({ codigo_materia, estado, id_catalogo, id_curso, id_usuario }) {
        try {
            const nuevaMateria = await prisma.materia.create({
                data: {
                    codigo_materia,
                    estado,
                    id_catalogo: id_catalogo ? id_catalogo : null,
                    id_curso: id_curso ? id_curso : null,
                    id_usuario: id_usuario ? id_usuario : null
                }
            });
            return nuevaMateria;
        } catch (error) {
            throw new Error(`No se pudo crear la materia: ${error.message}`);
        }
    }

    async update(id, { codigo_materia, estado, id_catalogo, id_carrera, id_periodo }) {
        try {
            const materiaActualizada = await prisma.materia.update({
                where: {
                    id_materia: parseInt(id, 10)
                },
                data: {
                    codigo_materia,
                    estado,
                    id_catalogo: id_catalogo ? id_catalogo : null,
                    id_curso: id_curso ? id_curso : null,
                    id_usuario: id_usuario ? id_usuario : null
                }
            });
            return materiaActualizada;
        } catch (error) {
            throw new Error(`No se pudo actualizar la materia: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const materiaEliminada = await prisma.materia.delete({
                where: {
                    id_materia: parseInt(id, 10)
                }
            });
            return materiaEliminada;
        } catch (error) {
            throw new Error(`No se pudo eliminar la materia: ${error.message}`);
        }
    }
}

module.exports = new MateriasService();
