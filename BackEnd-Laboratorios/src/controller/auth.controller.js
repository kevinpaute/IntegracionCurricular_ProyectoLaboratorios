const authService = require('../service/auth.service');

class AuthController {
    async login(req, res) {
        const { cedula, contrasena } = req.body;
        try {
            const response = await authService.login(cedula, contrasena);

            if (!response) {
                console.log(`Login fallido para la cédula ${cedula}`);
                return res.status(401).json({ message: 'Credenciales incorrectas' });
            }

            console.log(`Login exitoso para la cédula ${cedula}`);
            return res.status(200).json(response);
        } catch (error) {
            console.error('Error en login:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}

module.exports = new AuthController();

