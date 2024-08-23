const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CatalogoMateriasService {
    
    async getAll() {
        try {
            const catalogoMaterias = await prisma.catalogo_Materia.findMany();
            return catalogoMaterias;
        } catch (error) {
            throw new Error(`No se pudieron obtener los catálogos de materias: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const catalogoMateria = await prisma.catalogo_Materia.findUnique({
                where: {
                    id_catalogo: parseInt(id, 10)
                }
            });
            return catalogoMateria;
        } catch (error) {
            throw new Error(`No se pudo obtener el catálogo de materia: ${error.message}`);
        }
    }
  

}

module.exports = new CatalogoMateriasService();
