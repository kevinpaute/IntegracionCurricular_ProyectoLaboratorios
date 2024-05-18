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
    id_rol INT NOT NULL, 
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

-- Tabla Catalogo_Materias
CREATE TABLE Catalogo_Materias (
    id_catalogo INT PRIMARY KEY AUTO_INCREMENT,
    nombre_materia VARCHAR(255) NOT NULL
);

-- Tabla Materias
CREATE TABLE Materias (
    id_materia INT PRIMARY KEY AUTO_INCREMENT,
    codigo_materia VARCHAR(24) NOT NULL,
    estado VARCHAR(8) NOT NULL CHECK (estado IN ('activo', 'inactivo')),

    id_catalogo INT NOT NULL,
    id_carrera INT NOT NULL,
    id_periodo INT NOT NULL,
    FOREIGN KEY (id_periodo) REFERENCES Periodos_Academicos(id_periodo),
    FOREIGN KEY (id_carrera) REFERENCES Carreras(id_carrera),
    FOREIGN KEY (id_catalogo) REFERENCES Catalogo_Materias(id_catalogo)
);

-- Tabla Laboratorios
CREATE TABLE Laboratorios (
    id_laboratorio INT PRIMARY KEY AUTO_INCREMENT,
    nombre_laboratorio VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(100) NOT NULL,
    capacidad INT NOT NULL
);

-- Tabla Equipos_Laboratorio
CREATE TABLE Equipos_Laboratorio (
    id_equipo INT PRIMARY KEY AUTO_INCREMENT,
    id_laboratorio INT NOT NULL,
    nombre_equipo VARCHAR(100) NOT NULL,
    fecha_ingreso DATE  NOT NULL,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100),
    serie VARCHAR(100),
    proveedor VARCHAR(100),
    descripcion VARCHAR(100),
    estado VARCHAR(8) NOT NULL CHECK (estado IN ('activo', 'inactivo')),

    FOREIGN KEY (id_laboratorio) REFERENCES Laboratorios(id_laboratorio)
);

CREATE TABLE Revision_Equipos (
    id_revision INT PRIMARY KEY AUTO_INCREMENT,
    id_equipo INT NOT NULL,
    id_responsable INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    novedad varchar(50) NOT NULL,
    observaciones VARCHAR(255),
    solucion VARCHAR(255) NOT NULL, -- validar en front
    fecha_fin DATE NOT NULL,
    hora_fin TIME NOT NULL,
    FOREIGN KEY (id_equipo) REFERENCES Equipos_Laboratorio(id_equipo),
    FOREIGN KEY (id_responsable) REFERENCES Usuarios(id_usuario),
);


-- Tabla Reservas
CREATE TABLE Reservas (
    id_reserva INT PRIMARY KEY AUTO_INCREMENT,
    id_laboratorio INT NOT NULL,
    id_usuario INT NOT NULL,
    id_materia INT,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    motivo VARCHAR(255) NOT NULL,
    estado VARCHAR(8) NOT NULL CHECK (estado IN ('activo', 'inactivo')),

    
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_laboratorio) REFERENCES Laboratorios(id_laboratorio),
    FOREIGN KEY (id_materia) REFERENCES Materias(id_materia)
);

-- Tabla Asistencia estudiantes
CREATE TABLE Asistencias (
    id_asistencia INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_reserva INT NOT NULL,
    fecha_asistencia DATETIME NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_reserva) REFERENCES Reservas(id_reserva)
);

CREATE TABLE Reportes (
    id_reporte INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT, -- Usuario que descarga reporte Docente o Administrador
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    tipo_reporte VARCHAR(50) NOT NULL, 
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

CREATE TABLE Bitacora ( 
/* Tabla Bitacora para subir el pdf(escaneado/tomado foto) que llenan los docentes que ocupan ese dia el laboratorio 
es decir, que cuando se sube esta evidencia se debe especificar que laboratorio, la fecha del dia y automaticamente se guarda la ruta donde se guardo el pdf */
    id_bitacora INT PRIMARY KEY AUTO_INCREMENT,
    id_laboratorio INT NOT NULL,
    fecha DATE NOT NULL,
    ruta VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_laboratorio) REFERENCES Laboratorios(id_laboratorio)

);