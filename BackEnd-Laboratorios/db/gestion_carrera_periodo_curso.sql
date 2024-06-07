-- Tabla Roles
CREATE TABLE Roles (
    id_rol INT PRIMARY KEY AUTO_INCREMENT,
    nombre_rol VARCHAR(100) NOT NULL,
    estado VARCHAR(8) NOT NULL CHECK (estado IN ('activo', 'inactivo'))
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
    genero VARCHAR(15) NOT NULL,
    estado VARCHAR(8) NOT NULL CHECK (estado IN ('activo', 'inactivo')),
    id_rol INT NOT NULL,
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
    nombre_carrera VARCHAR(100) NOT NULL,
    estado VARCHAR(8) NOT NULL CHECK (estado IN ('activo', 'inactivo'))
);

-- Tabla Periodos_Academicos
CREATE TABLE Periodos_Academicos (
    id_periodo INT PRIMARY KEY AUTO_INCREMENT,
    nombre_periodo VARCHAR(24) NOT NULL,
    detalle_periodo VARCHAR(100),
    anio_lectivo VARCHAR(10) NOT NULL,
    estado VARCHAR(8) NOT NULL CHECK (estado IN ('activo', 'inactivo'))
);

-- Tabla Cursos
CREATE TABLE Cursos (
    id_curso INT PRIMARY KEY AUTO_INCREMENT,
    nombre_curso VARCHAR(100) NOT NULL,
    estado VARCHAR(8) NOT NULL CHECK (estado IN ('activo', 'inactivo')),
    id_periodo INT NOT NULL,
    id_carrera INT NOT NULL,
    FOREIGN KEY (id_periodo) REFERENCES Periodos_Academicos(id_periodo),
    FOREIGN KEY (id_carrera) REFERENCES Carreras(id_carrera)
);

-- Tabla Materias
CREATE TABLE Materias (
    id_materia INT PRIMARY KEY AUTO_INCREMENT,
    codigo_materia VARCHAR(24) NOT NULL,
    nombre_materia VARCHAR(255) NOT NULL,
    estado VARCHAR(8) NOT NULL CHECK (estado IN ('activo', 'inactivo')),
    id_curso INT NOT NULL,
    FOREIGN KEY (id_curso) REFERENCES Cursos(id_curso)
);
