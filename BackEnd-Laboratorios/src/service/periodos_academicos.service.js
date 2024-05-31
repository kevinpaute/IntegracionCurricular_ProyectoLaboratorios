const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PeriodosAcademicosService {
    
    async getAll() {
        try {
            const periodos = await prisma.periodos_Academicos.findMany();
            return periodos;
        } catch (error) {
            throw new Error(`No se pudieron obtener los períodos académicos: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const periodo = await prisma.periodos_Academicos.findUnique({
                where: {
                    id_periodo: parseInt(id, 10)
                }
            });
            return periodo;
        } catch (error) {
            throw new Error(`No se pudo obtener el período académico: ${error.message}`);
        }
    }
  
    async create({ nombre_periodo, detalle_periodo, anio_lectivo, estado }) {
        try {
            const nuevoPeriodo = await prisma.periodos_Academicos.create({
                data: {
                    nombre_periodo,
                    detalle_periodo,
                    anio_lectivo,
                    estado
                }
            });
            return nuevoPeriodo;
        } catch (error) {
            throw new Error(`No se pudo crear el período académico: ${error.message}`);
        }
    }
    async createMany(periodos) {
        try {
            const nuevosPeriodos = await prisma.periodos_Academicos.createMany({
                data: periodos
            });
            return nuevosPeriodos;
        } catch (error) {
            throw new Error(`No se pudieron crear los periodos académicos: ${error.message}`);
        }
    }
  
    async update(id, { nombre_periodo, detalle_periodo, anio_lectivo, estado }) {
        try {
            const periodoActualizado = await prisma.periodos_Academicos.update({
                where: {
                    id_periodo: parseInt(id, 10)
                },
                data: {
                    nombre_periodo,
                    detalle_periodo,
                    anio_lectivo,
                    estado
                }
            });
            return periodoActualizado;
        } catch (error) {
            throw new Error(`No se pudo actualizar el período académico: ${error.message}`);
        }
    }
  
    async delete(id) {
        try {
            const periodoEliminado = await prisma.periodos_Academicos.delete({
                where: {
                    id_periodo: parseInt(id, 10)
                }
            });
            return periodoEliminado;
        } catch (error) {
            throw new Error(`No se pudo eliminar el período académico: ${error.message}`);
        }
    }
}

module.exports = new PeriodosAcademicosService();
