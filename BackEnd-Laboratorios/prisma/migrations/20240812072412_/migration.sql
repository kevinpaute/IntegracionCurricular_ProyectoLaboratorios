-- CreateTable
CREATE TABLE `Roles` (
    `id_rol` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_rol` VARCHAR(100) NOT NULL,
    `estado` VARCHAR(8) NOT NULL,

    PRIMARY KEY (`id_rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Detalle_Usuario` (
    `id_detalle_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombres` VARCHAR(50) NOT NULL,
    `apellidos` VARCHAR(50) NOT NULL,
    `cedula` VARCHAR(10) NOT NULL,
    `fecha_nacimiento` DATE NOT NULL,
    `correo` VARCHAR(100) NOT NULL,
    `celular` VARCHAR(20) NULL,
    `edad` INTEGER NOT NULL,
    `genero` VARCHAR(15) NOT NULL,
    `estado` VARCHAR(8) NOT NULL,
    `contrasena` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_detalle_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `id_detalle_usuario` INTEGER NOT NULL,
    `id_rol` INTEGER NOT NULL,
    `codigo_usuario` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carrera` (
    `id_carrera` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_carrera` VARCHAR(100) NOT NULL,
    `estado` VARCHAR(8) NOT NULL,
    `codigo_carrera` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id_carrera`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Periodo_Academico` (
    `id_periodo` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_periodo` VARCHAR(24) NOT NULL,
    `detalle_periodo` VARCHAR(100) NULL,
    `anio_periodo` INTEGER NOT NULL,
    `estado` VARCHAR(8) NOT NULL,
    `fecha_creacion` DATETIME(3) NULL,
    `codigo_periodo` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id_periodo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curso` (
    `id_curso` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_curso` VARCHAR(100) NOT NULL,
    `paralelo` VARCHAR(24) NOT NULL,
    `id_periodo` INTEGER NOT NULL,
    `id_carrera` INTEGER NOT NULL,
    `codigo_curso` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id_curso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Catalogo_Materia` (
    `id_catalogo_materia` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_materia` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_catalogo_materia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Materia` (
    `id_materia` INTEGER NOT NULL AUTO_INCREMENT,
    `id_catalogo_materia` INTEGER NOT NULL,
    `id_curso` INTEGER NOT NULL,
    `id_docente` INTEGER NOT NULL,
    `descripcion` VARCHAR(24) NULL,
    `estado` VARCHAR(8) NOT NULL,
    `codigo_materia` VARCHAR(15) NOT NULL,

    PRIMARY KEY (`id_materia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inscripcion` (
    `id_inscripcion` INTEGER NOT NULL AUTO_INCREMENT,
    `id_materia` INTEGER NOT NULL,
    `id_estudiante` INTEGER NOT NULL,
    `codigo_inscripcion` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_inscripcion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Laboratorio` (
    `id_laboratorio` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_laboratorio` VARCHAR(100) NOT NULL,
    `ubicacion` VARCHAR(100) NOT NULL,
    `capacidad` INTEGER NOT NULL,
    `estado` VARCHAR(8) NULL,

    PRIMARY KEY (`id_laboratorio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Equipo_Laboratorio` (
    `id_equipo` INTEGER NOT NULL AUTO_INCREMENT,
    `id_laboratorio` INTEGER NOT NULL,
    `codigo_equipo` VARCHAR(100) NOT NULL,
    `descripcion` VARCHAR(100) NULL,
    `fecha_ingreso` DATETIME(3) NOT NULL,
    `marca` VARCHAR(100) NOT NULL,
    `modelo` VARCHAR(100) NULL,
    `serie` VARCHAR(100) NULL,
    `proveedor` VARCHAR(100) NULL,
    `numero_factura` VARCHAR(100) NULL,
    `estado` VARCHAR(12) NOT NULL,

    PRIMARY KEY (`id_equipo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Revision_Equipo` (
    `id_revision` INTEGER NOT NULL AUTO_INCREMENT,
    `id_equipo` INTEGER NOT NULL,
    `id_responsable` INTEGER NOT NULL,
    `fecha_inicio` DATETIME(3) NOT NULL,
    `hora_inicio` TIME NOT NULL,
    `tipo_revision` VARCHAR(50) NOT NULL,
    `estado_revision` VARCHAR(20) NOT NULL,
    `novedad` VARCHAR(50) NOT NULL,
    `observaciones` VARCHAR(255) NULL,
    `solucion` VARCHAR(255) NOT NULL,
    `repuestos_utilizados` VARCHAR(255) NULL,
    `costo_revision` DECIMAL(10, 2) NOT NULL,
    `fecha_fin` DATETIME(3) NOT NULL,
    `evidencia_inicio` VARCHAR(255) NULL,
    `evidencia_fin` VARCHAR(255) NULL,

    PRIMARY KEY (`id_revision`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reserva` (
    `id_reserva` INTEGER NOT NULL AUTO_INCREMENT,
    `id_laboratorio` INTEGER NOT NULL,
    `id_materia` INTEGER NOT NULL,
    `fecha_inicio` DATETIME(3) NOT NULL,
    `fecha_fin` DATETIME(3) NOT NULL,
    `motivo` VARCHAR(255) NOT NULL,
    `estado` VARCHAR(8) NOT NULL,

    PRIMARY KEY (`id_reserva`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asistencia` (
    `id_asistencia` INTEGER NOT NULL AUTO_INCREMENT,
    `id_inscripcion` INTEGER NOT NULL,
    `id_reserva` INTEGER NOT NULL,
    `fecha_asistencia` DATETIME(3) NOT NULL,
    `observaciones` VARCHAR(255) NULL,

    PRIMARY KEY (`id_asistencia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bitacora` (
    `id_bitacora` INTEGER NOT NULL AUTO_INCREMENT,
    `id_laboratorio` INTEGER NOT NULL,
    `descripcion` VARCHAR(255) NOT NULL,
    `semana` VARCHAR(255) NULL,
    `fecha_generado` DATETIME(3) NOT NULL,
    `evidencia` VARCHAR(255) NOT NULL,
    `fecha_registro` DATETIME(3) NOT NULL,
    `estado` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id_bitacora`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_id_detalle_usuario_fkey` FOREIGN KEY (`id_detalle_usuario`) REFERENCES `Detalle_Usuario`(`id_detalle_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_id_rol_fkey` FOREIGN KEY (`id_rol`) REFERENCES `Roles`(`id_rol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curso` ADD CONSTRAINT `Curso_id_periodo_fkey` FOREIGN KEY (`id_periodo`) REFERENCES `Periodo_Academico`(`id_periodo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curso` ADD CONSTRAINT `Curso_id_carrera_fkey` FOREIGN KEY (`id_carrera`) REFERENCES `Carrera`(`id_carrera`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materia` ADD CONSTRAINT `Materia_id_curso_fkey` FOREIGN KEY (`id_curso`) REFERENCES `Curso`(`id_curso`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materia` ADD CONSTRAINT `Materia_id_docente_fkey` FOREIGN KEY (`id_docente`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materia` ADD CONSTRAINT `Materia_id_catalogo_materia_fkey` FOREIGN KEY (`id_catalogo_materia`) REFERENCES `Catalogo_Materia`(`id_catalogo_materia`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inscripcion` ADD CONSTRAINT `Inscripcion_id_materia_fkey` FOREIGN KEY (`id_materia`) REFERENCES `Materia`(`id_materia`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inscripcion` ADD CONSTRAINT `Inscripcion_id_estudiante_fkey` FOREIGN KEY (`id_estudiante`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Equipo_Laboratorio` ADD CONSTRAINT `Equipo_Laboratorio_id_laboratorio_fkey` FOREIGN KEY (`id_laboratorio`) REFERENCES `Laboratorio`(`id_laboratorio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Revision_Equipo` ADD CONSTRAINT `Revision_Equipo_id_responsable_fkey` FOREIGN KEY (`id_responsable`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Revision_Equipo` ADD CONSTRAINT `Revision_Equipo_id_equipo_fkey` FOREIGN KEY (`id_equipo`) REFERENCES `Equipo_Laboratorio`(`id_equipo`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
