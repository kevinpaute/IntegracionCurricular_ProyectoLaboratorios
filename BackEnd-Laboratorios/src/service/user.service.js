const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

class UserService {
  async register(userData) {
    const hashedPassword = await bcrypt.hash(userData.contrasena, 10);
    const user = await prisma.usuarios.create({
      data: {
        primer_nombre: userData.primer_nombre,
        segundo_nombre: userData.segundo_nombre,
        primer_apellido: userData.primer_apellido,
        segundo_apellido: userData.segundo_apellido,
        cedula: userData.cedula,
        fecha_nacimiento: new Date(userData.fecha_nacimiento),
        correo: userData.correo,
        celular: userData.celular,
        edad: userData.edad,
        genero: userData.genero,
        estado: 'activo',
        id_rol: userData.id_rol,
        Autenticacion: {
          create: {
            usuario: userData.usuario,
            contrasena: hashedPassword
          }
        }
      }
    });
    return user;
  }

  async login(credentials) {
    const userAuth = await prisma.autenticacion.findUnique({
      where: { usuario: credentials.usuario },
      include: { Usuarios: true }
    });

    if (!userAuth) {
      throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(credentials.contrasena, userAuth.contrasena);
    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }

    const token = jwt.sign({ id_usuario: userAuth.id_usuario, id_rol: userAuth.Usuarios.id_rol }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    return { token, user: userAuth.Usuarios };
  }

  async getAllUsers() {
    const users = await prisma.usuarios.findMany({
      include: { Roles: true, Autenticacion: true }
    });
    return users;
  }

  async getUserById(id) {
    const user = await prisma.usuarios.findUnique({
      where: { id_usuario: parseInt(id, 10) },
      include: { Roles: true, Autenticacion: true }
    });
    return user;
  }

  async updateUser(id, userData) {
    if (userData.contrasena) {
      userData.contrasena = await bcrypt.hash(userData.contrasena, 10);
    }

    const user = await prisma.usuarios.update({
      where: { id_usuario: parseInt(id, 10) },
      data: {
        primer_nombre: userData.primer_nombre,
        segundo_nombre: userData.segundo_nombre,
        primer_apellido: userData.primer_apellido,
        segundo_apellido: userData.segundo_apellido,
        cedula: userData.cedula,
        fecha_nacimiento: new Date(userData.fecha_nacimiento),
        correo: userData.correo,
        celular: userData.celular,
        edad: userData.edad,
        genero: userData.genero,
        estado: userData.estado,
        id_rol: userData.id_rol,
        Autenticacion: {
          update: {
            usuario: userData.usuario,
            contrasena: userData.contrasena
          }
        }
      }
    });

    return user;
  }

  async deleteUser(id) {
    const user = await prisma.usuarios.delete({
      where: { id_usuario: parseInt(id, 10) }
    });
    return user;
  }
}

module.exports = new UserService();
