const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CursosService {
    async getAll() {
        try {
            const cursos = await prisma.curso.findMany({
                include: {
                    Periodo_Academico: true,
                    Carrera: true
                }
            });
            return cursos;
        } catch (error) {
            throw new Error(`No se pudieron obtener los cursos: ${error.message}`);
        }
    }

    async getCursosByCarrera(idCarrera) {
        try {
          const cursos = await prisma.curso.findMany({
            where: { id_carrera: parseInt(idCarrera) },
            include: {
              Periodo_Academico: true,
              Carrera: true
            }
          });
          return cursos;
        } catch (error) {
          throw new Error(`No se pudieron obtener los cursos: ${error.message}`);
        }
      }
    
      async getCursosByPeriodo(idPeriodo) {
        try {
          const cursos = await prisma.curso.findMany({
            where: { id_periodo: parseInt(idPeriodo) },
            include: {
              Periodo_Academico: true,
              Carrera: true
            }
          });
          return cursos;
        } catch (error) {
          throw new Error(`No se pudieron obtener los cursos: ${error.message}`);
        }
      }

    async getByPeriodoAndCarrera(idPeriodo, idCarrera) {
        try {
            const cursos = await prisma.curso.findMany({
                where: {
                    id_periodo: parseInt(idPeriodo),
                    //id_carrera: parseInt(idCarrera),
                },
                include: {
                    Periodo_Academico: true
                }
            })
            return cursos;
        } catch (error) {
            throw new Error(`No se pudieron obtener los cursos: ${error.message}`);
        }
    }

    async getById(id) {
        return await prisma.curso.findUnique({
            where: { id_curso: parseInt(id, 10) },
            include: { Periodo_Academico: true, Carrera: true },
        });
    }
}

module.exports = new CursosService();