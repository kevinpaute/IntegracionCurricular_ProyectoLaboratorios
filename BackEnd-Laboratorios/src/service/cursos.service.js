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

    async obtenerCursosPorCarreraUltimoPeriodo(carreraId) {
      try {
        const ultimoPeriodo = await prisma.periodo_Academico.findFirst({
          where: { estado: 'ACTIVO' },
          orderBy: { fecha_creacion: 'desc' }
        });
  
        if (!ultimoPeriodo) {
          throw new Error('No se encontró un periodo académico activo');
        }
  
        const cursos = await prisma.curso.findMany({
          where: {
            id_carrera: parseInt(carreraId),
            id_periodo: ultimoPeriodo.id_periodo
          }
        });
  
        return cursos;
      } catch (error) {
        throw new Error(`Error al obtener cursos: ${error.message}`);
      }
    }
}

module.exports = new CursosService();