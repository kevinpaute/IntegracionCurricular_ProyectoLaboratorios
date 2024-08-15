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

  async getLastDetalleUsuarioId() {
    const lastDetalleUsuario = await prisma.detalle_Usuario.findFirst({
      orderBy: {
        id_detalle_usuario: 'desc'
      }
    });
    return lastDetalleUsuario ? lastDetalleUsuario.id_detalle_usuario : 0;
  }

  async create(usuario) {
    const { Detalle_Usuario, id_rol } = usuario;
    
    const hashedPassword = await bcrypt.hash(Detalle_Usuario.contrasena, 10);
    Detalle_Usuario.contrasena = hashedPassword;
  
    const fechaNacimiento = new Date(Detalle_Usuario.fecha_nacimiento).toISOString().split('T')[0];
  
    try {
      // Usar una transacción para asegurar que ambas operaciones se ejecuten de manera atómica
      return await prisma.$transaction(async (prisma) => {
        const detalleUsuario = await prisma.detalle_Usuario.create({
          data: {
            ...Detalle_Usuario,
            fecha_nacimiento: new Date(fechaNacimiento)
          }
        });
  
        const usuarioCreado = await prisma.usuario.create({
          data: {
            id_detalle_usuario: detalleUsuario.id_detalle_usuario,
            id_rol,
          },
          include: {
            Detalle_Usuario: true,
            Roles: true
          }
        });
  
        return usuarioCreado;
      });
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
  

  async update(id, usuario) {
    try {
      const { Detalle_Usuario, id_rol } = usuario;
  
      // Convertir la fecha de nacimiento a formato ISO-8601 solo con la fecha (sin tiempo)
      const fechaNacimiento = new Date(Detalle_Usuario.fecha_nacimiento).toISOString().split('T')[0];
  
      return await prisma.usuario.update({
        where: { id_usuario: parseInt(id, 10) },
        data: {
          // Actualizar el rol del usuario usando la relación
          Roles: {
            connect: {
              id_rol: id_rol // Aquí conectas el rol
            }
          },
          // Actualizar los detalles del usuario
          Detalle_Usuario: {
            update: {
              nombres: Detalle_Usuario.nombres,
              apellidos: Detalle_Usuario.apellidos,
              cedula: Detalle_Usuario.cedula,
              fecha_nacimiento: new Date(fechaNacimiento),
              correo: Detalle_Usuario.correo,
              celular: Detalle_Usuario.celular,
              genero: Detalle_Usuario.genero,
              estado: Detalle_Usuario.estado // Actualizar el estado del usuario
            }
          }
        },
        include: {
          Detalle_Usuario: true,
          Roles: true
        }
      });
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async assignRole(docenteId, rolId) {
    try {
      return await prisma.usuario.update({
        where: { id_usuario: docenteId },
        data: { id_rol: rolId }
      });
    } catch (error) {
      console.error("Error assigning role:", error);
      throw error;
    }
  }

  

  async getDocentes() {
    try {
      return await prisma.usuario.findMany({
        where: { id_rol: 3 }, // Suponiendo que el rol de docente es 3
        include: {
          Detalle_Usuario: true
        }
      });
    } catch (error) {
      console.error("Error fetching docentes:", error);
      throw error;
    }
  }
  async getAllRoles() {
    return await prisma.roles.findMany();
  }
}

module.exports = new UsuariosService();
