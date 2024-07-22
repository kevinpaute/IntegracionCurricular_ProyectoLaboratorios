const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class EstudiantesService {
    async getByMateria(idMateria) {
        try{
            const estudiantes = await prisma.inscripcion.findMany({
                where: { id_materia: parseInt(idMateria) },
                include: {
                    Usuario: {
                        include: {
                            Detalle_Usuario: true
                        }
                    }
                }
            });
            return estudiantes;
        }catch{
            throw new Error(`No se pudieron obtener los estudiantes: ${error.message}`);
        }

    }

    async getInscripcionesPorMateria(id_materia) {
        try {
          return await prisma.inscripcion.findMany({
            where: {
              id_materia: id_materia
            },
            include: {
              Usuario:  {        
                include: {
                  Detalle_Usuario: true
                }
              },
            }
          });
        } catch (error) {
          console.error('Error al obtener inscripciones por materia:', error);
          throw new Error('Error al obtener inscripciones por materia');
        }
      }
}


module.exports = new EstudiantesService();
