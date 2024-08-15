/*
  Warnings:

  - A unique constraint covering the columns `[codigo_carrera]` on the table `Carrera` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codigo_curso]` on the table `Curso` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codigo_materia]` on the table `Materia` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codigo_periodo]` on the table `Periodo_Academico` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Carrera_codigo_carrera_key` ON `Carrera`(`codigo_carrera`);

-- CreateIndex
CREATE UNIQUE INDEX `Curso_codigo_curso_key` ON `Curso`(`codigo_curso`);

-- CreateIndex
CREATE UNIQUE INDEX `Materia_codigo_materia_key` ON `Materia`(`codigo_materia`);

-- CreateIndex
CREATE UNIQUE INDEX `Periodo_Academico_codigo_periodo_key` ON `Periodo_Academico`(`codigo_periodo`);
