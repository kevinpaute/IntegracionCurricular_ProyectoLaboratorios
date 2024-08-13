const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class BitacoraService {
  async createBitacora(data) {
    return await prisma.bitacora.create({ data });
  }

  async getAllBitacoras() {
    return await prisma.bitacora.findMany({
      include: { Laboratorio: true },
    });
  }

  async getBitacoraById(id_bitacora) {
    return await prisma.bitacora.findUnique({
      where: { id_bitacora: Number(id_bitacora) },
      include: {
        Laboratorio: true,
        Reserva: {
          include: {
            Materia: {
              include: {
                Usuario: {
                  include: {
                    Detalle_Usuario: true,
                  },
                },
                Catalogo_Materia: true,
              },
            },
          },
        },
      },
    });
  }

  async updateBitacora(id_bitacora, data) {
    return await prisma.bitacora.update({
      where: { id_bitacora: Number(id_bitacora) },
      data,
    });
  }
}

module.exports = new BitacoraService();
