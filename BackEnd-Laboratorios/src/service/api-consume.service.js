const axios = require('axios');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config(); // Para cargar las variables de entorno desde .env

class ApiConsumeService {
  constructor() {
    this.baseURL = 'https://www.istla-sigala.edu.ec/public';
  }

  async getToken() {
    const response = await axios.post(`${this.baseURL}/login-api`, {
      username: process.env.USER_API_USERNAME, // Usuario desde .env
      password: process.env.USER_API_PASSWORD  // Contraseña desde .env
    });
    return response.data.token;
  }

  async fetchUsuarios() {
    const token = await this.getToken();
    const response = await axios.get(`${this.baseURL}/ver-usuarios`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }

  async saveUsuarios() {
    try {
      const usuarios = await this.fetchUsuarios();

      // Mapeo de ID_PERFILES_USUARIOS a id_rol en la base de datos
      const perfilToRolMap = {
        13: 1, // Administrador
        14: 4, // Estudiante
        15: 3  // Docente
      };

      for (let usuario of usuarios) {
        const idRol = perfilToRolMap[parseInt(usuario.ID_PERFILES_USUARIOS)];

        // Solo continuar si el usuario tiene un perfil mapeado a un rol
        if (idRol) {
          const existingUsuario = await prisma.usuario.findUnique({
            where: { codigo_usuario: usuario.ID_USUARIOS }
          });

          if (!existingUsuario) {
            // Encriptar la cédula como contraseña
            const hashedPassword = await bcrypt.hash(usuario.DOCUMENTO_USUARIOS, 10);

            await prisma.usuario.create({
              data: {
                id_detalle_usuario: usuario.ID_USUARIOS,
                id_rol: idRol,
                codigo_usuario: usuario.ID_USUARIOS,
                Detalle_Usuario: {
                  create: {
                    nombres: usuario.NOMBRES_USUARIOS,
                    apellidos: usuario.APELLIDOS_USUARIOS,
                    cedula: usuario.DOCUMENTO_USUARIOS,
                    fecha_nacimiento: new Date(usuario.FECHA_NACIMIENTO_USUARIOS),
                    correo: usuario.CORREO_USUARIOS,
                    celular: usuario.TELEFONO_USUARIOS,
                    genero: usuario.GENERO_USUARIOS || '', // Para manejar los vacíos
                    estado: usuario.STATUS_USUARIOS,
                    contrasena: hashedPassword // Almacenar la contraseña encriptada
                  }
                }
              }
            });
          }
        }
      }
    } catch (error) {
      console.error('Error saving usuarios:', error);
      throw error;
    }
  }
}

module.exports = new ApiConsumeService();
