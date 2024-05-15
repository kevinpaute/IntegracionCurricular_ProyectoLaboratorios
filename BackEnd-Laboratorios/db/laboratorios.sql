-- Tabla Roles
CREATE TABLE Roles (
    id_rol INT PRIMARY KEY AUTO_INCREMENT,
    nombre_rol VARCHAR(100) NOT NULL,
    estado VARCHAR(8) NOT NULL CHECK (estado IN ('activo', 'inactivo'))
);

-- Tabla Permisos
CREATE TABLE Permisos (
    id_permiso INT PRIMARY KEY AUTO_INCREMENT,
    nombre_permiso VARCHAR(100) NOT NULL,
    id_rol INT, 
    FOREIGN KEY (id_rol) REFERENCES Roles(id_rol)

);

-- Tabla Usuarios
CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    primer_nombre VARCHAR(50) NOT NULL,
    segundo_nombre VARCHAR(50),
    primer_apellido VARCHAR(50) NOT NULL,
    segundo_apellido VARCHAR(50),
    cedula VARCHAR(10) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    correo VARCHAR(100) NOT NULL,
    celular VARCHAR(20),
    edad INT NOT NULL,
    genero VARCHAR(15),
    estado VARCHAR(8) NOT NULL CHECK (estado IN ('activo', 'inactivo')),
    id_rol INT,

    FOREIGN KEY (id_rol) REFERENCES Roles(id_rol)
);

-- Tabla Autenticacion
CREATE TABLE Autenticacion (
    id_autenticacion INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(50) NOT NULL,
    contrasena VARCHAR(15) NOT NULL,
    id_usuario INT NOT NULL,
    
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);




-- Tabla Carreras
CREATE TABLE Carreras (
    id_carrera INT PRIMARY KEY AUTO_INCREMENT,
    nombre_carrera VARCHAR(100),
    estado VARCHAR(8) NOT NULL CHECK (estado IN ('activo', 'inactivo'))
);

-- Tabla Periodos_Academicos
CREATE TABLE Periodos_Academicos (
    id_periodo INT PRIMARY KEY AUTO_INCREMENT,
    nombre_periodo VARCHAR(24),
    detalle_periodo VARCHAR(100),
    anio_lectivo VARCHAR(10),
    estado VARCHAR(8) NOT NULL CHECK (estado IN ('activo', 'inactivo'))
    
);

-- Tabla Catalogo_Materias
CREATE TABLE Catalogo_Materias (
    id_catalogo INT PRIMARY KEY AUTO_INCREMENT,
    nombre_materia VARCHAR(255)
);

-- Tabla Materias
CREATE TABLE Materias (
    id_materia INT PRIMARY KEY AUTO_INCREMENT,
    codigo_materia VARCHAR(24),
    estado VARCHAR(8) NOT NULL CHECK (estado IN ('activo', 'inactivo')),

    id_catalogo INT,
    id_carrera INT,
    id_periodo INT,
    FOREIGN KEY (id_periodo) REFERENCES Periodos_Academicos(id_periodo),
    FOREIGN KEY (id_carrera) REFERENCES Carreras(id_carrera),
    FOREIGN KEY (id_catalogo) REFERENCES Catalogo_Materias(id_catalogo)
);

CREATE TABLE Grado (
  id_grado INT PRIMARY KEY AUTO_INCREMENT,
  nombre_grado VARCHAR(100),
  id_materia  VARCHAR(255),
  id_usuario  INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

-- Tabla Laboratorios
CREATE TABLE Laboratorios (
    id_laboratorio INT PRIMARY KEY AUTO_INCREMENT,
    nombre_laboratorio VARCHAR(100),
    ubicacion VARCHAR(100),
    capacidad INT
);

-- Tabla Equipos_Laboratorio
CREATE TABLE Equipos_Laboratorio (
    id_equipo INT PRIMARY KEY AUTO_INCREMENT,
    nombre_equipo VARCHAR(100),
    fecha_ingreso DATE,
    fecha_inventario DATE,
    marca VARCHAR(100),
    modelo VARCHAR(100),
    serie VARCHAR(100),
    proveedor VARCHAR(100),
    descripcion VARCHAR(255),
    id_laboratorio INT,
    estado VARCHAR(8) NOT NULL CHECK (estado IN ('activo', 'inactivo')),

    FOREIGN KEY (id_laboratorio) REFERENCES Laboratorios(id_laboratorio)
);



-- Tabla Reservas
CREATE TABLE Reservas (
    id_reserva INT PRIMARY KEY AUTO_INCREMENT,
    fecha_inicio DATETIME,
    fecha_fin DATETIME,
    motivo VARCHAR(255),
    id_usuario INT,
    id_laboratorio INT,
    id_materia INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_laboratorio) REFERENCES Laboratorios(id_laboratorio),
    FOREIGN KEY (id_materia) REFERENCES Materias(id_materia)
);


-- Tabla Asistencias
CREATE TABLE Asistencias (
    id_asistencia INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    id_reserva INT,
    fecha_asistencia DATETIME,
    tipo_asistencia ENUM('docente', 'estudiante'),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_reserva) REFERENCES Reservas(id_reserva)
);