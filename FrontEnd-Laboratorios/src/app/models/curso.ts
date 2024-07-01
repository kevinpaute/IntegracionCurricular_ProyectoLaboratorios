// models/curso.ts
export interface Curso {
    id_curso: number;
    nombre_curso: string;
    paralelo: string;
    estado: string;
    id_periodo: number;
    id_carrera: number;
    Periodo_Academico: {
      id_periodo: number;
      nombre_periodo: string;
      detalle_periodo?: string;
      anio_lectivo: string;
      estado: string;
    };
    Carrera: {
      id_carrera: number;
      nombre_carrera: string;
      estado: string;
    };
  }
  