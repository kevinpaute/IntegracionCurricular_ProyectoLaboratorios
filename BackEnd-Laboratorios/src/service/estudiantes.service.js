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
}


module.exports = new EstudiantesService();
