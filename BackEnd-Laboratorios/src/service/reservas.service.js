// reserva.service.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ReservaService {
  async createReserva(data) {
    data.fecha_inicio = new Date(data.fecha_inicio).toISOString();
    data.fecha_fin = new Date(data.fecha_fin).toISOString();
    const overlappingReservations = await prisma.reserva.findMany({
      where: {
        id_laboratorio: data.id_laboratorio,
        fecha_inicio: { lte: data.fecha_fin },
        fecha_fin: { gte: data.fecha_inicio },
        estado: 'activo'
      }
    });

    if (overlappingReservations.length > 0) {
      const error = new Error('El laboratorio ya está reservado para este horario');
      error.status = 400;
      throw error;
    }

    data.estado = 'activo';
    const reserva = await prisma.reserva.create({ data });

    const io = global.io;
    if (io) {
      io.emit('reservaCambiada', reserva);
    }

    return reserva;
  }

  async updateReserva(id, data) {
    try {
      data.fecha_inicio = new Date(data.fecha_inicio).toISOString();
      data.fecha_fin = new Date(data.fecha_fin).toISOString();

      console.log('Datos para actualizar reserva:', data);

      const reserva = await prisma.reserva.update({
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

      const io = global.io;
      if (io) {
        io.emit('reservaCambiada', reserva);
      }

      return reserva;
    } catch (error) {
      console.error('Error en updateReserva:', error); // Log del error
      throw new Error('Error al actualizar la reserva');
    }
  }

  async changeReservaStatus(id) {
    try {
      const reserva = await prisma.reserva.update({
        where: { id_reserva: parseInt(id) },
        data: { estado: 'inactivo' }
      });

      const io = global.io;
      if (io) {
        io.emit('reservaCambiada', reserva);
      }

      return reserva;
    } catch (error) {
      console.error('Error en changeReservaStatus:', error);
      throw new Error('Error al cambiar el estado de la reserva');
    }
  }

  async getReservas() {
    try {
      return await prisma.reserva.findMany({
        where: { estado: 'activo' },
        include: {
          Materia: {
            include: {
              Catalogo_Materia: true,
            }
          },
          Laboratorio: true
        }
      });
    } catch (error) {
      console.error('Error en getReservas:', error);
      throw new Error('Error al obtener las reservas');
    }
  }

  async getReservasByLaboratorio(laboratorioId) {
    try {
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
    } catch (error) {
      console.error('Error en getReservasByLaboratorio:', error);
      throw new Error('Error al obtener las reservas por laboratorio');
    }
  }

  async markExpiredReservas() {
    try {
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
    } catch (error) {
      console.error('Error en markExpiredReservas:', error);
      throw new Error('Error al marcar reservas expiradas');
    }
  }

  //DOCENTE

  async getMateriasPorDocente(id_docente) {
    try {
      return await prisma.materia.findMany({
        where: { id_docente: id_docente },
        include: {
          Catalogo_Materia: true,

          Usuario: {
            include: {
              Detalle_Usuario: true
            }
          }
        }


      });
    } catch (error) {
      console.error('Error en getMateriasPorDocente:', error);
      throw new Error('Error al obtener las materias del docente');
    }
  }

  async getReservasByDocente(docenteId) {
    try {
      return await prisma.reserva.findMany({
        where: {
          Materia: {
            id_docente: docenteId,
          },
          estado: 'activo',
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
    } catch (error) {
      console.error('Error en getReservasByDocente:', error);
      throw new Error('Error al obtener las reservas del docente');
    }
  }

  //ESTUDIANTE
  async getReservasByEstudiante(id_estudiante) {
    try {
      // Obtener todas las inscripciones del estudiante
      const inscripciones = await prisma.inscripcion.findMany({
        where: {
          id_estudiante: id_estudiante,
        },
        select: {
          id_materia: true
        }
      });

      // Extraer todos los ids de las materias de las inscripciones
      const materiaIds = inscripciones.map(inscripcion => inscripcion.id_materia);

      // Obtener las reservas que correspondan a las materias en las que está inscrito el estudiante
      return await prisma.reserva.findMany({
        where: {
          id_materia: {
            in: materiaIds
          }
        },
        include: {
          Materia: {
            include: {
              Usuario: {
                select: {
                  Detalle_Usuario: {
                    select: {
                      nombres: true,
                      apellidos: true
                    }
                  }
                }
              },
              Catalogo_Materia: true,
            }
          },
          Laboratorio: true,
        }
      });
    } catch (error) {
      console.error('Error en getReservasByEstudiante:', error);
      throw new Error('Error al obtener las reservas del estudiante');
    }
  }
}

module.exports = new ReservaService();
