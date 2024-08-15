const axios = require('axios');
const FormData = require('form-data');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

class ApiConsumeService {
  constructor() {
    this.baseURL = 'https://www.istla-sigala.edu.ec/public';
  }

  async getToken() {
    try {
      // Crear una instancia de FormData
      const form = new FormData();
      form.append('username', process.env.USER_API_USERNAME);
      form.append('password', process.env.USER_API_PASSWORD);

      // Enviar la solicitud utilizando Axios y FormData
      const response = await axios.post(`${this.baseURL}/login-api`, form, {
        headers: form.getHeaders() // Configurar los encabezados correctamente
      });
      console.log('Login exitoso:', response.data);  // Mensaje de éxito en el login

      return response.data.token;
    } catch (error) {
      console.error('Error obteniendo token:', error.message);
      throw error;
    }
  }

  async fetchData(endpoint) {
    const token = await this.getToken();
    const response = await axios.get(`${this.baseURL}/${endpoint}`, {
      headers: { Authorization: token }
    });
    return response.data;
  }

  async saveCarreras() {
    try {
      const carreras = await this.fetchData('ver-carreras');
      for (let carrera of carreras) {
        await prisma.carrera.upsert({
          where: { codigo_carrera: carrera.ID_CARRERAS },
          update: {
            nombre_carrera: carrera.NOMBRE_CARRERAS,
            estado: carrera.STATUS_CARRERAS
          },
          create: {
            codigo_carrera: carrera.ID_CARRERAS,
            nombre_carrera: carrera.NOMBRE_CARRERAS,
            estado: carrera.STATUS_CARRERAS
          }
        });
      }
    } catch (error) {
      console.error('Error saving carreras:', error);
      throw error;
    }
  }
  

  async savePeriodos() {
    try {
      const periodos = await this.fetchData('ver-periodos');
      for (let periodo of periodos) {
        const anioPeriodo = parseInt(periodo.ANIO_PERIODO, 10);
        await prisma.periodo_Academico.upsert({
          where: { codigo_periodo: periodo.ID_PERIODO },
          update: {
            nombre_periodo: periodo.NOMBRE_PERIODO,
            detalle_periodo: periodo.OBSERVACION_PERIODO || '',
            anio_periodo: anioPeriodo,
            estado: periodo.STATUS_PERIODO,
            fecha_creacion: periodo.CREATED_AT_PERIODO ? new Date(periodo.CREATED_AT_PERIODO) : null
          },
          create: {
            codigo_periodo: periodo.ID_PERIODO,
            nombre_periodo: periodo.NOMBRE_PERIODO,
            detalle_periodo: periodo.OBSERVACION_PERIODO || '',
            anio_periodo: anioPeriodo,
            estado: periodo.STATUS_PERIODO,
            fecha_creacion: periodo.CREATED_AT_PERIODO ? new Date(periodo.CREATED_AT_PERIODO) : null
          }
        });
      }
    } catch (error) {
      console.error('Error saving periodos:', error);
      throw error;
    }
  }

  async saveCursos() {
    try {
      const periodos = await prisma.periodo_Academico.findMany();
      for (let periodo of periodos) {
        const cursos = await this.fetchData(`ver-cursos-periodo/${periodo.codigo_periodo}`);
        
        for (let curso of cursos) {
          // Buscar el id_carrera correspondiente usando el codigo_carrera
          const carrera = await prisma.carrera.findUnique({
            where: { codigo_carrera: curso.ID_CARRERAS }
          });
  
          if (carrera) {
            await prisma.curso.upsert({
              where: { codigo_curso: curso.ID_FORMAR_CURSOS },
              update: {
                nombre_curso: curso.NOMBRE_CURSOS,
                paralelo: curso.NOMBRE_PARALELOS || '', // Proveer un valor por defecto si es nulo
                id_periodo: periodo.id_periodo,
                id_carrera: carrera.id_carrera // Usar id_carrera encontrado
              },
              create: {
                codigo_curso: curso.ID_FORMAR_CURSOS,
                nombre_curso: curso.NOMBRE_CURSOS,
                paralelo: curso.NOMBRE_PARALELOS || '', // Proveer un valor por defecto si es nulo
                id_periodo: periodo.id_periodo,
                id_carrera: carrera.id_carrera // Usar id_carrera encontrado
              }
            });
          } else {
            console.error(`No se encontró la carrera con el código: ${curso.ID_CARRERAS}`);
          }
        }
      }
    } catch (error) {
      console.error('Error saving cursos:', error);
      throw error;
    }
  }
  
  

  async saveMaterias() {
    try {
      const cursos = await prisma.curso.findMany();
      for (let curso of cursos) {
        const materias = await this.fetchData(`ver-asignaturas-cursos/${curso.codigo_curso}`);
        for (let materia of materias) {
          
          // Buscar el usuario basado en el codigo_usuario del docente en la tabla Detalle_Usuario
          const usuarioDocente = await prisma.usuario.findFirst({
            where: {
              Detalle_Usuario: {
                codigo_usuario: materia.ID_CREADOR_ASIGNATURA
              }
            }
          });
  
          if (!usuarioDocente) {
            console.error(`Docente con código usuario ${materia.ID_CREADOR_ASIGNATURA} no encontrado.`);
            continue; // Saltar la materia si no se encuentra el docente
          }
  
          // Buscar o crear la entrada en Catalogo_Materia
          let catalogoMateria = await prisma.catalogo_Materia.findFirst({
            where: { nombre_materia: materia.NOMBRE_ASIGNATURA }
          });
  
          if (!catalogoMateria) {
            catalogoMateria = await prisma.catalogo_Materia.create({
              data: { nombre_materia: materia.NOMBRE_ASIGNATURA }
            });
          }
  
          // Crear o actualizar la materia con el id_usuario correcto
          await prisma.materia.upsert({
            where: { codigo_materia: materia.ID_ASIGNATURA },
            update: {
              id_catalogo_materia: catalogoMateria.id_catalogo_materia,
              id_curso: curso.id_curso,
              id_docente: usuarioDocente.id_usuario, // Usar el id_usuario de la base de datos
              descripcion: materia.OBSERVACION_ASIGNATURA || '',
              estado: materia.STATUS_ASIGNATURA
            },
            create: {
              codigo_materia: materia.ID_ASIGNATURA,
              id_catalogo_materia: catalogoMateria.id_catalogo_materia,
              id_curso: curso.id_curso,
              id_docente: usuarioDocente.id_usuario, // Usar el id_usuario de la base de datos
              descripcion: materia.OBSERVACION_ASIGNATURA || '',
              estado: materia.STATUS_ASIGNATURA
            }
          });
        }
      }
    } catch (error) {
      console.error('Error saving materias:', error);
      throw error;
    }
  }

  
}

module.exports = new ApiConsumeService();
