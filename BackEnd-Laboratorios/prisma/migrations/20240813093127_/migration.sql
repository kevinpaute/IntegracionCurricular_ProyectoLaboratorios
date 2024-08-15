/*
  Warnings:

  - A unique constraint covering the columns `[correo]` on the table `Detalle_Usuario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codigo_usuario]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Detalle_Usuario_correo_key` ON `Detalle_Usuario`(`correo`);

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_codigo_usuario_key` ON `Usuario`(`codigo_usuario`);
