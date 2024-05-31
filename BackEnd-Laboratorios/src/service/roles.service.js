const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class RolesService {
    
    async getAll() {
        try {
            const roles = await prisma.roles.findMany({
                include: {
                    Permisos: true,
                    Usuarios: true
                }
            });
            return roles;
        } catch (error) {
            throw new Error(`No se pudieron obtener los roles: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const rol = await prisma.roles.findUnique({
                where: {
                    id_rol: parseInt(id, 10)
                },
                include: {
                    Permisos: true,
                    Usuarios: true
                }
            });
            return rol;
        } catch (error) {
            throw new Error(`No se pudo obtener el rol: ${error.message}`);
        }
    }
    async createMany(roles) {
        try {
            const nuevosRoles = await prisma.roles.createMany({
                data: roles
            });
            return nuevosRoles;
        } catch (error) {
            throw new Error(`No se pudieron crear los roles: ${error.message}`);
        }
    }

    async create({ nombre_rol, estado }) {
        try {
            const nuevoRol = await prisma.roles.create({
                data: {
                    nombre_rol,
                    estado
                }
            });
            return nuevoRol;
        } catch (error) {
            throw new Error(`No se pudo crear el rol: ${error.message}`);
        }
    }

    async update(id, { nombre_rol, estado }) {
        try {
            const rolActualizado = await prisma.roles.update({
                where: {
                    id_rol: parseInt(id, 10)
                },
                data: {
                    nombre_rol,
                    estado
                }
            });
            return rolActualizado;
        } catch (error) {
            throw new Error(`No se pudo actualizar el rol: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const rolEliminado = await prisma.roles.delete({
                where: {
                    id_rol: parseInt(id, 10)
                }
            });
            return rolEliminado;
        } catch (error) {
            throw new Error(`No se pudo eliminar el rol: ${error.message}`);
        }
    }
}

module.exports = new RolesService();
