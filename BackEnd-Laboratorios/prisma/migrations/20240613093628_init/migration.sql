/*
  Warnings:

  - You are about to drop the `asistencias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `autenticacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `carreras` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `catalogo_materias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `equipos_laboratorio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `grado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `laboratorios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `materias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `periodos_academicos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permisos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reservas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `asistencias` DROP FOREIGN KEY `Asistencias_id_reserva_fkey`;

-- DropForeignKey
ALTER TABLE `asistencias` DROP FOREIGN KEY `Asistencias_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `autenticacion` DROP FOREIGN KEY `Autenticacion_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `equipos_laboratorio` DROP FOREIGN KEY `Equipos_Laboratorio_id_laboratorio_fkey`;

-- DropForeignKey
ALTER TABLE `grado` DROP FOREIGN KEY `Grado_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `materias` DROP FOREIGN KEY `Materias_id_carrera_fkey`;

-- DropForeignKey
ALTER TABLE `materias` DROP FOREIGN KEY `Materias_id_catalogo_fkey`;

-- DropForeignKey
ALTER TABLE `materias` DROP FOREIGN KEY `Materias_id_periodo_fkey`;

-- DropForeignKey
ALTER TABLE `permisos` DROP FOREIGN KEY `Permisos_id_rol_fkey`;

-- DropForeignKey
ALTER TABLE `reservas` DROP FOREIGN KEY `Reservas_id_laboratorio_fkey`;

-- DropForeignKey
ALTER TABLE `reservas` DROP FOREIGN KEY `Reservas_id_materia_fkey`;

-- DropForeignKey
ALTER TABLE `reservas` DROP FOREIGN KEY `Reservas_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `Usuarios_id_rol_fkey`;

-- DropTable
DROP TABLE `asistencias`;

-- DropTable
DROP TABLE `autenticacion`;

-- DropTable
DROP TABLE `carreras`;

-- DropTable
DROP TABLE `catalogo_materias`;

-- DropTable
DROP TABLE `equipos_laboratorio`;

-- DropTable
DROP TABLE `grado`;

-- DropTable
DROP TABLE `laboratorios`;

-- DropTable
DROP TABLE `materias`;

-- DropTable
DROP TABLE `periodos_academicos`;

-- DropTable
DROP TABLE `permisos`;

-- DropTable
DROP TABLE `reservas`;

-- DropTable
DROP TABLE `usuarios`;

-- CreateTable
CREATE TABLE `Detalle_Usuario` (
    `id_detalle_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `cedula` VARCHAR(191) NOT NULL,
    `fecha_nacimiento` DATETIME(3) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `celular` VARCHAR(191) NULL,
    `edad` INTEGER NOT NULL,
    `genero` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `contrasena` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_detalle_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `id_detalle_usuario` INTEGER NOT NULL,
    `id_rol` INTEGER NOT NULL,

    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carrera` (
    `id_carrera` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_carrera` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_carrera`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Periodo_Academico` (
    `id_periodo` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_periodo` VARCHAR(191) NOT NULL,
    `detalle_periodo` VARCHAR(191) NULL,
    `anio_lectivo` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `id_carrera` INTEGER NOT NULL,

    UNIQUE INDEX `Periodo_Academico_id_periodo_id_carrera_key`(`id_periodo`, `id_carrera`),
    PRIMARY KEY (`id_periodo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curso` (
    `id_curso` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_curso` VARCHAR(191) NOT NULL,
    `paralelo` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `id_periodo` INTEGER NOT NULL,
    `id_carrera` INTEGER NOT NULL,

    PRIMARY KEY (`id_curso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Catalogo_Materia` (
    `id_catalogo_materia` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_materia` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_catalogo_materia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Materia` (
    `id_materia` INTEGER NOT NULL AUTO_INCREMENT,
    `id_catalogo_materia` INTEGER NOT NULL,
    `id_curso` INTEGER NOT NULL,
    `id_docente` INTEGER NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_materia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inscripcion` (
    `id_inscripcion` INTEGER NOT NULL AUTO_INCREMENT,
    `id_materia` INTEGER NOT NULL,
    `id_estudiante` INTEGER NOT NULL,

    PRIMARY KEY (`id_inscripcion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Laboratorio` (
    `id_laboratorio` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_laboratorio` VARCHAR(191) NOT NULL,
    `ubicacion` VARCHAR(191) NOT NULL,
    `capacidad` INTEGER NOT NULL,

    PRIMARY KEY (`id_laboratorio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Equipo_Laboratorio` (
    `id_equipo` INTEGER NOT NULL AUTO_INCREMENT,
    `id_laboratorio` INTEGER NOT NULL,
    `nombre_equipo` VARCHAR(191) NOT NULL,
    `fecha_ingreso` DATETIME(3) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NULL,
    `serie` VARCHAR(191) NULL,
    `proveedor` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_equipo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Revision_Equipo` (
    `id_revision` INTEGER NOT NULL AUTO_INCREMENT,
    `id_equipo` INTEGER NOT NULL,
    `id_responsable` INTEGER NOT NULL,
    `fecha_inicio` DATETIME(3) NOT NULL,
    `hora_inicio` DATETIME(3) NOT NULL,
    `tipo_revision` VARCHAR(191) NOT NULL,
    `estado_revision` VARCHAR(191) NOT NULL,
    `novedad` VARCHAR(191) NOT NULL,
    `observaciones` VARCHAR(191) NULL,
    `solucion` VARCHAR(191) NOT NULL,
    `repuestos_utilizados` VARCHAR(191) NULL,
    `costo_revision` DECIMAL(65, 30) NOT NULL,
    `fecha_fin` DATETIME(3) NOT NULL,
    `hora_fin` DATETIME(3) NOT NULL,
    `foto_antes` VARCHAR(191) NULL,
    `foto_despues` VARCHAR(191) NULL,

    PRIMARY KEY (`id_revision`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reserva` (
    `id_reserva` INTEGER NOT NULL AUTO_INCREMENT,
    `id_laboratorio` INTEGER NOT NULL,
    `id_materia` INTEGER NOT NULL,
    `fecha_inicio` DATETIME(3) NOT NULL,
    `fecha_fin` DATETIME(3) NOT NULL,
    `motivo` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_reserva`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asistencia` (
    `id_asistencia` INTEGER NOT NULL AUTO_INCREMENT,
    `id_inscripcion` INTEGER NOT NULL,
    `id_reserva` INTEGER NOT NULL,
    `hora_asistencia` DATETIME(3) NOT NULL,
    `observaciones` VARCHAR(191) NULL,

    PRIMARY KEY (`id_asistencia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bitacora` (
    `id_bitacora` INTEGER NOT NULL AUTO_INCREMENT,
    `id_laboratorio` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `ruta` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_bitacora`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reporte` (
    `id_reporte` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `hora` DATETIME(3) NOT NULL,
    `tipo_reporte` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_reporte`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UsuarioMaterias` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UsuarioMaterias_AB_unique`(`A`, `B`),
    INDEX `_UsuarioMaterias_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_id_detalle_usuario_fkey` FOREIGN KEY (`id_detalle_usuario`) REFERENCES `Detalle_Usuario`(`id_detalle_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_id_rol_fkey` FOREIGN KEY (`id_rol`) REFERENCES `Roles`(`id_rol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Periodo_Academico` ADD CONSTRAINT `Periodo_Academico_id_carrera_fkey` FOREIGN KEY (`id_carrera`) REFERENCES `Carrera`(`id_carrera`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curso` ADD CONSTRAINT `Curso_id_periodo_id_carrera_fkey` FOREIGN KEY (`id_periodo`, `id_carrera`) REFERENCES `Periodo_Academico`(`id_periodo`, `id_carrera`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materia` ADD CONSTRAINT `Materia_id_catalogo_materia_fkey` FOREIGN KEY (`id_catalogo_materia`) REFERENCES `Catalogo_Materia`(`id_catalogo_materia`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materia` ADD CONSTRAINT `Materia_id_curso_fkey` FOREIGN KEY (`id_curso`) REFERENCES `Curso`(`id_curso`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materia` ADD CONSTRAINT `Materia_id_docente_fkey` FOREIGN KEY (`id_docente`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inscripcion` ADD CONSTRAINT `Inscripcion_id_materia_fkey` FOREIGN KEY (`id_materia`) REFERENCES `Materia`(`id_materia`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inscripcion` ADD CONSTRAINT `Inscripcion_id_estudiante_fkey` FOREIGN KEY (`id_estudiante`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Equipo_Laboratorio` ADD CONSTRAINT `Equipo_Laboratorio_id_laboratorio_fkey` FOREIGN KEY (`id_laboratorio`) REFERENCES `Laboratorio`(`id_laboratorio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Revision_Equipo` ADD CONSTRAINT `Revision_Equipo_id_equipo_fkey` FOREIGN KEY (`id_equipo`) REFERENCES `Equipo_Laboratorio`(`id_equipo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Revision_Equipo` ADD CONSTRAINT `Revision_Equipo_id_responsable_fkey` FOREIGN KEY (`id_responsable`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_id_laboratorio_fkey` FOREIGN KEY (`id_laboratorio`) REFERENCES `Laboratorio`(`id_laboratorio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_id_materia_fkey` FOREIGN KEY (`id_materia`) REFERENCES `Materia`(`id_materia`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asistencia` ADD CONSTRAINT `Asistencia_id_inscripcion_fkey` FOREIGN KEY (`id_inscripcion`) REFERENCES `Inscripcion`(`id_inscripcion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asistencia` ADD CONSTRAINT `Asistencia_id_reserva_fkey` FOREIGN KEY (`id_reserva`) REFERENCES `Reserva`(`id_reserva`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bitacora` ADD CONSTRAINT `Bitacora_id_laboratorio_fkey` FOREIGN KEY (`id_laboratorio`) REFERENCES `Laboratorio`(`id_laboratorio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reporte` ADD CONSTRAINT `Reporte_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UsuarioMaterias` ADD CONSTRAINT `_UsuarioMaterias_A_fkey` FOREIGN KEY (`A`) REFERENCES `Materia`(`id_materia`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UsuarioMaterias` ADD CONSTRAINT `_UsuarioMaterias_B_fkey` FOREIGN KEY (`B`) REFERENCES `Usuario`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
