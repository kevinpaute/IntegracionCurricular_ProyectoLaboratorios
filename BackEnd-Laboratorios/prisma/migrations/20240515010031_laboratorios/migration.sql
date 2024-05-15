-- CreateTable
CREATE TABLE `Roles` (
    `id_rol` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_rol` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permisos` (
    `id_permiso` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_permiso` VARCHAR(191) NOT NULL,
    `id_rol` INTEGER NULL,

    PRIMARY KEY (`id_permiso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuarios` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `primer_nombre` VARCHAR(191) NOT NULL,
    `segundo_nombre` VARCHAR(191) NULL,
    `primer_apellido` VARCHAR(191) NOT NULL,
    `segundo_apellido` VARCHAR(191) NULL,
    `cedula` VARCHAR(191) NOT NULL,
    `fecha_nacimiento` DATETIME(3) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `celular` VARCHAR(191) NULL,
    `edad` INTEGER NOT NULL,
    `genero` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NOT NULL,
    `id_rol` INTEGER NULL,

    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Autenticacion` (
    `id_autenticacion` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario` VARCHAR(191) NOT NULL,
    `contrasena` VARCHAR(191) NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    PRIMARY KEY (`id_autenticacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carreras` (
    `id_carrera` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_carrera` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_carrera`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Periodos_Academicos` (
    `id_periodo` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_periodo` VARCHAR(191) NOT NULL,
    `detalle_periodo` VARCHAR(191) NOT NULL,
    `anio_lectivo` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_periodo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Catalogo_Materias` (
    `id_catalogo` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_materia` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_catalogo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Materias` (
    `id_materia` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo_materia` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `id_catalogo` INTEGER NULL,
    `id_carrera` INTEGER NULL,
    `id_periodo` INTEGER NULL,

    PRIMARY KEY (`id_materia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grado` (
    `id_grado` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_grado` VARCHAR(191) NOT NULL,
    `id_materia` VARCHAR(191) NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    PRIMARY KEY (`id_grado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Laboratorios` (
    `id_laboratorio` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_laboratorio` VARCHAR(191) NOT NULL,
    `ubicacion` VARCHAR(191) NOT NULL,
    `capacidad` INTEGER NOT NULL,

    PRIMARY KEY (`id_laboratorio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Equipos_Laboratorio` (
    `id_equipo` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_equipo` VARCHAR(191) NOT NULL,
    `fecha_ingreso` DATETIME(3) NOT NULL,
    `fecha_inventario` DATETIME(3) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `serie` VARCHAR(191) NOT NULL,
    `proveedor` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `id_laboratorio` INTEGER NULL,
    `estado` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_equipo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservas` (
    `id_reserva` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha_inicio` DATETIME(3) NOT NULL,
    `fecha_fin` DATETIME(3) NOT NULL,
    `motivo` VARCHAR(191) NOT NULL,
    `id_usuario` INTEGER NULL,
    `id_laboratorio` INTEGER NULL,
    `id_materia` INTEGER NULL,

    PRIMARY KEY (`id_reserva`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asistencias` (
    `id_asistencia` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NULL,
    `id_reserva` INTEGER NULL,
    `fecha_asistencia` DATETIME(3) NOT NULL,
    `tipo_asistencia` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_asistencia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Permisos` ADD CONSTRAINT `Permisos_id_rol_fkey` FOREIGN KEY (`id_rol`) REFERENCES `Roles`(`id_rol`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_id_rol_fkey` FOREIGN KEY (`id_rol`) REFERENCES `Roles`(`id_rol`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Autenticacion` ADD CONSTRAINT `Autenticacion_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materias` ADD CONSTRAINT `Materias_id_catalogo_fkey` FOREIGN KEY (`id_catalogo`) REFERENCES `Catalogo_Materias`(`id_catalogo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materias` ADD CONSTRAINT `Materias_id_carrera_fkey` FOREIGN KEY (`id_carrera`) REFERENCES `Carreras`(`id_carrera`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materias` ADD CONSTRAINT `Materias_id_periodo_fkey` FOREIGN KEY (`id_periodo`) REFERENCES `Periodos_Academicos`(`id_periodo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grado` ADD CONSTRAINT `Grado_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Equipos_Laboratorio` ADD CONSTRAINT `Equipos_Laboratorio_id_laboratorio_fkey` FOREIGN KEY (`id_laboratorio`) REFERENCES `Laboratorios`(`id_laboratorio`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservas` ADD CONSTRAINT `Reservas_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservas` ADD CONSTRAINT `Reservas_id_laboratorio_fkey` FOREIGN KEY (`id_laboratorio`) REFERENCES `Laboratorios`(`id_laboratorio`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservas` ADD CONSTRAINT `Reservas_id_materia_fkey` FOREIGN KEY (`id_materia`) REFERENCES `Materias`(`id_materia`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asistencias` ADD CONSTRAINT `Asistencias_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asistencias` ADD CONSTRAINT `Asistencias_id_reserva_fkey` FOREIGN KEY (`id_reserva`) REFERENCES `Reservas`(`id_reserva`) ON DELETE SET NULL ON UPDATE CASCADE;
