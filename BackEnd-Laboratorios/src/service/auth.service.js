const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

class AuthService {
    async login(cedula, contrasena) {
        try {
          // Primero, obtenemos el usuario usando la cédula
          const userWithDetails = await prisma.usuario.findFirst({
            where: {
              Detalle_Usuario: {
                cedula: cedula
              }
            },
            include: {
              Detalle_Usuario: true,
              Roles: true
            }
          });
    
          if (!userWithDetails) {
            console.log(`Usuario con cédula ${cedula} no encontrado`);
            return null;
          }
    
          console.log('Datos del usuario obtenidos:', userWithDetails);
    
          if (!userWithDetails.Detalle_Usuario || !userWithDetails.Detalle_Usuario.contrasena) {
            console.error('No se encontró la contraseña del usuario.');
            return null;
          }
    
          // Verificamos la contraseña
          const isPasswordValid = await bcrypt.compare(contrasena, userWithDetails.Detalle_Usuario.contrasena);
    
          if (!isPasswordValid) {
            console.log(`Contraseña incorrecta para el usuario con cédula ${cedula}`);
            return null;
          }
    
          return userWithDetails;
        } catch (error) {
          console.error('Error en la consulta a la base de datos:', error);
          throw new Error('Error al realizar el login');
        }
      }
    }
module.exports = AuthService;