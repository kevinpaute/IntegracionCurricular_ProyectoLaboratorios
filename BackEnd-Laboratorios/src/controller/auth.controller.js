const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

class AuthController {
    async login(req, res) {
        const { cedula, contrasena } = req.body;
        try {
            const user = await prisma.detalle_Usuario.findFirst({
                where: { cedula },
                include: {
                    Usuario: {
                        include: {
                            Roles: true
                        }
                    }
                }
            });

            if (!user) {
                return res.status(401).json({ message: 'Usuario no encontrado' });
            }

            const validPassword = await bcrypt.compare(contrasena, user.contrasena);
            if (!validPassword) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            if (!user.Usuario.length || !user.Usuario[0].Roles) {
                return res.status(500).json({ message: 'Error al obtener roles del usuario' });
            }

            const token = jwt.sign(
                { id_usuario: user.Usuario[0].id_usuario, rol: user.Usuario[0].Roles.nombre_rol },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' }
            );

            res.json({ token, nombre: user.nombres, rol: user.Usuario[0].Roles.nombre_rol });
        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
        }
    }
}

module.exports = new AuthController();
