const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();
const AuthService = require('../service/auth.service');
const authService = new AuthService();

class AuthController {
    async login(req, res) {
        const { cedula, contrasena } = req.body;
        try {
          const user = await authService.login(cedula, contrasena);
    
          if (!user) {
            console.log(`Login fallido para la cédula ${cedula}`);
            return res.status(401).json({ message: 'Credenciales incorrectas' });
          }
    
          // Autenticación exitosa
          console.log(`Login exitoso para la cédula ${cedula}`);
          return res.status(200).json({ user });
        } catch (error) {
          console.error('Error en login:', error);
          return res.status(500).json({ message: 'Error interno del servidor' });
        }
      }
  }

module.exports = new AuthController();
