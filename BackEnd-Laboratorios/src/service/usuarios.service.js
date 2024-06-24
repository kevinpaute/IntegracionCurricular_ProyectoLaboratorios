const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

class UsuariosService {
    async getAll() {
        return await prisma.usuario.findMany({
            include: {
                Detalle_Usuario: true,
                Roles: true
            }
        });
    }

    async getById(id) {
        return await prisma.usuario.findUnique({
            where: { id_usuario: parseInt(id, 10) },
            include: {
                Detalle_Usuario: true,
                Roles: true
            }
        });
    }

    async create(usuario) {
        return await prisma.usuario.create({
          data: usuario
        });
      }

      async update(id, usuario) {
        return await prisma.usuario.update({
          where: { id_usuario: parseInt(id) },
          data: usuario
        });
      }

    async updatePassword(id, contrasena) {
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        return await prisma.detalle_Usuario.update({
            where: { id_detalle_usuario: parseInt(id, 10) },
            data: {
                contrasena: hashedPassword
            }
        });
    }
}

module.exports = new UsuariosService();
