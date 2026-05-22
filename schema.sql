-- Rol
CREATE TYPE posicion AS ENUM ('TOP','JGL','MID','ADC','SUP');
-- Split
CREATE TYPE split AS ENUM ('WINTER','SPRING','SUMMER');
-- Posicion en lo PlayOffs
CREATE TYPE fase_partida AS ENUM ('regular','upR1','upR2','upFinal','downR1','downR2','downR3','downFinal','grandFinal');
-- Tablas

-- 2. LIGAS Y EQUIPOS
CREATE TABLE liga (
    nombre VARCHAR(6) PRIMARY KEY
    
);

CREATE TABLE equipo (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200) UNIQUE,
    descripcion TEXT,
    imagen TEXT,
    nombre_liga VARCHAR(200),
    FOREIGN KEY (nombre_liga) REFERENCES liga(nombre)
);

-- 3. TABLAS PRINCIPALES
CREATE TABLE jugador (
    id SERIAL PRIMARY KEY,
    alias VARCHAR(200),
    nacionalidad VARCHAR(200),
    posicion posicion,
    nombre_equipo VARCHAR(200),
    imagen TEXT,
    FOREIGN KEY (nombre_equipo) REFERENCES equipo(nombre)
);

CREATE TABLE campeon (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200),
    posicion posicion,
    descripcion TEXT,
    imagen TEXT
);


-- 4. TABLAS INTERMEDIAS
CREATE TABLE jugador_campeon (
    alias_jugador VARCHAR(200),
    nombre_campeon VARCHAR(200),
    PRIMARY KEY (alias_jugador, nombre_campeon),
    FOREIGN KEY (alias_jugador) REFERENCES jugador(alias),
    FOREIGN KEY (nombre_campeon) REFERENCES campeon(nombre)
);

CREATE TABLE partida (
    id SERIAL PRIMARY KEY,
    fecha_partida TIMESTAMP,
    equipo_rojo VARCHAR(200),
    equipo_azul VARCHAR(200),
    equipo_ganador VARCHAR(200),
    kills_equipo_azul INTEGER,
    kills_equipo_rojo INTEGER,
    torneo VARCHAR(200),
	split split, 
	año int, 
    fase fase_partida,

    FOREIGN KEY (equipo_rojo) REFERENCES equipo(nombre),
    FOREIGN KEY (equipo_azul) REFERENCES equipo(nombre),
    FOREIGN KEY (equipo_ganador) REFERENCES equipo(nombre)
);
CREATE TABLE administrador (

    alias VARCHAR (100) PRIMARY KEY,
    correo VARCHAR (100),
    passwrd VARCHAR (250)
);

CREATE TABLE Noticia (
    id SERIAL PRIMARY KEY,
    titular VARCHAR (200),
    contenido TEXT
);
