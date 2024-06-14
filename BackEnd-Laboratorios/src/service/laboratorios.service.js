const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class LaboratorioService {
    
    // Obtener todos los laboratorios
    async getAll() {
        try {
            const laboratorios = await prisma.laboratorio.findMany({
                include: {
                    Equipos_Laboratorio: true,
                    Reservas: true 
                }
            });
            return laboratorios;
        } catch (error) {
            throw new Error(`No se pudieron obtener los laboratorios: ${error.message}`);
        }
    }

    // Obtener un laboratorio por id
    async getById(id) {
        try {
            const laboratorio = await prisma.laboratorio.findUnique({
                where: {
                    id_laboratorio: parseInt(id, 10)
                },
                include: {
                    Equipos_Laboratorio: true,
                    Reservas: true 
                }
            });
            return laboratorio;
        } catch (error) {
            throw new Error(`No se pudo obtener el laboratorio: ${error.message}`);
        }
    }
  
    // Crear un nuevo laboratorio
    async create({ nombre_laboratorio, ubicacion, capacidad }) {
        try {
            const nuevoLaboratorio = await prisma.laboratorio.create({
                data: {
                    nombre_laboratorio,
                    ubicacion,
                    capacidad
                }
            });
            return nuevoLaboratorio;
        } catch (error) {
            throw new Error(`No se pudo crear el laboratorio: ${error.message}`);
        }
    }
    async createMany(laboratorios) {
        try {
            const nuevosLaboratorios = await prisma.laboratorio.createMany({
                data: laboratorios
            });
            return nuevosLaboratorios;
        } catch (error) {
            throw new Error(`No se pudieron crear los laboratorios: ${error.message}`);
        }
    }
  
    // Actualizar un laboratorio por id

    async update(id, { nombre_laboratorio, ubicacion, capacidad }) {
        try {
            const laboratorioActualizado = await prisma.laboratorio.update({
                where: {
                    id_laboratorio: parseInt(id, 10)
                },
                data: {
                    nombre_laboratorio,
                    ubicacion,
                    capacidad
                }
            });
            return laboratorioActualizado;
        } catch (error) {
            throw new Error(`No se pudo actualizar el laboratorio: ${error.message}`);
        }
    }
  
    // Eliminar un laboratorio por id
    async delete(id) {
        try {
            const laboratorioEliminado = await prisma.laboratorio.delete({
                where: {
                    id_laboratorio: parseInt(id, 10)
                }
            });
            return laboratorioEliminado;
        } catch (error) {
            throw new Error(`No se pudo eliminar el laboratorio: ${error.message}`);
        }
    }
}

module.exports = new LaboratorioService();
