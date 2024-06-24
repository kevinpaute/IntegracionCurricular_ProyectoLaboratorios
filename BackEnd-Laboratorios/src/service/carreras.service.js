const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CarreraService {
    
    async getAll() {
        try {
            const carreras = await prisma.carrera.findMany();
            return carreras;
        } catch (error) {
            throw new Error(`No se pudieron obtener las carreras: ${error.message}`);
        }
    }


    async getById(id) {
        try {
            const carrera = await prisma.carrera.findUnique({
                where: {
                    id_carrera: parseInt(id, 10)
                }
            });
            return carrera;
        } catch (error) {
            throw new Error(`No se pudo obtener la carrera: ${error.message}`);
        }
    }
  
    async create({ nombre_carrera, estado }) {
        try {
            const nuevaCarrera = await prisma.carrera.create({
                data: {
                    nombre_carrera,
                    estado
                }
            });
            return nuevaCarrera;
        } catch (error) {
            throw new Error(`No se pudo crear la carrera: ${error.message}`);
        }
    }
    async createMany(carreras) {
        try {
            const nuevasCarreras = await prisma.carrera.createMany({
                data: carreras
            });
            return nuevasCarreras;
        } catch (error) {
            throw new Error(`No se pudieron crear las carreras: ${error.message}`);
        }
    }
  
    async update(id, { nombre_carrera, estado }) {
        try {
            const carreraActualizada = await prisma.carrera.update({
                where: {
                    id_carrera: parseInt(id, 10)
                },
                data: {
                    nombre_carrera,
                    estado
                }
            });
            return carreraActualizada;
        } catch (error) {
            throw new Error(`No se pudo actualizar la carrera: ${error.message}`);
        }
    }
  
    async delete(id) {
        try {
            const carreraEliminada = await prisma.carrera.delete({
                where: {
                    id_carrera: parseInt(id, 10)
                }
            });
            return carreraEliminada;
        } catch (error) {
            throw new Error(`No se pudo eliminar la carrera: ${error.message}`);
        }
    }
}

module.exports = new CarreraService();
