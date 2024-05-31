const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CatalogoMateriasService {
    
    async getAll() {
        try {
            const catalogoMaterias = await prisma.catalogo_Materias.findMany();
            return catalogoMaterias;
        } catch (error) {
            throw new Error(`No se pudieron obtener los catálogos de materias: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const catalogoMateria = await prisma.catalogo_Materias.findUnique({
                where: {
                    id_catalogo: parseInt(id, 10)
                }
            });
            return catalogoMateria;
        } catch (error) {
            throw new Error(`No se pudo obtener el catálogo de materia: ${error.message}`);
        }
    }
  
    async create({ nombre_materia }) {
        try {
            const nuevoCatalogoMateria = await prisma.catalogo_Materias.create({
                data: {
                    nombre_materia
                }
            });
            return nuevoCatalogoMateria;
        } catch (error) {
            throw new Error(`No se pudo crear el catálogo de materia: ${error.message}`);
        }
    }

    async createMany(materias) {
        try {
            const nuevasMaterias = await prisma.catalogo_Materias.createMany({
                data: materias
            });
            return nuevasMaterias;
        } catch (error) {
            throw new Error(`No se pudieron crear los registros del catálogo de materias: ${error.message}`);
        }
    }
  
    async update(id, { nombre_materia }) {
        try {
            const catalogoMateriaActualizado = await prisma.catalogo_Materias.update({
                where: {
                    id_catalogo: parseInt(id, 10)
                },
                data: {
                    nombre_materia
                }
            });
            return catalogoMateriaActualizado;
        } catch (error) {
            throw new Error(`No se pudo actualizar el catálogo de materia: ${error.message}`);
        }
    }
  
    async delete(id) {
        try {
            const catalogoMateriaEliminado = await prisma.catalogo_Materias.delete({
                where: {
                    id_catalogo: parseInt(id, 10)
                }
            });
            return catalogoMateriaEliminado;
        } catch (error) {
            throw new Error(`No se pudo eliminar el catálogo de materia: ${error.message}`);
        }
    }
}

module.exports = new CatalogoMateriasService();
