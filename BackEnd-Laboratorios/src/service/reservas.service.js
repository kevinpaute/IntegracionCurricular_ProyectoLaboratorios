// reserva.service.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ReservaService {
  async createReserva(data) {
    // Verificar disponibilidad del laboratorio
    const overlappingReservations = await prisma.reserva.findMany({
      where: {
        id_laboratorio: data.id_laboratorio,
        fecha_inicio: { lte: data.fecha_fin },
        fecha_fin: { gte: data.fecha_inicio },
        estado: 'activo'
      }
    });
  
    if (overlappingReservations.length > 0) {
      throw new Error('El laboratorio ya está reservado para este horario');
    }
  
    data.estado = 'activo';
    return await prisma.reserva.create({ data });
  }

  async updateReserva(id, data) {
    try {
      // Formatear fechas a ISO-8601 si no lo están
      data.fecha_inicio = new Date(data.fecha_inicio).toISOString();
      data.fecha_fin = new Date(data.fecha_fin).toISOString();
      console.log('Datos para actualizar reserva:', data);
  
      return await prisma.reserva.update({
        where: { id_reserva: parseInt(id) },
        data: {
          fecha_inicio: data.fecha_inicio,
          fecha_fin: data.fecha_fin,
          motivo: data.motivo,
          estado: data.estado,
          Materia: {
            connect: { id_materia: data.id_materia }
          },
          Laboratorio: {
            connect: { id_laboratorio: data.id_laboratorio }
          }
        }
      });
    } catch (error) {
      console.error('Error en updateReserva:', error); // Log del error
      throw new Error('Error al actualizar la reserva');
    }
  }
  
  

  async changeReservaStatus(id) {
    try {
      return await prisma.reserva.update({
        where: { id_reserva: parseInt(id) },
        data: { estado: 'inactivo' }
      });
    } catch (error) {
      console.error('Error en changeReservaStatus:', error);
      throw new Error('Error al cambiar el estado de la reserva');
    }
  }

  async getReservas() {
    return await prisma.reserva.findMany({ where: { estado: 'activo'},
      include: {
        Materia: {
          include: {
            Catalogo_Materia: true,
          }
        },
        Laboratorio: true
      }
      });

    
  }

  async getReservasByLaboratorio(laboratorioId) {
    return await prisma.reserva.findMany({
      where: {
        estado: 'activo',
        id_laboratorio: laboratorioId
      },
      include: {
        Materia: {
          include: {
            Catalogo_Materia: true,
          },
        },
        Laboratorio: true,
      },
    });
  }

  async markExpiredReservas() {
    const now = new Date();
    return await prisma.reserva.updateMany({
      where: {
        fecha_fin: {
          lt: now
        },
        estado: 'activo'
      },
      data: { estado: 'inactivo' }
    });
  }
}

module.exports = new ReservaService();
