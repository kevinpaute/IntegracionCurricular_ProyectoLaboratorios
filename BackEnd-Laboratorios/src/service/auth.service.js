const nodemailer = require('nodemailer');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

class AuthService {
    async login(cedula, contrasena) {
        try {
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
    
            // Usar encadenamiento opcional para verificar la existencia de Detalle_Usuario y su contraseña
            if (!userWithDetails?.Detalle_Usuario?.contrasena) {
                console.error('No se encontró la contraseña del usuario.');
                return null;
            }
    
            const isPasswordValid = await bcrypt.compare(contrasena, userWithDetails.Detalle_Usuario.contrasena);
    
            if (!isPasswordValid) {
                console.log(`Contraseña incorrecta para el usuario con cédula ${cedula}`);
                return null;
            }
    
            const token = jwt.sign(
                {
                    id_usuario: userWithDetails.id_usuario,
                    role: userWithDetails.Roles?.nombre_rol,
                    nombres: userWithDetails.Detalle_Usuario?.nombres,
                    apellidos: userWithDetails.Detalle_Usuario?.apellidos
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
    
            return { 
                token, 
                role: userWithDetails.Roles?.nombre_rol, 
                nombres: userWithDetails.Detalle_Usuario?.nombres, 
                apellidos: userWithDetails.Detalle_Usuario?.apellidos, 
                id: userWithDetails.id_usuario 
            };
        } catch (error) {
            console.error('Error en la consulta a la base de datos:', error);
            throw new Error('Error al realizar el login');
        }
    }
    
    async forgotPassword(email) {
        try {
            const user = await prisma.usuario.findFirst({
                where: {
                    Detalle_Usuario: {
                        correo: email
                    }
                },
                include: {
                    Detalle_Usuario: true
                }
            });

            if (!user) {
                throw new Error('Correo no encontrado');
            }

            const token = jwt.sign(
                {
                    id_usuario: user.id_usuario,
                    email: user.Detalle_Usuario.correo
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' }
            );

            const transporter = nodemailer.createTransport({
                host: "smtp-mail.outlook.com",
                port: 587,
                secureConnection: false,
                tls: {
                    ciphers: 'SSLv3'
                },
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });
            

            const mailOptions = {
                from: 'kpaute@outlook.com',
                to: user.Detalle_Usuario.correo,
                subject: 'Recuperación de contraseña',
                html: `
                  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <div style="background-color: #f7f7f7; padding: 20px;">
                      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                      
                      <div style="text-align: center;">
                      <h2 style="margin-top: 0;" color: #0274BE;">ISTLA</h2>
                          <img src="cid:logo" alt="Logo Instituto Superior Tecnológico Los Andes" style="width: 100px; margin-bottom: 20px;">
                        </div>
                        <h2 style="text-align: center; color: #0274BE;">Recuperación de Contraseña</h2>
                        <p style="color: #333333;">Hola,</p>
                        <p style="color: #333333;">Has solicitado restablecer tu contraseña. Haz clic en el botón de abajo para restablecerla:</p>
                        <div style="text-align: center; margin: 20px 0;">
                          <a href="http://localhost:4200/reset-password/${token}" style="background-color: #0274BE; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Restablecer Contraseña</a>
                        </div>
                        <p style="color: #333333;">Si no solicitaste este cambio, puedes ignorar este correo.</p>
                        <p style="color: #333333;">Gracias,</p>
                        <p style="color: #333333;">El equipo del Instituto Superior Tecnológico Los Andes</p>
                      </div>
                    </div>
                  </div>
                `,
                attachments: [
                    {
                        filename: 'logo.png',
                        path: 'src/assets/logo.png',
                        cid: 'logo' // Necesario para el uso de cid en la etiqueta img
                    }
                ]
            };


            await transporter.sendMail(mailOptions);

            return { message: 'Correo de recuperación enviado' };
        } catch (error) {
            if (error.message === 'Correo no encontrado') {
                throw new Error('Correo no encontrado');
            }
            console.error('Error en forgotPassword:', error);
            throw new Error('Error al enviar el correo de recuperación');
        }
    }

    async resetPassword(token, newPassword) {
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await prisma.detalle_Usuario.update({
                where: {
                    id_detalle_usuario: decoded.id_usuario
                },
                data: {
                    contrasena: hashedPassword
                }
            });

            return { message: 'Contraseña cambiada exitosamente' };
        } catch (error) {
            console.error('Error en resetPassword:', error);
            throw new Error('Error al cambiar la contraseña');
        }
    }
}

module.exports = new AuthService();

