// asistencia.service.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AsistenciaService {
  async getAsistenciasByReserva(reservaId) {
    try {
      return await prisma.asistencia.findMany({
        where: { id_reserva: reservaId },
        include: {
          Inscripcion: {
            include: {
              Usuario: {
                include: {
                  Detalle_Usuario: true
                }
              },
            },
          },
        },
      });
    } catch (error) {
      console.error('Error en getAsistenciasByReserva:', error);
      throw new Error('Error al obtener las asistencias por reserva');
    }
  }

  async createOrUpdateAsistencia(data) {
    try {
      const existingAsistencia = await prisma.asistencia.findFirst({
        where: {
          id_inscripcion: data.id_inscripcion,
          id_reserva: data.id_reserva,
        },
      });

      if (existingAsistencia) {
        return await prisma.asistencia.update({
          where: { id_asistencia: existingAsistencia.id_asistencia },
          data,
        });
      } else {
        return await prisma.asistencia.create({ data });
      }
    } catch (error) {
      console.error('Error en createOrUpdateAsistencia:', error);
      throw new Error('Error al crear o actualizar la asistencia');
    }
  }

  async updateAsistencia(id, data) {
    try {
      return await prisma.asistencia.update({
        where: { id_asistencia: id },
        data,
      });
    } catch (error) {
      console.error('Error en updateAsistencia:', error);
      throw new Error('Error al actualizar la asistencia');
    }
  }

  async markAttendance(id_reserva, id_estudiante) {
    try {
      const inscripcion = await prisma.inscripcion.findFirst({
        where: {
          id_materia: (await prisma.reserva.findFirst({ where: { id_reserva } })).id_materia,
          id_estudiante
        }
      });

      if (!inscripcion) {
        throw new Error('Inscripción no encontrada');
      }

      const asistencia = await prisma.asistencia.findFirst({
        where: {
          id_inscripcion: inscripcion.id_inscripcion,
          id_reserva
        }
      });

      if (asistencia) {
        return await prisma.asistencia.update({
          where: { id_asistencia: asistencia.id_asistencia },
          data: {
            tipo_asistencia: 'Presente',
            fecha_asistencia: new Date()
          }
        });
      } else {
        return await prisma.asistencia.create({
          data: {
            id_inscripcion: inscripcion.id_inscripcion,
            id_reserva,
            tipo_asistencia: 'Presente',
            fecha_asistencia: new Date()
          }
        });
      }
    } catch (error) {
      console.error('Error en markAttendance:', error);
      throw new Error('Error al marcar la asistencia via QR');
    }
  }
}

module.exports = new AsistenciaService();
