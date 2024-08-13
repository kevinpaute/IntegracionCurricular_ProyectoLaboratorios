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

    async forgotPassword(req, res) {
        const { email } = req.body;
        try {
            const response = await authService.forgotPassword(email);

            if (!response) {
                console.log(`Correo de recuperación fallido para ${email}`);
                return res.status(404).json({ message: 'Correo no encontrado' });
            }

            console.log(`Correo de recuperación enviado a ${email}`);
            return res.status(200).json(response);
        } catch (error) {
            console.error('Error en forgotPassword:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    async resetPassword(req, res) {
        const { token, password } = req.body;
        try {
            const response = await authService.resetPassword(token, password);

            if (!response) {
                return res.status(400).json({ message: 'Error al cambiar la contraseña' });
            }

            return res.status(200).json(response);
        } catch (error) {
            console.error('Error en resetPassword:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}

module.exports = new AuthController();

