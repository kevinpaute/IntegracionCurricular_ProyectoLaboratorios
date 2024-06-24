const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CursosService {
    async getAll() {
        try {
            const cursos = await prisma.curso.findMany({
                include: {
                    Materia: true,
                    Usuario: true
                }
            });
            return cursos;
        } catch (error) {
            throw new Error(`No se pudieron obtener los cursos: ${error.message}`);
        }
    }
}