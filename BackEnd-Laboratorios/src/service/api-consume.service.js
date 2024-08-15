const axios = require('axios');
const bcrypt = require('bcrypt');
const FormData = require('form-data');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config(); // Para cargar las variables de entorno desde .env

class ApiConsumeService {
  constructor() {
    this.baseURL = 'https://www.istla-sigala.edu.ec/public';
  }

  async getToken() {
    try {
      // Crear una instancia de FormData
      const form = new FormData();
      form.append('username', process.env.USER_API_USERNAME);
      form.append('password', process.env.USER_API_PASSWORD);

      // Enviar la solicitud utilizando Axios y FormData
      const response = await axios.post(`${this.baseURL}/login-api`, form, {
        headers: form.getHeaders() // Configurar los encabezados correctamente
      });
      console.log('Login exitoso:', response.data);  // Mensaje de éxito en el login

      return response.data.token;
    } catch (error) {
      console.error('Error obteniendo token:', error.message);
      throw error;
    }
  }

  async fetchUsuarios() {
    const token = await this.getToken();
    const response = await axios.get(`${this.baseURL}/ver-usuarios`, {
      headers: { Authorization: token } // Usar el token directamente
    });
    return response.data;
  }

  calculateAge(birthDate) {
    const today = new Date();
    const birthDateObject = new Date(birthDate);
    let age = today.getFullYear() - birthDateObject.getFullYear();
    const monthDiff = today.getMonth() - birthDateObject.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObject.getDate())) {
      age--;
    }
    return age;
  }

  async saveUsuarios() {
    try {
      const usuarios = await this.fetchUsuarios();
  
      const perfilToRolMap = {
        13: 1, // Administrador
        14: 4, // Estudiante
        15: 3  // Docente
      };
  
      for (let usuario of usuarios) {
        const idRol = perfilToRolMap[parseInt(usuario.ID_PERFILES_USUARIOS)];
        if (idRol) {
          // First, check if the user exists in the Detalle_Usuario table by codigo_usuario
          const existingDetalleUsuario = await prisma.detalle_Usuario.findUnique({
            where: { codigo_usuario: usuario.ID_USUARIOS }
          });
  
          // If the user does not exist in Detalle_Usuario, create it
          if (!existingDetalleUsuario) {
            const hashedPassword = await bcrypt.hash(usuario.DOCUMENTO_USUARIOS, 10);
  
            // Validate and calculate age if the date is valid
            let fechaNacimiento = null;
            let edad = null;
  
            if (usuario.FECHA_NACIMIENTO_USUARIOS !== '0000-00-00') {
              fechaNacimiento = new Date(usuario.FECHA_NACIMIENTO_USUARIOS);
              edad = this.calculateAge(fechaNacimiento);
            }
  
            const detalleUsuario = await prisma.detalle_Usuario.create({
              data: {
                nombres: usuario.NOMBRES_USUARIOS,
                apellidos: usuario.APELLIDOS_USUARIOS,
                cedula: usuario.DOCUMENTO_USUARIOS,
                fecha_nacimiento: fechaNacimiento,
                correo: usuario.CORREO_USUARIOS,
                celular: usuario.TELEFONO_USUARIOS,
                genero: usuario.GENERO_USUARIOS || '',
                estado: usuario.STATUS_USUARIOS,
                contrasena: hashedPassword,
                codigo_usuario: usuario.ID_USUARIOS,
                edad: edad
              }
            });
  
            // Then create the Usuario record related to the newly created Detalle_Usuario
            await prisma.usuario.create({
              data: {
                id_detalle_usuario: detalleUsuario.id_detalle_usuario,
                id_rol: idRol,
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
