const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

class BitacoraService {
  async crearBitacora(data) {
    return await prisma.bitacora.create({
      data: {
        codigo_bitacora: data.codigo_bitacora,
        descripcion: data.descripcion,
        fecha_generado: new Date(),
        fecha_registro: new Date(),
        estado: 'activa',
        id_usuario: data.id_usuario,
        ReservaBitacora: {
          create: data.reservas.map(reservaId => ({ id_reserva: reservaId }))
        }
      }
    });
  }

  async obtenerBitacorasActivas() {
    return await prisma.bitacora.findMany({
      where: { estado: 'activa' },
      include: { ReservaBitacora: true, Usuario: true }
    });
  }

  async obtenerBitacorasCompletadas() {
    return await prisma.bitacora.findMany({
      where: { estado: 'completada' },
      include: { ReservaBitacora: true, Usuario: true }
    });
  }

  async obtenerBitacoraPorId(id) {
    return await prisma.bitacora.findUnique({
      where: { id_bitacora: id },
      include: { ReservaBitacora: true, Usuario: true }
    });
  }

  async editarBitacora(id, data) {
    return await prisma.bitacora.update({
      where: { id_bitacora: id },
      data: {
        descripcion: data.descripcion,
        ReservaBitacora: {
          deleteMany: {},  // Elimina las reservas actuales asociadas a la bitácora
          create: data.reservas.map(reservaId => ({ id_reserva: reservaId }))  // Asocia nuevas reservas
        }
      }
    });
  }

  async subirEvidenciaBitacora(id, evidencia) {
    return await prisma.bitacora.update({
      where: { id_bitacora: id },
      data: {
        evidencia: evidencia,  // Ruta del archivo de evidencia
        estado: 'completada'    // Cambia el estado a completada
      }
    });
  }
}

module.exports = BitacoraService;