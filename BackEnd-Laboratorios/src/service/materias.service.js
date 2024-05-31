const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class MateriasService {

    async getAll() {
        try {
            const materias = await prisma.materias.findMany({
                include: {
                    Catalogo_Materias: true,
                    Carreras: true,
                    Periodos_Academicos: true
                }
            });
            return materias;
        } catch (error) {
            throw new Error(`No se pudieron obtener las materias: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const materia = await prisma.materias.findUnique({
                where: {
                    id_materia: parseInt(id, 10)
                },
                include: {
                    Catalogo_Materias: true,
                    Carreras: true,
                    Periodos_Academicos: true
                }
            });
            return materia;
        } catch (error) {
            throw new Error(`No se pudo obtener la materia: ${error.message}`);
        }
    }

    async create({ codigo_materia, estado, id_catalogo, id_carrera, id_periodo }) {
        try {
            const nuevaMateria = await prisma.materias.create({
                data: {
                    codigo_materia,
                    estado,
                    id_catalogo,
                    id_carrera,
                    id_periodo
                }
            });
            return nuevaMateria;
        } catch (error) {
            throw new Error(`No se pudo crear la materia: ${error.message}`);
        }
    }
    async createMany(materias) {
        try {
            const nuevasMaterias = await prisma.materias.createMany({
                data: materias
            });
            return nuevasMaterias;
        } catch (error) {
            throw new Error(`No se pudieron crear las materias: ${error.message}`);
        }
    }

    

    async update(id, { codigo_materia, estado, id_catalogo, id_carrera, id_periodo }) {
        try {
            const materiaActualizada = await prisma.materias.update({
                where: {
                    id_materia: parseInt(id, 10)
                },
                data: {
                    codigo_materia,
                    estado,
                    id_catalogo,
                    id_carrera,
                    id_periodo
                }
            });
            return materiaActualizada;
        } catch (error) {
            throw new Error(`No se pudo actualizar la materia: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const materiaEliminada = await prisma.materias.delete({
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
