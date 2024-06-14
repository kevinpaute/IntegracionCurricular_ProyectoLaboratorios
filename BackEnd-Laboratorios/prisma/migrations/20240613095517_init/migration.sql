/*
  Warnings:

  - You are about to drop the column `hora_asistencia` on the `asistencia` table. All the data in the column will be lost.
  - You are about to drop the column `hora` on the `reporte` table. All the data in the column will be lost.
  - You are about to drop the column `hora_fin` on the `revision_equipo` table. All the data in the column will be lost.
  - You are about to drop the column `hora_inicio` on the `revision_equipo` table. All the data in the column will be lost.
  - Added the required column `fecha_asistencia` to the `Asistencia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `asistencia` DROP COLUMN `hora_asistencia`,
    ADD COLUMN `fecha_asistencia` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `reporte` DROP COLUMN `hora`;

-- AlterTable
ALTER TABLE `revision_equipo` DROP COLUMN `hora_fin`,
    DROP COLUMN `hora_inicio`;
