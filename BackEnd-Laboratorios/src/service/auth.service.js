const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

class AuthService {
    async login(cedula, password) {
        const userDetail = await prisma.detalle_Usuario.findUnique({
            where: { cedula },
            include: { Usuario: true }
        });

        if (!userDetail || !(await bcrypt.compare(password, userDetail.contrasena))) {
            throw new Error('Credenciales inválidas');
        }

        const user = userDetail.Usuario;

        const token = jwt.sign(
            { id_usuario: user.id_usuario, id_rol: user.id_rol },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        return { token };
    }
}

module.exports = new AuthService();
