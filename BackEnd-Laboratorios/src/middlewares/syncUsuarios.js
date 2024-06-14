const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

const syncUsuarios = async () => {
    try {
        const response = await axios.get('URL_DE_LA_API'); // Reemplaza con la URL de la API
        const usuarios = response.data;

        for (const usuario of usuarios) {
            const hashedPassword = await bcrypt.hash(usuario.cedula, 10);
            const detalleUsuario = await prisma.detalle_Usuario.create({
                data: {
                    id_detalle_usuario: usuario.id_detalle_usuario, // Asegúrate de que los IDs coincidan
                    nombres: usuario.nombres,
                    apellidos: usuario.apellidos,
                    cedula: usuario.cedula,
                    fecha_nacimiento: usuario.fecha_nacimiento,
                    correo: usuario.correo,
                    celular: usuario.celular,
                    edad: usuario.edad,
                    genero: usuario.genero,
                    estado: usuario.estado,
                    contrasena: hashedPassword
                }
            });

            await prisma.usuarios.create({
                data: {
                    id_usuario: usuario.id_usuario, // Asegúrate de que los IDs coincidan
                    id_detalle_usuario: detalleUsuario.id_detalle_usuario,
                    id_rol: usuario.id_rol
                }
            });
        }

        console.log('Usuarios sincronizados exitosamente');
    } catch (error) {
        console.error('Error al sincronizar usuarios:', error);
    }
};

syncUsuarios();
