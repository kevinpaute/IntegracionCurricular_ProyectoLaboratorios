const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PermisosService {

    async getAll() {
        try {
            const permisos = await prisma.permisos.findMany({
                include: {
                    Roles: true
                }
            });
            return permisos;
        } catch (error) {
            throw new Error(`No se pudieron obtener los permisos: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const permiso = await prisma.permisos.findUnique({
                where: {
                    id_permiso: parseInt(id, 10)
                },
                include: {
                    Roles: true
                }
            });
            return permiso;
        } catch (error) {
            throw new Error(`No se pudo obtener el permiso: ${error.message}`);
        }
    }

    async create({ nombre_permiso, id_rol }) {
        try {
            const nuevoPermiso = await prisma.permisos.create({
                data: {
                    nombre_permiso,
                    id_rol
                }
            });
            return nuevoPermiso;
        } catch (error) {
            throw new Error(`No se pudo crear el permiso: ${error.message}`);
        }
    }

    async createMany(permisos) {
        try {
            const nuevosPermisos = await prisma.permisos.createMany({
                data: permisos
            });
            return nuevosPermisos;
        } catch (error) {
            throw new Error(`No se pudieron crear los permisos: ${error.message}`);
        }
    }

    async update(id, { nombre_permiso, id_rol }) {
        try {
            const permisoActualizado = await prisma.permisos.update({
                where: {
                    id_permiso: parseInt(id, 10)
                },
                data: {
                    nombre_permiso,
                    id_rol
                }
            });
            return permisoActualizado;
        } catch (error) {
            throw new Error(`No se pudo actualizar el permiso: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const permisoEliminado = await prisma.permisos.delete({
                where: {
                    id_permiso: parseInt(id, 10)
                }
            });
            return permisoEliminado;
        } catch (error) {
            throw new Error(`No se pudo eliminar el permiso: ${error.message}`);
        }
    }
}

module.exports = new PermisosService();
