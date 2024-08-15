/*
  Warnings:

  - You are about to drop the column `codigo_usuario` on the `usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[codigo_usuario]` on the table `Detalle_Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codigo_usuario` to the `Detalle_Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Usuario_codigo_usuario_key` ON `usuario`;

-- AlterTable
ALTER TABLE `detalle_usuario` ADD COLUMN `codigo_usuario` VARCHAR(15) NOT NULL;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `codigo_usuario`;

-- CreateIndex
CREATE UNIQUE INDEX `Detalle_Usuario_codigo_usuario_key` ON `Detalle_Usuario`(`codigo_usuario`);
